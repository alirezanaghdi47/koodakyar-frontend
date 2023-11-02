import Link from "next/link";
import Image from "next/image";

//===== libraries =====//
import {Markup} from "interweave";
import {useCopyToClipboard} from "usehooks-ts";
import {toast} from "react-hot-toast";
import {Container, Box, Chip, IconButton, Stack, Tooltip, Typography} from "@mui/material";
import {FiCalendar, FiGlobe, FiShare2, FiUser} from "react-icons/fi";

//===== utils =====//
import {placeholderDataUrl} from "@/utils/constants";
import {convertType} from "@/utils/functions";

// @ts-ignore
const NewsContent = ({news}) => {

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
                    {news?.title}
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

                    {
                        news?.user?.userAvatar ? (
                            <Image
                                src={news?.user?.userAvatar}
                                alt="avatar"
                                width={16}
                                height={16}
                                quality={25}
                                style={{borderRadius: "50%"}}
                            />
                        ) : (
                            <FiUser
                                size={16}
                                color="#374151"
                            />
                        )
                    }

                    <Typography
                        variant="caption"
                        color="textSecondary"
                        fontWeight="bold"
                        style={{marginRight: 8}}
                    >
                        {news?.user?.firstName + " " + news?.user?.lastName}
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
                        {news?.createDate}
                    </Typography>

                </Box>

            </Stack>

            <Box
                className="aspect-ratio aspect-ratio__4-3"
                style={{
                    background: "#e5e7eb",
                    borderRadius: 8,
                    marginBottom: 16,
                }}
            >

                <Image
                    src={news?.thumbnail}
                    alt={news?.title}
                    fill
                    placeholder="blur"
                    blurDataURL={placeholderDataUrl}
                    style={{borderRadius: 8}}
                />

            </Box>

            <Box
                className="ProseMirror__output"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    maxWidth: '1200px',
                    marginBottom: 16
                }}
            >
                <Markup content={news?.content}/>
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
                        label={convertType(news?.type)}
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
                        label={news?.category?.title}
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
                                        url: process.env.NEXT_PUBLIC_DOMAIN + "/news/" + news.type + "/" + news.slug,
                                        title: news?.title,
                                    });
                                } else {
                                    copyToClipboard(process.env.NEXT_PUBLIC_DOMAIN + "/news/" + news.type + "/" + news.slug);
                                    toast.success("کپی شد");
                                }
                            }}
                        >
                            <FiShare2 size={16}/>
                        </IconButton>
                    </Tooltip>

                    {
                        news?.source && (
                            <Tooltip title={decodeURI(news?.source)}>
                                <IconButton
                                    color="primary"
                                    component={Link}
                                    href={news?.source}
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

export default NewsContent;