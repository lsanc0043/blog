import { useState, useEffect } from "react";
import Post from "./PostCard";
import AddEditPost from "./AddEditPost";

const AllPosts = ({
  action,
  validLogin,
  loggedUser,
  setUser,
  setCurrentTab,
}) => {
  const [allPosts, setAllPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(0);
  const [seeMore, setSeeMore] = useState("");
  const [newPost, setNewPost] = useState({
    userid: "",
    title: "",
    description: "",
    content: "",
    image: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const getPosts = async () => {
    const response = await fetch("http://localhost:4000/posts");
    const data = await response.json();
    setSeeMore(data.map((post) => post.id).indexOf(Number(action)));
    setAllPosts(data);
  };

  useEffect(() => {
    getPosts();
    if (typeof action === "string" && Number(action) !== 0) {
      setCurrentPost(seeMore);
    }
  }, [allPosts, action]);

  const set = (keyProp) => {
    return ({ target: { value } }) => {
      setNewPost((originalValues) => ({ ...originalValues, [keyProp]: value }));
    };
  };

  const randomPage = () => {
    setCurrentPost(2);
    const random = Math.round(Math.random() * (allPosts.length - 1));
    if (currentPost === random) {
      randomPage();
    } else {
      console.log(random);
      setCurrentPost(random);
    }
  };

  useEffect(() => {
    if (!isNaN(action) && action > 0) {
      console.log("random");
      randomPage();
      // setCurrentPost(1);

      // console.log(action);
      // console.log(typeof action);
    }
    if (action === "addPost") {
      setNewPost((originalValues) => ({
        ...originalValues,
        title: "",
        description: "",
        content: "",
        image: "",
      }));
    }
    if (action === 0) {
      setCurrentPost(action);
    }
  }, [action]);

  useEffect(() => {
    // console.log("in allposts", loggedUser);
    setUserInfo(loggedUser);
    if (loggedUser) {
      // console.log("valid");
      setNewPost((originalValues) => ({
        ...originalValues,
        userid: loggedUser.id,
      }));
    }
  }, [validLogin]);

  const editData = (childData) => {
    setEditMode(true);
    // console.log("line 74", childData);
    setNewPost(childData);
  };

  const removePost = async (e) => {
    setCurrentPost(currentPost - 1);
    const response = await fetch(
      `http://localhost:4000/posts/${e.currentTarget.value}`,
      {
        method: "DELETE",
      }
    );
    await response.json();
    setAllPosts(
      allPosts.filter((post) => post.id !== Number(e.currentTarget.value))
    );
  };

  return (
    <div className="all-posts">
      <div
        className="slider-buttons"
        style={{ display: action !== 0 ? "none" : "flex" }}
      >
        <button
          onClick={
            currentPost === 0
              ? () => {}
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
            currentPost === allPosts.length - 1
              ? () => {}
              : () => {
                  setCurrentPost(currentPost + 1);
                  setNewPost("");
                }
          }
          className={
            currentPost === allPosts.length - 1 ? "inactive" : "active"
          }
        >
          Next
        </button>
      </div>
      {action === "addPost" ? (
        validLogin ? (
          <AddEditPost
            set={set}
            newPost={newPost}
            setNewPost={setNewPost}
            editMode={editMode}
            userInfo={loggedUser}
          />
        ) : (
          <>You must have an account to post.</>
        )
      ) : (
        allPosts.map((post, index) => {
          if (currentPost === index) {
            if (post.id === newPost.id) {
              return (
                <AddEditPost
                  key={index}
                  set={set}
                  newPost={newPost}
                  setNewPost={setNewPost}
                  editMode={editMode}
                  userInfo={loggedUser}
                />
              );
            } else {
              return (
                <Post
                  key={index}
                  post={post}
                  removePost={removePost}
                  editData={editData}
                  userInfo={userInfo}
                  setUser={setUser}
                  setCurrentTab={setCurrentTab}
                />
              );
            }
          }
        })
      )}
    </div>
  );
};

export default AllPosts;
