// "use client";
import { Box } from "@mui/material";
import { SearchNormal } from "@wandersonalwes/iconsax-react";
import React from 'react'

export default function AdminSearchBar() {

    return (
        <Box>
            <div className="inpute__field relative">
                <input type="search" placeholder="Ctrl + K" name="search" id="search" className="rounded-[4px] border-solid border-[1px] border-gray pl-5 outline-none focus:outline-primary-light" />
                <SearchNormal color="#71717A" size={18} className="absolute left-2 top-1/2 transform -translate-y-1/2" />
            </div>
        </Box>
    )
}
