import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Box, CircularProgress
} from '@mui/material';
import {useBugs} from "src/hooks/useBugData.js";
import SortableHeaderCell from "src/components/SortableHeaderCell.jsx";
import { useSortableData } from 'src/hooks/useSortableData';

const BugTable = () => {
    const { bugs, loading, error } = useBugs();
    const { sortedItems, requestSort, sortConfig } = useSortableData(bugs);

    if (loading) return <Box textAlign="center"><CircularProgress/></Box>;
    if (error) return <Box color="error.main">Failed to load bugs.</Box>;

    return (<TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <SortableHeaderCell
                        columnKey="bugId"
                        label="Bug ID"
                        sortConfig={sortConfig}
                        onRequestSort={requestSort}
                    />
                    <TableCell>Description</TableCell>
                    <SortableHeaderCell
                        columnKey="severity"
                        label="Severity"
                        sortConfig={sortConfig}
                        onRequestSort={requestSort}
                    />
                    <TableCell>Steps to Reproduce</TableCell>
                    <SortableHeaderCell
                        columnKey="status"
                        label="Status"
                        sortConfig={sortConfig}
                        onRequestSort={requestSort}
                    />
                </TableRow>
            </TableHead>
            <TableBody>
                {sortedItems.map((bug) => (
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
