import React, {useState} from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Box, CircularProgress, Button
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
import {useAddBug} from "src/hooks/useAddBug.js";
import ConfirmDeleteModal from 'src/components/ConfirmDeleteModal';
import { useDeleteBug } from 'src/hooks/useDeleteBug';
import DeleteIcon from '@mui/icons-material/Close';

const BugTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState(null);

    const { bugs, loading, error, refetch: reloadBugData } = useBugData();
    const { updateBug, loading: editLoading } = useEditBug();
    const filteredItems = useSearchableData(bugs, searchTerm);
    const { sortedItems, requestSort, sortConfig } = useSortableData(filteredItems);
    const [isAdding, setIsAdding] = useState(false);
    const { addBug, loading: addLoading } = useAddBug();
    const [deleteTargetId, setDeleteTargetId] = useState(null);
    const { deleteBug, loading: deleteLoading } = useDeleteBug();

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

    const handleAddBug = async (form) => {
        const nextBugNumber = bugs.length + 1; //todo: handle race condition server-side
        const bugId = `BUG-${String(nextBugNumber).padStart(3, '0')}`;

        const success = await addBug({
            'Bug ID': bugId,
            'Description': form.description,
            'Severity': form.severity,
            'Steps to Reproduce': form.steps,
            'Status': form.status,
        });
        setIsAdding(false);
        if (success) {
            reloadBugData();
        }
    }

    const handleConfirmDelete = async () => {
        if (!deleteTargetId) return;
        const success = await deleteBug(deleteTargetId);
        if (success) {
            setDeleteTargetId(null);
            reloadBugData();
        }
    };

    if (loading) return <Box textAlign="center"><CircularProgress/></Box>;
    if (error) return <Box color="error.main">Failed to load bugs.</Box>;

    return (
        <>
            <SearchBox searchTerm={searchTerm} onChange={setSearchTerm} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                <Button variant="outlined" onClick={() => setIsAdding(true)}>
                    + Add Bug
                </Button>
            </Box>
            <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    {/* Edit column */}
                    <TableCell />
                    {/* Delete column */}
                    <TableCell />
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
                {isAdding && (
                    <EditableBugRow
                        key="new"
                        onCancel={() => setIsAdding(false)}
                        onSubmit={handleAddBug}
                        loading={addLoading}
                        isNew={true}
                    />
                )}
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
                            <TableCell>
                                <IconButton onClick={() => setDeleteTargetId(bug.id)}>
                                    <DeleteIcon fontSize="small" sx={{ color: 'error.main' }} />
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
            <ConfirmDeleteModal
                open={!!deleteTargetId}
                onClose={() => setDeleteTargetId(null)}
                onConfirm={handleConfirmDelete}
                loading={deleteLoading}
            />
    </>
    )
};

export default BugTable;
