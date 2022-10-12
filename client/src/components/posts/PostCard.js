const Post = ({ post, removePost, editData }) => {
  const editPost = async (e) => {
    const id = Number(e.currentTarget.value);
    console.log(id);
    editData(post);
  };

  return (
    <div className="post">
      <h1>{post.title}</h1>
      <h3>{post.description}</h3>
      <h4>{`Last Updated on: ${post.last_updated} | By ${post.poster}`}</h4>
      <p>{post.content}</p>
      <button value={post.id} onClick={editPost}>
        Edit
      </button>
      <button value={post.id} onClick={removePost}>
        Delete
      </button>
    </div>
  );
};

export default Post;
