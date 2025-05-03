import Airtable from 'airtable';

// insecure, but that's ok for this demo
const AIRTABLE_API_KEY = 'patrTBLwlB8V3GnEX.5f1723ef8491ff8a04a7c6d9ac393b092329f2e348c10550247f09d808cf13d9';
const BASE_ID = 'app1Rcz9D5aE8O6e7';
const TABLE_NAME = 'Bugs';

Airtable.configure({ apiKey: AIRTABLE_API_KEY });

const base = Airtable.base(BASE_ID);

export const fetchBugs = async () => {
    const records = await base(TABLE_NAME)
        .select({ view: 'Grid view' })
        .all();

    console.log(records);
    return records.map((record) => ({
        id: record.id,
        bugId: record.get('Bug ID') || '',
        description: record.get('Description') || '',
        severity: record.get('Severity') || '',
        steps: record.get('Steps to Reproduce') || '',
        status: record.get('Status') || '',
    }));
};

export const updateBugRecord = async (recordId, updates) => {
    return base(TABLE_NAME).update(recordId, updates);
};

export const addBugRecord = async (fields) => {
    return base(TABLE_NAME).create([{ fields }]);
};
