import Dashboard from "@/components/pages/dashboard";
import UspSlider from "@/components/pages/dashboard/UspSlider";
import ProtectedLink from "@/routes/ProtectedLink";
import { getAllGames, getSubGames, getUsp } from "@/serverApi/game";
import { Tooltip } from "@mui/material";
import Image from "next/image";
import DashboardProvider from "./DashboardProvider";
import { getBanners, getSubBanners } from "@/serverApi/pages";
import Link from "next/link";

export default async function Home() {
  let games = null;
  let usps = null;
  let subGames = null;
  let banners = null;
  let subBanners = null;
  try {
    games = await getAllGames();
  } catch (err) {
    console.log("❌ Failed to fetch games:", err);
    return <p className="text-red-500">Failed to load games.</p>;
  }

  if (!games?.data?.data || !Array.isArray(games.data.data)) {
    return <p className="text-gray-500">No games found.</p>;
  }

  try {
    usps = await getUsp();
  } catch (err) {
    console.log("❌ Failed to fetch games:", err);
    return <p className="text-red-500">Failed to load games.</p>;
  }

  try {
    subGames = await getSubGames();
  } catch (err) {
    console.log("❌ Failed to fetch games:", err);
    return <p className="text-red-500">Failed to load games.</p>;
  }
  try {
    banners = await getBanners();
  } catch (err) {
    console.log("❌ Failed to fetch banner:", err);
    return <p className="text-red-500">Failed to load banner.</p>;
  }
  try {
    subBanners = await getSubBanners();
  } catch (err) {
    console.log("❌ Failed to fetch sub banner:", err);
    return <p className="text-red-500">Failed to load sub banner.</p>;
  }
  // console.log({ subGames: subGames.data, usps })

  return (
    <DashboardProvider>
      <>
        {banners?.data.length ?
          <Dashboard slides={banners.data} /> : ""}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 mb-8">
          {games?.data?.data.map((game) => (
            <ProtectedLink
              href={`exclusive-games/${game.id}`}
              key={game.id}
              className="col-span-1 ">
              <div
                className="flex items-center gap-3 py-2 px-6"
                style={{
                  borderRadius: "24px",
                  background: "rgba(255, 255, 255, 0.10)",
                }}>
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
          ))}
        </div>

        <section className="trending__games">
          <h2 className="text-[14px] mb-4">Top 10 Trending Games</h2>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 mb-8">
            {subGames?.data?.map((game: any) => (
              <ProtectedLink
                href={`exclusive-games/${game.id}`}
                key={game.name}
                className="col-span-1 relative aspect-[1/1]">
                <Image
                  src={game.image_url || "/assets/images/fallback.png"}
                  alt={game.name || ""}
                  fill
                  className=" rounded-[24px] lg:rounded-[32px]  object-cover group-hover:scale-105 transition-transform duration-300 "
                />
              </ProtectedLink>
            ))}
          </div>
        </section>


        {subBanners?.data.length ?
          <div className="dashboard-card-wrapper grid grid-cols-2  gap-5 justify-center">
            {subBanners?.data?.length > 0 &&
              subBanners.data.map((subBanner, index) => (
                <div
                  key={subBanner.name || index}
                  className="dashboard-card1 flex justify-between px-10 gap-2 rounded-[24px]"
                  style={{
                    background:
                      index % 2 === 0
                        ? "rgba(255, 255, 255, 0.10)"
                        : "rgba(255, 255, 255, 0.20)",
                  }}
                >
                  <div className="py-7 gap-6">
                    {/* ✅ Render title if available */}
                    {subBanner?.name && (
                      <h1
                        className="text-[40px] mb-[8px]"
                        style={{
                          color: "#FBD230",
                          lineHeight: "96%",
                          letterSpacing: "-0.682px",
                        }}
                      >
                        {subBanner.name}
                      </h1>
                    )}

                    {/* ✅ Render description if available */}
                    {subBanner?.description && (
                      <p
                        className="text-[13px] mb-[12px]"
                        style={{ lineHeight: "120%", color: "#FBD230" }}
                      >
                        {subBanner.description}
                      </p>
                    )}

                    {/* ✅ Render CTA button if link exists */}
                    {subBanner?.cta_link && (
                      <Link
                        href={subBanner.cta_link}
                        className="px-[18px] py-[11px] rounded-[28px] inline-block"
                        style={{
                          background:
                            index % 2 === 0
                              ? "linear-gradient(270deg, #D620D9 0.09%, #B40EF0 95.19%)"
                              : "linear-gradient(270deg, #F9B901 0.09%, #D09F12 95.19%)",
                        }}
                        target="_blank"
                      >
                        Play Now
                      </Link>
                    )}
                  </div>

                  {/* ✅ Render image only if available */}
                  {subBanner?.image_url && (
                    <div className="dashboard-card-img aspect-[245/245]">
                      <Image
                        src={subBanner.image_url}
                        alt={subBanner.name || "Sub Banner"}
                        className="h-auto max-w-full"
                        width={245}
                        height={245}
                      />
                    </div>
                  )}
                </div>
              ))}

            {/* <div
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
                  className="px-[18px] py-[11px] rounded-[28px] inline-block"
                  style={{
                    background:
                      "linear-gradient(270deg, #D620D9 0.09%, #B40EF0 95.19%)",
                  }}>
                  Play Now
                </a>
              </div>
              <div className="dashboard-card-img ">
                <img
                  src="/assets/images/card2.png"
                  alt=""
                  // className="w-[245px] h-[245px]"
                  className="h-auto max-w-full "
                  style={{ width: "245px", height: "245px" }}
                />
              </div>
            </div> */}
          </div> : null}
        <UspSlider uspData={usps.data || []} />
      </>
    </DashboardProvider>
  );
}
