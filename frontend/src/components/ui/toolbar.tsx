import React, { ButtonHTMLAttributes, HTMLProps, forwardRef } from 'react';

import { cn } from '@/lib/utils';
import { Surface } from './surface';
import { Button, ButtonProps } from './button';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

const isMac =
  typeof window !== 'undefined'
    ? navigator.platform.toUpperCase().indexOf('MAC') >= 0
    : false;

const ShortcutKey = ({ children }: { children: string }): JSX.Element => {
  const className =
    'inline-flex items-center justify-center size-5 p-1 text-xs  rounded font-normal leading-none border border-neutral-200 text-neutral-500 border-b-2';

  if (children === 'Mod') {
    return <kbd className={className}>{isMac ? '⌘' : 'Ctrl'}</kbd>; // ⌃
  }

  if (children === 'Shift') {
    return <kbd className={className}>⇧</kbd>;
  }

  if (children === 'Alt') {
    return <kbd className={className}>{isMac ? '⌥' : 'Alt'}</kbd>;
  }

  return <kbd className={className}>{children}</kbd>;
};

export type ToolbarWrapperProps = {
  shouldShowContent?: boolean;
  isVertical?: boolean;
} & HTMLProps<HTMLDivElement>;

const ToolbarWrapper = forwardRef<HTMLDivElement, ToolbarWrapperProps>(
  (
    {
      shouldShowContent = true,
      children,
      isVertical = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const toolbarClassName = cn(
      'text-black inline-flex h-full leading-none gap-0.5',
      isVertical ? 'flex-col p-2' : 'flex-row p-1 items-center',
      className,
    );

    return (
      shouldShowContent && (
        <Surface className={toolbarClassName} {...rest} ref={ref}>
          {children}
        </Surface>
      )
    );
  },
);

ToolbarWrapper.displayName = 'Toolbar';

export type ToolbarDividerProps = {
  horizontal?: boolean;
} & HTMLProps<HTMLDivElement>;

const ToolbarDivider = forwardRef<HTMLDivElement, ToolbarDividerProps>(
  ({ horizontal, className, ...rest }, ref) => {
    const dividerClassName = cn(
      'bg-neutral-200 dark:bg-neutral-800',
      horizontal
        ? 'w-full min-w-[1.5rem] h-[1px] my-1 first:mt-0 last:mt-0'
        : 'h-full min-h-[1.5rem] w-[1px] mx-1 first:ml-0 last:mr-0',
      className,
    );

    return <div className={dividerClassName} ref={ref} {...rest} />;
  },
);

ToolbarDivider.displayName = 'Toolbar.Divider';

export type ToolbarButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  activeClassname?: string;
  tooltip?: string;
  tooltipShortcut?: string[];
  buttonSize?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
};

const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  (
    {
      children,
      buttonSize = 'icon',
      variant = 'ghost',
      className,
      tooltip,
      tooltipShortcut,
      activeClassname,
      ...rest
    },
    ref,
  ) => {
    const buttonClass = cn('size-6 text-gray-600', className);

    const content = (
      <Button
        className={buttonClass}
        variant={variant}
        size={buttonSize}
        ref={ref}
        {...rest}
      >
        {children}
      </Button>
    );

    if (tooltip) {
      return (
        <Tooltip>
          <TooltipTrigger className="w-8 text-xs hover:p-0">
            {content}
          </TooltipTrigger>
          <TooltipContent sideOffset={6} className="flex items-center gap-1">
            {tooltip && (
              <span className="text-xs font-medium text-neutral-500">
                {tooltip}
              </span>
            )}
            {tooltipShortcut && (
              <span className="flex items-center gap-0.5">
                {tooltipShortcut.map((shortcutKey) => (
                  <ShortcutKey key={shortcutKey}>{shortcutKey}</ShortcutKey>
                ))}
              </span>
            )}
          </TooltipContent>
        </Tooltip>
      );
    }

    return content;
  },
);

ToolbarButton.displayName = 'ToolbarButton';

export const Toolbar = {
  Wrapper: ToolbarWrapper,
  Divider: ToolbarDivider,
  Button: ToolbarButton,
};
