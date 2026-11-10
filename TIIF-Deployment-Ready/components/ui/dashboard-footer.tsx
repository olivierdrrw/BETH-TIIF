interface Props {
  children: React.ReactNode;
}

export function DashboardFooter({
  children,
}: Props) {
  return (
    <div className="mt-8 flex items-center justify-between">
      {children}
    </div>
  );
}