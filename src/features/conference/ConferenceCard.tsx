import Image from "next/image";
import Link from "next/link";

//===== libraries =====//
import {Box, Stack, Typography} from "@mui/material";
import {FiAirplay, FiClock, FiMapPin} from "react-icons/fi";

//===== utils =====//
import {convertType} from "@/utils/functions";
import {placeholderDataUrl} from "@/utils/constants";

export const ConferenceSliderContentCard = ({conference, color}) => {

    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                width: "100%",
                height: "100%",
                overflow: "hidden"
            }}
        >

            <Link
                href={process.env.NEXT_PUBLIC_DOMAIN + "/conference/" + conference?.type + "/" + conference?.slug}
                style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: 16,
                    textDecoration: "none"
                }}
            >

                <Typography
                    variant="body1"
                    color={color === "white" ? "common.white" : "common.black"}
                    fontWeight="bold"
                    lineHeight={2}
                    className="text-truncate text-truncate__2"
                >
                    {conference?.title}
                </Typography>

            </Link>

            <Stack
                direction='column'
                gap={1}
                style={{width: "100%"}}
            >

                <Box
                    style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                    }}
                >

                    <FiAirplay
                        size={16}
                        color={color === "white" ? "#e5e7eb" : "#374151"}
                    />

                    <Typography
                        variant="caption"
                        color={color === "white" ? "common.light" : "common.dark"}
                        fontWeight="bold"
                        style={{marginRight: 8}}
                    >
                        {convertType(conference?.type)}
                    </Typography>

                </Box>

                <Box
                    style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                    }}
                >

                    <FiClock
                        size={16}
                        color={color === "white" ? "#e5e7eb" : "#374151"}
                        style={{marginLeft: 8}}
                    />

                    <Typography
                        variant="caption"
                        color={color === "white" ? "common.light" : "common.dark"}
                        fontWeight="bold"
                    >
                        {conference?.time + " | " + conference?.date}
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
                        color={color === "white" ? "#e5e7eb" : "#374151"}
                        style={{marginLeft: 8}}
                    />

                    <Typography
                        variant="caption"
                        color={color === "white" ? "common.light" : "common.dark"}
                        fontWeight="bold"
                    >
                        {conference?.place}
                    </Typography>

                </Box>

            </Stack>

        </Box>
    )
}

export const ConferenceSliderImageCard = ({conference}) => {
    return (
        <Link
            href={process.env.NEXT_PUBLIC_DOMAIN + "/conference/" + conference?.type + "/" + conference?.slug}
            style={{
                width: "100%",
                height: "max-content"
            }}
        >

            <Box
                className="aspect-ratio aspect-ratio__2-3"
                style={{
                    background: "#e5e7eb",
                    borderRadius: 8,
                }}
            >

                <Image
                    src={conference?.image}
                    alt={conference?.title}
                    fill
                    placeholder="blur"
                    blurDataURL={placeholderDataUrl}
                    quality={75}
                    style={{borderRadius: 8}}
                />

            </Box>

        </Link>
    )
}

export const ConferenceThumbnailCard = ({conference}) => {

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
                href={process.env.NEXT_PUBLIC_DOMAIN + "/conference/" + conference?.type + "/" + conference?.slug}
                style={{
                    width: "100%",
                    height: "max-content"
                }}
            >

                <Box
                    className="aspect-ratio aspect-ratio__2-3"
                    style={{
                        background: "#e5e7eb",
                        borderRadius: 8,
                        marginBottom: 8
                    }}
                >

                    <Image
                        src={conference?.image}
                        alt={conference?.title}
                        fill
                        placeholder="blur"
                        quality={75}
                        blurDataURL={placeholderDataUrl}
                        style={{borderRadius: 8}}
                    />

                </Box>

            </Link>

            <Link
                href={process.env.NEXT_PUBLIC_DOMAIN + "/conference/" + conference?.type + "/" + conference?.slug}
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
                    color="textPrimary"
                    fontWeight="bold"
                    lineHeight={2}
                    className="text-truncate text-truncate__2"
                >
                    {conference?.title}
                </Typography>

            </Link>

            <Stack
                direction='column'
                gap={1}
                style={{width: "100%"}}
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
                        lineHeight={1}
                        className="text-truncate text-truncate__1"
                    >
                        {conference?.time + " | " + conference?.date}
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

        </Box>
    )
}
