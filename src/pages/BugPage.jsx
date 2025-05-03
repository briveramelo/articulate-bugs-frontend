import React from 'react';
import BugTable from 'src/components/BugTable.jsx';
import {Box, Container, Typography} from '@mui/material';

const BugPage = () => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            minHeight: '100vh',
            width: '100%',
            padding: 2,
        }}
    >
        <Container maxWidth="lg">
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 'bold', textAlign: 'left' }}
            >
                Bug Table
            </Typography>
            <BugTable />
        </Container>
    </Box>
);

export default BugPage;
