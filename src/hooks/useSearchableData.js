import { useMemo } from 'react';

export const useSearchableData = (items, searchTerm) => {
    return useMemo(() => {
        if (!searchTerm) return items;

        const lower = searchTerm.toLowerCase();

        return items.filter(item =>
            Object.values(item).some(value =>
                String(value).toLowerCase().includes(lower)
            )
        );
    }, [items, searchTerm]);
};
