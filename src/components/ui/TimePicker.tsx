//===== libraries =====//
import {MobileTimePicker, PickersActionBarProps} from "@mui/x-date-pickers";
import {Button, FormControl, Stack, TextField, Typography} from "@mui/material";
import {getIsoStringFromTime ,getTimeFromIsoString} from "@/utils/functions";
import {useLocaleText} from "@mui/x-date-pickers/internals";
import {FiCheck, FiX} from "react-icons/fi";

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

const TimePicker = ({label, name, value, onChange, error, touched, disabled = false, style = null}) => {

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

            {/*<TextField*/}
            {/*    variant="outlined"*/}
            {/*    color="primary"*/}
            {/*    size="small"*/}
            {/*    name={name}*/}
            {/*    disabled={disabled}*/}
            {/*    InputProps={{*/}
            {/*        readOnly: true,*/}
            {/*    }}*/}
            {/*    value={value}*/}
            {/*    onChange={onChange}*/}
            {/*/>*/}

            <MobileTimePicker
                value={value ? getIsoStringFromTime(value) : null}
                onChange={(value) => onChange(getTimeFromIsoString(value))}
                format="HH:mm"
                ampm={false}
                localeText={{
                    cancelButtonLabel: "انصراف",
                    okButtonLabel: "ثبت",
                    toolbarTitle: '',
                    fieldHoursPlaceholder: () => "",
                    fieldMeridiemPlaceholder: () => "",
                    fieldMinutesPlaceholder: () => "",
                    fieldSecondsPlaceholder: () => ""
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
                        actions: ['cancel' , 'accept']
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

export default TimePicker;