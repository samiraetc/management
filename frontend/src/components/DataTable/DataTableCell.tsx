import React, { FC } from 'react';

interface IDataTableCell {
  value: string | number | boolean;
}

const DataTableCell: FC<IDataTableCell> = ({ value }) => {
  return (
    <div className="font-normal text-gray-500 dark:text-white">{value}</div>
  );
};

export default DataTableCell;
