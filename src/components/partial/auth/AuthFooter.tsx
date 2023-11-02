//===== libraries =====//
import {Container, Typography} from "@mui/material";

const AuthFooter = () => {

    return (
        <Container
            maxWidth="md"
            component="footer"
            style={{
                display: 'flex',
                justifyContent: "center",
                alignItems: "center",
                marginTop: 16
            }}
        >

            <Typography
                variant="caption"
                color="textSecondary"
                fontWeight="bold"
                textAlign="center"
                lineHeight={2}
            >
                © 1402 - 1400 کپی بخش یا کل هر کدام از مطالب سایت تنها با کسب مجوز مکتوب امکان پذیر است
            </Typography>

        </Container>
    )
}

export default AuthFooter;