import {useState} from "react";

//===== libraries =====//
import {useDropzone} from "react-dropzone";
import {Box, FormControl, IconButton, Stack, Typography} from "@mui/material";
import {FiPlus} from "react-icons/fi";

//===== utils =====//
import {formatSize} from "@/utils/functions";

const FileInput = ({label, name, value, onChange, onSubmit , onReset, error, touched, style = null , multiple}) => {

    const [file, setFile] = useState({});

    const {getRootProps, getInputProps, isDragActive, isFocused} = useDropzone({
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles[0]);
            onChange(acceptedFiles[0]);
        },
    });

    const _handleSubmit = () => {
        onSubmit();
    }

    return (
        <FormControl
            variant="outlined"
            style={style}
        >

            <Box
                style={{
                    display: 'flex',
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: 8
                }}
            >

                <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    fontWeight="bold"
                >
                    {label}
                </Typography>

                {
                    multiple && (
                        <IconButton
                            color="secondary"
                            onClick={_handleSubmit}
                        >
                            <FiPlus size={20}/>
                        </IconButton>
                    )
                }

            </Box>

            <Box
                {...getRootProps()}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: 100,
                    background: "#f3f4f6",
                    border: isDragActive || isFocused ? "2px solid #4f46e5" : "2px solid #e5e7eb",
                    borderRadius: 8,
                    cursor: "pointer",
                    padding: 8,
                    overflow: "hidden"
                }}
            >

                <input
                    {...getInputProps({name: name})}
                    style={{display: "none"}}
                />

                <Box
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >

                    {
                        file && Object.keys(file).length > 0 ? (
                            <>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    fontWeight="bold"
                                    textAlign="center"
                                    style={{marginBottom: 8}}
                                    className="text-truncate text-truncate__1"
                                >
                                    {file?.name}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    fontWeight="bold"
                                >
                                    {formatSize(file?.size)}
                                </Typography>
                            </>
                        ) : (
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                fontWeight="bold"
                            >
                                انتخاب کنید
                            </Typography>
                        )
                    }

                </Box>

            </Box>

            {
                (touched && error) && (
                    <Typography
                        variant="caption"
                        color="error"
                        fontWeight="bold"
                        style={{marginTop: 8}}
                    >
                        {error}
                    </Typography>
                )
            }

        </FormControl>
    )
}

export default FileInput;