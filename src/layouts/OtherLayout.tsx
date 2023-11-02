//===== libraries =====//
import {Box} from "@mui/material";

//===== styles =====//
import theme from "@/styles/theme";
const OtherLayout = (props) => {

    return (
        <Box
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                minHeight: "100vh",
                background: theme.palette.background.paper,
            }}
        >
            {props.children}
        </Box>
    )
}

export default OtherLayout;