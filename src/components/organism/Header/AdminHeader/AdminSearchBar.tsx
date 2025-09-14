// "use client";
import { Box } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";

import React from 'react'

export default function AdminSearchBar() {
    return (
        <Box>
            <OutlinedInput
                name='search'
                id='search'
                placeholder='Ctrl + K'

            />
        </Box>
    )
}
