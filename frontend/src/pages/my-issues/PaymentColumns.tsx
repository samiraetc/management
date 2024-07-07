'use client';

import { Badge } from '@/components/ui/badge';
import { getActionIcon, getDueDateIcon, getPriorityProps, getStatusesProps } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Shell } from 'lucide-react';
import { format } from 'date-fns';
// import faker from 'faker';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/DataTable/DataTableHeader';
import { useRouter } from 'next/router';
import { data } from './data';
import DataTableCell from '@/components/DataTable/DataTableCell';

export type Payment = {
  id: string;
  priority: 'low' | 'medium' | 'high' | 'urgent' | 'none' | string;
  status: 'backlog' | 'to_do' | 'doing' | 'done' | string;
  labels: { name: string; color: string }[];
  identifier: string;
  estimative: number;
  due_date: string;
  title: string;
  created_at: string;
  updated_at: string;
  actions: { [x: string]: boolean };
  children?: Payment[];
};

export const columns: ColumnDef<Payment>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'status',
    cell: ({ row }) => {
      return (
        <div className="flex w-12 justify-center">
          {getStatusesProps(row.getValue('status'))?.icon}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
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
        <DataTableCell value={row.getValue('identifier')} />
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
    accessorKey: 'labels',
    cell: ({ row }) => {
      const values: { name: string; color: string }[] = row.getValue('labels');

      return (
        <div className="flex items-center gap-1">
          {values.map((item) => {
            return (
              <Badge
                variant="outline"
                className="flex items-center gap-2 py-1 text-sm font-normal text-gray-500 dark:text-white"
              >
                <div
                  className="rounded-lg p-1.5"
                  style={{ backgroundColor: item.color }}
                ></div>
                {item.name}
              </Badge>
            );
          })}
        </div>
      );
    },
  },
  {
    accessorKey: 'due_date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('created_at'));

      return (
        <div className="flex w-24 items-center gap-1">
          <Badge
            variant="outline"
            className="flex items-center gap-2 text-sm font-normal text-gray-500 dark:text-white"
          >
            {getDueDateIcon(date)}
            {format(date, 'MMM d')}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'estimative',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1 font-normal text-gray-500 dark:text-white">
          <Shell width={12} />
          {row.getValue('estimative')}
        </div>
      );
    },
  },
  {
    accessorKey: 'created_at',
    cell: ({ row }) => {
      return (
        <DataTableCell
          value={format(new Date(row.getValue('created_at')), 'MMM d')}
        />
      );
    },
  },
  {
    accessorKey: 'actions',
    cell: ({ row }) => {
      const keysArray = Object.keys(row.original.actions);
      const route = useRouter();


      return (
        <div className="flex gap-2">
          {keysArray.map((key) => {
            if (key === 'show') {
              return (
                <div onClick={() => route.push('/testando')}>
                  {getActionIcon(key)}
                </div>
              );
            }
          })}
        </div>
      );
    },
  },
];

// const generateTask = () => {
//   const id = faker.datatype.uuid();
//   const priority = faker.random.arrayElement([
//     'none',
//     'low',
//     'medium',
//     'high',
//     'urgent',
//   ]);
//   const identifier =
//     faker.lorem.word().toUpperCase().slice(0, 3) +
//     '-' +
//     faker.datatype.number(10);
//   const title = faker.lorem.sentence();
//   const labels = [
//     { name: faker.lorem.word(), color: faker.internet.color() },
//     { name: faker.lorem.word(), color: faker.internet.color() },
//   ];
//   const due_date = faker.date.future().toISOString();
//   const estimative = faker.datatype.number(24);
//   const created_at = faker.date.past().toISOString();
//   const updated_at = faker.date.recent().toISOString();

//   return {
//     id,
//     priority,
//     identifier,
//     title,
//     labels,
//     due_date,
//     estimative,
//     created_at,
//     updated_at,
//     actions: {
//       show: true,
//       edit: true,
//       delete: true,
//     },
//   };
// };

export const payments: Payment[] = data;
