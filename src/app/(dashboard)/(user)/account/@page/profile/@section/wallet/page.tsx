import { Button, InputLabel, OutlinedInput } from '@mui/material'
import { InfoCircle, WalletCheck } from '@wandersonalwes/iconsax-react'
import React from 'react'

export default function UserWallet() {
    return (
        <form action="#" className="wallet-form">
            <InputLabel htmlFor="wallet_address">Wallet Address</InputLabel>
            <OutlinedInput
                name="wallet_address"
                id="wallet_address"
                value="17HzyHWNrdS7GpMArshSBLpJpcvrre93P6"
            />
            <div className="info my-4">
                <p className='flex items-center bg-[#EEFEC4] text-[#547D16] p-2 rounded-lg text-[10px] lg:text-[12px] gap-1 '><InfoCircle size={12} />You can only connect one wallet at a time. To update the wallet address,
                    change the wallet address and click update</p>
            </div>
            <Button variant='contained' color='secondary' sx={{
                color: "#1E3634",
                fontSize: "12px"
            }} startIcon={<WalletCheck />}>Update</Button>
        </form>
    )
}
