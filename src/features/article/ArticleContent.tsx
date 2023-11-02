import Image from "next/image";

//===== libraries =====//
import {Markup} from "interweave";
import {BreakPointHooks} from "@react-hooks-library/core";
import {useCopyToClipboard} from "usehooks-ts";
import {saveAs} from 'file-saver';
import {toast} from "react-hot-toast";
import {Box, Chip, Container, Grid, IconButton, Stack, Tooltip, Typography} from "@mui/material";
import {FiDownload, FiShare2, FiUser} from "react-icons/fi";
import {IoLanguage} from "react-icons/io5";
import {AiOutlineBarcode} from "react-icons/ai";

//===== utils =====//
import {convertLanguage, convertType} from "@/utils/functions";
import {breakpoints, placeholderDataUrl} from "@/utils/constants";

// @ts-ignore
const ArticleContent = ({article}) => {

    const {useSmaller} = BreakPointHooks(breakpoints);
    const isMobile = useSmaller('sm');
    const [clipboardText, copyToClipboard] = useCopyToClipboard();

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
                    style={{order: isMobile ? 2 : 1}}
                >

                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
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
                                {article?.title}
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

                                <IoLanguage
                                    size={16}
                                    color="#374151"
                                    style={{marginLeft: 8}}
                                />

                                <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    fontWeight="bold"
                                >
                                    {convertLanguage(article?.language)}
                                </Typography>

                            </Box>

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
                                    style={{marginLeft: 8}}
                                />

                                <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    fontWeight="bold"
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

                                <AiOutlineBarcode
                                    size={16}
                                    color="#374151"
                                    style={{marginLeft: 8}}
                                />

                                <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    fontWeight="bold"
                                >
                                    {article?.isbn}
                                </Typography>

                            </Box>

                        </Stack>

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
                            <Markup content={article?.description}/>
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
                                    label={convertType(article?.type)}
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
                                    label={article?.category?.title}
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
                                                    url: process.env.NEXT_PUBLIC_DOMAIN + "/article/" + article.type + "/" + article.slug,
                                                    title: article?.title,
                                                });
                                            } else {
                                                copyToClipboard(process.env.NEXT_PUBLIC_DOMAIN + "/article/" + article.type + "/" + article.slug);
                                                toast.success("کپی شد");
                                            }
                                        }}
                                        style={{marginLeft: 8}}
                                    >
                                        <FiShare2 size={16}/>
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="دانلود مقاله">
                                    <IconButton
                                        color="primary"
                                        onClick={async () => {
                                            saveAs(article?.file, `${article?.slug}.pdf`);
                                        }}
                                    >
                                        <FiDownload size={16}/>
                                    </IconButton>
                                </Tooltip>

                            </Box>

                        </Stack>

                    </Box>

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
                                src={article?.image}
                                alt={article?.title}
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

export default ArticleContent;