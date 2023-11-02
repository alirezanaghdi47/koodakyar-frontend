import React from "react";
import Image from "next/image";
import Link from "next/link";

//===== libraries =====//
import {Box, Stack, Typography} from "@mui/material";
import {FiUser} from "react-icons/fi";
import {IoLanguage} from "react-icons/io5";

//===== utils =====//
import {placeholderDataUrl} from "@/utils/constants";
import {convertLanguage} from "@/utils/functions";

export const ArticleSliderCard = ({article, color}) => {

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
                href={process.env.NEXT_PUBLIC_DOMAIN + "/article/" + article?.type + "/" + article?.slug}
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
                        src={article?.image}
                        alt={article?.title}
                        fill
                        placeholder="blur"
                        quality={75}
                        blurDataURL={placeholderDataUrl}
                        style={{borderRadius: 8}}
                    />

                </Box>

            </Link>

            <Link
                href={process.env.NEXT_PUBLIC_DOMAIN + "/article/" + article?.type + "/" + article?.slug}
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
                    {article?.title}
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

                    <FiUser
                        size={16}
                        color={color === "white" ? "#e5e7eb" : "#374151"}
                    />

                    <Typography
                        variant="caption"
                        color={color === "white" ? "common.light" : "common.dark"}
                        fontWeight="bold"
                        style={{marginRight: 8}}
                    >
                        {article?.authors}
                    </Typography>

                </Box>

                <Box
                    style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                    }}
                >

                    <IoLanguage
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
                        {convertLanguage(article?.language)}
                    </Typography>

                </Box>

            </Stack>

        </Box>
    )
}

export const ArticleThumbnailCard = ({article}) => {

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
                href={process.env.NEXT_PUBLIC_DOMAIN + "/article/" + article?.type + "/" + article?.slug}
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
                        src={article?.image}
                        alt={article?.title}
                        fill
                        placeholder="blur"
                        quality={75}
                        blurDataURL={placeholderDataUrl}
                        style={{borderRadius: 8}}
                    />

                </Box>

            </Link>

            <Link
                href={process.env.NEXT_PUBLIC_DOMAIN + "/article/" + article?.type + "/" + article?.slug}
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
                    {article?.title}
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
                        {article?.authors}
                    </Typography>

                </Box>

                <Box
                    style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                    }}
                >

                    <IoLanguage
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
                        {convertLanguage(article?.language)}
                    </Typography>

                </Box>

            </Stack>

        </Box>
    )
}