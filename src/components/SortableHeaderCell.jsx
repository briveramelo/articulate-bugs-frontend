import React from 'react';
import { TableCell, TableSortLabel } from '@mui/material';

const SortableHeaderCell = ({ columnKey, label, sortConfig, onRequestSort }) => {
    const active = sortConfig?.key === columnKey;
    const direction = active ? sortConfig.direction : 'asc';

    return (
        <TableCell sortDirection={active ? direction : false}>
            <TableSortLabel
                active={active}
                direction={direction}
                onClick={() => onRequestSort(columnKey)}
            >
                {label}
            </TableSortLabel>
        </TableCell>
    );
};

export default SortableHeaderCell;
