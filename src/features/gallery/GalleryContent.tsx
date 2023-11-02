import {useContext} from "react";
import Image from "next/image";
import Link from "next/link";

//===== libraries =====//
import {Markup} from "interweave";
import {BreakPointHooks} from "@react-hooks-library/core";
import {useCopyToClipboard} from "usehooks-ts";
import {toast} from "react-hot-toast";
import {Box, Button, Chip, Container, Grid, IconButton, Stack, Tooltip, Typography} from "@mui/material";
import {FiCalendar, FiGlobe, FiImage, FiShare2, FiUser} from "react-icons/fi";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== utils =====//
import {convertType} from "@/utils/functions";
import {breakpoints, placeholderDataUrl} from "@/utils/constants";

//===== components =====//
import VideoPlayer from "@/components/ui/VideoPlayer";
import ImageSlideshow from "@/components/ui/ImageSlideshow";
export const GalleryContentVideo = ({gallery}) => {

    const [clipboardText, copyToClipboard] = useCopyToClipboard();

    return (
        <Container
            maxWidth="lg"
            style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                marginBottom: 16
            }}
        >

            <Box
                style={{
                    display: 'flex',
                    justifyContent: "center",
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
                    {gallery?.title}
                </Typography>

            </Box>

            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                gap={2}
                style={{
                    width: "100%",
                    marginBottom: 16,
                }}
            >

                <Box
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >

                    <FiUser
                        size={16}
                        color="#374151"
                    />

                    <Typography
                        variant="caption"
                        color="textSecondary"
                        fontWeight="bold"
                        style={{marginRight: 8}}
                    >
                        {gallery?.author}
                    </Typography>

                </Box>

                <Box
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >

                    <FiCalendar
                        size={16}
                        color="#374151"
                        style={{marginLeft: 8}}
                    />

                    <Typography
                        variant="caption"
                        color="textSecondary"
                        fontWeight="bold"
                    >
                        {gallery?.updateDate}
                    </Typography>

                </Box>

            </Stack>

            <Box
                style={{
                    width: "100%",
                    borderRadius: 8,
                    marginBottom: 16,
                    overflow: "hidden"
                }}
            >

                {/* video player */}
                <VideoPlayer
                    src={gallery?.files[0]}
                    poster={gallery?.image}
                />

            </Box>

            <Box
                className="ProseMirror__output"
                style={{marginBottom: 16}}
            >
                <Markup content={gallery?.content}/>
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
                        label={convertType(gallery?.type)}
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
                        label={gallery?.category?.title}
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
                                        url: process.env.NEXT_PUBLIC_DOMAIN + "/gallery/" + gallery.type + "/" + gallery.slug,
                                        title: gallery?.title,
                                    });
                                } else {
                                    copyToClipboard(process.env.NEXT_PUBLIC_DOMAIN + "/gallery/" + gallery.type + "/" + gallery.slug);
                                    toast.success("کپی شد");
                                }
                            }}
                        >
                            <FiShare2 size={16}/>
                        </IconButton>
                    </Tooltip>

                    {
                        gallery?.source && (
                            <Tooltip title={decodeURI(gallery?.source)}>
                                <IconButton
                                    color="primary"
                                    component={Link}
                                    href={gallery?.source}
                                >
                                    <FiGlobe size={16}/>
                                </IconButton>
                            </Tooltip>
                        )
                    }

                </Box>

            </Stack>

        </Container>
    )
}

