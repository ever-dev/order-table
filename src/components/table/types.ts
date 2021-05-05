export type TSortColumn<T> = TTableColumn<T> & {
  direction: "asc" | "desc";
};
export type TTableColumn<T extends { [i: string]: any }> = {
  caption: string;
  getter: (item: T) => any;
  format?: (value: any, row: T) => string;
};

export type TTableAction<T extends { [i: string]: any }> = {
  label: string;
  callback: (selections: T[]) => any;
};

export type TBaseTableData = {
  id: any;
} & {
  [i: string]: any;
};

export type TTableProps<T> = {
  title: string;
  data: T[];
  columns: TTableColumn<T>[];
  allowSelection?: boolean;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  actions?: TTableAction<T>[];
};
