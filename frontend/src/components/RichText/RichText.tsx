import React, { useRef } from 'react';
import { LinkMenu, TextMenu } from '@/components/menus';
import ColumnsMenu from '@/extensions/MultiColumn/menus/ColumnsMenu';
import TableRowMenu from '@/extensions/Table/menus/TableRow';
import TableColumnMenu from '@/extensions/Table/menus/TableColumn';
import { useEditor, EditorContent } from '@tiptap/react';
import ExtensionKit from '@/extensions/extension-kit';
import { cn } from '@/lib/utils';

interface IRichText {
  content?: string;
  onChange: (text: string) => void;
  className?: string;
}

const RichText = ({ content = '', onChange, className }: IRichText) => {
  const menuContainerRef = useRef(null);

  const editor = useEditor(
    {
      autofocus: true,
      extensions: [...ExtensionKit()],
      editorProps: {
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: 'min-h-full',
        },
      },
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

export default RichText;
