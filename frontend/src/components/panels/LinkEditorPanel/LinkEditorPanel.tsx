import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Surface } from '@/components/ui/surface';
import { Switch } from '@/components/ui/switch';
import { useState, useCallback, useMemo } from 'react';

export type LinkEditorPanelProps = {
  initialUrl?: string;
  initialOpenInNewTab?: boolean;
  onSetLink: (url: string, openInNewTab?: boolean) => void;
};

export const useLinkEditorState = ({
  initialUrl,
  initialOpenInNewTab,
  onSetLink,
}: LinkEditorPanelProps) => {
  const [url, setUrl] = useState(initialUrl || '');
  const [openInNewTab, setOpenInNewTab] = useState(
    initialOpenInNewTab || false,
  );

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  }, []);

  const isValidUrl = useMemo(() => /^(\S+):(\/\/)?\S+$/.test(url), [url]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isValidUrl) {
        onSetLink(url, openInNewTab);
      }
    },
    [url, isValidUrl, openInNewTab, onSetLink],
  );

  return {
    url,
    setUrl,
    openInNewTab,
    setOpenInNewTab,
    onChange,
    handleSubmit,
    isValidUrl,
  };
};

export const LinkEditorPanel = ({
  onSetLink,
  initialOpenInNewTab,
  initialUrl,
}: LinkEditorPanelProps) => {
  const state = useLinkEditorState({
    onSetLink,
    initialOpenInNewTab,
    initialUrl,
  });

  return (
    <Surface className="p-2">
      <form onSubmit={state.handleSubmit} className="flex items-center gap-2">
        <label className="flex cursor-text items-center gap-2 rounded-lg bg-neutral-100 p-2 dark:bg-neutral-900">
          <Icon name="Link" className="flex-none text-black dark:text-white" />
          <Input
            type="url"
            className="focus-visible:ring-offset-none h-4 border-none bg-neutral-100 focus:border-none focus:ring-0 focus-visible:ring-0"
            placeholder="Enter URL"
            value={state.url}
            onChange={state.onChange}
          />
        </label>
        <Button className="h-8" type="submit" disabled={!state.isValidUrl}>
          Set Link
        </Button>
      </form>
      <div className="mt-3">
        <label className="flex cursor-pointer select-none items-center justify-start gap-2 text-sm font-semibold text-neutral-500 dark:text-neutral-400">
          Open in new tab
          <Switch
            checked={state.openInNewTab}
            onCheckedChange={state.setOpenInNewTab}
          />
        </label>
      </div>
    </Surface>
  );
};
