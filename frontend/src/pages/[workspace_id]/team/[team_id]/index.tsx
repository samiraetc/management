import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function TeamArea() {
  const team = useSelector(
    (state: RootState) => state.teams.teams,
  );

  return <div className="text-6xl font-bold">{team?.name}</div>;
}
