import Image from "next/image";

//===== libraries =====//
import {Container, Box, Typography, Stack} from "@mui/material";

//===== assets =====//
import background from "@/assets/images/iran.png";
const AuthSidebar = () => {

    return (
        <Container
            maxWidth="md"
            component="aside"
            style={{
                display: 'flex',
                justifyContent: "center",
                alignItems: "end",
            }}
        >

            <Stack
                direction="column"
                gap={4}
                justifyContent="center"
                alignItems="center"
                width="100%"
            >

                <Stack
                    direction="column"
                    gap={2}
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                >

                    <Typography
                        variant="h5"
                        color="textPrimary"
                        fontWeight="bold"
                    >
                        کودکیار
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        color="textPrimary"
                        lineHeight={2}
                    >
                        شتاب دهنده اجتماعی کودکان کار
                    </Typography>

                </Stack>

                <Box className="aspect-ratio aspect-ratio__2-1">

                    <Image
                        src={background}
                        alt="auth-background"
                        fill
                    />

                </Box>

            </Stack>

        </Container>
    )
}

export default AuthSidebar;