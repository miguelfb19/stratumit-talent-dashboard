"use client";

import { Role } from "@prisma/client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { Button } from "@heroui/react";
import { ActionsButtons } from "./ActionsButtons";

interface Props {
  roles: Role[];
  columns: string[];
}

export const RolesTable = ({ roles, columns }: Props) => {
  return (
    <>
      <div className="mb-10">
        <Button radius="full" color="primary" variant="flat">
          Add new role
        </Button>
      </div>
      <Table aria-label="users table">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column}>{column.toUpperCase()}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {roles.map((rol) => (
            <TableRow key={rol.id}>
              <TableCell>{rol.id}</TableCell>
              <TableCell>{rol.name}</TableCell>
              <TableCell className="flex gap-2">
                <ActionsButtons />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
