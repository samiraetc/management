import { useWorkspaceByUser } from '@/hook/useWorkspace/useWorkspaces';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const { data, loading } = useWorkspaceByUser(session?.user.id ?? '');
  const dispatch = useDispatch();
  const workspaceUrl = localStorage.getItem('workspace') ?? '';

  useEffect(() => {

    if (!loading && data) {
      const defaultWorkspace = data[0];
      const foundWorkspace = data.find((item) => item.url_key === workspaceUrl);

      if (workspaceUrl && foundWorkspace) {
        dispatch({
          type: 'workspace/setWorkspace',
          payload: foundWorkspace,
        });
      } else {
        localStorage.setItem('workspace', defaultWorkspace.url_key);
        dispatch({
          type: 'workspace/setWorkspace',
          payload: defaultWorkspace,
        });
      }

      const targetUrl = workspaceUrl
        ? workspaceUrl
        : `/${defaultWorkspace.url_key}`;
      router.push(targetUrl);
    }
  }, [data, loading]);

  return (
    <div>
      <div>Olá</div>
    </div>
  );
}
