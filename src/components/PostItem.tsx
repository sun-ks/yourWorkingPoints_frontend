import React, { FC } from "react";
import { IPost } from "../types/IPost";

interface IPostItemProps {
  post: IPost,
  remove: (post: IPost) => void,
  update: (post: IPost) => void
}

const PostItem: FC<IPostItemProps> = ({post, update, remove }) => {

  return (
    <div >
      Title: {post.title}
      <br/>
      Body: {post.body}
      <br/>
      <button onClick={() => remove(post)} type="button">Delete</button>
      <button onClick={() => update(post)} type="button">Update</button>
      <div>- - -</div>
    </div>
  );
};

export default PostItem;