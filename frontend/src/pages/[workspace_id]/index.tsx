import Layout from '@/components/Layout/Layout';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

export default function WorkspaceArea() {
  const workspace = useSelector(
    (state: RootState) => state.workspace.workspace,
  );

  return (
    <Layout>
      <div className="flex h-full items-center justify-center overflow-hidden">
        <div className="text-6xl font-bold">{workspace?.name}</div>
      </div>
    </Layout>
  );
}
