//===== libraries =====//
import {Container, Grid} from "@mui/material";

//===== features =====//
import {ArticleThumbnailCard} from "@/features/article/ArticleCard";

// @ts-ignore
const ArticleList = ({articles}) => {

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
                    articles?.map(articleItem =>
                        <Grid
                            key={articleItem.articleId}
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            xl={3}
                        >

                            {/* card */}
                            <ArticleThumbnailCard article={articleItem}/>

                        </Grid>
                    )
                }

            </Grid>

        </Container>
    )
}

export default ArticleList;