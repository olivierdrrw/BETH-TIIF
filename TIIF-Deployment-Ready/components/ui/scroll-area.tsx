import * as React from "react";

export function ScrollArea({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="scrollbar-none overflow-auto">
      {children}
    </div>
  );
}