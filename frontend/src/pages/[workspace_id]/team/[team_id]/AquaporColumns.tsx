'use client';

import { Badge } from '@/components/ui/badge';
import { getActionIcon, getDueDateIcon, getPriorityProps } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Shell } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/DataTable/DataTableHeader';

export type Aquapor = {
  id: string;
  budget_entity_code: string;
  budget_entity_name: string;
  budget_entity_type: string;
  company: string;
  reference_year: string;
  state: string;
  children?: Aquapor[];
};

export const columns: ColumnDef<Aquapor>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="ml-2"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'priority',
    cell: ({ row }) => {
      return (
        <div className="flex w-12 justify-center">
          {getPriorityProps(row.getValue('priority'))}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'identifier',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Identifier" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-normal text-gray-600">
          {row.getValue('identifier')}
        </div>
      );
    },
  },
  {
    accessorKey: 'title',
    cell: ({ row }) => {
      return <div className="w-[40rem]">{row.getValue('title')}</div>;
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: 'estimative',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1 font-normal text-gray-600">
          <Shell width={12} />
          {row.getValue('estimative')}
        </div>
      );
    },
  },
];
