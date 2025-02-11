"use client";

import { Button, Link } from "@heroui/react";
import clsx from "clsx";

interface Props {
  nextButton?: boolean;
  prevButon?: boolean;
  prevLink: string;
  sendFormData?: () => void;
}

export const NavigateButtons = ({
  nextButton = true,
  prevButon = true,
  prevLink,
  sendFormData,
}: Props) => {
  return (
    <div className="grid grid-cols-2 justify-items-center mt-5 w-full">
      <Button
        as={Link}
        className={clsx("justify-self-start", {
          invisible: !prevButon,
        })}
        color="primary"
        href={prevLink}
        radius="full"
        variant="flat"
      >
        Prev
      </Button>

      <Button
        className={clsx("justify-self-end", {
          invisible: !nextButton,
        })}
        color="primary"
        radius="full"
        type="submit"
        variant="flat"
        onPress={sendFormData ? sendFormData : () => {}}
      >
        Next
      </Button>
    </div>
  );
};
