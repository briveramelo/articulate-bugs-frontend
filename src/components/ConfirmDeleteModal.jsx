import React from 'react';
import {
    Dialog, DialogTitle, DialogActions,
    Button, DialogContent, DialogContentText
} from '@mui/material';

const ConfirmDeleteModal = ({ open, onClose, onConfirm, loading }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Delete Bug?</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to permanently delete this bug?
            </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
            <Button onClick={onClose} variant="outlined" disabled={loading}>
                Cancel
            </Button>
            <Button onClick={onConfirm} color="error" variant="contained" disabled={loading}>
                DELETE
            </Button>
        </DialogActions>
    </Dialog>
);

export default ConfirmDeleteModal;
