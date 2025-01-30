"use client";

import { Button, Link } from "@heroui/react";
import clsx from "clsx";

interface Props {
  nextButton?: boolean;
  prevButon?: boolean;
}

export const NavigateButtons = ({
  nextButton = true,
  prevButon = true,
}: Props) => {
  return (
    <div className="grid grid-cols-2 justify-items-center mt-5 w-full">
      <Button
        as={Link}
        href="/talent-funnel/motivation-text"
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
      >
        Next
      </Button>
    </div>
  );
};
