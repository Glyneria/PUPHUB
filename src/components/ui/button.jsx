// src/components/ui/button.jsx
import React from "react";
import classNames from "classnames";

export const Button = ({
  children,
  className = "",
  variant = "default",
  ...props
}) => {
  const base =
    "px-4 py-2 rounded-xl font-medium transition-all focus:outline-none";
  const variants = {
    default: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-red-600 text-red-600 hover:bg-red-100",
  };

  return (
    <button
      className={classNames(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
