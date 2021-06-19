import React from "react";

export default function Container({ children }: { children: JSX.Element }) {
  return <div className="container mx-auto my-5">{children}</div>;
}
