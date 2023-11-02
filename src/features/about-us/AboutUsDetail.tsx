import Image from "next/image";

//===== libraries =====//
import {Box, Container, Typography} from "@mui/material";

//===== utils =====//
import {placeholderDataUrl} from "@/utils/constants";

//===== assets =====//
import logo from "@/assets/images/logo.svg";

// @ts-ignore
const AboutUsDetail = () => {

    return (
        <Container
            maxWidth="md"
            style={{
                display: "flex",
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "start",
            }}
        >

            <Box
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: 16
                }}
            >

                <Box
                    style={{
                        position: "relative",
                        width: 100,
                        height: 100,
                        background: "#fafafa",
                        borderRadius: "50%",
                        overflow: "hidden"
                    }}
                >

                    <Image
                        src={logo}
                        alt="logo"
                        fill
                        placeholder="blur"
                        quality={75}
                        blurDataURL={placeholderDataUrl}
                        style={{padding: 8}}
                    />

                </Box>

            </Box>

            <Box
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent:"center",
                    alignItems:"center",
                    width: "100%"
                }}
            >

                <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="textSecondary"
                    lineHeight={2.5}
                >
                    شتابدهنده اجتماعی کودکیار با ایده محوری تشکیل شبکه مردمی ، احیاء هویت و ارتقاء توانمندی کودکان و
                    نوجوانان کار ، جریان سازی در مبارزه با مافیای کودکان کار برای حل مسئله کودکان و نوجوانان کار
                    فعالیت می کند.
                    شتابدهنده اجتماعی کودکیار با ایده محوری تشکیل شبکه مردمی ، احیاء هویت و ارتقاء توانمندی کودکان و
                    نوجوانان کار ، جریان سازی در مبارزه با مافیای کودکان کار برای حل مسئله کودکان و نوجوانان کار
                    فعالیت می کند.
                    شتابدهنده اجتماعی کودکیار با ایده محوری تشکیل شبکه مردمی ، احیاء هویت و ارتقاء توانمندی کودکان و
                    نوجوانان کار ، جریان سازی در مبارزه با مافیای کودکان کار برای حل مسئله کودکان و نوجوانان کار
                    فعالیت می کند.
                </Typography>

            </Box>

        </Container>
    )
}

export default AboutUsDetail;