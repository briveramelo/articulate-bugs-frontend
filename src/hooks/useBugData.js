import {useCallback, useEffect, useState} from 'react';
import { fetchBugs } from 'src/services/airtable';

export const useBugData = () => {
    const [bugs, setBugs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refetch = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchBugs();
            setBugs(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { bugs, loading, error, refetch };
};
