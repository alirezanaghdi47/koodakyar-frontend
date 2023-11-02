//===== libraries =====//
import {Container, Grid} from "@mui/material";

//===== features =====//
import {NewsThumbnailCard} from "@/features/news/NewsCard";

// @ts-ignore
const NewsType = ({news}) => {

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
                spacing={2}
            >

                {
                    // @ts-ignore
                    news?.slice(0,4)?.map(newsItem =>
                        <Grid
                            key={newsItem.newsId}
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            xl={3}
                        >

                            {/* card */}
                            <NewsThumbnailCard news={newsItem}/>

                        </Grid>
                    )
                }

            </Grid>

        </Container>
    )
}

export default NewsType;