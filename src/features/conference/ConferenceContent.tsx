import Image from "next/image";

//===== libraries =====//
import {Markup} from "interweave";
import {BreakPointHooks} from "@react-hooks-library/core";
import {useCopyToClipboard} from "usehooks-ts";
import {saveAs} from 'file-saver';
import {toast} from "react-hot-toast";
import {Box, Chip, Container, Grid, IconButton, Stack, Tooltip, Typography} from "@mui/material";
import {FiClock, FiDownload, FiMapPin, FiShare2} from "react-icons/fi";

//===== utils =====//
import {convertType, getTimestampFromDate} from "@/utils/functions";
import {breakpoints, placeholderDataUrl} from "@/utils/constants";

//===== modules =====//
import Countdown from "@/components/ui/Countdown";

// @ts-ignore
const ConferenceContent = ({conference}) => {

    const [clipboardText, copyToClipboard] = useCopyToClipboard();
    const {useSmaller} = BreakPointHooks(breakpoints);
    const isMobile = useSmaller('sm');

    return (
        <Container
            maxWidth="lg"
            style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
            }}
        >

            <Grid
                container
                spacing={2}
            >

                {/* summary */}
                <Grid
                    item
                    xs={12}
                    sm={6}
                    lg={7}
                    style={{
                        order: isMobile ? 2 : 1,
                        display: 'flex',
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "center",
                    }}
                >

                    <Box
                        style={{
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                            width: "100%",
                            marginBottom: 16,
                        }}
                    >

                        <Typography
                            variant="h6"
                            color="textPrimary"
                            fontWeight="bold"
                            lineHeight={2}
                        >
                            {conference?.title}
                        </Typography>

                    </Box>

                    <Stack
                        direction="column"
                        gap={2}
                        style={{
                            width: "100%",
                            marginBottom: 16,
                        }}
                    >

                        <Box
                            style={{
                                display: "flex",
                                justifyContent: "start",
                                alignItems: "center",
                            }}
                        >

                            <FiClock
                                size={16}
                                color="#374151"
                                style={{marginLeft: 8}}
                            />

                            <Typography
                                variant="caption"
                                color="textSecondary"
                                fontWeight="bold"
                            >
                                {conference.time + " | " + conference.date}
                            </Typography>

                        </Box>

                        <Box
                            style={{
                                display: "flex",
                                justifyContent: "start",
                                alignItems: "center",
                            }}
                        >

                            <FiMapPin
                                size={16}
                                color="#374151"
                                style={{marginLeft: 8}}
                            />

                            <Typography
                                variant="caption"
                                color="textSecondary"
                                fontWeight="bold"
                            >
                                {conference?.place}
                            </Typography>

                        </Box>

                    </Stack>

                    <Box
                        className="ProseMirror__output"
                        style={{marginBottom: 16}}
                    >
                        <Markup content={conference?.content}/>
                    </Box>

                    <Stack
                        direction="row"
                        flexWrap="wrap"
                        gap={2}
                        style={{
                            width: "100%",
                            marginTop: "auto"
                        }}
                    >

                        <Box
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "start",
                                alignItems: "center",
                            }}
                        >

                            <Typography
                                variant="body2"
                                color="textPrimary"
                                fontWeight="bold"
                                style={{marginLeft: 8}}
                            >
                                نوع :
                            </Typography>

                            <Chip
                                label={convertType(conference?.type)}
                                variant="filled"
                                color="primary"
                                size="small"
                            />

                        </Box>

                        <Box
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "start",
                                alignItems: "center",
                            }}
                        >

                            <Typography
                                variant="body2"
                                color="textPrimary"
                                fontWeight="bold"
                                style={{marginLeft: 8}}
                            >
                                دسته بندی :
                            </Typography>

                            <Chip
                                label={conference?.category?.title}
                                variant="filled"
                                color="primary"
                                size="small"
                            />

                        </Box>

                        <Box
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "start",
                                alignItems: "center",
                            }}
                        >

                            <Typography
                                variant="body2"
                                color="textPrimary"
                                fontWeight="bold"
                                style={{marginLeft: 8}}
                            >
                                موارد دیگر :
                            </Typography>

                            <Tooltip title="اشتراک گذاری">
                                <IconButton
                                    color="primary"
                                    onClick={async () => {
                                        if (navigator.share) {
                                            await navigator.share({
                                                url: process.env.NEXT_PUBLIC_DOMAIN + "/conference/" + conference.type + "/" + conference.slug,
                                                title: conference?.title,
                                            });
                                        } else {
                                            copyToClipboard(process.env.NEXT_PUBLIC_DOMAIN + "/conference/" + conference.type + "/" + conference.slug);
                                            toast.success("کپی شد");
                                        }
                                    }}
                                    style={{marginLeft: 8}}
                                >
                                    <FiShare2 size={16}/>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="دانلود پوستر">
                                <IconButton
                                    color="primary"
                                    onClick={async () => {
                                        saveAs(conference?.image, `${conference?.slug}.png`);
                                    }}
                                >
                                    <FiDownload size={16}/>
                                </IconButton>
                            </Tooltip>

                        </Box>

                    </Stack>

                </Grid>

                {/* image */}
                <Grid
                    item
                    xs={12}
                    sm={6}
                    lg={5}
                    style={{
                        order: isMobile ? 1 : 2
                    }}
                >

                    <Box
                        style={{
                            position: isMobile ? "relative" : "sticky",
                            top: isMobile ? "unset" : 96,
                            display: "flex",
                            flexDirection: 'column',
                            justifyContent: "start",
                            alignItems: "center",
                            width: "100%"
                        }}
                    >

                        {/* countdown */}
                        <Countdown
                            message={`${convertType(conference?.type)} به پایان رسیده است`}
                            timestamp={getTimestampFromDate(conference.date, conference.time)}
                        />

                        <Box
                            className="aspect-ratio aspect-ratio__3-4"
                            style={{
                                background: "#e5e7eb",
                                borderRadius: 8
                            }}
                        >

                            <Image
                                src={conference?.image}
                                alt={conference?.title}
                                fill
                                placeholder="blur"
                                blurDataURL={placeholderDataUrl}
                                style={{borderRadius: 8}}
                            />

                        </Box>

                    </Box>

                </Grid>

            </Grid>

        </Container>
    )
}

export default ConferenceContent;