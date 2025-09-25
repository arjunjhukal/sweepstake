
import React from "react";
import { Box, Skeleton } from "@mui/material";

export default function Loading() {
    return (
        <section className="detail__banner mb-8 animate-pulse">
            <div className="grid grid-cols-12 gap-8 lg:gap-20">
                {/* Left Image Skeleton */}
                <div className="col-span-12 md:col-span-4">
                    <Box className="aspect-[420/433] relative rounded-xl overflow-hidden">
                        <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: "12px" }} />
                    </Box>
                </div>

                {/* Right Content Skeleton */}
                <div className="col-span-12 md:col-span-8 flex flex-col gap-4">
                    {/* Tags */}
                    <div className="flex gap-4">
                        <Skeleton variant="rounded" width={120} height={24} />
                        <Skeleton variant="rounded" width={80} height={24} />
                    </div>

                    {/* Title */}
                    <Skeleton variant="text" width="60%" height={40} />

                    {/* Description */}
                    <Skeleton variant="text" width="100%" height={20} />
                    <Skeleton variant="text" width="95%" height={20} />
                    <Skeleton variant="text" width="90%" height={20} />

                    {/* Action Buttons */}
                    <div className="flex gap-2 flex-wrap">
                        <Skeleton variant="rounded" width={160} height={50} />
                        <Skeleton variant="rounded" width={160} height={50} />
                        <Skeleton variant="rounded" width={160} height={50} />
                    </div>

                    {/* Play Now Button */}
                    <Skeleton variant="rounded" width={180} height={45} />

                    {/* Screenshots */}
                    <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} variant="rectangular" height={100} sx={{ borderRadius: "8px" }} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
