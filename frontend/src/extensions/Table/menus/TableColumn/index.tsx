import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react';
import React, { useCallback } from 'react';
import { Toolbar } from '@/components/ui/toolbar';
import { isColumnGripSelected } from './utils';
import { MenuProps, ShouldShowProps } from '@/components/menus/types';
import { ArrowLeftToLine, ArrowRightToLine, Trash } from 'lucide-react';

export const TableColumnMenu = React.memo(
  ({ editor, appendTo }: MenuProps): JSX.Element => {
    const shouldShow = useCallback(
      ({ view, state, from }: ShouldShowProps) => {
        if (!state) {
          return false;
        }

        return isColumnGripSelected({ editor, view, state, from: from || 0 });
      },
      [editor],
    );

    const onAddColumnBefore = useCallback(() => {
      editor.chain().focus().addColumnBefore().run();
    }, [editor]);

    const onAddColumnAfter = useCallback(() => {
      editor.chain().focus().addColumnAfter().run();
    }, [editor]);

    const onDeleteColumn = useCallback(() => {
      editor.chain().focus().deleteColumn().run();
    }, [editor]);

    return (
      <BaseBubbleMenu
        editor={editor}
        pluginKey="tableColumnMenu"
        updateDelay={0}
        tippyOptions={{
          appendTo: () => {
            return appendTo?.current;
          },
          offset: [0, 15],
          popperOptions: {
            modifiers: [{ name: 'flip', enabled: false }],
          },
        }}
        shouldShow={shouldShow}
      >
        <Toolbar.Wrapper className="flex">
          <Toolbar.Button
            onClick={onAddColumnBefore}
            tooltip="Add column before"
          >
            <ArrowLeftToLine width={12} height={12} />
          </Toolbar.Button>
          <Toolbar.Button onClick={onAddColumnAfter} tooltip="Add column after">
            <ArrowRightToLine width={12} height={12} />
          </Toolbar.Button>
          <Toolbar.Button onClick={onDeleteColumn} tooltip="Delete">
            <Trash width={12} height={12} className="text-red-500" />
          </Toolbar.Button>
        </Toolbar.Wrapper>
      </BaseBubbleMenu>
    );
  },
);

TableColumnMenu.displayName = 'TableColumnMenu';

export default TableColumnMenu;
