"use client";

import { Button } from "@heroui/react";
import { BiSolidPencil } from "react-icons/bi";
import { IoTrash } from "react-icons/io5";

export const ActionsButtons = () => {
  return (
    <>
      <Button color="primary" radius="full" variant="flat">
        <BiSolidPencil size={20} />
      </Button>
      <Button color="danger" radius="full" variant="flat">
        <IoTrash size={17} />
      </Button>
    </>
  );
};
