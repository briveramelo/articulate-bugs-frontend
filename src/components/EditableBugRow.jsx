import React, { useState, useEffect, useRef } from 'react';
import {
    TableRow, TableCell, TextField, Button, Box
} from '@mui/material';
import EnumDropdown from 'src/components/EnumDropdown';
import { SeverityMap, StatusMap } from 'src/models/bugEnums';

const EditableBugRow = ({ bug = {}, onCancel, onSubmit, loading, isNew = false }) => {
    const [form, setForm] = useState({
        description: bug.description || '',
        severity: bug.severity || '',
        steps: bug.steps || '',
        status: bug.status || '',
    });

    const firstInputRef = useRef(null);

    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, []);

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const isValid = Object.values(form).every((v) => v.trim() !== '');

    return (
        <>
            <TableRow>
                <TableCell />
                <TableCell>{isNew ? '—' : bug.bugId}</TableCell>
                <TableCell>
                    <TextField
                        fullWidth
                        multiline
                        value={form.description}
                        onChange={handleChange('description')}
                        inputRef={firstInputRef}
                    />
                </TableCell>
                <TableCell>
                    <EnumDropdown
                        label="Severity"
                        value={form.severity}
                        enumMap={SeverityMap}
                        onChange={(val) => setForm((prev) => ({ ...prev, severity: val }))}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        fullWidth
                        multiline
                        value={form.steps}
                        onChange={handleChange('steps')}
                    />
                </TableCell>
                <TableCell>
                    <EnumDropdown
                        label="Status"
                        value={form.status}
                        enumMap={StatusMap}
                        onChange={(val) => setForm((prev) => ({ ...prev, status: val }))}
                    />
                </TableCell>
                {/* todo: add support for adding/removing attachments */}
                <TableCell>Attachments</TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={5}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1 }}>
                        <Button onClick={onCancel}>Cancel</Button>
                        <Button
                            variant="contained"
                            onClick={() => onSubmit(form)}
                            disabled={!isValid || loading}
                        >
                            {loading ? 'Submitting…' : 'Submit'}
                        </Button>
                    </Box>
                </TableCell>
            </TableRow>
        </>
    );
};

export default EditableBugRow;
