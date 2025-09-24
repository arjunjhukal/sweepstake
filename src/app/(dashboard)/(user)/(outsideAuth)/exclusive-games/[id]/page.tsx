import ExclusiveGameDetail from "@/components/pages/dashboard/userDashboard/games/exclusiveGames/exclusiveGameDetail";
import { getSingleGame } from "@/serverApi/game";
import { cookies } from "next/headers";

export default async function UserGameDetail(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;

    const game = await getSingleGame(id);

    return <ExclusiveGameDetail game={game} />

}
