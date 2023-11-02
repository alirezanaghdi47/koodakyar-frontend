import Link from "next/link";
import Image from "next/image";

//===== libraries =====//
import {Container,Typography} from "@mui/material";

//===== styles =====//
import theme from "@/styles/theme";

//===== assets =====//
import logo from "@/assets/images/logo.svg";

const AuthHeader = () => {

    return (
        <Container
            maxWidth="md"
            component="footer"
            style={{
                display: 'flex',
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 16
            }}
        >

            <Link
                href="/"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "max-content",
                    textDecoration: "none"
                }}
            >

                <Image
                    src={logo}
                    alt="logo"
                    width={40}
                    height={40}
                />

                <Typography
                    variant="subtitle1"
                    color="textPrimary"
                    fontWeight="bold"
                    style={{marginRight: theme.spacing(1)}}
                >
                    کودکیار
                </Typography>

            </Link>

        </Container>
    )
}

export default AuthHeader;