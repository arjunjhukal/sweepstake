import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/hook";
import { clearTokens } from "@/slice/authSlice";
import { ArrowDown2, ArrowUp2, Coin, Logout, MoneySend, Profile, Wallet2 } from "@wandersonalwes/iconsax-react";


const UserProfileMenu = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const menuItems = [
        {
            label: "Profile",
            href: "/account/profile/account",
            icon: <Profile size="20" />,
        },
        {
            label: "Game Credentials",
            href: "/credentials",
            icon: <Wallet2 size="20" />,
        },
        {
            label: "Deposit History",
            href: "/account/deposit-history",
            icon: <Coin size="20" />,
        },
        {
            label: "Withdraw History",
            href: "/account/withdraw-history",
            icon: <MoneySend size="20" />,
        },
        {
            label: "Logout",
            href: "#",
            icon: <Logout size="20" />,
            onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                dispatch(clearTokens());
                router.replace("/login");
            },
        },
    ];

    return (
        <List>
            {menuItems.map((item, idx) => (
                <ListItem key={idx} disablePadding>
                    <ListItemButton
                        component={item.href ? Link : "button"}
                        href={item.href || undefined}
                        onClick={item.onClick}
                        className={`flex items-center py-3 px-4 hover:bg-[#FBF4FB]`}
                    >
                        <ListItemIcon className="min-w-[30px] mr-1">{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
};

export default UserProfileMenu;
