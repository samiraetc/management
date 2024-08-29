type TaskAssigned = {
  id: string;
  full_name: string;
  image?: string;
  username?: string;
};

type Task = {
  id: string;
  priority: string;
  description: string;
  identifier: string;
  status: Status;
  title: string;
  labels: Label[];
  team_id: string;
  due_date: Date | string | null;
  estimative: string | null;
  created_at: string;
  updated_at: string;
  assigned_to: string;
  assigned: User;
  team: Team
};

type EditTask = {
  id?: string;
  priority?: string;
  description?: string;
  status?: Status;
  title?: string;
  labels?: Label[];
  due_date?: Date | string | null;
  estimative?: string | null;
  assigned?: string | null
};

type Tasks = Task[];
