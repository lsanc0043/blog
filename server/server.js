import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./db/db-connection.js";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  try {
    const allPosts = await db.any("SELECT * FROM posts ORDER BY id", [true]);
    res.send(allPosts);
  } catch (e) {
    console.log("get", e);
    res.status(400).send({ e });
  }
});

app.post("/", async (req, res) => {
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
    console.log("post", e);
    res.status(400).send({ e });
  }
});

app.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const postInfo = {
    poster: req.body.poster,
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    image: req.body.image,
  };
  console.log("line 58, put request", [id, postInfo]);
  try {
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
  } catch (e) {
    console.log("put", e);
    res.status(400).send({ e });
  }
});

app.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  try {
    const deletedPost = db.query("DELETE FROM posts WHERE id=$1", [id]);
  } catch (e) {
    console.log("delete", e);
    res.status(400).send({ e });
  }
});

app.listen(PORT, () => console.log(`sup, you are listening to port ${PORT}`));
