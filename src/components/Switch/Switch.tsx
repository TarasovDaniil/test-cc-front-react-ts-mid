import React from 'react';
import './Switch.scss';
import {Typography} from "@material-ui/core";

interface SwitchProps {
    left: string,
    right: string,
    value: boolean,
    onChange: (val : boolean) => void
}

const Switch : React.FC<SwitchProps> = ({left, right, value, onChange}) => {

    return(
        <div className="switch">
            <div className="MuiFormControl-root">
                <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
                    <div className="area-switch">
                        <div className={"switch-active" + (value ? " switch-active__left" : " switch-active__right")}/>
                        <Typography variant="button" display="block" onClick={() => onChange(true)}>
                            {left}
                        </Typography>
                        <Typography variant="button" display="block" onClick={() => onChange(false)}>
                            {right}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Switch;