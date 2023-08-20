type TableOrder = "asc" | "desc";
type Tracking = "initial" | "start" | "finished";
type ID = string | number;
type Theme = "dark" | "light";

type MuiTableHeader<T> = {
  key: keyof (T & { actions: string });
  label: string;
  disablePadding?: boolean;
  numeric?: boolean;
  className?: string;
  align?: "left" | "center" | "right" | "justify" | "inherit";
  RenderComponent?: ({ row }: { row: T }) => React.ReactNode;
  WrapperComponent?: ({
    children,
  }: {
    children: React.ReactNode;
    row: T;
  }) => React.ReactNode;
};
