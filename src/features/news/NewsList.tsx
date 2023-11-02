//===== libraries =====//
import {Container, Grid} from "@mui/material";

//===== features =====//
import {NewsThumbnailCard} from "@/features/news/NewsCard";

// @ts-ignore
const NewsList = ({news}) => {

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
                    news?.map(newsItem =>
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

export default NewsList;