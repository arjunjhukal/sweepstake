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

export default function Dashboard() {
    const [current, setCurrent] = useState(0);

    return (
        <div className="dashboard__root relative w-full  mx-auto rounded-2xl mb-8">
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
                        className={`h-[8px] p-0  ${i === current ? "bg-white w-[24px]" : "bg-gray-400 w-[8px]"
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}
