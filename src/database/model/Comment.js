import {Model, tableSchema} from '@nozbe/watermelondb';
import {date, readonly, text} from '@nozbe/watermelondb/decorators';

export const CommetSchema = tableSchema({
  name: 'comments',
  columns: [
    {name: 'body', type: 'string'},
    {name: 'post_id', type: 'string', isIndexed: true},
    {name: 'created_at', type: 'number'},
    {name: 'updated_at', type: 'number'},
  ],
});

export class Comment extends Model {
  static table = 'comments';
  static associations = {
    posts: {type: 'belongs_to', key: 'post_id'},
  };

  @text('body') body;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
}
