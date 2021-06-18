import { string } from "prop-types";
import React from "react";
import {
  MailIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/solid";

enum Variants {
  success = "success",
  error = "error",
  warning = "warning",
}

type Variant = keyof typeof Variants;

type Alert = {
  variant: Variant;
  items: string[];
};

const VariantIcon = ({ variant }: { variant: Variant }) => {
  switch (variant) {
    case "success":
      return <CheckCircleIcon className="mr-4 w-8 text-red-500 text-sm" />;
    case "error":
      return (
        <ExclamationCircleIcon className="mr-4 w-8 text-red-500 text-sm" />
      );
    default:
      return <MailIcon className="mr-4 w-8 text-sm" />;
  }
};

const Alert = ({ variant, items }: Alert) => {
  return (
    <div className="text-white-500 flex p-4 bg-red-200 rounded-md">
      <VariantIcon variant={variant} />
      {items && (
        <ol>
          {items.map((msg) => (
            <li>{msg}</li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default Alert;
