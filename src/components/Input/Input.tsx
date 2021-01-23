import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import {InputAdornment, TextField} from "@material-ui/core";
import './Input.scss';

interface InputProps {
    value: any,
    onChange: (val : any) => void
}

const Input : React.FC<InputProps> = ({value, onChange}) => {

    return(
        <div className="input-search">
            <TextField
                id="input-with-icon-search"
                label="Search by documents and users"
                value={value}
                onChange={onChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

export default Input;