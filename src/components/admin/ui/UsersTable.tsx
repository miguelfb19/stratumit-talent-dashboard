"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { Button } from "@heroui/react";
import { UsersAndRoles } from "@/interfaces/user-roles";
import { ActionsButtons } from './ActionsButtons';

interface Props {
  users: UsersAndRoles
  columns: string[];
}

export const UsersTable = ({ users, columns }: Props) => {
  return (
    <>
      <div className="mb-10">
        <Button radius="full" color="primary" variant="flat">
          Add new user
        </Button>
      </div>
      <Table aria-label="users table">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column}>{column.toUpperCase()}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
            {users.map(user => (
                <TableRow key={user.id}>
                    <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.roles.map(role => `${role.role.name}\n`)}</TableCell>
                    <TableCell>{user.country}</TableCell>
                    <TableCell>{user.birthDate.toDateString()}</TableCell>
                    <TableCell>{user.isVerified.toString()}</TableCell>
                    <TableCell className="flex gap-2">
                        <ActionsButtons/>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};
