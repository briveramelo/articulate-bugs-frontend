import { useState } from 'react';
import { addBugRecord } from 'src/services/airtable';

export const useAddBug = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addBug = async (newBug) => {
        setLoading(true);
        setError(null);

        try {
            await addBugRecord(newBug);
            return true;
        } catch (err) {
            console.error('Error adding bug:', err);
            setError(err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { addBug, loading, error };
};
