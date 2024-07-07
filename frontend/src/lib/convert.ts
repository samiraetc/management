interface ColumnType {
  name: string;
  order: boolean;
  search: boolean;
  column_type: string;
}

interface ResponseData {
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: DataType[][];
  columns: ColumnType[];
}

interface ActionsData {
  link_action: {
    [action: string]: boolean;
  };
  download_url?: string | null;
  api_version: number;
  resource: number;
}

type DataType = string | number | boolean | null | ActionsData | [];

export function convertDataBasedOnColumns(json: ResponseData) {
  const columns: string[] = json.columns.map((col: ColumnType) => col.name);

  const data = json.data.map((row: DataType[]) => {
    let obj: any = {};
    columns.forEach((col: string, index: number) => {
      obj[col] = row[index];
    });
    return obj;
  });

  return { ...data };
}
