import Image from "next/image";
import Link from "next/link";

//===== libraries =====//
import {BreakPointHooks} from "@react-hooks-library/core";
import {Box, Typography, Grid, Stack} from "@mui/material";
import {FiCalendar, FiLayers} from "react-icons/fi";

//===== utils =====//
import {breakpoints, placeholderDataUrl} from "@/utils/constants";

// @ts-ignore
export const NewsSliderCard = ({news, color}) => {

    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                width: "100%",
                height: "100%",
                overflow: "hidden"
            }}
        >

            <Link
                href={process.env.NEXT_PUBLIC_DOMAIN + "/news/" + news?.type + "/" + news?.slug}
                style={{
                    width: "100%",
                    height: "max-content"
                }}
            >

                <Box
                    className="aspect-ratio aspect-ratio__4-3"
                    style={{
                        background: "#e5e7eb",
                        borderRadius: 8,
                        marginBottom: 8
                    }}
                >

                    <Image
                        src={news?.thumbnail}
                        alt={news?.title}
                        fill
                        placeholder="blur"
                        quality={75}
                        blurDataURL={placeholderDataUrl}
                        style={{borderRadius: 8}}
                    />

                </Box>

            </Link>

            <Link
                href={process.env.NEXT_PUBLIC_DOMAIN + "/news/" + news?.type + "/" + news?.slug}
                style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: 16,
                    textDecoration: "none",
                }}
            >

                <Typography
                    variant="body2"
                    color={color === "white" ? "common.white" : "common.black"}
                    fontWeight="bold"
                    lineHeight={2}
                    className="text-truncate text-truncate__2"
                >
                    {news?.title}
                </Typography>

            </Link>

            <Stack
                direction='column'
                gap={1}
                style={{
                    width: "100%",
                    marginBottom: 16
                }}
            >

                <Box
                    style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                    }}
                >

                    {
                        news?.category?.icon ? (
                            <Image
                                src={news?.category?.icon}
                                alt={news?.category?.title}
                                width={16}
                                height={16}
                            />
                        ) : (
                            <FiLayers
                                size={16}
                                color={color === "white" ? "#e5e7eb" : "#374151"}
                            />
                        )
                    }

                    <Typography
                        variant="caption"
                        color={color === "white" ? "common.light" : "common.dark"}
                        fontWeight="bold"
                        style={{marginRight: 8}}
                    >
                        {news?.category?.title}
                    </Typography>

                </Box>

                <Box
                    style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                    }}
                >

                    <FiCalendar
                        size={16}
                        color={color === "white" ? "#e5e7eb" : "#374151"}
                        style={{marginLeft: 8}}
                    />

                    <Typography
                        variant="caption"
                        color={color === "white" ? "common.light" : "common.dark"}
                        fontWeight="bold"
                        lineHeight={1}
                        className="text-truncate text-truncate__1"
                    >
                        {news?.createDate}
                    </Typography>

                </Box>

            </Stack>

        </Box>
    )
}

export const NewsThumbnailCard = ({news, color}) => {

    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                width: "100%",
                height: "100%",
                borderRadius: 8,
                overflow: "hidden"
            }}
        >

            <Link
                href={process.env.NEXT_PUBLIC_DOMAIN + "/news/" + news?.type + "/" + news?.slug}
                style={{
                    width: "100%",
                    height: "max-content"
                }}
            >

                <Box
                    className="aspect-ratio aspect-ratio__4-3"
                    style={{
                        background: "#e5e7eb",
                        borderRadius: 8,
                        marginBottom: 8
                    }}
                >

                    <Image
                        src={news?.thumbnail}
                        alt={news?.title}
                        fill
                        placeholder="blur"
                        quality={75}
                        blurDataURL={placeholderDataUrl}
                        style={{borderRadius: 8}}
                    />

                </Box>

            </Link>

            <Link
                href={process.env.NEXT_PUBLIC_DOMAIN + "/news/" + news?.type + "/" + news?.slug}
                style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: 16,
                    textDecoration: "none",
                }}
            >

                <Typography
                    variant="body2"
                    color={color === "white" ? "common.white" : "common.black"}
                    fontWeight="bold"
                    lineHeight={2}
                    className="text-truncate text-truncate__2"
                >
                    {news?.title}
                </Typography>

            </Link>

            <Stack
                direction='column'
                gap={1}
                style={{
                    width: "100%",
                    marginTop: "auto"
                }}
            >

                <Box
                    style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                    }}
                >

                    {
                        news?.category?.icon ? (
                            <Image
                                src={news?.category?.icon}
                                alt={news?.category?.title}
                                width={16}
                                height={16}
                            />
                        ) : (
                            <FiLayers
                                size={16}
                                color={color === "white" ? "#e5e7eb" : "#374151"}
                            />
                        )
                    }

                    <Typography
                        variant="caption"
                        color={color === "white" ? "common.light" : "common.dark"}
                        fontWeight="bold"
                        style={{marginRight: 8}}
                    >
                        {news?.category?.title}
                    </Typography>

                </Box>

                <Box
                    style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                    }}
                >

                    <FiCalendar
                        size={16}
                        color={color === "white" ? "#e5e7eb" : "#374151"}
                        style={{marginLeft: 8}}
                    />

                    <Typography
                        variant="caption"
                        color={color === "white" ? "common.light" : "common.dark"}
                        fontWeight="bold"
                        lineHeight={1}
                        className="text-truncate text-truncate__1"
                    >
                        {news?.createDate}
                    </Typography>

                </Box>

            </Stack>

        </Box>
    )
}

