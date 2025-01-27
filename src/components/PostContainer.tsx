import React, { FC, useEffect } from 'react';

import { postAPI } from '../services/PostService';
import { IPost } from '../types/IPost';
import PostItem from './PostItem';

const PostContainer: FC<any> = () => {
  const { data: posts, error, isLoading } = postAPI.useFetchAllPostsQuery(200);

  const [createPost, {}] = postAPI.useCreatePostMutation();

  const [updatePost, {}] = postAPI.useUpdatePostMutation();

  const [deletePost, {}] = postAPI.useDeletePostMutation();

  const handleCreatePost = async () => {
    const title = prompt();
    await createPost({ title, body: 'd' } as IPost);
  };

  const handleRemove = (post: IPost) => {
    deletePost(post);
  };

  const handleUpdate = (post: IPost) => {
    const title = prompt() || '';
    updatePost({ ...post, title });
  };

  return (
    <div>
      <button onClick={handleCreatePost}>Create Post</button>
      {isLoading && <div>Loading ...</div>}
      {error && <div> error </div>}
      {posts &&
        posts.map((post) => (
          <PostItem update={handleUpdate} remove={handleRemove} post={post} />
        ))}
    </div>
  );
};

export default PostContainer;
