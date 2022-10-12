import { useState, useEffect } from "react";
import Post from "./PostCard";
import AddPost from "./AddPost";

const AllPosts = () => {
  const user = "Linda Sanchez";
  const [postInfo, setPostInfo] = useState([]);
  const [refresh, setRefresh] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(0);
  const [newPost, setNewPost] = useState({
    poster: user,
    title: "",
    description: "",
    content: "",
    image: "",
  });

  const getPosts = async () => {
    const response = await fetch("http://localhost:4000/posts");
    const data = await response.json();
    setPostInfo(data);
  };

  useEffect(() => {
    getPosts();
    if (refresh === "post") {
      setCurrentPost(postInfo.length - 1);
    }
  }, [refresh, postInfo, editMode]);

  const set = (keyProp) => {
    return ({ target: { value } }) => {
      setNewPost((originalValues) => ({ ...originalValues, [keyProp]: value }));
    };
  };

  const editData = (childData) => {
    setEditMode(true);
    setNewPost(childData);
  };

  const removePost = async (e) => {
    const response = await fetch(
      `http://localhost:4000/posts/${e.currentTarget.value}`,
      {
        method: "DELETE",
      }
    );
    await response.json();
    setPostInfo(
      postInfo.filter((post) => post.id !== Number(e.currentTarget.value))
    );
  };
  
  return (
    <>
      {postInfo.map((post, index) => {
        if (currentPost === index) {
          if (post.id === newPost.id) {
            return (
              <AddPost
                key={index}
                setRefresh={setRefresh}
                set={set}
                newPost={newPost}
                setNewPost={setNewPost}
                editMode={editMode}
                setEditMode={setEditMode}
              />
            );
          }
          return (
            <Post
              key={index}
              post={post}
              setRefresh={setRefresh}
              removePost={removePost}
              editData={editData}
            />
          );
        }
      })}
      {currentPost === postInfo.length ? (
        <AddPost
          setRefresh={setRefresh}
          set={set}
          setNewPost={setNewPost}
          newPost={newPost}
        />
      ) : (
        <></>
      )}
      <div className="nav">
        <button
          onClick={
            currentPost === 0
              ? ""
              : () => {
                  setCurrentPost(currentPost - 1);
                  setNewPost("");
                }
          }
          className={currentPost === 0 ? "inactive" : "active"}
        >
          Prev
        </button>
        <button
          onClick={
            currentPost === postInfo.length
              ? ""
              : () => {
                  setCurrentPost(currentPost + 1);
                  setNewPost("");
                }
          }
          className={currentPost === postInfo.length ? "inactive" : "active"}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default AllPosts;
