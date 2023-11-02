//===== libraries =====//
import {Button, Dialog as MuiDialog, Paper, Stack, Typography} from "@mui/material";
import {FiCheck, FiX} from "react-icons/fi";
const Dialog = ({isOpenModal, onCloseModal, message, onSubmit}) => {

    return (
        <MuiDialog open={isOpenModal}>

            <Paper
                elevation={0}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "start",
                    width: "100%",
                    maxWidth: 300,
                    height: "max-content",
                    maxHeight: "100%",
                    borderRadius: 8,
                    padding: "16px 24px",
                }}
            >

                <Typography
                    variant="subtitle1"
                    color="textPrimary"
                    fontWeight="bold"
                    textAlign="center"
                    style={{marginBottom: 24}}
                >
                    {message}
                </Typography>

                <Stack
                    direction='row'
                    gap={2}
                    justifyContent='center'
                    alignItems="center"
                    style={{width: "100%"}}
                >

                    <Button
                        variant="text"
                        color="secondary"
                        startIcon={<FiX size={16}/>}
                        onClick={onCloseModal}
                    >
                        خیر
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<FiCheck size={16}/>}
                        onClick={onSubmit}
                    >
                        بله
                    </Button>

                </Stack>

            </Paper>

        </MuiDialog>
    )
}

export default Dialog;