import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { WorkspaceServices } from '@/services/Workspace/workspace.services';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

const JoinPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [name, setName] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleClickCreateWorkspace = useCallback(() => {
    setLoading(true);

    const successCallback = () => {
      localStorage.setItem('workspace', url);
      router.push(`/${url}`);
    };

    const errorCallback = (error: { message: string }) => {
      console.log(error);
    };

    WorkspaceServices.create({ name, url_key: url }, session?.user.token ?? '')
      .then(successCallback)
      .catch(errorCallback)
      .finally(() => {
        setLoading(false);
      });
  }, [name, url]);

  useEffect(() => {
    setUrl(name.trim().toLowerCase().replace(/\s+/g, '-'));
  }, [name]);

  if (loading) <div>loading...</div>;

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1">
          <ChevronLeft width={14} height={14} />
          Back
        </Link>
        <div className="text-sm">
          <p className="text-gray-600">Logged in as:</p>
          <p className="font-semibold">{session?.user.email}</p>
        </div>
      </div>

      <div className="mt-20 flex flex-col items-center justify-center gap-8">
        <div className="text-center">
          <p className="text-3xl">Create a new workspace</p>
          <p className="mt-5 w-96 text-base text-gray-500">
            Workspace are shared environments where teams can work on projects
            and issues.
          </p>
        </div>

        <Card className="w-1/3 shadow-lg">
          <CardContent className="flex flex-col gap-8 p-6">
            <div className="flex flex-col justify-start gap-2">
              <Label htmlFor="name">Workspace Name</Label>
              <Input
                value={name}
                id="name"
                onChange={(e) => setName(e.target.value)}
                className={
                  error ? 'border-red-500 focus:border-neutral-200' : 'h-12'
                }
              />
            </div>

            <div className="flex flex-col justify-start gap-2">
              <Label htmlFor="url">Workspace URL</Label>
              <Input
                value={url}
                id="url"
                onChange={(e) => setUrl(e.target.value)}
                className={
                  error ? 'border-red-500 focus:border-neutral-200' : 'h-12'
                }
              />
            </div>
          </CardContent>
        </Card>

        <Button
          className="h-12 w-1/4 rounded-md bg-primary p-2 shadow-sm"
          onClick={handleClickCreateWorkspace}
        >
          Create Workspace
        </Button>
      </div>
    </div>
  );
};

export default JoinPage;
