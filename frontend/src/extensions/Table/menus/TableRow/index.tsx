import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react';
import React, { useCallback } from 'react';
import { Toolbar } from '@/components/ui/toolbar';
import { isRowGripSelected } from './utils';
import { MenuProps, ShouldShowProps } from '@/components/menus/types';
import { ArrowDownToLine, ArrowUpToLine, Trash } from 'lucide-react';

export const TableRowMenu = React.memo(
  ({ editor, appendTo }: MenuProps): JSX.Element => {
    const shouldShow = useCallback(
      ({ view, state, from }: ShouldShowProps) => {
        if (!state || !from) {
          return false;
        }

        return isRowGripSelected({ editor, view, state, from });
      },
      [editor],
    );

    const onAddRowBefore = useCallback(() => {
      editor.chain().focus().addRowBefore().run();
    }, [editor]);

    const onAddRowAfter = useCallback(() => {
      editor.chain().focus().addRowAfter().run();
    }, [editor]);

    const onDeleteRow = useCallback(() => {
      editor.chain().focus().deleteRow().run();
    }, [editor]);

    return (
      <BaseBubbleMenu
        editor={editor}
        pluginKey="tableRowMenu"
        updateDelay={0}
        tippyOptions={{
          appendTo: () => {
            return appendTo?.current;
          },
          placement: 'left',
          offset: [0, 20],
          popperOptions: {
            modifiers: [{ name: 'flip', enabled: false }],
          },
        }}
        shouldShow={shouldShow}
        className="z-50"
      >
        <Toolbar.Wrapper isVertical className="flex">
          <Toolbar.Button onClick={onAddRowBefore} tooltip="Add row before">
            <ArrowUpToLine width={12} height={12} />
          </Toolbar.Button>
          <Toolbar.Button onClick={onAddRowAfter} tooltip="Add row before">
            <ArrowDownToLine width={12} height={12} />
          </Toolbar.Button>
          <Toolbar.Button onClick={onDeleteRow} tooltip="Delete">
            <Trash width={12} height={12} className="text-red-500" />
          </Toolbar.Button>
        </Toolbar.Wrapper>
      </BaseBubbleMenu>
    );
  },
);

TableRowMenu.displayName = 'TableRowMenu';

export default TableRowMenu;
