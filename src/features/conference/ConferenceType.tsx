//===== libraries =====//
import {Container, Grid} from "@mui/material";

//===== features =====//
import {ConferenceThumbnailCard} from "@/features/conference/ConferenceCard";

// @ts-ignore
const ConferenceType = ({conferences}) => {

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
                    conferences?.slice(0,4)?.map(conferenceItem =>
                        <Grid
                            key={conferenceItem.conferenceId}
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            xl={3}
                        >

                            {/* card */}
                            <ConferenceThumbnailCard conference={conferenceItem}/>

                        </Grid>
                    )
                }

            </Grid>

        </Container>
    )
}

export default ConferenceType;