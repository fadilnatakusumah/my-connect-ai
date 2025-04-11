import React, { PropsWithChildren } from "react";

function ContentWrapper({
  title,
  children,
}: PropsWithChildren & { title: string }) {
  return (
    <div className="container mx-auto py-6">
      {title && <h1 className="text-3xl font-bold mb-6">{title}</h1>}
      {children}
    </div>
  );
}

export default ContentWrapper;
