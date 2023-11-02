import Image from "next/image";

//===== libraries =====//
import {Box, Container, Grid, Stack, Typography} from "@mui/material";

//===== utils =====//
import {placeholderDataUrl} from "@/utils/constants";

//===== assets =====//
import logo from "@/assets/images/logo.svg";

//===== variables =====//
const coWorkers = [
    {id: 1, title: "سهیل نادری", value: "برنامه نویس فرانت اند", image: logo},
    {id: 2, title: "سهیل نادری", value: "برنامه نویس فرانت اند", image: logo},
    {id: 3, title: "سهیل نادری", value: "برنامه نویس فرانت اند", image: logo},
    {id: 4, title: "سهیل نادری", value: "برنامه نویس فرانت اند", image: logo},
    {id: 5, title: "سهیل نادری", value: "برنامه نویس فرانت اند", image: logo},
    {id: 6, title: "سهیل نادری", value: "برنامه نویس فرانت اند", image: logo},
]

// @ts-ignore
const AboutUsCoWorker = () => {

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
                spacing={6}
            >

                {
                    coWorkers.map(coWorkersItem =>
                        <Grid
                            key={coWorkersItem.id}
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                        >

                            <Stack
                                direction="row"
                                gap={2}
                                justifyContent="center"
                                alignItems="center"
                            >

                                <Box
                                    style={{
                                        position: "relative",
                                        width: 75,
                                        height: 75,
                                        background: "#fafafa",
                                        borderRadius: "50%",
                                        overflow: "hidden"
                                    }}
                                >

                                    <Image
                                        src={coWorkersItem.image}
                                        alt={coWorkersItem.title}
                                        fill
                                        placeholder="blur"
                                        quality={75}
                                        blurDataURL={placeholderDataUrl}
                                        style={{padding: 8}}
                                    />

                                </Box>

                                <Stack
                                    direction="column"
                                    gap={1}
                                    justifyContent="center"
                                    alignItems="start"
                                >

                                    <Typography
                                        variant="body1"
                                        color="common.white"
                                        fontWeight="bold"
                                    >
                                        {coWorkersItem.title}
                                    </Typography>

                                    <Typography
                                        variant="caption"
                                        color="common.light"
                                        fontWeight="bold"
                                    >
                                        {coWorkersItem.value}
                                    </Typography>

                                </Stack>

                            </Stack>

                        </Grid>
                    )
                }

            </Grid>

        </Container>
    )
}

export default AboutUsCoWorker;