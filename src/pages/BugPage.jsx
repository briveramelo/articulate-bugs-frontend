import React from 'react';
import BugTable from 'src/components/BugTable.jsx';
import { Box, Container } from '@mui/material';

const BugPage = () => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            width: '100%',
            padding: 2,
        }}
    >
        <Container maxWidth="lg">
            <BugTable />
        </Container>
    </Box>
);

export default BugPage;
