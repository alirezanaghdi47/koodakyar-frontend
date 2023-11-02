import {useContext} from "react";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";

//===== libraries =====//
import {useSession , signOut} from "next-auth/react";
import {toast} from "react-hot-toast";
import {Box, Button, Drawer, Typography, Grid, Stack} from "@mui/material";
import {
    FiAirplay,
    FiBook,
    FiFileText,
    FiImage,
    FiLogIn,
    FiLogOut,
    FiPieChart,
    FiUser
} from "react-icons/fi";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== styles =====//
import theme from "@/styles/theme";

//===== assets =====//
import logo from "@/assets/images/logo.svg";

//===== variables =====//
const navLinks = [
    {
        id: 1,
        label: "اخبار و اطلاعیه ها",
        icon: <FiFileText size={20}/>,
        href: process.env.NEXT_PUBLIC_DOMAIN + "/news",
        color: 'error'
    },
    {
        id: 2,
        label: "مقالات",
        icon: <FiBook size={20}/>,
        href: process.env.NEXT_PUBLIC_DOMAIN + "/article",
        color: 'success'
    },
    {
        id: 3,
        label: "همایش ها و رویداد ها",
        icon: <FiAirplay size={20}/>,
        href: process.env.NEXT_PUBLIC_DOMAIN + "/conference",
        color: 'info'
    },
    {
        id: 4,
        label: "نگار خانه",
        icon: <FiImage size={20}/>,
        href: process.env.NEXT_PUBLIC_DOMAIN + "/gallery",
        color: 'warning'
    }
];

const actionLinks = [
    {
        id: 1,
        label: "پیشخوان",
        icon: <FiPieChart size={20}/>,
        href: process.env.NEXT_PUBLIC_DOMAIN + "/coming-soon"
    }
];

