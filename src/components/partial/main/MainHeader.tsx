import {useContext} from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {useRouter} from "next/router";
import Image from "next/image";

//===== libraries =====//
import {useSession} from "next-auth/react";
import {Box, Button, Container, Grid, Hidden, IconButton, Paper, Stack, Typography} from "@mui/material";
import {FiMenu, FiUser} from "react-icons/fi";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== components =====//
const MainDrawer = dynamic(() => import("@/components/partial/main/MainDrawer") , {ssr: false});
const MainDropdownMenu = dynamic(() => import("@/components/partial/main/MainDropdownMenu") , {ssr: false});

//===== assets =====//
import logo from "@/assets/images/logo.svg";

//===== styles =====//
import theme from "@/styles/theme";

//===== variables =====//
const navLinks = [
    {
        id: 1,
        label: "اخبار و اطلاعیه ها",
        href: process.env.NEXT_PUBLIC_DOMAIN + "/news",
        color: 'error'
    },
    {
        id: 2,
        label: "مقالات",
        href: process.env.NEXT_PUBLIC_DOMAIN + "/article",
        color: 'success'
    },
    {
        id: 3,
        label: "همایش ها و رویداد ها",
        href: process.env.NEXT_PUBLIC_DOMAIN + "/conference",
        color: 'info'
    },
    {
        id: 4,
        label: "نگارخانه",
        href: process.env.NEXT_PUBLIC_DOMAIN + "/gallery",
        color: 'warning'
    },
];

const MainHeader = () => {

    const router = useRouter();
    const {data: session} = useSession();
    const {_onOpenDrawer , _onOpenMenu} = useContext(PortalContext);

    return (
        <Paper
            component="header"
            elevation={0}
            style={{
                position: "sticky",
                top: 0,
                zIndex: 20,
                width: "100%",
                background: theme.palette.background.default,
                borderRadius: 0,
                borderBottom: `1px solid ${theme.palette.ternary.main}`,
                padding: 16,
            }}
        >

            <Container maxWidth="lg">

                <Grid container>

                    {/* mobile action */}
                    <Hidden lgUp>

                        <Grid
                            item
                            xs={6}
                            style={{
                                display: "flex",
                                justifyContent: "start",
                                alignItems: "center"
                            }}
                        >

                            <IconButton
                                color="secondary"
                                onClick={() => _onOpenDrawer("main")}
                            >
                                <FiMenu size={20}/>
                            </IconButton>

                            {/* drawer */}
                            <MainDrawer/>

                        </Grid>

                    </Hidden>

                    {/* mobile logo */}
                    <Hidden lgUp>

                        <Grid
                            item
                            xs={6}
                            style={{
                                display: "flex",
                                justifyContent: "end",
                                alignItems: "center"
                            }}
                        >

                            <Link
                                href="/"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "max-content",
                                    textDecoration: "none"
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

                        </Grid>

                    </Hidden>

                    {/* desktop logo */}
                    <Hidden lgDown>

                        <Grid
                            item
                            lg={2}
                            style={{
                                display: "flex",
                                justifyContent: "start",
                                alignItems: "center"
                            }}
                        >

                            <Link
                                href="/"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "max-content",
                                    textDecoration: "none"
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

                        </Grid>

                    </Hidden>

                    {/* desktop navbar */}
                    <Hidden lgDown>

                        <Grid
                            item
                            lg={8}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >

                            <Stack
                                direction="row"
                                gap={1}
                            >

                                {
                                    navLinks.map(navLink =>
                                        <Button
                                            key={navLink.id}
                                            variant={process.env.NEXT_PUBLIC_DOMAIN + router.pathname === navLink.href ? "contained" : "text"}
                                            color={process.env.NEXT_PUBLIC_DOMAIN + router.pathname === navLink.href ? navLink.color : "secondary"}
                                            LinkComponent={Link}
                                            href={navLink.href}
                                        >
                                            {navLink.label}
                                        </Button>
                                    )
                                }

                            </Stack>

                        </Grid>

                    </Hidden>

                    {/* desktop action */}
                    <Hidden lgDown>

                        <Grid
                            item
                            lg={2}
                            style={{
                                display: "flex",
                                justifyContent: "end",
                                alignItems: "center"
                            }}
                        >

                            {
                                // @ts-ignore
                                session?.user?.role ? (
                                    <Button
                                        color="secondary"
                                        variant='text'
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
                                                        background: theme.palette.background.paper,
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
                                                <FiUser size={16}/>
                                            )
                                        }
                                        onClick={(e) => _onOpenMenu("account", e.currentTarget)}
                                    >
                                        {
                                            // @ts-ignore
                                            session?.user?.firstName && session?.user?.lastName ? (
                                                <span
                                                    className="text-truncate text-truncate__1"
                                                    style={{width: 'max-content', textAlign: "right"}}
                                                >
                                                    {session?.user?.firstName + " " + session?.user?.lastName}
                                                </span>
                                            ) : (
                                                "کاربر سایت"
                                            )
                                        }
                                    </Button>
                                ) : (
                                    <Button
                                        variant="text"
                                        color="secondary"
                                        LinkComponent={Link}
                                        href={process.env.NEXT_PUBLIC_DOMAIN + `/auth/sign-in?callbackUrl=${process.env.NEXT_PUBLIC_DOMAIN + "/"}`}
                                    >
                                        ورود | عضویت
                                    </Button>
                                )
                            }

                            {/* dropdown menu */}
                            <MainDropdownMenu/>

                        </Grid>

                    </Hidden>

                </Grid>

            </Container>

        </Paper>
    )
}

export default MainHeader;