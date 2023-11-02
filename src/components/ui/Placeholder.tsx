//===== libraries =====//
import {Box, Container, Skeleton} from "@mui/material";
export const TablePlaceholder = () => {

    return (
        <Container
            maxWidth="lg"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                marginBottom: 16
            }}
        >

            <Skeleton
                variant="rectangular"
                width='100%'
                height={30}
                style={{
                    borderRadius: 8,
                }}
            />

            {
                Array(11).fill('').map((item, index) =>
                    <Skeleton
                        key={index}
                        variant="rectangular"
                        width='100%'
                        height={40}
                        style={{
                            borderRadius: 8,
                            marginTop: 4
                        }}
                    />
                )
            }

            <Box
                style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                    width: "100%",
                    marginTop: 16
                }}
            >

                <Skeleton
                    variant="rectangular"
                    width={120}
                    height={40}
                    style={{borderRadius: 8}}
                />

                <Skeleton
                    variant="rectangular"
                    width={120}
                    height={40}
                    style={{borderRadius: 8, marginRight: 16}}
                />

            </Box>

        </Container>
    )
}