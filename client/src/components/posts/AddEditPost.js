const AddPost = ({ set, setNewPost, newPost, editMode, userInfo }) => {
  const makePost = async (e) => {
    console.log(newPost);
    e.preventDefault();
    if (e.target.name === "edit") {
      const response = await fetch(
        `http://localhost:4000/posts/${newPost.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        }
      );
      await response.json();
      setNewPost((originalValues) => ({
        ...originalValues,
        title: "",
        id: "",
        description: "",
        content: "",
        image: "",
      }));
    } else {
      const response = await fetch("http://localhost:4000/posts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      await response.json();
      setNewPost((originalValues) => ({
        ...originalValues,
        title: "",
        description: "",
        content: "",
        image: "",
      }));
    }
  };

  return (
    <form
      className="add-post"
      onSubmit={makePost}
      name={editMode ? "edit" : "post"}
    >
      <input
        type="text"
        id="title"
        value={newPost.title}
        placeholder="Title"
        onChange={set("title")}
      />
      <br />
      <input
        type="text"
        id="description"
        value={newPost.description}
        placeholder="Description"
        onChange={set("description")}
      />
      <br />
      <textarea
        type="text"
        id="content"
        rows="15"
        cols="40"
        value={newPost.content}
        placeholder="Start writing your post here..."
        onChange={set("content")}
      />
      <br />
      <input
        type="text"
        id="image"
        value={newPost.image}
        placeholder="Image URL"
        onChange={set("image")}
      />
      <br />
      <p>
        {editMode ? "Edited" : "Posted"} by {userInfo.username}
      </p>
      <br />
      <input type="submit" value={editMode ? "Update!" : "Post!"} />
    </form>
  );
};

export default AddPost;
