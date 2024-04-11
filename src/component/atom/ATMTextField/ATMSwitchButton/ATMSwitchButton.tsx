import { FormControlLabel, Switch,FormGroup } from '@mui/material';
import React from 'react'
import { styled } from "@mui/material/styles";
type Props = {}

const ATMSwitchButton = (props: Props) => {
    const IOSSwitch = styled((props: any) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
        width: 38,
        height: 22,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[300]
                        : theme.palette.grey[500],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 18,
            height: 18
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }));

    return (
          <FormGroup>
            <FormControlLabel
                control={<IOSSwitch />}
                label=""
                
            />
        </FormGroup>
    )
}

export default ATMSwitchButton