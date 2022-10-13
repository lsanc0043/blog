const AddPost = ({ setRefresh, set, setNewPost, newPost, editMode }) => {
  // const entry = {
  //   poster: "Linda Sanchez",
  //   title: "Title of Second Post",
  //   description:
  //     "Description of second post. This is the second post I've made to my blog.",
  //   content:
  //     "Hello all, this is the second post I will have made! Thank you for reading and supporting.",
  //   image:
  //     "https://i1.sndcdn.com/artworks-RdXyxcg62UePiGaW-vQHy7g-t500x500.jpg",
  // };

  const makePost = async (e) => {
    console.log(newPost);
    console.log(e.target.name);
    // console.log(e.target[3].input.value);
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
      setNewPost({
        poster: "",
        title: "",
        description: "",
        content: "",
        image: "",
      });
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
      setNewPost({
        poster: "",
        title: "",
        description: "",
        content: "",
        image: "",
      });
      setRefresh("post");
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
      <input type="submit" value={editMode ? "Update!" : "Post!"} />
    </form>
  );
};

export default AddPost;
