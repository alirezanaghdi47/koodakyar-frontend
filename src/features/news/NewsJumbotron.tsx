//===== libraries =====//
import {Container , Grid} from "@mui/material";

//===== features =====//
import {NewsCard , NewsThumbnailCard} from "@/features/news/NewsCard";

// @ts-ignore
const NewsJumbotron = ({news , color}) => {

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
                spacing={3}
            >

                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={6}
                >

                    {/* card */}
                    <NewsThumbnailCard
                        news={news[0]}
                        color={color}
                    />

                </Grid>

                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={6}
                >

                    <Grid
                        container
                        spacing={3}
                    >

                        {
                            // @ts-ignore
                            news?.slice(1, 4).map(newsItem =>
                                <Grid
                                    key={newsItem.newsId}
                                    item
                                    xs={12}
                                >

                                    {/* card */}
                                    <NewsCard
                                        news={newsItem}
                                        color={color}
                                    />

                                </Grid>
                            )
                        }

                    </Grid>

                </Grid>

            </Grid>

        </Container>
    )
}

export default NewsJumbotron;