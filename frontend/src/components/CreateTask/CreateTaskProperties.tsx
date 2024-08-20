import React, { useState } from 'react';
import Status from '../Status/Status';
import Priority from '../Priority/Priority';
import { TaskPriority } from '@/lib/utils';
import Estimative from '../Estimative/Estimative';
import { issue } from '@/mock/issue';
import LabelDropdown from '../LabelDropdown/LabelDropdown';
import DueDate from '../DueDate/DueDate';

const CreateTaskProperties = () => {
  const [openDueDate, setOpenDueDate] = useState<boolean>(false)
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
      <LabelDropdown
        labels={[]}
        showList={false}
        task={issue}
        position={{
          align: 'center',
          side: 'bottom',
        }}
        className="flex h-7 w-full items-center rounded-md border px-3 font-normal"
      />
      <DueDate
        dialog
        task={issue}
        dueDate={issue.due_date}
        className="flex h-7 w-full items-center rounded-md border px-3 font-normal"
        open={openDueDate}
        setOpen={setOpenDueDate}
      />
    </>
  );
};

export default CreateTaskProperties;
