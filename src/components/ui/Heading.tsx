import Image from "next/image";

//===== libraries =====//
import {Container, Box, Typography} from "@mui/material";

//===== styles =====//
import theme from "@/styles/theme";
export const Heading = ({color, icon, title, link, button, count , centered}) => {
    return (
        <Container
            maxWidth="lg"
            style={{
                display: "flex",
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "center",
            }}
        >

            <Box
                style={{
                    display: "flex",
                    justifyContent: centered ? "center" : "space-between",
                    alignItems: "center",
                    width: "100%",
                }}
            >

                <Box
                    style={{
                        display: "flex",
                        justifyContent: centered ? "center" : "start",
                        alignItems: "center",
                    }}
                >

                    {
                        icon ? (
                            <Image
                                src={icon}
                                alt="آیکن"
                                width={24}
                                height={24}
                            />
                        ) : (
                            <Box
                                style={{
                                    width: 8,
                                    height: 8,
                                    background: theme.palette.common[color],
                                    transform: 'rotate(45deg)',
                                    marginLeft: theme.spacing(1)
                                }}
                            />
                        )
                    }

                    <Typography
                        variant="subtitle1"
                        color={color === "white" ? "common.white" : "common.black"}
                        fontWeight="bold"
                        style={{marginRight: theme.spacing(1)}}
                    >
                        {title}
                    </Typography>

                </Box>

                {
                    link && (
                        <Box
                            style={{
                                display: "flex",
                                justifyContent: "end",
                                alignItems: "center",
                            }}
                        >
                            {link}
                        </Box>
                    )
                }

                {
                    button && (
                        <Box
                            style={{
                                display: "flex",
                                justifyContent: "end",
                                alignItems: "center",
                            }}
                        >
                            {button}
                        </Box>
                    )
                }

                {
                    count && (
                        <Box
                            style={{
                                display: "flex",
                                justifyContent: "end",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                variant="body1"
                                color={color === "white" ? "common.white" : "common.black"}
                                fontWeight="bold"
                                style={{marginLeft: theme.spacing(0.5)}}
                            >
                                {count}
                            </Typography>

                            <Typography
                                variant="body2"
                                color={color === "white" ? "common.white" : "common.black"}
                            >
                                مورد
                            </Typography>

                        </Box>
                    )
                }

            </Box>

        </Container>
    )
}