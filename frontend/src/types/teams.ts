type Team = {
  id: string;
  name: string;
  created_at: string;
  creator_id: string;
  identifier: string;
  estimates_type: null | string;
  workspace_id: string;
  creator: {
    id: string;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    created_at: string;
    username: string;
    position: string;
    language: string | null;
  };
};

type TeamWithMembers = Team & {
  members: User[];
  joined_team: boolean
};
