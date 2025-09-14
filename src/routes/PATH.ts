export const PATH = {
    DASHBOARD: {
        ROOT: "/"
    },
    AUTH: {
        LOGIN: {
            ROOT: "/login"
        },
        REGISTER: {
            ROOT: "/register"
        },
        RESET_PASSWORD: {
            ROOT: "/reset-password"
        },
        VERIFY_EMAIL: {
            ROOT: "/verify-email"
        }
    },
    ADMIN: {
        GAMES: {
            ROOT: "/games",
            ADD_GAME: {
                ROOT: "/games/add-game"
            },
            EDIT_GAME: {
                ROOT: "/games/edit-game/:id"
            }
        }
    },
    USER: {
        GAMES: {
            ROOT: "/user/games",
        }
    }
}