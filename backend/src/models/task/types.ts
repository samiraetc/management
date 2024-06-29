export interface CreateTask extends Task {
  task_number: number;
  team_id: string;
  creator: string;
}

export interface EditTask extends Task {
  id: string;
}

export interface Task {
  title: string;
  description: string | null;
  priority: number | null;
  estimative: number | null;
  url_key: string;
  status_id: string | null;
}
