import { translation } from '@/i18n/i18n';

export default function Home() {
  return <div className="text-6xl font-bold">{translation('welcome')}</div>;
}
