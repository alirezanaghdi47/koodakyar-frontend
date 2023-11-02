import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";

//===== libraries =====//
import {Box, Button, Container, Stack, Typography} from "@mui/material";
import {FiArrowLeft, FiHome} from "react-icons/fi";

//===== utils =====//
import {placeholderDataUrl} from "@/utils/constants";

//===== assets =====//
import eitta from "@/assets/images/eitta.png";
import bale from "@/assets/images/bale.png";
import soroush from "@/assets/images/soroush.png";
import rubika from "@/assets/images/rubika.png";

//===== variables =====//
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

export const Empty = ({message , image , socialMedia , backButton}) => {

    const router = useRouter();

    return (
        <Container
            maxWidth="md"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >

            <Box
                style={{
                    width: "100%",
                    maxWidth: 240,
                    marginBottom: 16
                }}
            >

                <Box className="aspect-ratio aspect-ratio__1-1">

                    <Image
                        src={image}
                        alt="image"
                        fill
                        placeholder="blur"
                        blurDataURL={placeholderDataUrl}
                        quality={75}
                    />

                </Box>

            </Box>

            <Box
                style={{
                    display: 'flex',
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}
            >

                <Typography
                    variant="subtitle1"
                    color="textPrimary"
                    fontWeight="bold"
                    style={{marginBottom: 16}}
                >
                    {message}
                </Typography>

                {
                    socialMedia && (
                        <Stack
                            direction="row"
                            flexWrap='wrap'
                            gap={2}
                            justifyContent="center"
                            alignItems="center"
                            style={{
                                width: "100%",
                                marginBottom: 16
                            }}
                        >

                            {
                                socialMedias.map(socialMedia =>
                                    <Box
                                        key={socialMedia.id}
                                        style={{
                                            display: "flex",
                                            justifyContent: "start",
                                            alignItems: "center",
                                        }}
                                    >

                                        <Button
                                            variant="text"
                                            color="secondary"
                                            LinkComponent={Link}
                                            href={socialMedia.href}
                                            startIcon={
                                                <Image
                                                    src={socialMedia.icon}
                                                    alt={socialMedia.label}
                                                    width={20}
                                                    height={20}
                                                />
                                            }
                                        >
                                            {socialMedia.label}
                                        </Button>

                                    </Box>
                                )
                            }

                        </Stack>
                    )
                }

                <Stack
                    direction="row"
                    gap={2}
                    justifyContent="center"
                    alignItems="center"
                >

                    {
                        backButton && (
                            <Button
                                variant="contained"
                                color="primary"
                                endIcon={<FiArrowLeft size={16}/>}
                                onClick={() => router.back()}
                            >
                                بازگشت
                            </Button>
                        )
                    }

                </Stack>

            </Box>

        </Container>
    )
}

export const TableEmpty = ({message , image}) => {

    return (
        <Container
            maxWidth="lg"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 16
            }}
        >

            <Box
                style={{
                    width: "100%",
                    maxWidth: 120,
                    marginBottom: 16
                }}
            >

                <Box className="aspect-ratio aspect-ratio__1-1">

                    <Image
                        src={image}
                        alt="empty"
                        fill
                        placeholder="blur"
                        blurDataURL={placeholderDataUrl}
                        quality={75}
                    />

                </Box>

            </Box>

            <Box
                style={{
                    display: 'flex',
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}
            >

                <Typography
                    variant="subtitle2"
                    color="textPrimary"
                    fontWeight="bold"
                >
                    {message}
                </Typography>

            </Box>

        </Container>
    )
}
