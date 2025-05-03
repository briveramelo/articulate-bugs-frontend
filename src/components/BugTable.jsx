import React, {useState} from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Box, CircularProgress
} from '@mui/material';
import {useBugs} from "src/hooks/useBugData.js";
import SortableHeaderCell from "src/components/SortableHeaderCell.jsx";
import { useSortableData } from 'src/hooks/useSortableData';
import {useSearchableData} from "src/hooks/useSearchableData.js";
import SearchBox from "src/components/SearchBox.jsx";

const BugTable = () => {
    const { bugs, loading, error } = useBugs();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = useSearchableData(bugs, searchTerm);
    const { sortedItems, requestSort, sortConfig } = useSortableData(filteredItems);

    if (loading) return <Box textAlign="center"><CircularProgress/></Box>;
    if (error) return <Box color="error.main">Failed to load bugs.</Box>;

    return (
        <>
            <SearchBox searchTerm={searchTerm} onChange={setSearchTerm} />
            <TableContainer component={Paper}>
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
    </>
    )
};

export default BugTable;
