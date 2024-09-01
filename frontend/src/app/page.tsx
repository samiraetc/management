'use client';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  return <div onClick={() => router.push('/development')}>clique</div>;
};

export default Home;
