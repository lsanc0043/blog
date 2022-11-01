import { useState, useEffect } from "react";

const OtherUsers = ({ user, setCurrentTab, setSpecificPage }) => {
  const [oneUser, setOneUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  const getUsers = async () => {
    const response = await fetch("http://localhost:4000/users");
    const data = await response.json();
    setOneUser(data.filter((val) => val.username === user)[0]);
  };

  const getPosts = async () => {
    const response = await fetch("http://localhost:4000/posts");
    const data = await response.json();
    setUserPosts(data.filter((val) => val.username === oneUser.username));
  };

  useEffect(() => {
    getUsers();
  }, []);
  //   useEffect(() => {
  //     console.log(user);
  //   }, []);

  useEffect(() => {
    getPosts();
  }, [userPosts]);

  return (
    <div className="other-users">
      <h1>{oneUser.username}</h1>
      <div className="user">
        <img
          className="pfp"
          src={oneUser.pfp}
          alt={`${oneUser.firstname} ${oneUser.lastname}'s profile`}
          align="left"
        />
        {oneUser.description}
      </div>
      <h2 className="page-header">{oneUser.username}'s Posts</h2>
      {userPosts.map((post, index) => {
        return (
          <div key={index}>
            <>
              <h3 className="title">{post.title}</h3>
              <h5>{post.description}</h5>
              <h6>
                {`Last Updated on: ${new Date(
                  post.last_updated
                ).toLocaleString()} |`}
                <button
                  className="likes"
                  //   onClick={() => setShow(true)}
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

export default OtherUsers;
