//===== libraries =====//
import {Button, IconButton, Modal as MuiModal, Paper, Stack, Typography} from "@mui/material";
import {FiCheck, FiX} from "react-icons/fi";

// @ts-ignore
const Modal = ({
                   isOpenModal,
                   onCloseModal,
                   title,
                   cancelText,
                   submitText,
                   onSubmit,
                   onCancel,
                   loading,
                   children,
                   fullscreen,
               }) => {

    return (
        <MuiModal
            open={isOpenModal}
            style={{padding: fullscreen ? 0 : 16}}
        >

            <Paper
                elevation={0}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: "translate(-50% , -50%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "start",
                    width: fullscreen ? "100%" : "calc(100% - 32px)",
                    maxWidth: fullscreen ? "100%" : 500,
                    height: fullscreen ? "100%" : "max-content",
                    maxHeight: fullscreen ? "100vh" : "calc(100% - 32px)",
                    borderRadius: fullscreen ? 0 : 8,
                    padding: 16,
                    overflowY: "auto",

                }}
            >

                {/* header */}
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems='center'
                    style={{
                        width: "100%",
                        marginBottom: 24
                    }}
                >

                    <Typography
                        variant="body1"
                        color="textPrimary"
                        fontWeight="bold"
                    >
                        {title}
                    </Typography>

                    <IconButton
                        color="error"
                        onClick={onCloseModal}
                    >
                        <FiX size={20}/>
                    </IconButton>

                </Stack>

                {/* content */}
                {children}

                {/* footer */}
                {
                    submitText && cancelText && (
                        <Stack
                            direction="row"
                            justifyContent="end"
                            alignItems="center"
                            gap={1}
                            style={{
                                width: "100%",
                                marginTop: 24
                            }}
                        >

                            {
                                cancelText && submitText && (
                                    <Button
                                        variant="text"
                                        color="secondary"
                                        startIcon={<FiX size={16}/>}
                                        onClick={onCancel}
                                    >
                                        {cancelText}
                                    </Button>
                                )
                            }

                            {
                                submitText && onSubmit && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<FiCheck size={16}/>}
                                        disabled={loading}
                                        onClick={onSubmit}
                                    >
                                        {submitText}
                                    </Button>
                                )
                            }

                        </Stack>
                    )
                }

            </Paper>

        </MuiModal>
    )
}

export default Modal;