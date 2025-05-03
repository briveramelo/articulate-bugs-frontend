import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const EnumDropdown = ({ label, value, enumMap, onChange }) => {
    return (
        <TextField
            select
            fullWidth
            label={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            {Object.keys(enumMap).map((key) => (
                <MenuItem key={key} value={key}>
                    {key}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default EnumDropdown;
