import { toast } from '@/components/ui/use-toast';
import { PiWarningCircleFill } from 'react-icons/pi';

export const copyUrlToClipboard = () => {
  navigator.clipboard
    .writeText(window.location.href)
    .then(() => {
      toast({
        icon: <PiWarningCircleFill className="size-5" />,
        title: 'Current URL copied to clipboard',
      });
    })
    .catch(() => {
      toast({
        title: 'Error copying URL',
        variant: 'destructive',
      });
    });
};
