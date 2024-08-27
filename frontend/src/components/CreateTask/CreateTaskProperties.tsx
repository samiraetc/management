import React, { useEffect, useState } from 'react';
import Status from '../Status/Status';
import Priority from '../Priority/Priority';
import { TaskPriority } from '@/lib/utils';
import Estimative from '../Estimative/Estimative';
import { issue } from '@/mock/issue';
import LabelDropdown from '../LabelDropdown/LabelDropdown';
import DueDate from '../DueDate/DueDate';
import { Properties } from './CreateTask';

interface ICreateTaskProperties {
  setProperties?: (value: Properties) => void;
  teamId?: string;
}

const CreateTaskProperties = ({ setProperties, teamId }: ICreateTaskProperties) => {
  const [openDueDate, setOpenDueDate] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('backlog');
  const [estimative, setEstimative] = useState<string | null>('');
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.None);
  const [labels, setLabels] = useState<Label[]>([]);

  useEffect(() => {
    return setProperties && setProperties({
      status,
      estimative,
      priority,
      labels,
    });
  }, [status, estimative, priority, labels]);
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
        estimative={null}
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

    </>
  );
};

export default CreateTaskProperties;
