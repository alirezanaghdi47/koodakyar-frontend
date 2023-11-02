//===== libraries =====//
import {Container , Grid} from "@mui/material";

//===== features =====//
import {GalleryThumbnailCard} from "@/features/gallery/GalleryCard";

// @ts-ignore
const GalleryJumbotron = ({galleries}) => {

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
                    <GalleryThumbnailCard gallery={galleries[0]}/>

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
                            galleries.slice(1, 4).map(galleryItem =>
                                <Grid
                                    key={galleryItem.galleryId}
                                    item
                                    xs={12}
                                    md={6}
                                >

                                    {/* card */}
                                    <GalleryThumbnailCard gallery={galleryItem}/>

                                </Grid>
                            )
                        }

                    </Grid>

                </Grid>

            </Grid>

        </Container>
    )
}

export default GalleryJumbotron;