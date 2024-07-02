import Layout from '@/components/Layout/Layout';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

export default function TeamArea() {
  const team = useSelector((state: RootState) => state.teams.teams);
  return (
    <Layout>
      <div className="text-6xl font-bold">{team?.name}</div>
    </Layout>
  );
}