export const NewsCard = ({news, color}) => {

    const {useSmaller} = BreakPointHooks(breakpoints);
    const isMobile = useSmaller('sm');

    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "start",
                width: "100%",
                height: "100%",
                borderRadius: 8,
                overflow: "hidden",
            }}
        >

            <Grid
                container
                spacing={1}
            >

                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={7}
                    lg={7}
                    style={{order: isMobile ? 2 : 1}}
                >

                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "start",
                            width: "100%",
                            height: "100%",
                            marginLeft: 16,
                        }}
                    >

                        <Link
                            href={process.env.NEXT_PUBLIC_DOMAIN + "/news/" + news?.type + "/" + news?.slug}
                            style={{
                                display: "flex",
                                justifyContent: "start",
                                alignItems: "center",
                                width: "100%",
                                marginBottom: 16,
                                textDecoration: "none",
                            }}
                        >

                            <Typography
                                variant="body2"
                                color={color === "white" ? "common.white" : "common.black"}
                                fontWeight="bold"
                                lineHeight={2}
                                className="text-truncate text-truncate__2"
                            >
                                {news?.title}
                            </Typography>

                        </Link>

                        <Stack
                            direction='column'
                            gap={1}
                            style={{
                                width: "100%",
                                marginTop: "auto"
                            }}
                        >

                            <Box
                                style={{
                                    display: "flex",
                                    justifyContent: "start",
                                    alignItems: "center",
                                }}
                            >

                                {
                                    news?.category?.icon ? (
                                        <Image
                                            src={news?.category?.icon}
                                            alt={news?.category?.title}
                                            width={16}
                                            height={16}
                                        />
                                    ) : (
                                        <FiLayers
                                            size={16}
                                            color={color === "white" ? "#e5e7eb" : "#374151"}
                                        />
                                    )
                                }

                                <Typography
                                    variant="caption"
                                    color={color === "white" ? "common.light" : "common.dark"}
                                    fontWeight="bold"
                                    style={{marginRight: 8}}
                                >
                                    {news?.category?.title}
                                </Typography>

                            </Box>

                            <Box
                                style={{
                                    display: "flex",
                                    justifyContent: "start",
                                    alignItems: "center",
                                    marginLeft: 16
                                }}
                            >

                                <FiCalendar
                                    size={16}
                                    color={color === "white" ? "#e5e7eb" : "#374151"}
                                    style={{marginLeft: 8}}
                                />

                                <Typography
                                    variant="caption"
                                    color={color === "white" ? "common.light" : "common.dark"}
                                    fontWeight="bold"
                                    lineHeight={1}
                                    className="text-truncate text-truncate__1"
                                >
                                    {news?.createDate}
                                </Typography>

                            </Box>

                        </Stack>

                    </Box>

                </Grid>

                <Grid
                    item
                    xs={12}
                    sm={4}
                    md={5}
                    lg={5}
                    style={{order: isMobile ? 1 : 2}}
                >

                    <Link
                        href={process.env.NEXT_PUBLIC_DOMAIN + "/news/" + news?.type + "/" + news?.slug}
                        style={{
                            width: "100%",
                            height: "max-content"
                        }}
                    >

                        <Box
                            className="aspect-ratio aspect-ratio__4-3"
                            style={{
                                background: "#e5e7eb",
                                borderRadius: 8,
                            }}
                        >

                            <Image
                                src={news?.thumbnail}
                                alt={news?.title}
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

        </Box>
    )
}
