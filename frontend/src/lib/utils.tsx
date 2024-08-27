import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  Circle,
  CircleAlert,
  CircleCheck,
  CircleDashed,
  CircleX,
  Contrast,
  Minus,
} from 'lucide-react';
import { differenceInDays } from 'date-fns';
import LowPriority from '@/assets/icon/Low';
import HighPriority from '@/assets/icon/High';
import { HiCalendar } from 'react-icons/hi2';
import MediumPriority from '@/assets/icon/Medium';
import { format, startOfDay, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum TaskPriority {
  None = 'no_priority',
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
  [TaskPriority.None]: 'No Priority',
};

export function getPriorityProps(priority: TaskPriority | string | null) {
  const label = priorityOptions[priority as TaskPriority];
  switch (priority) {
    case TaskPriority.None:
      return {
        label,
        value: TaskPriority.None,
        icon: <Minus width={16} height={16} className="text-gray-500" />,
      };
    case TaskPriority.Low:
      return {
        label,
        value: TaskPriority.Low,
        icon: <LowPriority className="mb-1" />,
      };
    case TaskPriority.Medium:
      return {
        label,
        value: TaskPriority.Medium,
        icon: <MediumPriority className="mb-1" />,
      };
    case TaskPriority.High:
      return {
        label,
        value: TaskPriority.High,
        icon: <HighPriority className="mb-1" />,
      };

    case TaskPriority.Urgent:
      return {
        label,
        value: TaskPriority.Urgent,
        icon: <CircleAlert width={16} height={16} className="text-gray-500" />,
      };
    default:
      return {
        label: '',
        value: '',
        icon: <></>,
      };
  }
}

export function getDueDateIcon(date: Date | null | undefined | string) {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;

  if (!(parsedDate instanceof Date) || isNaN(parsedDate.getTime())) {
    return {
      icon: <></>,
      title: '',
      label: '',
    };
  }

  const today = startOfDay(new Date());
  const dueDate = startOfDay(parsedDate);

  const difference = differenceInDays(dueDate, today);

  if (difference === 0) {
    return {
      icon: <HiCalendar size={18} className="text-red-500" />,
      title: 'Today',
      label: 'Today',
    };
  } else if (difference === 1) {
    return {
      icon: <HiCalendar size={18} className="text-orange-500" />,
      title: 'Tomorrow',
      label: 'Tomorrow',
    };
  } else if (difference >= 3 && difference <= 7) {
    return {
      icon: <HiCalendar size={18} className="text-orange-500" />,
      title: `${difference} days remaining`,
      label: `${difference} days`,
    };
  } else if (difference >= 8) {
    return {
      icon: <HiCalendar size={18} className="text-gray-500" />,
      title: `${difference} days remaining`,
      label: format(date ?? '', 'EEE dd'),
    };
  } else if (difference < 0) {
    return {
      icon: <HiCalendar size={18} className="text-red-500" />,
      title: `${Math.abs(difference)} days overdue`,
      label: 'Overdue',
    };
  } else {
    return {
      icon: <></>,
      title: '',
      label: '',
    };
  }
}

export const getStatusesProps = (status: string) => {
  switch (status) {
    case 'backlog':
      return {
        icon: <CircleDashed width={16} height={16} className="text-gray-400" />,
        label: 'Backlog',
      };
    case 'to_do':
      return {
        icon: <Circle width={16} height={16} className="text-gray-400" />,
        label: 'To Do',
      };
    case 'doing':
      return {
        icon: <Contrast width={16} height={16} className="text-orange-500" />,
        label: 'Doing',
      };

    case 'done':
      return {
        icon: (
          <CircleCheck
            width={16}
            height={16}
            className="text-fruit-salad-600"
          />
        ),
        label: 'Done',
      };
    case 'canceled':
      return {
        icon: <CircleX width={16} height={16} className="text-red-500" />,
        label: 'Canceled',
      };
    default:
      return {
        icon: <></>,
        label: '',
      };
  }
};

export const getEstimativeProps = (estimative: string | null) => {
  if (estimative === null) {
    return `No estimative`;
  } else if (parseInt(estimative) === 1) {
    return `1 Point`;
  } else if (parseInt(estimative) >= 2) {
    return `${estimative} Points`;
  }
};