export const GalleryContentImage = ({gallery}) => {

    const {isOpenModal, _onOpenModal, _onCloseModal} = useContext(PortalContext);
    const [clipboardText, copyToClipboard] = useCopyToClipboard();

    return (
        <Container
            maxWidth="lg"
            style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                marginBottom: 16
            }}
        >

            <Box
                style={{
                    display: 'flex',
                    justifyContent: "center",
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
                    {gallery?.title}
                </Typography>

            </Box>

            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                gap={2}
                style={{
                    width: "100%",
                    marginBottom: 16,
                }}
            >

                <Box
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >

                    <FiUser
                        size={16}
                        color="#374151"
                    />

                    <Typography
                        variant="caption"
                        color="textSecondary"
                        fontWeight="bold"
                        style={{marginRight: 8}}
                    >
                        {gallery?.author}
                    </Typography>

                </Box>

                <Box
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >

                    <FiCalendar
                        size={16}
                        color="#374151"
                        style={{marginLeft: 8}}
                    />

                    <Typography
                        variant="caption"
                        color="textSecondary"
                        fontWeight="bold"
                    >
                        {gallery?.updateDate}
                    </Typography>

                </Box>

            </Stack>

            <Box
                className="aspect-ratio aspect-ratio__4-3"
                style={{
                    background: "#e5e7eb",
                    borderRadius: 8,
                    marginBottom: 16
                }}
            >

                <Image
                    src={gallery?.image}
                    alt={gallery?.title}
                    fill
                    placeholder="blur"
                    blurDataURL={placeholderDataUrl}
                    style={{borderRadius: 8}}
                />

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FiImage size={16}/>}
                    style={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        zIndex: 10
                    }}
                    onClick={() => _onOpenModal("show")}
                >
                    {gallery?.files?.length} عکس
                </Button>

            </Box>

            <Box
                className="ProseMirror__output"
                style={{marginBottom: 16}}
            >
                <Markup content={gallery?.content}/>
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
                        label={convertType(gallery?.type)}
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
                        label={gallery?.category?.title}
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
                                        url: process.env.NEXT_PUBLIC_DOMAIN + "/gallery/" + gallery.type + "/" + gallery.slug,
                                        title: gallery?.title,
                                    });
                                } else {
                                    copyToClipboard(process.env.NEXT_PUBLIC_DOMAIN + "/gallery/" + gallery.type + "/" + gallery.slug);
                                    toast.success("کپی شد");
                                }
                            }}
                        >
                            <FiShare2 size={16}/>
                        </IconButton>
                    </Tooltip>

                    {
                        gallery?.source && (
                            <Tooltip title={decodeURI(gallery?.source)}>
                                <IconButton
                                    color="primary"
                                    component={Link}
                                    href={gallery?.source}
                                >
                                    <FiGlobe size={16}/>
                                </IconButton>
                            </Tooltip>
                        )
                    }

                </Box>

            </Stack>

            {/* image slideshow */}
            <ImageSlideshow
                title={gallery?.title}
                slides={gallery?.files}
                isOpen={isOpenModal("show")}
                onClose={_onCloseModal}
                aspectRatio="4-3"
            />

        </Container>
    )
}

export const GalleryContentInfography = ({gallery}) => {

    const [clipboardText, copyToClipboard] = useCopyToClipboard();
    const {useSmaller} = BreakPointHooks(breakpoints);
    const isMobile = useSmaller('sm');

    return (
        <Container
            maxWidth="lg"
            style={{
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
                            {gallery?.title}
                        </Typography>

                    </Box>

                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="start"
                        gap={2}
                        style={{
                            width: "100%",
                            marginBottom: 16,
                        }}
                    >

                        <Box
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >

                            <FiUser
                                size={16}
                                color="#374151"
                            />

                            <Typography
                                variant="caption"
                                color="textSecondary"
                                fontWeight="bold"
                                style={{marginRight: 8}}
                            >
                                {gallery?.author}
                            </Typography>

                        </Box>

                        <Box
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >

                            <FiCalendar
                                size={16}
                                color="#374151"
                                style={{marginLeft: 8}}
                            />

                            <Typography
                                variant="caption"
                                color="textSecondary"
                                fontWeight="bold"
                            >
                                {gallery?.updateDate}
                            </Typography>

                        </Box>

                    </Stack>

                    <Box
                        className="ProseMirror__output"
                        style={{marginBottom: 16}}
                    >
                        <Markup content={gallery?.content}/>
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
                                label={convertType(gallery?.type)}
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
                                label={gallery?.category?.title}
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
                                                url: process.env.NEXT_PUBLIC_DOMAIN + "/gallery/" + gallery.type + "/" + gallery.slug,
                                                title: gallery?.title,
                                            });
                                        } else {
                                            copyToClipboard(process.env.NEXT_PUBLIC_DOMAIN + "/gallery/" + gallery.type + "/" + gallery.slug);
                                            toast.success("کپی شد");
                                        }
                                    }}
                                    style={{marginLeft: 8}}
                                >
                                    <FiShare2 size={16}/>
                                </IconButton>
                            </Tooltip>

                            {
                                gallery?.source && (
                                    <Tooltip title={decodeURI(gallery?.source)}>
                                        <IconButton
                                            color="primary"
                                            component={Link}
                                            href={gallery?.source}
                                        >
                                            <FiGlobe size={16}/>
                                        </IconButton>
                                    </Tooltip>
                                )
                            }

                        </Box>

                    </Stack>

                </Grid>

                {/* image */}
                <Grid
                    item
                    xs={12}
                    sm={6}
                    lg={5}
                    style={{order: isMobile ? 1 : 2}}
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

                        <Box
                            className="aspect-ratio aspect-ratio__3-4"
                            style={{
                                background: "#e5e7eb",
                                borderRadius: 8
                            }}
                        >

                            <Image
                                src={gallery?.image}
                                alt={gallery?.title}
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