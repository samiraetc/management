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
import { Panel } from '@/components/ui/panel';
import Image from 'next/image';

const EmojiList = forwardRef(
  (
    props: EmojiListProps,
    ref: ForwardedRef<{ onKeyDown: (evt: SuggestionKeyDownProps) => boolean }>,
  ) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

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
      <Panel className="max-h-72 max-w-72 overflow-y-auto">
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
              <Image src={item.fallbackImage} className="size-5" alt="emoji" />
            ) : (
              item.emoji
            )}{' '}
            <span className="truncate">:{item.name}:</span>
          </Button>
        ))}
      </Panel>
    );
  },
);

EmojiList.displayName = 'EmojiList';

export default EmojiList;
