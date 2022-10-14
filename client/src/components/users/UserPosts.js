import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

const UserPosts = ({ loggedUser, setSpecificPage, setCurrentTab }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [show, setShow] = useState(false);

  const getPosts = async () => {
    const response = await fetch("http://localhost:4000/posts");
    const data = await response.json();
    // console.log(data.filter((val) => val.user_id === loggedUser.id)[0]);
    setAllPosts(data.filter((val) => val.user_id === loggedUser.id));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="user-posts">
      <h2 className="page-header">YOUR POSTS</h2>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          hey! you can't like your own post!
        </Modal.Header>
      </Modal>
      {allPosts.map((post, index) => {
        return (
          <div key={index}>
            <>
              <h3>{post.title}</h3>
              <h5>{post.description}</h5>
              <h6>
                {`Last Updated on: ${new Date(
                  post.last_updated
                ).toLocaleString()} |`}
                <button
                  className="likes"
                  onClick={() => setShow(true)}
                  value={post.id}
                >
                  <i className="fa fa-heart-o" aria-hidden="true"></i>
                </button>
                {post.likes}
              </h6>
            </>
            <button
              className="see-more"
              onClick={() => {
                setSpecificPage(post.id);
                setCurrentTab("Specific Post");
              }}
            >
              See More!
            </button>
            <hr style={{ color: "black" }} />
          </div>
        );
      })}
    </div>
  );
};

export default UserPosts;
