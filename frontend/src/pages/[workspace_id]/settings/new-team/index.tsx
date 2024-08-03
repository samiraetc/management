import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RootState } from '@/redux/store';
import { createTeam } from '@/services/Teams/teamsService';
import withSettings from '@/utils/hoc/withSettings';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const NewTeamPage = () => {
  const router = useRouter();
  const [teamName, setTeamName] = useState<string>('');
  const [identifier, setIdentifier] = useState<string>('');
  const workspace = useSelector(
    (state: RootState) => state.workspace.workspace,
  );

  useEffect(() => {
    setIdentifier(teamName.substring(0, 3).toUpperCase());
  }, [teamName]);

  const handleCreateNewTeam = async () => {
    await createTeam(workspace?.id ?? '', {
      name: teamName,
      identifier,
    }).then(() => router.push(`/${workspace?.url_key}/team/${identifier}`));
  };

  return (
    <div className="m-4 mx-auto w-[21rem] sm:mt-12 sm:w-[35rem] lg:mt-24 lg:w-[40rem]">
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="text-3xl font-normal">Create a new team</div>
          <div className="text-sm text-black/50">
            This is used as the identifier (DEV-123) for all issues of the team.
            Keep it short and simple.
          </div>
          <Separator />
        </div>

        <div className="space-y-6">
          <div className="w-full">
            <Label htmlFor="first_name" className="text-sm font-medium">
              Team name
            </Label>
            <Input
              className="mt-2"
              value={teamName}
              type="text"
              id="first_name"
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Development"
            />
          </div>

          <div className="flex items-end text-sm">
            <div className="w-48 sm:w-36">
              <Label htmlFor="first_name" className="text-sm font-medium">
                Team identifier
              </Label>
              <Input
                className="mt-2 h-9 w-20"
                value={identifier}
                type="text"
                id="first_name"
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="DEV"
              />
            </div>
            <div className="w-full text-black/50">
              This is used as the identifier (DEV-123) for all issues of the
              team. Keep it short and simple.
            </div>
          </div>

          <Button className="h-9" onClick={() => handleCreateNewTeam()}>
            Create Team
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withSettings(NewTeamPage);
