'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { ColumnsMenu } from '@/extensions/MultiColumn/menus';
import { TableColumnMenu, TableRowMenu } from '@/extensions/Table/menus';
import ExtensionKit from '@/extensions/extension-kit';
import { LinkMenu, TextMenu } from '../menus';

interface ITiptap {
  content?: string;
  onChange: (text: string) => void;
  className?: string;
  autoFocus?: boolean;
}

const Tiptap = ({
  content = '',
  onChange,
  className,
  autoFocus = false,
}: ITiptap) => {
  const menuContainerRef = useRef(null);
  const editor = useEditor(
    {
      autofocus: autoFocus,
      extensions: [...ExtensionKit()],
      content,
      onBlur: ({ editor }) => onChange(editor.getHTML()),
    },
    [],
  );

  if (!editor) {
    return null;
  }

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      <div
        className={cn('flex size-full flex-1 flex-col text-base', className)}
      >
        <EditorContent editor={editor} />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
      </div>
    </div>
  );
};

export default Tiptap;
