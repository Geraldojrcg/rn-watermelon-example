import {Model, tableSchema} from '@nozbe/watermelondb';
import {text} from '@nozbe/watermelondb/decorators';

export const CommetSchema = tableSchema({
  name: 'comments',
  columns: [
    {name: 'body', type: 'string'},
    {name: 'post_id', type: 'string', isIndexed: true},
  ],
});

export class Comment extends Model {
  static table = 'comments';
  static associations = {
    posts: {type: 'belongs_to', key: 'post_id'},
  };

  @text('body') body;
}
