export type Task = {
  id: string;
  priority: 'low' | 'medium' | 'high' | 'urgent' | 'none';
  labels: { name: string; color: string }[];
  identifier: string;
  estimative: number;
  due_date: string;
  title: string;
  created_at: string;
  updated_at: string;
  children?: Task[];
};

export const tasks: Task[] = [
  {
    id: '728ed52f',
    priority: 'none',
    identifier: 'TX-1',
    title: 'Preciso lavar a louça',
    labels: [
      {
        name: 'BACKEND',
        color: '#6C291B',
      },
      {
        name: 'Frontend',
        color: '#27AE60',
      },
    ],
    due_date: '2024-07-01T21:47:43.963Z',
    estimative: 8,
    created_at: '2024-07-01T21:47:43.963Z',
    updated_at: '2024-07-01T21:47:43.963Z',
    children: [
      {
        id: '728ed52f',
        priority: 'none',
        identifier: 'TX-1',
        title: 'Sub Tarefa 1',
        labels: [
          {
            name: 'BACKEND',
            color: '#6C291B',
          },
          {
            name: 'Frontend',
            color: '#27AE60',
          },
        ],
        due_date: '2024-07-01T21:47:43.963Z',
        estimative: 8,
        created_at: '2024-07-01T21:47:43.963Z',
        updated_at: '2024-07-01T21:47:43.963Z',
      },
    ],
  },
  {
    id: '728ed52f',
    priority: 'high',
    identifier: 'TES-5',
    title: 'Vou comer ',
    estimative: 12,
    labels: [
      {
        name: 'frontend',
        color: '#6C291B',
      },
    ],
    created_at: '2024-07-01T21:47:43.963Z',
    updated_at: '2024-07-01T21:47:43.963Z',
    due_date: '2024-07-01T21:47:43.963Z',
  },
  {
    id: '728ed52f',
    priority: 'medium',
    identifier: 'TX-1',
    title: 'Preciso lavar a louça',
    estimative: 8,
    labels: [
      {
        name: 'backend',
        color: '#6C291B',
      },
    ],
    created_at: '2024-07-01T21:47:43.963Z',
    updated_at: '2024-07-01T21:47:43.963Z',
    due_date: '2024-07-01T21:47:43.963Z',
  },
  {
    id: '728ed52f',
    priority: 'high',
    identifier: 'TX-1',
    title: 'Preciso lavar a louça',
    estimative: 8,
    labels: [
      {
        name: 'backend',
        color: '#6C291B',
      },
    ],
    created_at: '2024-07-01T21:47:43.963Z',
    updated_at: '2024-07-01T21:47:43.963Z',
    due_date: '2024-07-01T21:47:43.963Z',
  },
  {
    id: '728ed52f',
    priority: 'urgent',
    identifier: 'TX-1',
    title: 'Preciso lavar a louça',
    estimative: 8,
    labels: [
      {
        name: 'backend',
        color: '#6C291B',
      },
    ],
    created_at: '2024-07-01T21:47:43.963Z',
    updated_at: '2024-07-01T21:47:43.963Z',
    due_date: '2024-07-01T21:47:43.963Z',
  },
];
