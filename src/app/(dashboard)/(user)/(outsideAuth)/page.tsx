import Dashboard from "@/components/pages/dashboard";
import ProtectedLink from "@/routes/ProtectedLink";
import { getAllGames } from "@/serverApi/game";
import { Tooltip } from "@mui/material";
import Image from "next/image";

export default async function Home() {
  let games = null;

  try {
    games = await getAllGames();
  } catch (err) {
    console.log("❌ Failed to fetch games:", err);
    return <p className="text-red-500">Failed to load games.</p>;
  }

  if (!games?.data?.data || !Array.isArray(games.data.data)) {
    return <p className="text-gray-500">No games found.</p>;
  }


  return (
    <>

      <Dashboard />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 mb-8">
        {
          games?.data?.data.map((game) => (
            <ProtectedLink href={`exclusive-games/${game.id}`} key={game.id} className="col-span-1 " >
              <div className="flex items-center gap-3 py-2 px-6" style={
                {
                  borderRadius: "24px",
                  background: "rgba(255, 255, 255, 0.10)",
                }
              }>
                <Image
                  src={game.thumbnail || "/assets/images/fallback.png"}
                  alt={game.name}
                  width={74}
                  height={74}
                  className="aspect-[1/1]  object-cover group-hover:scale-105 transition-transform duration-300 rounded-full"
                />
                <strong className="text-[14px]">{game?.name} </strong>
              </div>
            </ProtectedLink>
          ))
        }
      </div >

      <div className="dashboard-card-wrapper grid grid-cols-2  gap-5 justify-center">
        <div
          className="dashboard-card1 flex px-10 gap-2 rounded-[24px]"
          style={{
            background: "rgba(255, 255, 255, 0.20)",
          }}>
          <div className="py-7 gap-6">
            <h1
              className="text-[40px] mb-[8px]"
              style={{
                color: "#FBD230",
                lineHeight: "96%",
                letterSpacing: "-0.682px",
              }}>
              Welcome BONUS!!
            </h1>
            <p
              className="text-[13px] mb-[12px]"
              style={{ lineHeight: "120%", color: "#FBD230" }}>
              10$ on first play.
            </p>
            <a
              href="#"
              className="px-[18px] py-[11px] rounded-[28px]"
              style={{
                background:
                  "linear-gradient(270deg, #F9B901 0.09%, #D09F12 95.19%)",
              }}>
              Play Now
            </a>
          </div>
          <div className="dashboard-card-img aspect-[245/245]">
            <img src="/assets/images/card1.png" alt="" className="h-auto max-w-full" />
          </div>
        </div>
        <div
          className="dashboard-card2 flex px-[45px] gap-2 rounded-[24px]"
          style={{
            background: "rgba(255, 255, 255, 0.10)",
          }}>
          <div className="py-[45px] gap-6">
            <h1
              className="text-[40px] mb-[10px]"
              style={{
                color: "#1AF7FE",
                letterSpacing: "-0.682px",
                lineHeight: "96%",
              }}>
              Easy.Set.Play
            </h1>
            <p
              className="text-[13px] mb-[12px]"
              style={{ color: "#E7BCFE", lineHeight: "120%" }}>
              Join the Fun today.
            </p>
            <a
              href="#"
              className="px-[18px] py-[11px] rounded-[28px]"
              style={{
                background:
                  "linear-gradient(270deg, #D620D9 0.09%, #B40EF0 95.19%)",
              }}>
              Play Now
            </a>
          </div>
          <div className="dashboard-card-img w-[204px] h-[204px]">
            <img src="/assets/images/card2.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
