'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RootState } from '@/redux/store';
import {
  deleteWorkspaces,
  editWorkspaces,
} from '@/services/Workspace/workspace.services';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const WorkspaceGeneral = () => {
  const workspace = useSelector(
    (state: RootState) => state.workspace.workspace,
  );
  const router = useRouter();
  const [name, setName] = useState<string>(workspace?.name ?? '');
  const [urlKey, setUrlKey] = useState<string>(workspace?.url_key ?? '');
  const workspaceId = workspace?.id ?? '';

  useEffect(() => {
    setUrlKey(name.trim().toLowerCase().replace(/\s+/g, '-'));
  }, [name]);

  const handleEditWorkspace = async () => {
    await editWorkspaces(workspaceId, {
      name,
      url_key: urlKey,
    });
  };

  const handleDeleteWorkspace = async () => {
    await deleteWorkspaces(workspaceId).then(() => router.push('/'));
  };

  return (
    <div className="m-4 mx-auto w-[21rem] sm:mt-12 sm:w-[35rem] lg:mt-24 lg:w-[40rem]">
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="text-3xl font-normal">Workspace</div>
          <div className="text-sm text-black/50 dark:text-white/70">
            Manage your workspace settings
          </div>
          <Separator />
        </div>

        <div className="space-y-6 py-2">
          <div className="text-xl font-normal">General</div>
          <div className="w-full">
            <Label htmlFor="first_name" className="text-sm font-medium">
              Workspace Name
            </Label>
            <Input
              className="mt-2"
              value={name}
              type="text"
              id="first_name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Development"
            />
          </div>

          <div className="w-full">
            <Label htmlFor="first_name" className="text-sm font-medium">
              Workspace URL
            </Label>

            <div className="relative">
              <p className="absolute left-2.5 top-2 text-gray-600">web.com/</p>
              <Input
                className="mt-2 pl-[5.3rem]"
                value={urlKey}
                type="text"
                id="first_name"
                onChange={(e) => setUrlKey(e.target.value)}
                placeholder="development"
              />
            </div>
          </div>

          <Button className="h-8" onClick={() => handleEditWorkspace()}>
            Update
          </Button>
        </div>

        <Separator />

        <div className="space-y-4 pt-2">
          <div className="text-xl font-normal">Delete Workspace</div>
          <p className="text-sm text-black/50 dark:text-white/70">
            If you wish to permanently delete this account along with all its
            data, such as settings, preferences, and history, you may proceed
            below.
          </p>
          <Button
            className="h-8"
            variant="destructive"
            onClick={() => handleDeleteWorkspace()}
          >
            Delete {workspace?.name}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceGeneral;
