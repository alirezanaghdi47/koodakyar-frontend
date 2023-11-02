import Image from "next/image";

//===== libraries =====//
import {Box, FormControl, MenuItem, Select, Typography} from "@mui/material";
import {FiChevronDown} from "react-icons/fi";

//===== assets =====//
import empty from "@/assets/images/empty.svg";
const SelectBox = ({label, name, value, onChange, error, touched, options, style = null}) => {

    return (
        <FormControl
            variant="outlined"
            style={style}
        >

            <Typography
                variant="subtitle2"
                color="textSecondary"
                fontWeight="bold"
                style={{marginBottom: 8}}
            >
                {label}
            </Typography>

            <Select
                variant="outlined"
                size="small"
                name={name}
                value={value}
                onChange={onChange}
                IconComponent={FiChevronDown}
                style={{width: '100%'}}
            >
                {
                    options?.length > 0 ? options.map(option =>
                        <MenuItem
                            key={option.id}
                            value={option.value}
                        >
                            {option.label}
                        </MenuItem>
                    ) : (
                        <Box
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 16
                            }}
                        >

                            <Image
                                src={empty}
                                alt="خالی"
                                width={50}
                                height={50}
                                style={{marginBottom: 8}}
                            />

                            <Typography
                                variant="subtitle2"
                                color="textPrimary"
                                fontWeight="bold"
                            >
                                داده ای یافت نشد
                            </Typography>

                        </Box>
                    )
                }
            </Select>

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

export default SelectBox;