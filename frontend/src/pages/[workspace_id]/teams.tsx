import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/DataTable/DataTable';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import withLayout from '@/utils/hoc/withLayout';
import { teamColumns } from '@/utils/columns/teamColumns';
import { getTeamMembers } from '@/services/Teams/teamsService';
import { useSession } from 'next-auth/react';

const TeamsIndex = () => {
  const teams = useSelector((state: RootState) => state.teams.teams) ?? [];
  const { data: session } = useSession();
  const [teamMembers, setTeamMembers] = useState<any>([]);

  const handleGetMembers = async (teamId: string) => {
    return await getTeamMembers(teamId);
  };

  const fetchTeamMembers = async () => {
    const members = await Promise.all(
      teams.map(async (team) => {
        const teamMembers = await handleGetMembers(team.id);
        return {
          ...team,
          members: teamMembers,
          joined_team: teamMembers.some((item) => item.id === session?.user.id),
        };
      }),
    );

    setTeamMembers(members);
  };

  useEffect(() => {
    fetchTeamMembers();
  }, [teams]);

  return (
    <>
      <>
        <div className="sticky -top-0.5 z-50 w-full border-b bg-background">
          <div className="flex items-center justify-between border-b py-2 pl-6 font-medium sm:pl-6 sm:pr-4">
            <div className="flex items-center gap-2">
              <span>Teams</span>
              <span className="text-gray-500">{teams.length}</span>
            </div>
          </div>
        </div>

        <div className="mb-24">
          <div className="sm:p-0">
            <DataTable
              data={teamMembers}
              columns={teamColumns}
              hasHeader={true}
            />
          </div>
        </div>
      </>
    </>
  );
};

export default withLayout(TeamsIndex);
