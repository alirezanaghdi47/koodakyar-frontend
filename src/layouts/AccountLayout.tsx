//===== libraries =====//
import {BreakPointHooks} from "@react-hooks-library/core";
import {Stack} from "@mui/material";

//===== utils =====//
import {breakpoints} from "@/utils/constants";

//===== styles =====//
import theme from "@/styles/theme";

//===== components =====//
import AccountHeader from "@/components/partial/account/AccountHeader";
import AccountSidebar from "@/components/partial/account/AccountSidebar";
const AccountLayout = (props) => {

    const {useSmaller} = BreakPointHooks(breakpoints);
    const isDesktop = useSmaller("lg");

    return (
        <Stack
            direction={isDesktop ? "column" : "row"}
            width='100%'
            minHeight="100vh"
            style={{
                background: theme.palette.background.paper
            }}
        >

            {/* sidebar & header */}
            {
                isDesktop ? (
                    <AccountHeader/>
                ) : (
                    <AccountSidebar/>
                )
            }

            {/* main */}
            <Stack
                component="main"
                direction="column"
                gap={2}
                justifyContent="start"
                alignItems="center"
                width={isDesktop ? "100%" : "calc(100% - 240px)"}
                minHeight={isDesktop ? "calc(100vh - 72px)" : "100vh"}
                style={{
                    background: theme.palette.background.paper,
                    paddingTop: theme.spacing(2),
                    paddingBottom: theme.spacing(2),
                    marginRight: "auto",
                }}
            >
                {props.children}
            </Stack>

        </Stack>
    )
}

export default AccountLayout;