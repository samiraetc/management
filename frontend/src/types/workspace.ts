type CreateWorkspace = {
  name: string;
  url_key: string;
};

type Workspace = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  creator_id: string;
  url_key: string;
  creator: {
    id: string;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    username: string;
  };
};
