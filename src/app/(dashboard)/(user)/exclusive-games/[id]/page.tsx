// app/(dashboard)/exclusive-games/[id]/page.tsx
import ExlusiveGameDetail from "@/components/pages/dashboard/userDashboard/games/exclusiveGames/exclusiveGameDetail";
import { getSingleGame } from "@/serverApi/game";
// { params }: { params: { id: string } }
export default async function UserGameDetail() {
    // const game = await getSingleGame(params.id);

    // return <ExlusiveGameDetail game={game.data} />;
    return <h1>Game detail</h1>
}
