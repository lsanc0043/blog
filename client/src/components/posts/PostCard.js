const Post = ({ post, removePost, editData }) => {
  const editPost = async (e) => {
    const id = Number(e.currentTarget.value);
    console.log(id);
    editData(post);
  };

  const addLikes = async (e) => {
    const response = await fetch(
      `http://localhost:4000/posts/${e.currentTarget.value}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likes: true }),
      }
    );
    await response.json();
  };

  return (
    <div className="post">
      <h1>{post.title}</h1>
      <h3>{post.description}</h3>
      <h4>
        {`Last Updated on: ${new Date(
          post.last_updated
        ).toLocaleString()} | By ${post.poster} |`}
        <button className="likes" onClick={addLikes} value={post.id}>
          <i class="fa fa-heart-o" aria-hidden="true"></i>
        </button>
        {post.likes}
      </h4>
      <img src={post.image} align="right" />
      <div>{`${post.content}`}</div>
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
