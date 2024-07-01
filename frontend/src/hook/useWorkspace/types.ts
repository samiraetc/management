export interface IUseWorkspaceData {
  id: string;
  name: string;
  url_key: string;
  updated_at: string;
  creator_id: string;
  creator: IUseWorkspaceDataCreatorData;
}

export interface IUseWorkspaceDataCreatorData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  full_name: string;
  user_name: string;
  position: string;
  language: string | null;
}
