import {useEffect, useState} from "react";
import Image from "next/image";

//===== libraries =====//
import {useDropzone} from "react-dropzone";
import {Box, FormControl, IconButton, Tooltip, Typography} from "@mui/material";
import {FiInfo} from "react-icons/fi";
const ImageInput = ({
                        hint,
                        label,
                        name,
                        value,
                        preview,
                        onChange,
                        error,
                        touched,
                        circle,
                        aspectRatio,
                        style = null,
                        previewStyle = null
                    }) => {

    const [file, setFile] = useState({});

    const {getRootProps, getInputProps, isDragActive, isFocused} = useDropzone({
        onDrop: (acceptedFiles) => {
            setFile(Object.assign(acceptedFiles[0], {
                preview: URL.createObjectURL(acceptedFiles[0])
            }));
            onChange(acceptedFiles[0]);
        },
    });

    useEffect(() => {
        // @ts-ignore
        return () => URL.revokeObjectURL(file.preview);
    }, [file]);

    return (
        <FormControl
            variant="outlined"
            style={style}
        >

            <Box
                style={{
                    display: 'flex',
                    justifyContent: "start",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: 8
                }}
            >

                {
                    hint && (
                        <Tooltip title={hint}>
                            <IconButton color="info">
                                <FiInfo size={14}/>
                            </IconButton>
                        </Tooltip>
                    )
                }

                <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    fontWeight="bold"
                >
                    {label}
                </Typography>

            </Box>

            <Box
                {...getRootProps()}
                style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    background: "#f3f4f6",
                    border: isDragActive || isFocused ? "2px solid #4f46e5" : "2px solid #e5e7eb",
                    borderRadius: circle ? "50%" : 8,
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
                        width: previewStyle?.width ? previewStyle?.width : "100%",
                        height: previewStyle?.height ? previewStyle?.height : "100%",
                    }}
                >

                    <Box className={`aspect-ratio aspect-ratio__${aspectRatio}`}>

                        {
                            (file?.preview || preview) && (
                                <Image
                                    src={file?.preview ? file?.preview : preview}
                                    alt="فایل"
                                    fill
                                    style={{borderRadius: circle ? "50%" : 8}}
                                />
                            )
                        }

                    </Box>

                </Box>

                {
                    !file?.preview && !preview && (
                        <Box
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50% , -50%)",
                                zIndex: 10,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >

                            <Typography
                                variant="body2"
                                color="textSecondary"
                                fontWeight="bold"
                            >
                                انتخاب کنید
                            </Typography>

                        </Box>
                    )
                }

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

export default ImageInput;