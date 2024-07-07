import Layout from '@/components/Layout/Layout';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { columns, payments } from '../my-issues/PaymentColumns';
import { DataTable } from '@/components/DataTable/DataTable';

export default function WorkspaceArea() {
  const workspace = useSelector(
    (state: RootState) => state.workspace.workspace,
  );

  return (
    <Layout>
      <DataTable columns={columns} data={payments} />
    </Layout>
  );
}
