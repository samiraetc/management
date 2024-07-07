import { DataTable } from '@/components/DataTable/DataTable';
import Layout from '@/components/Layout/Layout';
import { convertDataBasedOnColumns } from '@/lib/convert';
import { jsonData } from '@/pages/my-issues/teste';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { columns } from './AquaporColumns';

export default function TeamArea() {
  const team = useSelector((state: RootState) => state.teams.teams);

  return (
    <Layout>
     <DataTable columns={columns} data={convertDataBasedOnColumns(jsonData)} />
    </Layout>
  );
}
