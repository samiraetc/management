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
  show: boolean;
  update: false;
}

type DataType = string | number | boolean | ActionsData;

function convertDataBasedOnColumns(json: ResponseData) {
  const columns: string[] = json.columns.map((col: ColumnType) => col.name);

  const data = json.data.map((row: DataType[]) => {
    let obj: { [key: string]: DataType } = {};
    columns.forEach((col: string, index: number) => {
      obj[col] = row[index];
    });
    return obj;
  });

  return data;
}
