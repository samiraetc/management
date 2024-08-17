import { Icon } from '@/components/ui/icon';
import { icons } from 'lucide-react';
import { useMemo } from 'react';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { Toolbar } from '@/components/ui/toolbar';
import { Surface } from '@/components/ui/surface';
import {
  DropdownButton,
  DropdownCategoryTitle,
} from '@/components/ui/dropdown-button';

export type ListTypePickerOption = {
  label: string;
  id: string;
  type: 'option';
  disabled: () => boolean;
  isActive: () => boolean;
  onClick: () => void;
  icon: keyof typeof icons;
};

export type ListTypePickerCategory = {
  label: string;
  id: string;
  type: 'category';
};

export type ContentPickerOptions = Array<
  ListTypePickerOption | ListTypePickerCategory
>;

export type ListTypePickerProps = {
  options: ContentPickerOptions;
};

const isOption = (
  option: ListTypePickerOption | ListTypePickerCategory,
): option is ListTypePickerOption => option.type === 'option';
const isCategory = (
  option: ListTypePickerOption | ListTypePickerCategory,
): option is ListTypePickerCategory => option.type === 'category';

export const ListTypePicker = ({ options }: ListTypePickerProps) => {
  const activeItem = useMemo(
    () =>
      options.find((option) => option.type === 'option' && option.isActive()),
    [options],
  );

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <Toolbar.Button
          active={activeItem?.id !== 'bulletList' && !!activeItem?.type}
        >
          <Icon
            name={(activeItem?.type === 'option' && activeItem.icon) || 'List'}
          />
          <Icon name="ChevronDown" className="size-2" />
        </Toolbar.Button>
      </Dropdown.Trigger>
      <Dropdown.Content asChild>
        <Surface className="flex flex-col gap-1 px-2 py-4">
          {options.map((option) => {
            if (isOption(option)) {
              return (
                <DropdownButton
                  key={option.id}
                  onClick={option.onClick}
                  isActive={option.isActive()}
                >
                  <Icon name={option.icon} className="mr-1 size-4" />
                  {option.label}
                </DropdownButton>
              );
            } else if (isCategory(option)) {
              return (
                <div className="mt-2 first:mt-0" key={option.id}>
                  <DropdownCategoryTitle key={option.id}>
                    {option.label}
                  </DropdownCategoryTitle>
                </div>
              );
            }
          })}
        </Surface>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
