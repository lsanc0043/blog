import db from "../db/db-connection.js";
import { Router } from "express";

const route = Router();

route.get("/all", async (req, res) => {
  try {
    const allPosts = await db.any("SELECT * FROM posts ORDER BY id", [true]);
    res.send(allPosts);
  } catch (e) {
    console.log("get posts", e);
    res.status(400).send({ e });
  }
});

route.get("/", async (req, res) => {
  try {
    const allPosts = await db.any(
      "SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id=users.id ORDER BY id",
      // "SELECT * FROM posts ORDER BY id",
      [true]
    );
    res.send(allPosts);
  } catch (e) {
    console.log("get posts", e);
    res.status(400).send({ e });
  }
});

route.post("/", async (req, res) => {
  const postInfo = {
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    image: req.body.image,
    userid: req.body.userid,
  };
  console.log("line 38, post request", postInfo);
  try {
    const createdPost = await db.any(
      "INSERT INTO posts(title, description, content, image, user_id) VALUES($1, $2, $3, $4, $5)",
      [
        postInfo.title,
        postInfo.description,
        postInfo.content,
        postInfo.image,
        postInfo.userid,
      ]
    );
    res.send(createdPost);
  } catch (e) {
    console.log("post posts", e);
    res.status(400).send({ e });
  }
});

route.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const postInfo = {
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    image: req.body.image,
  };
  const postLikes = req.body.likes;
  console.log("line 58, put request", [id, postLikes]);
  try {
    if (postLikes === true) {
      const like = (
        await db.any("SELECT likes FROM posts WHERE id=$1", [id])
      )[0].likes;
      await db.one("UPDATE posts SET likes=$1 WHERE id=$2", [like + 1, id]);
    } else if (postLikes === "remove") {
      const like = (
        await db.any("SELECT likes FROM posts WHERE id=$1", [id])
      )[0].likes;
      console.log(like);
      await db.one("UPDATE posts SET likes=$1 WHERE id=$2", [like - 1, id]);
    } else {
      await db.one(
        "UPDATE posts SET title=$1, description=$2, content=$3, image=$4, last_updated=CURRENT_TIMESTAMP WHERE id=$5",
        [
          postInfo.title,
          postInfo.description,
          postInfo.content,
          postInfo.image,
          id,
        ]
      );
    }
  } catch (e) {
    console.log("edit posts", e);
    res.status(400).send({ e });
  }
});

route.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  try {
    const deletedPost = db.query("DELETE FROM posts WHERE id=$1", [id]);
  } catch (e) {
    console.log("delete posts", e);
    res.status(400).send({ e });
  }
});

export default route;
