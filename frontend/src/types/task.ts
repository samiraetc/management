type TaskAssigned = {
  full_name: string;
  username: string;
};

type Task = {
  id: string;
  priority: string;
  identifier: string;
  status: Status;
  title: string;
  labels: Label[];
  due_date: string | null;
  estimative: number;
  created_at: string;
  updated_at: string;
  assigned_to: TaskAssigned;
};

type Tasks = Task[];
