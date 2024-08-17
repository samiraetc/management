import { Editor } from '@tiptap/react';
import { useMemo } from 'react';
import { ContentPickerOptions } from '../components/ListTypePicker';

export const useTextmenuListTypes = (editor: Editor) => {
  const options = useMemo<ContentPickerOptions>(() => {
    return [
      {
        icon: 'List',
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        id: 'bulletList',
        disabled: () => !editor.can().toggleBulletList(),
        isActive: () => editor.isActive('bulletList'),
        label: 'Bullet list',
        type: 'option',
      },
      {
        icon: 'ListOrdered',
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        id: 'orderedList',
        disabled: () => !editor.can().toggleOrderedList(),
        isActive: () => editor.isActive('orderedList'),
        label: 'Numbered list',
        type: 'option',
      },
      {
        icon: 'ListTodo',
        onClick: () => editor.chain().focus().toggleTaskList().run(),
        id: 'todoList',
        disabled: () => !editor.can().toggleTaskList(),
        isActive: () => editor.isActive('taskList'),
        label: 'Todo list',
        type: 'option',
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, editor.state]);

  return options;
};
