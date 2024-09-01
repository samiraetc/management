import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useWorkspaceUrl = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [workspaceUrl, setWorkspaceUrl] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWorkspaceUrl(localStorage.getItem('workspace') ?? '');
    }
  }, []);

  useEffect(() => {
    if (status === 'authenticated' && session) {
      const targetWorkspace =
        workspaceUrl ||
        (session?.user.workspaces && session?.user.workspaces[0]?.url_key);
      localStorage.setItem('workspace', targetWorkspace ? targetWorkspace : '');
      router.push(targetWorkspace ? `/${targetWorkspace}` : '/join');
    }
  }, [status, session, router, workspaceUrl]);

  if (status === 'loading' || status === 'authenticated') {
    return null;
  }
};

export default useWorkspaceUrl;
