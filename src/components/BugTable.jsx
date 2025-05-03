import React, {useState} from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Box, CircularProgress
} from '@mui/material';
import {useBugData} from "src/hooks/useBugData.js";
import SortableHeaderCell from "src/components/SortableHeaderCell.jsx";
import { useSortableData } from 'src/hooks/useSortableData';
import {useSearchableData} from "src/hooks/useSearchableData.js";
import SearchBox from "src/components/SearchBox.jsx";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import EditableBugRow from 'src/components/EditableBugRow';
import { useEditBug } from 'src/hooks/useEditBug';

const BugTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState(null);

    const { bugs, loading, error, refetch: reloadBugData } = useBugData();
    const { updateBug, loading: editLoading } = useEditBug();
    const filteredItems = useSearchableData(bugs, searchTerm);
    const { sortedItems, requestSort, sortConfig } = useSortableData(filteredItems);

    const handleEditSubmit = async (form) => {
        if (editLoading) return; // Prevent duplicate submits

        const success = await updateBug(editingId, {
            'Description': form.description,
            'Severity': form.severity,
            'Steps to Reproduce': form.steps,
            'Status': form.status
        });

        if (success) {
            setEditingId(null);
            reloadBugData();
        }
    };

    if (loading) return <Box textAlign="center"><CircularProgress/></Box>;
    if (error) return <Box color="error.main">Failed to load bugs.</Box>;

    return (
        <>
            <SearchBox searchTerm={searchTerm} onChange={setSearchTerm} />
            <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell /> {/* Edit icon column */}
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
                {sortedItems.map((bug) =>
                    editingId === bug.id ? (
                        <EditableBugRow
                            key={bug.id}
                            bug={bug}
                            onCancel={() => setEditingId(null)}
                            onSubmit={handleEditSubmit}
                            loading={editLoading}
                        />
                    ) : (
                        <TableRow key={bug.id}>
                            <TableCell>
                                <IconButton onClick={() => setEditingId(bug.id)}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </TableCell>
                            <TableCell>{bug.bugId}</TableCell>
                            <TableCell>{bug.description}</TableCell>
                            <TableCell>{bug.severity}</TableCell>
                            <TableCell>{bug.steps}</TableCell>
                            <TableCell>{bug.status}</TableCell>
                        </TableRow>
                    )
                )}
            </TableBody>
        </Table>
    </TableContainer>
    </>
    )
};

export default BugTable;
