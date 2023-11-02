
//===== libraries =====//
import {Stack} from "@mui/material";

//===== styles =====//
import theme from "@/styles/theme";

//===== components =====//
import MainHeader from "@/components/partial/main/MainHeader";
import MainFooter from "@/components/partial/main/MainFooter";
const MainLayout = (props) => {

    return (
        <Stack
            direction="column"
            width='100%'
            minHeight="100vh"
            style={{background: theme.palette.background.paper}}
        >

            {/* header */}
            <MainHeader/>

            {/* main */}
            <Stack
                component="main"
                direction="column"
                gap={2}
                justifyContent="start"
                alignItems="center"
                width="100%"
                style={{
                    background: theme.palette.background.paper,
                    paddingTop: theme.spacing(2),
                    paddingBottom: theme.spacing(2),
                }}
            >
                {props.children}
            </Stack>

            {/* footer */}
            <MainFooter/>

        </Stack>
    )
}

export default MainLayout;