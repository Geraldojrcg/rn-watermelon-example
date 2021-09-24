import {Model, tableSchema} from '@nozbe/watermelondb';
import {field, text, children} from '@nozbe/watermelondb/decorators';

export const PostSchema = tableSchema({
  name: 'posts',
  columns: [
    {name: 'title', type: 'string'},
    {name: 'subtitle', type: 'string', isOptional: true},
    {name: 'body', type: 'string'},
    {name: 'is_pinned', type: 'boolean'},
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
  @field('is_pinned') isPinned;
  @children('comments') comments;
}
