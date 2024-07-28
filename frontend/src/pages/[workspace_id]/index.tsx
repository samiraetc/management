import { RootState } from '@/redux/store';
import withLayout from '@/utils/hoc/withLayout';
import { useSelector } from 'react-redux';

const WorkspaceArea = () => {
  const workspace = useSelector(
    (state: RootState) => state.workspace.workspace,
  );

  return (
    <div className="flex h-full items-center justify-center overflow-hidden">
      <div className="text-6xl font-bold">{workspace?.name}</div>
    </div>
  );
};

export default withLayout(WorkspaceArea);
