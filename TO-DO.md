Revisar los errores lanzados en login

revisar e insertar neuvas tablas de roles y permisos en la DB:

```
model User {
  id          String     @id @default(uuid())
  email       String     @unique
  password    String
  roles       UserRole[]
  createdDate DateTime   @default(now())
}

model Role {
  id          String        @id @default(uuid())
  name        String        @unique
  permissions RolePermission[]
  users       UserRole[]
}

model Permission {
  id   String @id @default(uuid())
  name String @unique
  roles RolePermission[]
}

model UserRole {
  userId String
  roleId String

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  role Role @relation(fields: [roleId], references: [id], onDelete: Cascade)

  @@id([userId, roleId])
}

model RolePermission {
  roleId       String
  permissionId String

  role       Role       @relation(fields: [roleId], references: [id], onDelete: Cascade)
  permission Permission @relation(fields: [permissionId], references: [id], onDelete: Cascade)

  @@id([roleId, permissionId])
}
```

Ejemplo de middleware 

```
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      return token?.permissions.includes("manage_users"); // Solo permite si tiene este permiso
    },
  },
});

export const config = { matcher: ["/admin"] }; // Protege `/admin`
```

Ejemplo de archivo CASL

```
import { AbilityBuilder, createMongoAbility } from "@casl/ability";

export function defineRulesFor(permissions: string[]) {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  permissions.forEach((perm) => {
    can(perm);
  });

  return build();
}
```

Ejemplo provider global en el FrontEnd

```
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { defineRulesFor } from "@/lib/casl";
import { Ability } from "@casl/ability";

const AbilityContext = createContext(new Ability());

export function AbilityProvider({ children }) {
  const { data: session } = useSession();
  const [ability, setAbility] = useState(new Ability());

  useEffect(() => {
    if (session?.user?.permissions) {
      setAbility(defineRulesFor(session.user.permissions));
    }
  }, [session]);

  return (
    <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  );
}

export function useAbility() {
  return useContext(AbilityContext);
}
```
Ejemplo de uso del CASL en componentes:

```
import { useAbility } from "@/context/AbilityProvider";

export default function AdminPage() {
  const ability = useAbility();

  if (!ability.can("manage_users")) {
    return <p>No tienes permisos para ver esta página ❌</p>;
  }

  return <h1>Bienvenido, administrador! ✅</h1>;
}
´´´

Ejemplo de CASL prisma

````
import { PrismaClient } from "@prisma/client";
import { defineAbility } from "@casl/ability";
import { PrismaAbility } from "@casl/prisma";

const prisma = new PrismaClient();

// Función para definir permisos usando Prisma y CASL
export async function defineAbilityFor(userId: string) {
  // Obtén los roles y permisos del usuario
  const userRolesPermissions = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      roles: {
        include: {
          role: {
            include: {
              permissions: true,
            },
          },
        },
      },
    },
  });

  // Extraer los permisos y crear las reglas
  const permissions = userRolesPermissions?.roles.flatMap((r) =>
    r.role.permissions.map((p) => p.permission.name)
  ) || [];

  return new PrismaAbility(permissions);
}
```
