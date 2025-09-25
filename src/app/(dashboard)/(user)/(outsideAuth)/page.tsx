"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const slides = [
	{
		id: 1,
		image: "/assets/images/slider1.png",
	},
	{
		id: 2,
		image: "/assets/images/slider2.jpg",
	},
	{
		id: 3,
		image: "/assets/images/slider1.png",
	},
];

export default function Home() {
	const [current, setCurrent] = useState(0);
	return (
		<>
			{/* <h1>Dashboard Root</h1> */}
			<div className="dashboard__root relative w-full max-w-6xl mx-auto rounded-2xl mb-32">
				<div className="relative h-[240px] w-full overflow-hidden rounded-[50px]">
					<AnimatePresence mode="wait">
						<motion.img
							key={slides[current].id}
							src={slides[current].image}
							alt={`slide-${slides[current].id}`}
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -100 }}
							transition={{ duration: 0.6 }}
							className="absolute inset-0 w-full h-full object-cover rounded-2xl"
						/>
					</AnimatePresence>
				</div>

				{/* Dots */}
				<div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 flex gap-2">
					{slides.map((_, i) => (
						<button
							key={i}
							onClick={() => setCurrent(i)}
							className={`h-[8px] p-0  ${
								i === current ? "bg-white w-[24px]" : "bg-gray-400 w-[8px]"
							}`}
						/>
					))}
				</div>
			</div>

			<div className="dashboard-card-wrapper flex flex-wrap gap-5 justify-center">
				<div
					className="dashboard-card1 flex px-10 gap-2 rounded-[24px]"
					style={{
						maxWidth: "520px",
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
					<div className="dashboard-card-img ">
						<img src="/assets/images/card1.png" alt="" />
					</div>
				</div>
				<div
					className="dashboard-card2 flex px-[45px] gap-2 rounded-[24px]"
					style={{
						maxWidth: "520px",
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
