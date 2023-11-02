import {useEffect, useState, useContext} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import Image from "next/image";

//===== libraries =====//
import {useSession, signOut} from "next-auth/react";
import {toast} from "react-hot-toast";
import {
    Box,
    Button,
    Drawer,
    Typography,
    Collapse,
    Grid,
    Stack
} from "@mui/material";
import {
    FiAirplay,
    FiBook,
    FiCamera,
    FiChevronDown,
    FiFile,
    FiFileText,
    FiImage,
    FiLayers,
    FiLogOut,
    FiPieChart,
    FiSettings,
    FiUser,
    FiVolume2,
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
        label: "پیشخوان",
        icon: <FiPieChart size={20}/>,
        href: process.env.NEXT_PUBLIC_DOMAIN + "/coming-soon"
    },
    {
        id: 2,
        label: "مدیریت محتوا",
        icon: <FiFile size={20}/>,
        children: [
            {
                id: 1,
                label: "اخبار و اطلاعیه ها",
                icon: <FiFileText size={20}/>,
                href: process.env.NEXT_PUBLIC_DOMAIN + "/account/news"
            },
            {
                id: 2,
                label: "مقالات",
                icon: <FiBook size={20}/>,
                href: process.env.NEXT_PUBLIC_DOMAIN + "/account/article"
            },
            {
                id: 3,
                label: "همایش ها و رویداد ها",
                icon: <FiAirplay size={20}/>,
                href: process.env.NEXT_PUBLIC_DOMAIN + "/account/conference"
            },
        ]
    },
    {
        id: 3,
        label: "چند رسانه ای",
        icon: <FiCamera size={20}/>,
        children: [
            {
                id: 1,
                label: "نگارخانه",
                icon: <FiImage size={20}/>,
                href: process.env.NEXT_PUBLIC_DOMAIN + "/account/gallery"
            },
            {
                id: 2,
                label: "بنر ها و تبلیغات",
                icon: <FiVolume2 size={20}/>,
                href: process.env.NEXT_PUBLIC_DOMAIN + "/account/banner"
            },
        ]
    },
    {
        id: 4,
        label: "مدیریت سایت",
        icon: <FiSettings size={20}/>,
        children: [
            {
                id: 1,
                label: "کاربران",
                icon: <FiUser size={20}/>,
                href: process.env.NEXT_PUBLIC_DOMAIN + "/account/user"
            },
            {
                id: 2,
                label: "دسته بندی ها",
                icon: <FiLayers size={20}/>,
                href: process.env.NEXT_PUBLIC_DOMAIN + "/account/category"
            },
        ]
    },
];


// @ts-ignore
const AccountDrawer = () => {

    const router = useRouter();
    const {data: session} = useSession();
    const {drawer, isOpenDrawer, _onOpenDrawer, _onCloseDrawer} = useContext(PortalContext);
    const [expand, setExpand] = useState<number>(0);

    const _onToggleAccordion = (newExpand: number): void => setExpand(expand === newExpand ? 0 : newExpand);

    const _handleActiveLink = () => {
        const collapsedLinks = navLinks.map(item => item.hasOwnProperty("children") ? ({
            id: item.id,
            children: item?.children
        }) : null).filter(item => item !== null);
        const activeLink = collapsedLinks.find(item => item?.children.find(subItem => subItem.href === process.env.NEXT_PUBLIC_DOMAIN + router.pathname));
        setExpand(activeLink?.id);
    }

    useEffect(() => {
        _handleActiveLink();
    }, []);

    return (
        <Drawer
            anchor="left"
            open={isOpenDrawer("account")}
            onClose={_onCloseDrawer}
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
                        position: "relative",
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

                                {
                                    navLink.hasOwnProperty("children") ? (
                                        <>
                                            <Button
                                                variant="text"
                                                color="secondary"
                                                fullWidth
                                                startIcon={navLink.icon}
                                                endIcon={<FiChevronDown size={20}/>}
                                                onClick={() => _onToggleAccordion(navLink.id)}
                                                style={{justifyContent: "start"}}
                                                sx={{
                                                    "& .MuiButton-endIcon": {
                                                        marginLeft: 'auto'
                                                    }
                                                }}
                                            >
                                                {navLink.label}
                                            </Button>

                                            <Collapse in={expand === navLink.id}>

                                                <Grid
                                                    container
                                                    rowSpacing={1}
                                                    style={{
                                                        paddingRight: theme.spacing(2),
                                                        marginTop: theme.spacing(0.5)
                                                    }}
                                                >

                                                    {
                                                        navLink?.children.map(subLink =>
                                                            <Grid
                                                                key={subLink.id}
                                                                item
                                                                xs={12}
                                                            >

                                                                <Button
                                                                    variant={process.env.NEXT_PUBLIC_DOMAIN + router.pathname === subLink.href ? "contained" : "text"}
                                                                    color={process.env.NEXT_PUBLIC_DOMAIN + router.pathname === subLink.href ? "primary" : "secondary"}
                                                                    LinkComponent={Link}
                                                                    href={subLink.href}
                                                                    fullWidth
                                                                    startIcon={subLink.icon}
                                                                    onClick={_onCloseDrawer}
                                                                    style={{justifyContent: "start"}}
                                                                >
                                                                    {subLink.label}
                                                                </Button>

                                                            </Grid>
                                                        )
                                                    }

                                                </Grid>

                                            </Collapse>
                                        </>
                                    ) : (
                                        <Button
                                            variant={process.env.NEXT_PUBLIC_DOMAIN + router.pathname === navLink?.href ? "contained" : "text"}
                                            color={process.env.NEXT_PUBLIC_DOMAIN + router.pathname === navLink?.href ? "primary" : "secondary"}
                                            LinkComponent={Link}
                                            href={navLink?.href}
                                            fullWidth
                                            startIcon={navLink.icon}
                                            onClick={_onCloseDrawer}
                                            style={{justifyContent: "start"}}
                                        >
                                            {navLink.label}
                                        </Button>
                                    )
                                }

                            </Grid>
                        )
                    }

                </Grid>

                {/* actions */}
                <Grid
                    container
                    rowSpacing={1}
                >

                    <Grid
                        item
                        xs={12}
                    >

                        <Button
                            variant={process.env.NEXT_PUBLIC_DOMAIN + router.pathname === process.env.NEXT_PUBLIC_DOMAIN + "/account/profile" ? "contained" : "text"}
                            color={process.env.NEXT_PUBLIC_DOMAIN + router.pathname === process.env.NEXT_PUBLIC_DOMAIN + "/account/profile" ? "primary" : "secondary"}
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
                            onClick={_onCloseDrawer}
                            style={{justifyContent: "start"}}
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

                    <Grid
                        item
                        xs={12}
                    >

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

                    </Grid>

                </Grid>

            </Stack>

        </Drawer>
    )
}

export default AccountDrawer;