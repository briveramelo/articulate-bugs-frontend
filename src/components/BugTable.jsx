import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper
} from '@mui/material';

const severityMap = {
    'Low': 10,
    'Medium': 20,
    'High': 30,
    'Critical': 40
};

const statusMap = {
    'Open': 10,
    'In Progress': 20,
    'Resolved': 30,
    'Closed': 40
};

// Sample data
const bugs = [
    {
        id: 'BUG-001',
        description: 'App crashes on launch',
        severity: 'Critical',
        steps: 'Open app → crash',
        status: 'Open'
    },
    {
        id: 'BUG-002',
        description: 'Login form not submitting',
        severity: 'High',
        steps: 'Enter credentials → Click login → Nothing happens',
        status: 'In Progress'
    }
];

const BugTable = () => (
    <TableContainer component={Paper}>
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
                        <TableCell>{bug.id}</TableCell>
                        <TableCell>{bug.description}</TableCell>
                        <TableCell>{bug.severity}</TableCell>
                        <TableCell>{bug.steps}</TableCell>
                        <TableCell>{bug.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default BugTable;
