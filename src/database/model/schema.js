import {appSchema} from '@nozbe/watermelondb';
import {PostSchema} from './Post';
import {CommetSchema} from './Comment';

export default appSchema({
  version: 1,
  tables: [PostSchema, CommetSchema],
});
