//===== libraries =====//
import {useCountDown} from "ahooks";
import {Box, Grid, Typography} from "@mui/material";
const CountdownItem = (props) => (
    <Grid
        item
        xs={3}
        style={{
            display: 'flex',
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}
    >

        <Box
            style={{
                display: "flex",
                justifyContent: 'center',
                alignItems: "center",
                width: 40,
                height: 40,
                background: "#1e293b",
                borderRadius: 8,
                marginBottom: 8
            }}
        >
            <Typography
                variant="body1"
                color="#fafafa"
                fontWeight="bold"
            >
                {props.value}
            </Typography>
        </Box>

        <Typography
            variant="caption"
            color="textSecondary"
            fontWeight="bold"
        >
            {props.label}
        </Typography>

    </Grid>
);

// @ts-ignore
const Countdown = ({timestamp , message}) => {

    const [countdown, {
        days,
        hours,
        minutes,
        seconds
    }] = useCountDown({targetDate: timestamp});

    return countdown > 0 ? (
        <Grid
            container
            spacing={1}
            style={{
                width: 240,
                marginBottom: 16
            }}
        >

            <CountdownItem label="ثانیه" value={seconds}/>

            <CountdownItem label="دقیقه" value={minutes}/>

            <CountdownItem label="ساعت" value={hours}/>

            <CountdownItem label="روز" value={days}/>

        </Grid>
    ) : (
        <Typography
            variant="body1"
            color="textSecondary"
            fontWeight="bold"
            style={{marginBottom: 16}}
        >
            {message}
        </Typography>
    )
}

export default Countdown;