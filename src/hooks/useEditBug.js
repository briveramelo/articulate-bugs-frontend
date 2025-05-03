import { useState } from 'react';
import { updateBugRecord } from 'src/services/airtable';

export const useEditBug = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateBug = async (id, updates) => {
        setLoading(true);
        setError(null);

        try {
            await updateBugRecord(id, updates);
            return true;
        } catch (err) {
            console.error('Error updating bug:', err);
            setError(err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { updateBug, loading, error };
};
