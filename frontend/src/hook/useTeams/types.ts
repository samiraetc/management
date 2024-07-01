export interface IUseTeamsData {
  id: string;
  creator_id: string;
  estimates_type: string | null;
  identifier: string;
  name: string;
  workspace_id: string;
  creator: IUseTeamsDataCreatorData;
}

export interface IUseTeamsDataCreatorData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  full_name: string;
  user_name: string;
  position: string;
  language: string | null;
}
