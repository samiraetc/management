import { toast } from '@/components/ui/use-toast';
import { PiWarningCircleFill } from 'react-icons/pi';

export const copyUrlToClipboard = (item?: string) => {
  navigator.clipboard
    .writeText(item ? item : window.location.href)
    .then(() => {
      toast({
        icon: <PiWarningCircleFill className="size-5" />,
        title: `${item ? item : 'Current URL'} copied to clipboard`,
      });
    })
    .catch(() => {
      toast({
        title: 'Error copying URL',
        variant: 'destructive',
      });
    });
};
