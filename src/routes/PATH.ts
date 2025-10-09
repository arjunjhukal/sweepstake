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
        TRANSACTIONS: {
            ROOT: "/transactions",
        },
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
        },
        SETTINGS: {
            ROOT: "/settings"
        },
        PAGES: {
            ROOT: "/pages",
            ADD_PAGE: {
                ROOT: "/pages/add-page"
            },
            EDIT_PAGE: {
                ROOT: "/pages/edit-page"
            }
        },
        NOTIFICATIONS: {
            ROOT: "/notifications",
            ADD_NOTIFICATIONS: {
                ROOT: "/notifications/add-notifications"
            }
        },
        MENUS: {
            ROOT: "/menus",
            // ADD_NOTIFICATIONS: {
            //     ROOT: "/notifications/add-notifications"
            // }
        },
    },
    USER: {
        GAMES: {
            ROOT: "/exclusive-games",
        },
        PROFILE: {
            root: "/profile",
            ACCOUNT: {
                ROOT: "/profile/account"
            },
            WALLET: {
                root: "/profile/wallet"
            },
            PASSWORD: {
                ROOT: "/profile/password"
            }
        },
        GENERAL_PAGES: {
            PRIVACY_POLICY: {
                ROOT: "/general/privacy-policy"
            },
            REFUND_POLICY: {
                ROOT: "/general/refund-policy"
            },
            SWEEPSTAKE_POLICY: {
                ROOT: "/general/sweepstake-policy"
            },
            ACCESSIBILITY: {
                ROOT: "/general/aml-policy"
            },
            TERMS_AND_CONDITIONS: {
                ROOT: "/general/terms-and-conditions"
            }
        }
    }
}