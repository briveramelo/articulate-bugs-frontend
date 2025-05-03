import React from 'react';
import {ImageRenderer} from "src/components/attachments/renderers/ImageRenderer.jsx";

const renderers = {
    'image/jpeg': ImageRenderer,
    'image/png': ImageRenderer,
    'image/gif': ImageRenderer,
    // Add future types here (e.g., PDFs, videos, etc.)
    // yes, this breaks the Open/Closed Principle, but the tradeoff is better readability (nothing fancy)
};

const AttachmentRenderer = ({ attachment }) => {
    const Renderer = renderers[attachment.type];

    if (!Renderer) {
        return (
            <p style={{ color: 'gray' }}>
                No rendering yet available for attachment type: <strong>{attachment.type}</strong>
            </p>
        );
    }

    return <Renderer attachment={attachment} />;
};

export default AttachmentRenderer;
