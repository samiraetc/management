import { Separator } from '@/components/ui/separator';
import { Surface } from '@/components/ui/surface';
import { Toolbar } from '@/components/ui/toolbar';
import { Pen, Trash } from 'lucide-react';

export type LinkPreviewPanelProps = {
  url: string;
  onEdit: () => void;
  onClear: () => void;
  openInNewTab?: boolean;
};

export const LinkPreviewPanel = ({
  onClear,
  onEdit,
  url,
  openInNewTab,
}: LinkPreviewPanelProps) => {
  return (
    <Surface className="flex w-full items-center gap-2 p-2">
      <a
        href={url}
        target={openInNewTab ? '_blank' : ''}
        rel="noopener noreferrer"
        className="w-full break-all text-xs underline"
      >
        {url}
      </a>

      <Separator orientation="vertical" className="h-6" />
      <Toolbar.Button onClick={onEdit} tooltip="Edit link">
        <Pen width={16} height={16} onClick={onEdit} />
      </Toolbar.Button>

      <Toolbar.Button onClick={onEdit} tooltip="Remove link">
        <Trash
          width={16}
          height={16}
          onClick={onClear}
          className="text-red-500"
        />
      </Toolbar.Button>
    </Surface>
  );
};
