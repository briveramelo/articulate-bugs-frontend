import { useState } from 'react';
import { deleteBugRecord } from 'src/services/airtable';

export const useDeleteBug = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteBug = async (recordId) => {
        setLoading(true);
        setError(null);
        try {
            await deleteBugRecord(recordId);
            return true;
        } catch (err) {
            console.error('Error deleting bug:', err);
            setError(err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { deleteBug, loading, error };
};
