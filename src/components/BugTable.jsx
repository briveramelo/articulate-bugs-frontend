import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Box, CircularProgress
} from '@mui/material';
import {useBugs} from "src/hooks/useBugData.js";

const BugTable = () => {
    const {bugs, loading, error} = useBugs();

    if (loading) return <Box textAlign="center"><CircularProgress/></Box>;
    if (error) return <Box color="error.main">Failed to load bugs.</Box>;

    return (<TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Bug ID</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Severity</TableCell>
                    <TableCell>Steps to Reproduce</TableCell>
                    <TableCell>Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {bugs.map((bug) => (
                    <TableRow key={bug.id}>
                        <TableCell>{bug.bugId}</TableCell>
                        <TableCell>{bug.description}</TableCell>
                        <TableCell>{bug.severity}</TableCell>
                        <TableCell>{bug.steps}</TableCell>
                        <TableCell>{bug.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    )
};

export default BugTable;
