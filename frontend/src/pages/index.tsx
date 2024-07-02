import Layout from '@/components/Layout/Layout';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

export default function Home() {
  const workspace = useSelector((state: RootState) => state.workspace);

  console.log(workspace);
  return (
    <Layout>
      <div>oi</div>
    </Layout>
  );
}
