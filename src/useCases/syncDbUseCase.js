import {synchronize} from '@nozbe/watermelondb/sync';
import {database} from '../database';

const SYNC_API_URL = 'http://localhost:3000/sync';

export async function syncDatabase() {
  await synchronize({
    database,
    pullChanges: async ({lastPulledAt}) => {
      const response = await fetch(
        `${SYNC_API_URL}?lastPulledAt=${lastPulledAt}`,
      );
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const {changes, timestamp} = await response.json();
      console.log(changes);
      return {changes, timestamp};
    },
    pushChanges: async ({changes}) => {
      console.log(changes);
      const response = await fetch(SYNC_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changes),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
    },
  });
}
