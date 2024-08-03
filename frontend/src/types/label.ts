type Label = {
  id: string;
  name: string;
  color: string;
  can_edit: boolean;
  created_at: Date | string;
};

type CreateLabel = {
  name: string;
  color: string;
};

type EditLabel = {
  name?: string;
  color?: string;
};
