import { EmojiItem } from '@tiptap-pro/extension-emoji';
import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

import { EmojiListProps } from '../types';
import { SuggestionKeyDownProps } from '@tiptap/suggestion';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const EmojiList = forwardRef(
  (
    props: EmojiListProps,
    ref: ForwardedRef<{ onKeyDown: (evt: SuggestionKeyDownProps) => boolean }>,
  ) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [open, setOpen] = useState<boolean>(props.open);

    useEffect(() => setSelectedIndex(0), [props.items]);

    const selectItem = useCallback(
      (index: number) => {
        const item = props.items[index];

        if (item) {
          props.command({ name: item.name });
        }
      },
      [props],
    );

    useImperativeHandle(ref, () => {
      const scrollIntoView = (index: number) => {
        const item = props.items[index];

        if (item) {
          const node = document.querySelector(
            `[data-emoji-name="${item.name}"]`,
          );

          if (node) {
            node.scrollIntoView({ block: 'nearest' });
          }
        }
      };

      const upHandler = () => {
        const newIndex =
          (selectedIndex + props.items.length - 1) % props.items.length;
        setSelectedIndex(newIndex);
        scrollIntoView(newIndex);
      };

      const downHandler = () => {
        const newIndex = (selectedIndex + 1) % props.items.length;
        setSelectedIndex(newIndex);
        scrollIntoView(newIndex);
      };

      const enterHandler = () => {
        selectItem(selectedIndex);
      };

      return {
        onKeyDown: ({ event }) => {
          if (event.key === 'ArrowUp') {
            upHandler();
            return true;
          }

          if (event.key === 'ArrowDown') {
            downHandler();
            return true;
          }

          if (event.key === 'Enter') {
            enterHandler();
            return true;
          }

          return false;
        },
      };
    }, [props, selectedIndex, selectItem]);

    const createClickHandler = useCallback(
      (index: number) => () => selectItem(index),
      [selectItem],
    );

    if (!props.items || !props.items.length) {
      return null;
    }

    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger>
          <div />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-50 -mt-5 ml-60 max-h-[min(80vh,24rem)] w-60 flex-wrap overflow-scroll rounded border border-gray-300 bg-white p-2 text-black shadow-lg">
          {props.items.map((item: EmojiItem, index: number) => (
            <Button
              variant="ghost"
              className="w-full justify-start"
              size="sm"
              key={item.name}
              onClick={createClickHandler(index)}
              data-emoji-name={item.name}
            >
              {item.fallbackImage ? (
                <img src={item.fallbackImage} className="size-5" alt="emoji" />
              ) : (
                item.emoji
              )}{' '}
              <span className="truncate">:{item.name}:</span>
            </Button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
);

EmojiList.displayName = 'EmojiList';

export default EmojiList;
