import {useContext} from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

//===== libraries =====//
import {useSession} from "next-auth/react";
import {toast} from "react-hot-toast";
import {Container, Paper, Typography, Grid, Button, Stack} from "@mui/material";
import {FiAirplay, FiBook, FiFileText, FiImage} from "react-icons/fi";

//===== styles =====//
import theme from "@/styles/theme";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== features =====//
const SendArticleModal = dynamic(() => import("@/features/article/SendArticleModal") , {ssr: false});
const SendGalleryModal = dynamic(() => import("@/features/gallery/SendGalleryModal") , {ssr: false});

//===== assets =====//
import logo from "@/assets/images/logo.svg";
import eitta from "@/assets/images/eitta.png";
import bale from "@/assets/images/bale.png";
import soroush from "@/assets/images/soroush.png";
import rubika from "@/assets/images/rubika.png";

//===== variables =====//
const links = [
    {
        id: 1,
        label: "اخبار و اطلاعیه ها",
        icon: <FiFileText size={20}/>,
        href: process.env.NEXT_PUBLIC_DOMAIN + "/news",
    },
    {
        id: 2,
        label: "مقالات",
        icon: <FiBook size={20}/>,
        href: process.env.NEXT_PUBLIC_DOMAIN + "/article",
    },
    {
        id: 3,
        label: "همایش ها",
        icon: <FiAirplay size={20}/>,
        href: process.env.NEXT_PUBLIC_DOMAIN + "/conference",
    },
    {
        id: 4,
        label: "نگارخانه",
        icon: <FiImage size={20}/>,
        href: process.env.NEXT_PUBLIC_DOMAIN + "/gallery",
    },
];

const socialMedias = [
    {
        id: 1,
        label: "ایتا",
        icon: eitta,
        href: "https://eitaa.com/kodakvanojvan"
    },
    {
        id: 2,
        label: "بله",
        icon: bale,
        href: "https://ble.ir/koodakvanojvan"
    },
    {
        id: 3,
        label: "سروش",
        icon: soroush,
        href: "https://splus.ir/koodakvanojvan"
    },
    {
        id: 4,
        label: "روبیکا",
        icon: rubika,
        href: "https://rubika.ir/koodakvanojavan"
    },
];

const MainFooter = () => {

    const {data: session} = useSession();
    const {_onOpenModal} = useContext(PortalContext);

    return (
        <Paper
            component="footer"
            elevation={0}
            style={{
                width: "100%",
                background: theme.palette.background.default,
                borderRadius: 0,
                borderTop: `1px solid ${theme.palette.ternary.main}`,
                padding: 16,
                marginTop: "auto"
            }}
        >

            <Container maxWidth="lg">

                <Grid
                    container
                    spacing={4}
                >

                    {/* about us */}
                    <Grid
                        item
                        xs={12}
                        md={6}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "start",
                        }}
                    >

                        <Stack
                            direction="row"
                            gap={1}
                            justifyContent='start'
                            alignItems='center'
                            width="100%"
                            style={{marginBottom: theme.spacing(1)}}
                        >

                            <Image
                                src={logo}
                                alt="logo"
                                width={40}
                                height={40}
                            />

                            <Typography
                                variant="body1"
                                color="textPrimary"
                                fontWeight="bold"
                            >
                                کودکیار
                            </Typography>

                        </Stack>

                        <Typography
                            variant="body2"
                            color="textSecondary"
                            lineHeight={2}
                            style={{marginBottom: theme.spacing(1)}}
                        >
                            شتابدهنده اجتماعی کودکیار با ایده محوری تشکیل شبکه مردمی ، احیاء هویت و ارتقاء توانمندی
                            کودکان و نوجوانان کار ، جریان سازی در مبارزه با مافیای کودکان کار برای حل
                            مسئله کودکان و نوجوانان کار فعالیت می کند.
                        </Typography>

                        <Stack
                            direction="row"
                            gap={2}
                            justifyContent="start"
                            alignItems="center"
                            width="100%"
                        >

                            <Button
                                variant="text"
                                color="secondary"
                                LinkComponent={Link}
                                href={process.env.NEXT_PUBLIC_DOMAIN + "/about-us"}
                            >
                                درباره ما
                            </Button>

                            <Button
                                variant="text"
                                color="secondary"
                                onClick={() => {
                                    if (
                                        session?.user?.role === process.env.NEXT_PUBLIC_ADMIN_ROLE ||
                                        session?.user?.role === process.env.NEXT_PUBLIC_USER_ROLE
                                    ) {
                                        _onOpenModal("send-article")
                                    } else {
                                        toast.error("شما ابتدا باید عضو سایت شوید")
                                    }
                                }}
                            >
                                ارسال مقاله
                            </Button>

                            <Button
                                variant="text"
                                color="secondary"
                                onClick={() => {
                                    if (
                                        session?.user?.role === process.env.NEXT_PUBLIC_ADMIN_ROLE ||
                                        session?.user?.role === process.env.NEXT_PUBLIC_USER_ROLE
                                    ) {
                                        _onOpenModal("send-gallery-1")
                                    } else {
                                        toast.error("شما ابتدا باید عضو سایت شوید")
                                    }
                                }}
                            >
                                ارسال نگارخانه
                            </Button>

                        </Stack>

                    </Grid>

                    {/* links */}
                    <Grid
                        item
                        xs={6}
                        md={3}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "start",
                        }}
                    >

                        <Typography
                            variant="subtitle1"
                            color="textPrimary"
                            fontWeight="bold"
                            style={{marginBottom: 16}}
                        >
                            با کودکیار
                        </Typography>

                        <Stack
                            direction="column"
                            gap={1}
                        >

                            {
                                links.map(link =>
                                    <Button
                                        key={link.id}
                                        variant="text"
                                        color="secondary"
                                        LinkComponent={Link}
                                        href={link.href}
                                        startIcon={link.icon}
                                        style={{
                                            justifyContent: "start",
                                            width: "max-content"
                                        }}
                                    >
                                        {link.label}
                                    </Button>
                                )
                            }

                        </Stack>

                    </Grid>

                    {/* social media */}
                    <Grid
                        item
                        xs={6}
                        md={3}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "start",
                        }}
                    >

                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            color="textPrimary"
                            style={{marginBottom: 16}}
                        >
                            شبکه های اجتماعی
                        </Typography>

                        <Stack
                            direction="column"
                            gap={1}
                        >

                            {
                                socialMedias.map(socialMedia =>
                                    <Button
                                        key={socialMedia.id}
                                        variant="text"
                                        color="secondary"
                                        component={Link}
                                        href={socialMedia.href}
                                        target="_blank"
                                        startIcon={
                                            <Image
                                                src={socialMedia.icon}
                                                alt={socialMedia.label}
                                                width={20}
                                                height={20}
                                            />
                                        }
                                        style={{
                                            justifyContent: "start",
                                            width: "max-content"
                                        }}
                                    >
                                        {socialMedia.label}
                                    </Button>
                                )
                            }

                        </Stack>

                    </Grid>

                    {/* copy right */}
                    <Grid
                        item
                        xs={12}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >

                        <Typography
                            variant="caption"
                            color="textPrimary"
                            fontWeight="bold"
                            textAlign="center"
                            lineHeight={2}
                        >
                            © 1402 - 1400 کپی بخش یا کل هر کدام از مطالب سایت تنها با کسب مجوز مکتوب امکان پذیر است
                        </Typography>

                    </Grid>

                </Grid>

            </Container>

            {/* send article modal */}
            <SendArticleModal/>

            {/* send gallery modal */}
            <SendGalleryModal/>

        </Paper>
    )
}

export default MainFooter;