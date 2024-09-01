'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RootState } from '@/redux/store';
import { editTeam } from '@/services/Teams/teamsService';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const TeamGeneral = () => {
  const params = useParams();
  const [name, setName] = useState<string>('');
  const [identifier, setIdentifier] = useState<string>('');
  const workspaceTeam =
    useSelector((state: RootState) => state.teams.teams) ?? [];
  const team = workspaceTeam?.find(
    (teams) => teams.identifier === params.team_identifier,
  );

  useEffect(() => {
    setName(team?.name ?? '');
    setIdentifier(team?.identifier ?? '');
  }, [team]);

  const handleEditTeam = async () => {
    await editTeam(team?.id ?? '', {
      name,
      identifier,
    });
  };

  return (
    <div className="m-4 mx-auto w-[21rem] sm:mt-12 sm:w-[35rem] lg:mt-24 lg:w-[40rem]">
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="text-3xl font-normal">{team?.name}</div>
          <div className="text-sm text-black/50 dark:text-white/70">
            Manage team settings
          </div>
          <Separator />
        </div>

        <div className="space-y-4 py-2">
          <div className="text-lg font-normal">General</div>
          <div className="flex items-center gap-4">
            <div className="w-full">
              <Label htmlFor="first_name" className="text-sm font-medium">
                Name
              </Label>
              <Input
                className="mt-1"
                value={name}
                type="text"
                id="first_name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="w-full">
              <Label htmlFor="first_name" className="text-sm font-medium">
                Identifier
                <span className="text-xs text-gray-500">
                  - Used in issues IDs
                </span>
              </Label>

              <Input
                className="mt-1"
                value={identifier}
                type="text"
                id="first_name"
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
          </div>

          {(team?.name !== name || team.identifier !== identifier) && (
            <Button
              className="h-8"
              disabled={identifier == '' || name == ''}
              onClick={() => handleEditTeam()}
            >
              Update
            </Button>
          )}
        </div>
        <Separator />

        <div className="space-y-4 pt-2">
          <div className="text-lg font-normal">Delete Team</div>
          {workspaceTeam.length === 1 ? (
            <p className="text-sm text-black/50 dark:text-white/70">
              {`This is your workspace's only team. It cannot be deleted`}
            </p>
          ) : (
            <p className="text-sm text-black/50 dark:text-white/70">
              <b>Warning:</b> Deleting the team will also permanently delete any
              issue, project and document associated with it
            </p>
          )}
          <Button
            className="h-8"
            variant="destructive"
            disabled={workspaceTeam.length === 1}
          >
            Delete {team?.name}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamGeneral;
