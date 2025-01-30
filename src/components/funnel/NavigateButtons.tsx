"use client";

import { Button, Link } from "@heroui/react";
import clsx from "clsx";

interface Props {
  nextButton?: boolean;
  prevButon?: boolean;
  prevLink: string;
  sendFormData?: ()=>void
}

export const NavigateButtons = ({
  nextButton = true,
  prevButon = true,
  prevLink,
  sendFormData
}: Props) => {
  return (
    <div className="grid grid-cols-2 justify-items-center mt-5 w-full">
      <Button
        as={Link}
        href={prevLink}
        color="primary"
        variant="flat"
        className={clsx("justify-self-start",{
            "invisible": !prevButon
        })}
      >
        Prev
      </Button>

      <Button
        type="submit"
        color="primary"
        variant="flat"
        className={clsx("justify-self-end", {
            "invisible": !nextButton
        })}
        onPress={sendFormData ? sendFormData : ()=>{}}
      >
        Next
      </Button>
    </div>
  );
};
