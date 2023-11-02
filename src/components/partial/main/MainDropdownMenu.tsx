import {useRef , useContext} from "react";
import Link from "next/link";
import {useRouter} from "next/router";

//===== libraries =====//
import {signOut, useSession} from "next-auth/react";
import {toast} from "react-hot-toast";
import {useClickOutside} from "@react-hooks-library/core";
import {Button, Menu} from "@mui/material";
import {FiLogOut, FiPieChart, FiUser} from "react-icons/fi";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== styles =====//
import theme from "@/styles/theme";

//===== variables =====//
const actionLinks = [
    {
        id: 1,
        label: "پیشخوان",
        href: process.env.NEXT_PUBLIC_DOMAIN + "/coming-soon",
        icon: <FiPieChart size={20}/>,
    },
    {
        id: 2,
        label: "حساب کاربری",
        href: process.env.NEXT_PUBLIC_DOMAIN + "/account/profile",
        icon: <FiUser size={20}/>,
    },
];

// @ts-ignore
const MainDropdownMenu = () => {

    const router = useRouter();
    const {data: session} = useSession();
    const {menu , isOpenMenu , _onCloseMenu} = useContext(PortalContext);
    const dropdownMenuRef = useRef<HTMLElement>(null);

    useClickOutside(dropdownMenuRef, () => _onCloseMenu());

    return (
        <Menu
            anchorEl={menu.anchorEl}
            open={isOpenMenu("account")}
            onClose={_onCloseMenu}
            transformOrigin={{horizontal: 'left', vertical: 'top'}}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            MenuListProps={{
                style: {
                    display: "grid",
                    gap: 2
                }
            }}
            PaperProps={{
                style: {
                    padding: theme.spacing(2)
                }
            }}
        >

            {
                session?.user?.role === process.env.NEXT_PUBLIC_ADMIN_ROLE && actionLinks.map(actionLink =>
                    <Button
                        key={actionLink.id}
                        variant={router.pathname === actionLink.href ? "contained" : "text"}
                        color={router.pathname === actionLink.href ? "primary" : "secondary"}
                        LinkComponent={Link}
                        href={actionLink.href}
                        fullWidth
                        startIcon={actionLink.icon}
                        onClick={_onCloseMenu}
                        style={{justifyContent: "start"}}
                    >
                        {actionLink.label}
                    </Button>
                )
            }

            {
                // @ts-ignore
                session?.user?.role && (
                    <Button
                        variant="text"
                        color="error"
                        fullWidth
                        startIcon={<FiLogOut size={20}/>}
                        onClick={() => {
                            _onCloseMenu();
                            router.replace("/");
                            signOut({redirect: false, callbackUrl: ""})
                            toast.success("خدانگهدار");
                        }}
                        style={{justifyContent: "start"}}
                    >
                        خروج
                    </Button>
                )
            }

        </Menu>
    )
};

export default MainDropdownMenu;