import db from "../db/db-connection.js";
import { Router } from "express";

const route = Router();

route.get("/", async (req, res) => {
  try {
    const allPosts = await db.any("SELECT * FROM posts ORDER BY id", [true]);
    res.send(allPosts);
  } catch (e) {
    console.log("get posts", e);
    res.status(400).send({ e });
  }
});

route.post("/", async (req, res) => {
  const postInfo = {
    poster: req.body.poster,
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    image: req.body.image,
  };
  try {
    const createdPost = await db.any(
      "INSERT INTO posts(poster, title, description, content, image) VALUES($1, $2, $3, $4, $5)",
      [
        postInfo.poster,
        postInfo.title,
        postInfo.description,
        postInfo.content,
        postInfo.image,
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
    poster: req.body.poster,
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    image: req.body.image,
  };
  const likes = req.body.likes;
  console.log("line 58, put request", [id, postInfo]);
  try {
    if (likes === true) {
      const likes = (
        await db.any("SELECT likes FROM posts WHERE id=$1", [id])
      )[0].likes;
      await db.one("UPDATE posts SET likes=$1 WHERE id=$2", [likes + 1, id]);
    } else {
      await db.one(
        "UPDATE posts SET poster=$1, title=$2, description=$3, content=$4, image=$5, last_updated=CURRENT_TIMESTAMP WHERE id=$6",
        [
          postInfo.poster,
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
