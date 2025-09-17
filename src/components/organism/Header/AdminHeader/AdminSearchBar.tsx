// "use client";
import { Box, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { SearchNormal } from "@wandersonalwes/iconsax-react";
import React from 'react'

export default function AdminSearchBar() {

    return (
        <Box>
            <div className="inpute__field relative">
                <OutlinedInput
                    type="search"
                    startAdornment={
                        <InputAdornment position="start">
                            <IconButton edge="start">
                                <SearchNormal size={32} />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </div>
        </Box>
    )
}
