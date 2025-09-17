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
                ROOT: "/games/edit-game"
            }
        },
        PLAYERS: {
            ROOT: "/players",
            ADD_PLAYER: {
                ROOT: "/players/add-player"
            },
            EDIT_PLAYER: {
                ROOT: "/players/edit-player"
            }
        }
    },
    USER: {
        GAMES: {
            ROOT: "/user/games",
        }
    }
}