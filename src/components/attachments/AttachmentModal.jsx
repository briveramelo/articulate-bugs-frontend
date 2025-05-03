import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Box
} from '@mui/material';
import AttachmentRenderer from 'src/components/attachments/renderers/AttachmentRenderer.jsx';

const AttachmentModal = ({ open, onClose, attachment }) => {
    if (!attachment) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{attachment.filename}</DialogTitle>
            <DialogContent>
                <Box mt={2}>
                    <AttachmentRenderer attachment={attachment} />
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button onClick={onClose} variant="outlined">Close</Button>
                <Button
                    variant="contained"
                    color="primary"
                    component="a"
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={attachment.filename}
                >
                    Download
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AttachmentModal;
