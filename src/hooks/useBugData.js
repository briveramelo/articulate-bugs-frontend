import { useEffect, useState } from 'react';
import { fetchBugs } from 'src/services/airtable';

export const useBugs = () => {
    const [bugs, setBugs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBugs = async () => {
            try {
                const data = await fetchBugs();
                setBugs(data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadBugs();
    }, []);

    return { bugs, loading, error };
};
