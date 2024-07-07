import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  Calendar,
  Eye,
  FileDown,
  Minus,
  Pencil,
  SignalHigh,
  SignalLow,
  SignalMedium,
  Siren,
  Trash2,
} from 'lucide-react';
import { differenceInDays } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function getPriorityProps(priority: string) {
  switch (priority) {
    case 'none':
      return <Minus width={14} />;
    case 'low':
      return <SignalLow width={20} />;
    case 'medium':
      return <SignalMedium width={20} />;
    case 'high':
      return <SignalHigh width={20} />;
    case 'urgent':
      return <Siren width={18} />;
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
      return <Eye width={18} className='text-orange-600' />;
    case 'edit':
      return <Pencil width={18} className='text-green-600' />;
    case 'delete':
      return <Trash2 width={18} className='text-red-700' />;
  }
}
