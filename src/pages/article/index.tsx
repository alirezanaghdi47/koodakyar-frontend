import {Fragment} from "react";
import Head from "next/head";
import Link from "next/link";

//===== libraries =====//
import {useQuery} from "@tanstack/react-query";
import {Stack, Button} from "@mui/material";
import {FiArrowLeft} from "react-icons/fi";

//===== services =====//
import {getAllArticleBanner} from "@/services/bannerService";
import {getAllTypeArticle, getSuggestionArticle} from "@/services/articleService";

//===== utils =====//
import {convertType} from "@/utils/functions";

//===== layouts =====//
import MainLayout from "@/layouts/MainLayout";

//===== components =====//
import {BannerSlider} from "@/components/ui/Banner";
import {Heading} from "@/components/ui/Heading";
import PageLoader from "@/components/ui/PageLoader";

//===== features =====//
import ArticleSlider from "@/features/article/ArticleSlider";
import ArticleType from "@/features/article/ArticleType";

const Article = () => {

    const {
        isLoading: allArticleBannerIsLoading,
        isError: allArticleBannerIsError,
        data: allArticleBanner
    } = useQuery(["getAllArticleBanner"], () => getAllArticleBanner({limit: 3, offset: 1}));

    const {
        isLoading: suggestionArticleIsLoading,
        isError: suggestionArticleIsError,
        data: suggestionArticle
    } = useQuery(["getSuggestionArticle"], () => getSuggestionArticle({limit: 10, offset: 1}));

    const {
        isLoading: allTypeArticleIsLoading,
        isError: allTypeArticleIsError,
        data: allTypeArticle
    } = useQuery(["getAllTypeArticle"], () => getAllTypeArticle({limit: 3, offset: 1}));

    return (
        !allArticleBannerIsLoading && !allArticleBannerIsError &&
        !allTypeArticleIsLoading && !allTypeArticleIsError &&
        !suggestionArticleIsLoading && !suggestionArticleIsError
    ) ? (

        <MainLayout>

            <Head>
                <title>مقالات</title>
            </Head>

            {/* banner slider */}
            {
                allArticleBanner?.data.length > 0 && (
                    <BannerSlider banners={allArticleBanner?.data}/>
                )
            }
            {/* slider */}

            {
                suggestionArticle?.data.length > 0 && (
                    <Stack
                        direction="column"
                        gap={2}
                        width='100%'
                        style={{
                            background: "#009600",
                            paddingTop: 32,
                            paddingBottom: 32,
                            paddingRight: 16,
                            paddingLeft: 16,
                        }}
                    >

                        <Heading
                            title="پیشنهاد سردبیر"
                            color="white"
                        />

                        <ArticleSlider
                            articles={suggestionArticle?.data}
                            color="white"
                        />

                    </Stack>
                )
            }

            {/* type */}
            {
                allTypeArticle?.data.map((article, index) => {

                        return article?.articles.length > 0 && (

                            <Fragment key={index}>

                                <Heading
                                    title={` آخرین ${convertType(article?.type)} ها `}
                                    color="black"
                                    link={
                                        <Button
                                            variant="text"
                                            color="secondary"
                                            LinkComponent={Link}
                                            href={process.env.NEXT_PUBLIC_DOMAIN + `/article/${article?.type}`}
                                            endIcon={<FiArrowLeft size={16}/>}
                                        >
                                            موارد دیگر
                                        </Button>
                                    }
                                />

                                <ArticleType
                                    articles={article?.articles}
                                    color="primary"
                                />

                            </Fragment>

                        )
                    }
                )
            }

        </MainLayout>

    ) : <PageLoader/>
}

export default Article;
