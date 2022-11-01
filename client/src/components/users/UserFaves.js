import { useState, useEffect } from "react";

const UserFaves = ({ loggedUser, setSpecificPage, setCurrentTab }) => {
  const [faves, setFaves] = useState([]);

  const getFaves = async () => {
    const response = await fetch(
      `http://localhost:4000/faves/${loggedUser.id}`
    );
    const data = await response.json();
    setFaves(data);
  };

  useEffect(() => {
    getFaves();
  }, [faves]);

  const removeLike = async (id) => {
    const response = await fetch(
      `http://localhost:4000/faves/${id}/${loggedUser.id}`,
      {
        method: "DELETE",
      }
    );
    await response.json();
  };

  return (
    <div className="user-posts">
      <h2 className="page-header">FAVORITES</h2>
      {faves.map((post, index) => {
        return (
          <div key={index}>
            <h3 className="title">{post.title}</h3>
            <h5>{post.description}</h5>
            <h6>
              {`Last Updated on: ${new Date(
                post.last_updated
              ).toLocaleString()} | By ${post.username}`}
              <button
                className="likes"
                value={post.id}
                onClick={() => removeLike(post.id)}
              >
                <i className="fa fa-heart" aria-hidden="true"></i>
              </button>
              {post.likes}
            </h6>
            <button
              className="see-more"
              onClick={() => {
                setSpecificPage(post.id);
                setCurrentTab("Specific Post");
              }}
            >
              See More
            </button>
            <hr style={{ color: "black" }} />
          </div>
        );
      })}
    </div>
  );
};

export default UserFaves;
