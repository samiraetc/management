'use client';

import { Badge } from '@/components/ui/badge';
import { getActionIcon, getDueDateIcon, getPriorityProps } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Shell } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from './header';
import faker from 'faker';
import { Checkbox } from '@/components/ui/checkbox';

export type Payment = {
  id: string;
  priority: 'low' | 'medium' | 'high' | 'urgent' | 'none';
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
        <div className="flex justify-center">
          {getPriorityProps(row.getValue('priority'))}
        </div>
      );
    },
    meta: {
      filterVariant: 'select',
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'identifier',

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
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
      return <div className="w-96">{row.getValue('title')}</div>;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
                className="flex items-center gap-2 py-1 text-sm font-normal text-gray-600"
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
            className="flex items-center gap-2 text-sm font-normal text-gray-600"
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
        <div className="flex items-center gap-1 font-normal text-gray-600">
          <Shell width={12} />
          {row.getValue('estimative')}
        </div>
      );
    },
  },
  {
    accessorKey: 'created_at',
    cell: ({ row }) => {
      const date = new Date(row.getValue('created_at'));

      return (
        <div className="font-normal text-gray-600">{format(date, 'MMM d')}</div>
      );
    },
  },
  {
    accessorKey: 'actions',
    cell: ({ row }) => {
      const keysArray = Object.keys(row.original.actions);

      return (
        <div className="flex gap-2">
          {keysArray.map((key) => {
            return getActionIcon(key);
          })}
        </div>
      );
    },
  },
];

// export const payments: Payment[] = [
//   {
//     id: '728ed52f',
//     priority: 'none',
//     identifier: 'TX-1',
//     title: 'Preciso lavar a louça',
//     labels: [
//       {
//         name: 'BACKEND',
//         color: '#6C291B',
//       },
//       {
//         name: 'Frontend',
//         color: '#27AE60',
//       },
//     ],
//     due_date: '2024-07-01T21:47:43.963Z',
//     estimative: 8,
//     created_at: '2024-07-01T21:47:43.963Z',
//     updated_at: '2024-07-01T21:47:43.963Z',
//     children: [
//       {
//         id: '728ed52f',
//         priority: 'none',
//         identifier: 'TX-1',
//         title: 'Sub Tarefa 1',
//         labels: [
//           {
//             name: 'BACKEND',
//             color: '#6C291B',
//           },
//           {
//             name: 'Frontend',
//             color: '#27AE60',
//           },
//         ],
//         due_date: '2024-07-01T21:47:43.963Z',
//         estimative: 8,
//         created_at: '2024-07-01T21:47:43.963Z',
//         updated_at: '2024-07-01T21:47:43.963Z',
//       },
//     ],
//   },
//   {
//     id: '728ed52f',
//     priority: 'high',
//     identifier: 'TES-5',
//     title: 'Vou comer ',
//     estimative: 12,
//     labels: [
//       {
//         name: 'frontend',
//         color: '#6C291B',
//       },
//     ],
//     created_at: '2024-07-01T21:47:43.963Z',
//     updated_at: '2024-07-01T21:47:43.963Z',
//     due_date: '2024-07-01T21:47:43.963Z',
//   },
//   {
//     id: '728ed52f',
//     priority: 'medium',
//     identifier: 'TX-1',
//     title: 'Preciso lavar a louça',
//     estimative: 8,
//     labels: [
//       {
//         name: 'backend',
//         color: '#6C291B',
//       },
//     ],
//     created_at: '2024-07-01T21:47:43.963Z',
//     updated_at: '2024-07-01T21:47:43.963Z',
//     due_date: '2024-07-01T21:47:43.963Z',
//   },
//   {
//     id: '728ed52f',
//     priority: 'high',
//     identifier: 'TX-1',
//     title: 'Preciso lavar a louça',
//     estimative: 8,
//     labels: [
//       {
//         name: 'backend',
//         color: '#6C291B',
//       },
//     ],
//     created_at: '2024-07-01T21:47:43.963Z',
//     updated_at: '2024-07-01T21:47:43.963Z',
//     due_date: '2024-07-01T21:47:43.963Z',
//   },
//   {
//     id: '728ed52f',
//     priority: 'urgent',
//     identifier: 'TX-1',
//     title: 'Preciso lavar a louça',
//     estimative: 8,
//     labels: [
//       {
//         name: 'backend',
//         color: '#6C291B',
//       },
//     ],
//     created_at: '2024-07-01T21:47:43.963Z',
//     updated_at: '2024-07-01T21:47:43.963Z',
//     due_date: '2024-07-01T21:47:43.963Z',
//   },
// ];

const generateTask = () => {
  const id = faker.datatype.uuid();
  const priority = faker.random.arrayElement([
    'none',
    'low',
    'medium',
    'high',
    'urgent',
  ]);
  const identifier =
    faker.lorem.word().toUpperCase().slice(0, 3) +
    '-' +
    faker.datatype.number(10);
  const title = faker.lorem.sentence();
  const labels = [
    { name: faker.lorem.word(), color: faker.internet.color() },
    { name: faker.lorem.word(), color: faker.internet.color() },
  ];
  const due_date = faker.date.future().toISOString();
  const estimative = faker.datatype.number(24);
  const created_at = faker.date.past().toISOString();
  const updated_at = faker.date.recent().toISOString();

  return {
    id,
    priority,
    identifier,
    title,
    labels,
    due_date,
    estimative,
    created_at,
    updated_at,
    actions: {
      show: true,
      edit: true,
      delete: true,
    },
    children: [
      {
        id,
        priority,
        identifier,
        title,
        labels,
        due_date,
        estimative,
        created_at,
        updated_at,
        actions: {
          show: true,
          edit: true,
          delete: true,
        },
      },
    ],
  };
};

export const payments: Payment[] = Array.from({ length: 40 }, generateTask);
