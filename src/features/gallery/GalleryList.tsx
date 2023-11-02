//===== libraries =====//
import {Container, Grid} from "@mui/material";

//===== features =====//
import {GalleryThumbnailCard} from "@/features/gallery/GalleryCard";

// @ts-ignore
const GalleryList = ({galleries}) => {

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
                    galleries?.map(galleryItem =>
                        <Grid
                            key={galleryItem.galleryId}
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            xl={3}
                        >

                            <GalleryThumbnailCard gallery={galleryItem}/>

                        </Grid>
                    )
                }

            </Grid>

        </Container>
    )
}

export default GalleryList;