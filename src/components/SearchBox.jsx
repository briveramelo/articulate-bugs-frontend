import React from 'react';
import { TextField, Box } from '@mui/material';

const SearchBox = ({ searchTerm, onChange }) => (
    <Box sx={{ mb: 2 }}>
        <TextField
            label="Search..."
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => onChange(e.target.value)}
        />
    </Box>
);

export default SearchBox;