// @ts-ignore
const MainDrawer = () => {

    const router = useRouter();
    const {data: session} = useSession();
    const {isOpenDrawer ,_onCloseDrawer} = useContext(PortalContext);

    return (
        <Drawer
            anchor="left"
            open={isOpenDrawer("main")}
            onClose={_onCloseDrawer}
            elevation={2}
        >

            <Stack
                component="aside"
                justifyContent="space-between"
                alignItems="center"
                width={240}
                height="100%"
                style={{padding: theme.spacing(2)}}
            >

                {/* logo */}
                <Link
                    href="/"
                    onClick={_onCloseDrawer}
                    style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        width: "100%",
                        textDecoration: "none",
                    }}
                >

                    <Image
                        src={logo}
                        alt="logo"
                        width={40}
                        height={40}
                    />

                    <Typography
                        variant="subtitle1"
                        color="textPrimary"
                        fontWeight="bold"
                        style={{marginRight: theme.spacing(1)}}
                    >
                        کودکیار
                    </Typography>

                </Link>

                {/* links */}
                <Grid
                    container
                    rowSpacing={1}
                    style={{
                        marginTop: theme.spacing(2),
                        marginBottom: theme.spacing(2),
                    }}
                >

                    {
                        navLinks.map(navLink =>
                            <Grid
                                key={navLink.id}
                                item
                                xs={12}
                            >

                                <Button
                                    variant={process.env.NEXT_PUBLIC_DOMAIN + router.pathname === navLink.href ? "contained" : "text"}
                                    color={process.env.NEXT_PUBLIC_DOMAIN + router.pathname === navLink.href ? navLink.color : "secondary"}
                                    LinkComponent={Link}
                                    href={navLink.href}
                                    fullWidth
                                    startIcon={navLink.icon}
                                    onClick={_onCloseDrawer}
                                    style={{justifyContent: "start"}}
                                >
                                    {navLink.label}
                                </Button>

                            </Grid>
                        )
                    }

                </Grid>

                {/* actions */}
                <Grid
                    container
                    rowSpacing={1}
                >

                    {
                        // @ts-ignore
                        session?.user?.role === process.env.NEXT_PUBLIC_ADMIN_ROLE && actionLinks.map(actionLink =>
                            <Grid
                                key={actionLink.id}
                                item
                                xs={12}
                            >

                                <Button
                                    variant={process.env.NEXT_PUBLIC_DOMAIN + router.pathname === actionLink.href ? "contained" : "text"}
                                    color={process.env.NEXT_PUBLIC_DOMAIN + router.pathname === actionLink.href ? "primary" : "secondary"}
                                    LinkComponent={Link}
                                    href={actionLink.href}
                                    fullWidth
                                    startIcon={actionLink.icon}
                                    onClick={_onCloseDrawer}
                                    style={{justifyContent: "start"}}
                                >
                                    {actionLink.label}
                                </Button>

                            </Grid>
                        )
                    }

                    {
                        // @ts-ignore
                        session?.user?.role === process.env.NEXT_PUBLIC_ADMIN_ROLE && (
                            <Grid
                                item
                                xs={12}
                            >

                                <Button
                                    variant={process.env.NEXT_PUBLIC_DOMAIN + router.pathname === process.env.NEXT_PUBLIC_DOMAIN + "account/profile" ? "contained" : "text"}
                                    color={process.env.NEXT_PUBLIC_DOMAIN + router.pathname === process.env.NEXT_PUBLIC_DOMAIN + "account/profile" ? "primary" : "secondary"}
                                    LinkComponent={Link}
                                    href={process.env.NEXT_PUBLIC_DOMAIN + "/account/profile"}
                                    fullWidth
                                    startIcon={
                                        // @ts-ignore
                                        session?.user?.avatar ? (
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    width: 24,
                                                    height: 24,
                                                    background: theme.palette.background.default,
                                                    borderRadius: "50%"
                                                }}
                                            >
                                                <Image
                                                    // @ts-ignore
                                                    src={session?.user?.avatar}
                                                    alt="avatar"
                                                    width={20}
                                                    height={20}
                                                    quality={50}
                                                    style={{borderRadius: "50%"}}
                                                />
                                            </Box>
                                        ) : (
                                            <FiUser size={20}/>
                                        )
                                    }
                                    style={{justifyContent: "start"}}
                                    onClick={_onCloseDrawer}
                                >
                                    {
                                        // @ts-ignore
                                        session?.user?.firstName && session?.user?.lastName ? (
                                            <span
                                                className="text-truncate text-truncate__1"
                                                style={{width: '100%', textAlign: "right"}}
                                            >
                                                {session?.user?.firstName + " " + session?.user?.lastName}
                                            </span>
                                        ) : (
                                            "کاربر سایت"
                                        )
                                    }
                                </Button>

                            </Grid>
                        )
                    }

                    {
                        // @ts-ignore
                        session?.user?.role === process.env.NEXT_PUBLIC_USER_ROLE && (
                            <Grid
                                item
                                xs={12}
                            >

                                <Button
                                    variant="text"
                                    color="secondary"
                                    fullWidth
                                    startIcon={<FiUser size={20}/>}
                                    style={{justifyContent: "start"}}
                                    onClick={_onCloseDrawer}
                                >
                                    کاربر سایت
                                </Button>

                            </Grid>
                        )
                    }

                    <Grid
                        item
                        xs={12}
                    >

                        {
                            // @ts-ignore
                            session?.user?.role ? (
                                <Button
                                    variant="text"
                                    color="error"
                                    fullWidth
                                    startIcon={<FiLogOut size={20}/>}
                                    onClick={() => {
                                        _onCloseDrawer();
                                        router.replace("/");
                                        signOut({redirect: false, callbackUrl: ""});
                                        toast.success("خدانگهدار");
                                    }}
                                    style={{justifyContent: "start"}}
                                >
                                    خروج
                                </Button>
                            ) : (
                                <Button
                                    variant={process.env.NEXT_PUBLIC_DOMAIN + router.pathname === "/auth/sign-in" ? "contained" : "text"}
                                    color={process.env.NEXT_PUBLIC_DOMAIN + router.pathname === "/auth/sign-in" ? "primary" : "secondary"}
                                    LinkComponent={Link}
                                    href={process.env.NEXT_PUBLIC_DOMAIN + `/auth/sign-in?callbackUrl=${process.env.NEXT_PUBLIC_DOMAIN + "/"}`}
                                    fullWidth
                                    startIcon={<FiLogIn size={20}/>}
                                    style={{justifyContent: "start"}}
                                >
                                    ورود | عضویت
                                </Button>
                            )
                        }

                    </Grid>

                </Grid>

            </Stack>

        </Drawer>
    )
}

export default MainDrawer;