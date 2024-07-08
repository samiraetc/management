import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  Calendar,
  Circle,
  CircleAlert,
  CircleCheck,
  CircleDashed,
  CircleX,
  Eye,
  LoaderCircle,
  Minus,
  Pencil,
  SignalHigh,
  SignalLow,
  SignalMedium,
  Siren,
  Trash2,
} from 'lucide-react';
import { differenceInDays } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum TaskPriority {
  None = 'none',
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  Urgent = 'urgent',
}

const priorityOptions: Record<TaskPriority, string> = {
  [TaskPriority.Urgent]: 'Urgent',
  [TaskPriority.High]: 'High',
  [TaskPriority.Medium]: 'Medium',
  [TaskPriority.Low]: 'Low',
  [TaskPriority.None]: 'None',
};

export function getPriorityProps(priority: TaskPriority) {
  const label = priorityOptions[priority];
  switch (priority) {
    case TaskPriority.None:
      return {
        label,
        value: TaskPriority.None,
        icon: <Minus width={18} className="text-gray-500" />,
      };
    case TaskPriority.Low:
      return {
        label,
        value: TaskPriority.Low,
        icon: <SignalLow width={18} className="text-gray-500" />,
      };
    case TaskPriority.Medium:
      return {
        label,
        value: TaskPriority.Medium,
        icon: <SignalMedium width={18} className="text-gray-500" />,
      };
    case TaskPriority.High:
      return {
        label,
        value: TaskPriority.High,
        icon: <SignalHigh width={18} className="text-gray-500" />,
      };

    case TaskPriority.Urgent:
      return {
        label,
        value: TaskPriority.Urgent,
        icon: <CircleAlert width={18} className="text-gray-500" />,
      };
  }
}

export function getDueDateIcon(date: Date) {
  const difference = differenceInDays(new Date(), date);
  if (difference >= 1 && difference <= 7) {
    return <Calendar width={14} strokeWidth={3} className="text-orange-500" />;
  } else if (difference >= 8) {
    return <Calendar width={14} className="text-gray-500" />;
  } else if (difference < 0) {
    return <Calendar width={14} className="text-red-500" />;
  }
}

export function getActionIcon(priority: string) {
  switch (priority) {
    case 'show':
      return <Eye width={18} className="text-orange-600" />;
    case 'edit':
      return <Pencil width={18} className="text-green-600" />;
    case 'delete':
      return <Trash2 width={18} className="text-red-700" />;
  }
}

export function getDeaphColor(deaph: number) {
  switch (deaph) {
    case 0:
      return 'bg-background';
    case 1:
      return 'bg-gray-100 dark:bg-secondary';
    case 2:
      return 'bg-gray-200 dark:bg-stone-600 ';
    case 3:
      return 'bg-gray-300';
    default:
      return 'bg-background';
  }
}

export const getStatusesProps = (status: string) => {
  switch (status) {
    case 'backlog':
      return {
        icon: <CircleDashed width={18} className="text-gray-400" />,
        label: 'Backlog',
      };
    case 'to_do':
      return {
        icon: <Circle width={18} className="text-gray-400" />,
        label: 'To Do',
      };
    case 'doing':
      return {
        icon: (
          <LoaderCircle width={18} className="animate-spin text-orange-500" />
        ),
        label: 'Doing',
      };

    case 'done':
      return {
        icon: <CircleCheck width={18} className="text-fruit-salad-600" />,
        label: 'Done',
      };
    case 'canceled':
      return {
        icon: <CircleX width={18} className="text-red-500" />,
        label: 'Canceled',
      };
  }
};

// funcao que vai percorrer as opcoes existentes e mostrar o filtro
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
