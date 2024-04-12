interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export function DashboardHeader({
  heading,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="mx-auto flex w-full items-center justify-between px-10 pb-8 pt-12 xl:w-2/3">
      <div className="grid gap-1">
        <h1 className="text-3xl font-semibold md:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  );
}
