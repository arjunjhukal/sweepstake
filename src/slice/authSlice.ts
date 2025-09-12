import { RoleProps, User } from "@/types/auth";
import { createSlice } from "@reduxjs/toolkit";

type Data = {
    access_token: string,
    user: User | null,
}

const isBrowser = typeof window !== "undefined";

const tokens = isBrowser ? localStorage.getItem("token") : null;
let localStorageAccessToken = "";
let localStorageRefreshToken = "";
let localStorageUser = null;

if (tokens) {
    try {
        const parsedTokens = JSON.parse(tokens);
        localStorageAccessToken = parsedTokens.accessToken || "";
        localStorageRefreshToken = parsedTokens.refreshToken || "";
        localStorageUser = parsedTokens.user || "";
    } catch (error) {
        console.error("Error parsing tokens from localStorage:", error);
    }
}

const initialState: Data = {
    // accessToken: localStorageAccessToken,
    // refreshToken: localStorageRefreshToken,
    access_token: localStorageAccessToken,
    user: localStorageUser,
};

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setTokens: (state, action) => {
            const { accessToken, refreshToken, user } = action.payload;
            state.access_token = accessToken;
            // state.refreshToken = refreshToken;
            state.user = user;

            localStorage.setItem(
                "token",
                JSON.stringify({ accessToken, refreshToken, user }),
            );

            if (isBrowser) {
                localStorage.setItem(
                    "token",
                    JSON.stringify({ accessToken, refreshToken, user }),
                );
            }
        },
        clearTokens: (state) => {
            state.access_token = "";
            // state.refreshToken = "";
            state.user = null;
            if (isBrowser) {
                localStorage.removeItem("token");
            }
        },
    }
})

export const { setTokens, clearTokens } = authSlice.actions;

export default authSlice.reducer;