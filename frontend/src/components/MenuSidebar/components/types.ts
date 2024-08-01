export interface IMenuSidebarButton {
  url?: string;
  icon?: React.ReactElement;
  name: string;
  onClick?: () => void;
  className?: string
}
