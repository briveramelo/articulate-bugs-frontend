import React from "react";

export const ImageRenderer = ({ attachment }) => (
    <img
        src={attachment.url}
        alt={attachment.filename}
        style={{ maxWidth: '100%', maxHeight: '70vh' }}
    />
);