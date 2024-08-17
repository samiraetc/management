import { RootState } from '@/redux/store';
import withLayout from '@/utils/hoc/withLayout';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const TeamArea = () => {
  const router = useRouter();
  const workspaceTeam =
    useSelector((state: RootState) => state.teams.teams) ?? [];

  const team = workspaceTeam?.find(
    (teams) => teams.identifier === router.query.team_id,
  );
  return <div className="text-6xl font-bold">{team?.name}</div>;
};

export default withLayout(TeamArea);
