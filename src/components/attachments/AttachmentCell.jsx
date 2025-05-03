import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AttachmentModal from 'src/components/attachments/AttachmentModal.jsx';

const AttachmentCell = ({ attachments = [] }) => {
    const [selected, setSelected] = useState(null);

    return (
        <Box>
            {attachments.map((file) => (
                <Box key={file.id} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <IconButton size="small" onClick={() => setSelected(file)}>
                        <AttachFileIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={() => setSelected(file)}>
                        {file.filename}
                    </Typography>
                </Box>
            ))}
            <AttachmentModal
                open={!!selected}
                attachment={selected}
                onClose={() => setSelected(null)}
            />
        </Box>
    );
};

export default AttachmentCell;
