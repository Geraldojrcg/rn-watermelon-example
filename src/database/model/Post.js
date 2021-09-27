import {Model, tableSchema} from '@nozbe/watermelondb';
import {text, children, readonly, date} from '@nozbe/watermelondb/decorators';

export const PostSchema = tableSchema({
  name: 'posts',
  columns: [
    {name: 'title', type: 'string'},
    {name: 'subtitle', type: 'string', isOptional: true},
    {name: 'body', type: 'string'},
    {name: 'created_at', type: 'number'},
    {name: 'updated_at', type: 'number'},
  ],
});

export class Post extends Model {
  static table = 'posts';
  static associations = {
    comments: {type: 'has_many', foreignKey: 'post_id'},
  };

  @text('title') title;
  @text('subtitle') subtitle;
  @text('body') body;
  @children('comments') comments;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
}
