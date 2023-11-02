import Image from "next/image";

//===== libraries =====//
import {BarLoader} from "react-spinners";
import {Stack, Typography} from "@mui/material";

//===== assets =====//
import logo from "@/assets/images/logo.svg";
const PageLoader = () => {
    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            width="100vw"
            height="100vh"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 100,
                background: "#f9fafb"
            }}
        >

            <Image
                src={logo}
                alt="logo"
                width={80}
                height={80}
                style={{marginBottom: 16}}
            />

            <Typography
                variant="h6"
                color="textPrimary"
                fontWeight="bold"
            >
                کودکیار
            </Typography>

            <Typography
                variant="subtitle1"
                color="textPrimary"
                style={{marginBottom: 16}}
            >
                شبکه کودک یاران ایران
            </Typography>

            <BarLoader
                width={120}
                height={4}
                color="#4f46e5"
            />

        </Stack>
    )
}

export default PageLoader;