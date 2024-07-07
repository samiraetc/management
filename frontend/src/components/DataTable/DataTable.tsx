import React, { useState } from 'react';
import {
  ColumnDef,
  ColumnFilter,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { DataTablePagination } from './DataTablePagination';
import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils';
import { DataTableToolbar } from './DataTableToolbar';

interface DataTableProps<TData extends { children?: TData[] }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({
    itemRank,
  });

  return itemRank.passed;
};

declare module '@tanstack/react-table' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

function getUniqueOptions<TData>(data: TData[], accessorKey: string): string[] {
  const uniqueOptions = new Set<string>();
  data.forEach((item: any) => {
    const value = item[accessorKey];
    if (value !== undefined && value !== null) {
      uniqueOptions.add(String(value));
    }
  });
  return Array.from(uniqueOptions);
}

export function DataTable<TData extends { children?: TData[] }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [expanded, setExpanded] = useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFilter[]>(
    [],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
      rowSelection,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.children || [],
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    globalFilterFn: 'fuzzy',
  });

  const toggleExpand = (row: Row<TData>) => {
    setExpanded((prev: any) => ({
      ...prev,
      [row.id]: !prev[row.id],
    }));
  };

  console.log(table.getRowModel().rows)

  return (
    <div>

     <div className='mb-5'>
     <DataTableToolbar table={table} globalFilter={globalFilter} />
     </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>

            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => toggleExpand(row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`bg-background p-2`}
                      style={{ width: `${cell.column.getSize()}px` }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
