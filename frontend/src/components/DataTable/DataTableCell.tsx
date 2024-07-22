import { cn } from '@/lib/utils';
import React, { FC } from 'react';

interface IDataTableCell {
  value: string | number | boolean;
  className?: string;
}

const DataTableCell: FC<IDataTableCell> = ({ value, className = '' }) => {
  return (
    <div className={cn('font-normal text-sm text-gray-500 dark:text-white', className)}>
      {value}
    </div>
  );
};

export default DataTableCell;
