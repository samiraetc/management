import React, { useState } from 'react';
import {
  ColumnDef,
  ColumnFilter,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  GroupingState,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { DataTablePagination } from './DataTablePagination';
import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils';
import { DataTableToolbar } from './DataTableToolbar';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { getDeaphColor } from '@/lib/utils';

interface DataTableProps<TData, TValue> {
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

export function DataTable<TData extends { children?: TData[] }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [expanded, setExpanded] = useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      priority: true,
      identifier: true,
    });
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFilter[]>([]);
  const [grouping, setGrouping] = React.useState<GroupingState>([]);

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
      grouping,
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
    onGroupingChange: setGrouping,
    globalFilterFn: 'fuzzy',
  });

  const hasChildren = table
    .getRowModel()
    .rows.some((row) => row.getCanExpand());

  const toggleExpand = (row: Row<TData>) => {
    setExpanded((prev: any) => ({
      ...prev,
      [row.id]: !prev[row.id],
    }));
  };

  const toggleExpandAll = () => {
    const isAllExpanded = Object.values(expanded).some(Boolean);
    setExpanded(
      isAllExpanded
        ? {}
        : table.getRowModel().rows.reduce((acc: any, row) => {
            acc[row.id] = true;
            return acc;
          }, {}),
    );
  };

  return (
    <div>
      <div className="mb-5">
        <DataTableToolbar table={table} globalFilter={globalFilter} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {/* {hasChildren && (
                <TableHead>
                  <div
                    onClick={toggleExpandAll}
                    className="flex items-center rounded-sm border border-border px-1.5 focus:outline-none"
                  >
                    {Object.values(expanded).some(Boolean) ? (
                      <ChevronDown width={14} />
                    ) : (
                      <ChevronRight width={14} />
                    )}
                  </div>
                </TableHead>
              )} */}
              {/* {table
                .getHeaderGroups()
                .map((headerGroup) =>
                  headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )),
                )} */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {hasChildren && (
                    <TableCell
                      className={`px-2 py-2 pr-0 ${getDeaphColor(row.depth)}`}
                      onClick={() => toggleExpand(row)}
                    >
                      <div className="flex">
                        {row.getCanExpand() ? (
                          <div className="rounded-sm border px-1.5 cursor-pointer">
                            {row.getIsExpanded() ? (
                              <ChevronDown width={10} />
                            ) : (
                              <ChevronRight width={10} />
                            )}
                          </div>
                        ) : null}
                      </div>
                    </TableCell>
                  )}
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        key={cell.id}
                        className={`p-2 ${getDeaphColor(row.depth)}`}
                        style={{ width: `${cell.column.getSize()}px` }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
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
