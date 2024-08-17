import React from 'react';
import Status from '../Status/Status';
import Priority from '../Priority/Priority';
import { TaskPriority } from '@/lib/utils';
import Estimative from '../Estimative/Estimative';
import { issue } from '@/mock/issue';

const CreateTaskProperties = () => {
  return (
    <>
      <Status
        status={'backlog'}
        task={issue}
        label
        className="h-7 w-full rounded-md border px-3 font-normal"
      />

      <Priority
        priority={'no_priority' as TaskPriority}
        task={issue}
        className="h-7 w-full rounded-md border px-3 font-normal"
        label
      />
      <Estimative
        estimative={null}
        task={issue}
        className="flex h-7 w-full items-center rounded-md border px-3 font-normal"
      />
    </>
  );
};

export default CreateTaskProperties;
