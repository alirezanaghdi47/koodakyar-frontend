//===== libraries =====//
import {MobileDatePicker, PickersActionBarProps} from "@mui/x-date-pickers";
import {useLocaleText} from "@mui/x-date-pickers/internals";
import {Button, FormControl, Typography, Stack} from "@mui/material";
import {FiX, FiCheck} from "react-icons/fi";

//===== utils =====//
import {getDateFromIsoString, getIsoStringFromDate} from "@/utils/functions";
const CustomActionBar = ({onAccept, onCancel, actions, className}: PickersActionBarProps) => {

    const localeText = useLocaleText();

    if (actions === null || actions.length === 0) {
        return null;
    }

    const actionButtons = actions?.map((actionType) => {
        switch (actionType) {
            case 'cancel':
                return (
                    <Button
                        key={actionType}
                        variant="text"
                        color="secondary"
                        startIcon={<FiX size={16}/>}
                        onClick={onCancel}
                    >
                        {localeText.cancelButtonLabel}
                    </Button>
                );
            case 'accept':
                return (
                    <Button
                        key={actionType}
                        variant="contained"
                        color="primary"
                        startIcon={<FiCheck size={16}/>}
                        onClick={onAccept}
                    >
                        {localeText.okButtonLabel}
                    </Button>
                );
            default:
                return null;
        }
    });

    return (
        <Stack
            direction='row'
            justifyContent="end"
            alignItems='center'
            gap={1}
            className={className}
            style={{
                width: "100%",
                padding: 16
            }}
        >
            {actionButtons}
        </Stack>
    );
}

const DatePicker = ({label, name, value, onChange, error, touched, disabled = false, style = null}) => {

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

            <MobileDatePicker
                value={value ? getIsoStringFromDate(value): null}
                onChange={(value) => onChange(getDateFromIsoString(value))}
                format="yyyy/MM/dd"
                localeText={{
                    cancelButtonLabel: "انصراف",
                    okButtonLabel: "ثبت",
                    toolbarTitle: '',
                    fieldYearPlaceholder: () => "",
                    fieldMeridiemPlaceholder: () => "",
                    fieldMonthPlaceholder: () => "",
                    fieldDayPlaceholder: () => "",
                }}
                dayOfWeekFormatter={(day) =>  {
                    switch (day){
                        case "ش":
                            return "ش";
                        case "1ش":
                            return "ی";
                        case "2ش":
                            return "د";
                        case "3ش":
                            return "س";
                        case "4ش":
                            return "چ";
                        case "5ش":
                            return "پ";
                        case "ج":
                            return "ج";
                        default:
                            return null;
                    }
                }}
                disabled={disabled}
                slots={{actionBar: CustomActionBar}}
                slotProps={{
                    textField: {
                        color: "primary",
                        variant: "outlined",
                        size: 'small',
                        placeholder: "",
                        name: name,
                    },
                    actionBar: {
                        actions: ['cancel', 'accept']
                    }
                }}
            />

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

export default DatePicker;