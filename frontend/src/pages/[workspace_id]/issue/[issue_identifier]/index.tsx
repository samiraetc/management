import React, { useCallback, useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import ExtensionKit from '@/components/RichText/extensions/extension-kit';
import withLayout from '@/utils/hoc/withLayout';
import { ContentItemMenu, LinkMenu, TextMenu } from '@/components/menus';

import ColumnsMenu from '@/components/RichText/extensions/MultiColumn/menus/ColumnsMenu';
import TableRowMenu from '@/components/RichText/extensions/Table/menus/TableRow';
import TableColumnMenu from '@/components/RichText/extensions/Table/menus/TableColumn';
import { Copy, Link } from 'lucide-react';
import { copyUrlToClipboard } from '@/utils/clipboard';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/router';

const TiptapEditor = () => {
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
    },
    [],
  );

  if (!editor) {
    return null;
  }

  // const content = editor.getJSON() // ou editor.getHTML() se preferir enviar como HTML

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      <div className="relative flex h-full w-full flex-1 flex-col overflow-hidden text-base">
        <EditorContent editor={editor} className="flex-1 overflow-y-auto" />

        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
      </div>
    </div>
  );
};

const IssuePage = () => {
  const route = useRouter()
  const issueId = (route.query.issue_identifier as string) ?? ''
  return (
    <div className="flex h-full gap-1">
      <div className="w-3/4">
        <TiptapEditor />
      </div>

      <Separator orientation="vertical" />
      <div className="w-72 px-5 py-3">
        <div className="flex items-center justify-between">
          <p className="text-sm"> Properties</p>
          <div className='flex gap-4'>
          <Link
            onClick={() => copyUrlToClipboard()}
            size={16}
            className="cursor-pointer"
          />
           <Copy
            onClick={() => copyUrlToClipboard(issueId)}
            size={16}
            className="cursor-pointer"
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withLayout(IssuePage);
