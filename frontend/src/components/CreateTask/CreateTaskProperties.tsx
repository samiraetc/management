import React, { useEffect, useState } from 'react';
import Status from '../Status/Status';
import Priority from '../Priority/Priority';
import { TaskPriority } from '@/lib/utils';
import Estimative from '../Estimative/Estimative';
import LabelDropdown from '../LabelDropdown/LabelDropdown';
import DueDate from '../DueDate/DueDate';
import { Properties } from './CreateTask';
import Assigned from '../Assigned/Assigned';

interface ICreateTaskProperties {
  setProperties?: (value: Properties) => void;
  teamId?: string;
  task?: Task;
}

const CreateTaskProperties = ({
  setProperties,
  teamId,
  task,
}: ICreateTaskProperties) => {
  const [openDueDate, setOpenDueDate] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('backlog');
  const [estimative, setEstimative] = useState<string | null>(
    task?.estimative ?? null,
  );
  const [priority, setPriority] = useState<TaskPriority>(
    (task?.priority as TaskPriority) ?? TaskPriority.None,
  );
  const [labels, setLabels] = useState<Label[]>(task?.labels ?? []);
  const [assigned, setAssigned] = useState<User | null>(task?.assigned ?? null);
  const [dueDate, setDueDate] = useState<Date | string | null>(
    task?.due_date ?? null,
  );

  useEffect(() => {
    return (
      setProperties &&
      setProperties({
        status,
        estimative,
        priority,
        labels,
        assigned,
      })
    );
  }, [status, estimative, priority, labels, assigned]);
  return (
    <>
      <Status
        status={status}
        label
        className="h-7 w-full rounded-md border px-3 font-normal"
        setProperties={setStatus}
      />

      <Priority
        priority={priority}
        className="h-7 w-full rounded-md border px-3 font-normal"
        label
        setProperties={setPriority}
      />
      <Estimative
        estimative={estimative}
        className="flex h-7 w-full items-center rounded-md border px-3 font-normal"
        setProperties={setEstimative}
      />
      <LabelDropdown
        labels={labels}
        showList={false}
        position={{
          align: 'center',
          side: 'bottom',
        }}
        className="flex h-7 w-full items-center rounded-md border px-3 font-normal"
        setProperties={setLabels}
        teamId={teamId}
      />
      <DueDate
        dialog
        dueDate={dueDate}
        className="flex h-7 w-full items-center rounded-md border px-3 font-normal"
        open={openDueDate}
        setOpen={setOpenDueDate}
        // setProperties={setDueDate}
      />

      <Assigned
        assigned={assigned}
        teamId={teamId}
        className="flex h-7 w-full items-center rounded-md border px-3 font-normal"
        setProperties={setAssigned}
      />
    </>
  );
};

export default CreateTaskProperties;
