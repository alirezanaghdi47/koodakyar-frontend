import {useContext} from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

//===== libraries =====//
import {Container, Grid, IconButton, Stack, Typography} from "@mui/material";
import {FiMenu} from "react-icons/fi";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== styles =====//
import theme from "@/styles/theme";

//===== components =====//
const AccountDrawer = dynamic(() => import("@/components/partial/account/AccountDrawer") , {ssr: false});

//===== assets =====//
import logo from "@/assets/images/logo.svg";

const AccountHeader = () => {

    const {_onOpenDrawer} = useContext(PortalContext);

    return (
        <Stack
            component="header"
            width="100%"
            style={{
                background: theme.palette.background.default,
                borderRadius: 0,
                borderBottom: `1px solid ${theme.palette.ternary.main}`,
                paddingTop: theme.spacing(2),
                paddingBottom: theme.spacing(2),
            }}
        >

            <Container maxWidth="lg">

                <Grid
                    container
                    spacing={2}
                >

                    {/* action */}
                    <Grid
                        item
                        xs={6}
                        style={{
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center"
                        }}
                    >

                        <IconButton
                            color="secondary"
                            onClick={() => _onOpenDrawer("account")}
                        >
                            <FiMenu size={20}/>
                        </IconButton>

                        {/* drawer */}
                        <AccountDrawer/>

                    </Grid>

                    {/* logo */}
                    <Grid
                        item
                        xs={6}
                        style={{
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center"
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

                    </Grid>

                </Grid>

            </Container>

        </Stack>
    )
}

export default AccountHeader;