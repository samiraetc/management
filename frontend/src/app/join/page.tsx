'use client';

import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createWorkspaces } from '@/services/Workspace/workspace.services';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const JoinPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [name, setName] = useState<string>('');
  const [url, setUrl] = useState<string>('');

  const hasWorkspaces = session?.user.workspaces?.length === 0;

  const handleClickCreateWorkspace = useCallback(async () => {
    await createWorkspaces({ name, url_key: url }).then(() => {
      localStorage.setItem('workspace', url);
      router.push(`/${url}`);
    });
  }, [name, url]);

  useEffect(() => {
    setUrl(name.trim().toLowerCase().replace(/\s+/g, '-'));
  }, [name]);

  return (
    <div className="flex min-h-screen flex-col gap-1">
      <div className="flex justify-between px-7 pt-5 sm:px-10">
        {!hasWorkspaces ? (
          <Link href="/" className="flex items-center gap-1">
            <ChevronLeft width={14} height={14} />
            Back
          </Link>
        ) : (
          <div />
        )}
        <div className="text-sm">
          <p className="text-gray-600">Logged in as:</p>
          <p className="font-semibold">{session?.user.email}</p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="md:1/3 flex w-80 flex-col justify-between gap-4 sm:w-1/2 lg:w-1/3 xl:w-1/4">
          <div className="flex flex-col justify-center text-center">
            <p className="text-2xl font-semibold">Create a new workspace</p>
            <p className="w-88 mt-5 text-center text-sm text-gray-500 sm:text-base">
              Workspaces are shared environments where teams can work on
              projects and issues.
            </p>
          </div>

          <Card className="flex flex-col gap-2">
            <CardContent className="flex flex-col gap-8 p-6">
              <div className="flex flex-col justify-start gap-2">
                <Label htmlFor="name">Workspace Name</Label>
                <Input
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col justify-start gap-2">
                <Label htmlFor="url">Workspace URL</Label>
                <Input
                  value={url}
                  id="url"
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Button
            className="flex flex-col gap-2"
            onClick={handleClickCreateWorkspace}
          >
            Create Workspace
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
