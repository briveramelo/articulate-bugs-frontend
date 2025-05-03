import { useState, useMemo } from 'react';
import { SeverityMap, StatusMap } from 'src/models/bugEnums';

const getSortValue = (item, key) => {
    if (key === 'severity') return SeverityMap[item.severity] ?? 0;
    if (key === 'status') return StatusMap[item.status] ?? 0;
    return item[key] ?? '';
};

export const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);

    const sortedItems = useMemo(() => {
        if (!sortConfig) return items;

        const { key, direction } = sortConfig;

        return [...items].sort((a, b) => {
            const aVal = getSortValue(a, key);
            const bVal = getSortValue(b, key);

            if (aVal < bVal) return direction === 'ascending' ? -1 : 1;
            if (aVal > bVal) return direction === 'ascending' ? 1 : -1;
            return 0;
        });
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig?.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return { sortedItems, requestSort, sortConfig };
};
