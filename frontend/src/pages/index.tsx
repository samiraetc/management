import Layout from '@/components/Layout/Layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const workspace = localStorage.getItem('workspace') ?? '';
      router.push(`/${workspace}`);
    }
  }, []);

  return (
    <Layout>
      <div>oi</div>
    </Layout>
  );
}
