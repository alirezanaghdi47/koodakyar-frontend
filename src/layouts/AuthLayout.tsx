//===== libraries =====//
import {Container, Grid, Hidden} from "@mui/material";

//===== styles =====//
import theme from "@/styles/theme";

//===== components =====//
import AuthHeader from "@/components/partial/auth/AuthHeader";
import AuthSidebar from "@/components/partial/auth/AuthSidebar";
import AuthFooter from "@/components/partial/auth/AuthFooter";
const AuthLayout = (props) => {

    return (
        <Grid
            container
            spacing={0}
            style={{
                width: "100%",
                minHeight: "100vh",
            }}
        >

            <Grid
                item
                xs={12}
                md={5}
                lg={4}
                xl={4}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    minHeight: "100vh",
                    background: theme.palette.background.paper,
                    borderLeft: `1px solid ${theme.palette.ternary.main}`,
                    padding: theme.spacing(2)
                }}
            >

                {/* header */}
                <AuthHeader/>

                {/* main */}
                <Container
                    maxWidth="md"
                    component="main"
                >
                    {props.children}
                </Container>

                {/* footer */}
                <AuthFooter/>

            </Grid>

            {/* aside */}
            <Hidden mdDown>

                <Grid
                    item
                    xs={12}
                    md={7}
                    lg={8}
                    xl={8}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "end",
                        alignItems: "center",
                        width: "100%",
                        minHeight: "100vh",
                        background: theme.palette.background.default,
                        padding: theme.spacing(2),
                        paddingBottom: 0
                    }}
                >

                    {/* sidebar */}
                    <AuthSidebar/>

                </Grid>

            </Hidden>

        </Grid>
    )
}

export default AuthLayout;