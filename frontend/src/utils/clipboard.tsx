import { toast } from '@/components/ui/use-toast';
import { PiWarningCircleFill } from 'react-icons/pi';

export const copyUrlToClipboard = (item?: string, description?: string) => {
  navigator.clipboard
    .writeText(item ? item : window.location.href)
    .then(() => {
      toast({
        icon: <PiWarningCircleFill className="size-5" />,
        title: `"${item ? item : 'Current URL'}" copied to clipboard`,
        description: <p className='text-xs text-stone-600'>{description}</p>
      });
    })
    .catch(() => {
      toast({
        title: 'Error copying URL',
        variant: 'destructive',
      });
    });
};

export function sanitizeBranchName(text: string) {
  return text
    .replace(/\n/g, '-')
    .replace(/\s+/g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/-$/, '')
    .toLowerCase();
}
