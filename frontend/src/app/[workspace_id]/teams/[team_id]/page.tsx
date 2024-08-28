'use client';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const TeamArea = () => {
  const workspaceTeam =
    useSelector((state: RootState) => state.teams.teams) ?? [];

  const team = workspaceTeam?.find((teams) => teams.identifier === 'FND');
  return <div className="text-6xl font-bold">{team?.name}</div>;
};

export default TeamArea;
