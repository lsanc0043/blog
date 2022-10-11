import "./App.css";
import { useState, useEffect } from "react";
import Post from "./components/SingularPost";

function App() {
  const [postInfo, setPostInfo] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const getPosts = async () => {
    const response = await fetch("http://localhost:4000/");
    const data = await response.json();
    setPostInfo(data);
  };

  useEffect(() => {
    getPosts();
  }, [refresh, postInfo]);

  const makePost = async () => {
    const response = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        poster: "Linda Sanchez",
        title: "Title of Second Post",
        description:
          "Description of second post. This is the second post I've made to my blog.",
        content:
          "Hello all, this is the second post I will have made! Thank you for reading and supporting.",
        image:
          "https://i1.sndcdn.com/artworks-RdXyxcg62UePiGaW-vQHy7g-t500x500.jpg",
      }),
    });
    const data = await response.json();
    setRefresh(refresh + 1);
  };

  const editPost = async (e) => {
    const response = await fetch(
      `http://localhost:4000/${e.currentTarget.value}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          poster: "Sanchez Linda",
          title: "Title of First Post",
          description:
            "Description of first post. This is the first post I've made to my blog.",
          content:
            "Hello all, this is the first post I will have made! Thank you for reading and supporting.",
          image:
            "https://i1.sndcdn.com/artworks-RdXyxcg62UePiGaW-vQHy7g-t500x500.jpg",
        }),
      }
    );
    const data = await response.json();
    setRefresh(refresh + 1);
  };

  const removePost = async (e) => {
    const response = await fetch(
      `http://localhost:4000/${e.currentTarget.value}`,
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
    <div className="App">
      {postInfo.map((post, index) => {
        return (
          <Post
            key={index}
            post={post}
            makePost={makePost}
            editPost={editPost}
            removePost={removePost}
          />
        );
      })}
    </div>
  );
}

export default App;
