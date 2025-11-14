import { createSlice } from "@reduxjs/toolkit";

const balanceSlice = createSlice({
    name: "userBalance",
    initialState: {
        gcBalnce: 0,
        scBalance: 0,
        providerAndBalance: [{
            flag: "",
            provider: "",
            balance: 0,
        }]
    },
    reducers: {
        setBalance: (state, action) => {
            state.gcBalnce = action.payload.find((item: { type: string }) => item.type === "gc").value;
            state.scBalance = action.payload.find((item: { type: string }) => item.type === "sc").value;
            state.providerAndBalance = action.payload
                .filter((item: any) => Array.isArray(item.providers))
                .flatMap((item: any) => (item.providers));

            return state;
        },
        updateBalancePerProvider: (state, action) => {
            const { provider, balance } = action.payload;
            const providerIndex = state.providerAndBalance.findIndex(
                (item: any) => item.provider === provider
            );

            if (providerIndex !== -1) {
                state.providerAndBalance[providerIndex].balance = balance;
            }
        }
    },
});

export const { setBalance, updateBalancePerProvider } = balanceSlice.actions;
export default balanceSlice.reducer;
