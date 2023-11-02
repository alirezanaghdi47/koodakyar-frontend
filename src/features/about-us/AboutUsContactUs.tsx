import Image from "next/image";
import Link from "next/link";

//===== libraries =====//
import {BreakPointHooks} from "@react-hooks-library/core";
import {Box, Container, Grid, Stack, Typography} from "@mui/material";
import {FiAtSign, FiCreditCard, FiMapPin, FiPhone} from "react-icons/fi";

//===== utils =====//
import {breakpoints, placeholderDataUrl} from "@/utils/constants";

//===== assets =====//
import map from "@/assets/images/map.png";

//===== variables =====//
const contacts = [
    {
        id: 1,
        title: "آدرس",
        value: "ایران ، تهران ، خیابان طالقانی ایران ، تهران ، خیابان طالقانی",
        icon: <FiMapPin size={20} color="#f3f4f6"/>
    },
    {id: 2, title: "تلفن همراه", value: "09195610753", icon: <FiPhone size={20} color="#f3f4f6"/>},
    {id: 3, title: "کدپستی", value: "1234567890", icon: <FiCreditCard size={20} color="#f3f4f6"/>},
    {id: 4, title: "ایمیل", value: "koodakyar@gmail.com", icon: <FiAtSign size={20} color="#f3f4f6"/>},
]

const AboutUsContactUs = () => {

    const {useSmaller} = BreakPointHooks(breakpoints);
    const isTablet = useSmaller("md");

    return (
        <Container
            maxWidth="lg"
            style={{
                display: "flex",
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "start",
            }}
        >

            <Grid
                container
                spacing={4}
            >

                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={7}
                    style={{height: "auto"}}
                >

                    <Grid
                        container
                        spacing={6}
                        style={{height: "100%"}}
                    >

                        {
                            contacts.map(contactsItem =>
                                <Grid
                                    key={contactsItem.id}
                                    item
                                    xs={12}
                                    sm={6}
                                    md={6}
                                    style={{
                                        alignItems: "stretch",
                                        justifyContent: "stretch",
                                    }}
                                >

                                    <Stack
                                        direction="column"
                                        gap={1}
                                        justifyContent="center"
                                        alignItems={isTablet ? "center" : "start"}
                                        width="100%"
                                        height="100%"
                                    >

                                        <Stack
                                            direction="row"
                                            gap={1}
                                            justifyContent={isTablet ? "center" : "start"}
                                            alignItems="center"
                                            width="100%"
                                        >

                                            {contactsItem.icon}

                                            <Typography
                                                variant="body2"
                                                color="common.white"
                                                fontWeight="bold"
                                            >
                                                {contactsItem.title}
                                            </Typography>

                                        </Stack>

                                        {
                                            contactsItem.id === 1 && (
                                                <Link
                                                    href='https://neshan.org/maps/@35.706274,51.423819,17.8z,0.0p'
                                                    target="_blank"
                                                    style={{
                                                        textDecoration: "none",
                                                        textAlign: isTablet ? "center" : "start"
                                                    }}
                                                >

                                                    <Typography
                                                        variant="caption"
                                                        color="common.white"
                                                        fontWeight="bold"
                                                        textAlign={isTablet ? "center" : "start"}
                                                    >
                                                        {contactsItem.value}
                                                    </Typography>

                                                </Link>
                                            )
                                        }

                                        {
                                            contactsItem.id === 2 && (
                                                <Link
                                                    href={`tel:${contactsItem.value}`}
                                                    target="_blank"
                                                    style={{
                                                        textDecoration: "none",
                                                        textAlign: "center"
                                                    }}
                                                >

                                                    <Typography
                                                        variant="caption"
                                                        color="common.white"
                                                        fontWeight="bold"
                                                        textAlign="center"
                                                    >
                                                        {contactsItem.value}
                                                    </Typography>

                                                </Link>
                                            )
                                        }

                                        {
                                            contactsItem.id === 3 && (
                                                <Typography
                                                    variant="caption"
                                                    color="common.white"
                                                    fontWeight="bold"
                                                    textAlign="center"
                                                >
                                                    {contactsItem.value}
                                                </Typography>
                                            )
                                        }

                                        {
                                            contactsItem.id === 4 && (
                                                <Link
                                                    href={`mailTo:${contactsItem.value}`}
                                                    target="_blank"
                                                    style={{
                                                        textDecoration: "none",
                                                        textAlign: "center"
                                                    }}
                                                >

                                                    <Typography
                                                        variant="caption"
                                                        color="common.white"
                                                        fontWeight="bold"
                                                        textAlign="center"
                                                    >
                                                        {contactsItem.value}
                                                    </Typography>

                                                </Link>
                                            )
                                        }

                                    </Stack>

                                </Grid>
                            )
                        }

                    </Grid>

                </Grid>

                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={5}
                >

                    <Link
                        href='https://neshan.org/maps/@35.706274,51.423819,17.8z,0.0p'
                        target="_blank"
                    >

                        <Box
                            className="aspect-ratio aspect-ratio__2-1"
                            style={{
                                background: "#e5e7eb",
                                borderRadius: 8,
                            }}
                        >

                            <Image
                                src={map}
                                alt="map"
                                fill
                                placeholder="blur"
                                quality={75}
                                blurDataURL={placeholderDataUrl}
                                style={{borderRadius: 8}}
                            />

                        </Box>

                    </Link>

                </Grid>

            </Grid>

        </Container>
    )
}

export default AboutUsContactUs;