"use client";

import { Button } from "@heroui/react";
import { BiSolidPencil } from "react-icons/bi";
import { IoTrash } from "react-icons/io5";

export const ActionsButtons = () => {
  return (
    <>
      <Button radius="full" color="primary" variant="flat">
        <BiSolidPencil size={20} />
      </Button>
      <Button radius="full" color="danger" variant="flat">
        <IoTrash size={17} />
      </Button>
    </>
  );
};
