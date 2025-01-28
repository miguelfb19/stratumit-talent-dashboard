'use client'

import { Button, Link } from "@heroui/react";

export default function Home() {
  // throw new Error("Error de prueba");
  return (
    <div>
      <h1>Hola mundo</h1>
      <Button
        as={Link}
        href="/auth/register"
        radius="full"
        color="primary"
        variant="flat"
      >
        Register
      </Button>
    </div>
  );
}
