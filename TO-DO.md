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
