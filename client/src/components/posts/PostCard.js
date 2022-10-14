import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

const Post = ({
  post,
  editData,
  removePost,
  userInfo,
  //   setUser,
  //   setCurrentTab,
}) => {
  const [show, setShow] = useState(false);
  const [faves, setFaves] = useState([]);

  const getFaves = async (id) => {
    const response = await fetch(`http://localhost:4000/faves/${id}`);
    const data = await response.json();
    const filt = data.filter((fave) => fave.post_id === post.id);
    setFaves(data.map((fave) => fave.post_id));
  };

  useEffect(() => {
    // console.log(post, userInfo);
  }, [userInfo]);

  useEffect(() => {
    getFaves(userInfo.id || 0);
  }, [faves]);

  const addLikes = async () => {
    if (userInfo.username === post.username) {
      setShow(true);
    } else {
      if (userInfo.id) {
        if (faves.includes(post.id)) {
          const secondResponse = await fetch(
            `http://localhost:4000/posts/${post.id}`,
            {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ likes: "remove" }),
            }
          );
          const response = await fetch(
            `http://localhost:4000/faves/${post.id}/${userInfo.id}`,
            {
              method: "DELETE",
            }
          );
          await secondResponse.json();
          await response.json();
        }
      }
      const response = await fetch(`http://localhost:4000/posts/${post.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likes: true }),
      });
      await response.json();
      if (userInfo.id !== undefined) {
        const response = await fetch("http://localhost:4000/faves", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userInfo.id, postId: post.id }),
        });
        await response.json();
      }
    }
  };

  return (
    <div className="post">
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          hey! you can't like your own post!
        </Modal.Header>
      </Modal>
      <h1 className="title">{post.title}</h1>
      <div
        className="edit-delete"
        style={{ display: userInfo.id === post.user_id ? "block" : "none" }}
      >
        <button onClick={() => editData(post)}>Edit</button>
        <button value={post.id} onClick={removePost}>
          Delete
        </button>
      </div>
      <h3>{post.description}</h3>
      <h6>
        {`Last Updated on: ${new Date(
          post.last_updated
        ).toLocaleString()} | By ${post.username} | `}
        <button onClick={addLikes} className="likes" value={post.id}>
          <i
            className={
              faves.includes(post.id) ? "fa fa-heart" : "fa fa-heart-o"
            }
            aria-hidden="true"
          ></i>
        </button>
        {post.likes}
      </h6>
      <img src={post.image} align="right" />
      <hr />
      <div>{`${post.content}`}</div>
    </div>
  );
};

export default Post;
