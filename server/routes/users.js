import db from "../db/db-connection.js";
import { Router } from "express";

const route = Router();

route.get("/", async (req, res) => {
  try {
    const allUsers = await db.any("SELECT * FROM users ORDER BY id", [true]);
    res.send(allUsers);
  } catch (e) {
    console.log("get users", e);
    res.status(400).send({ e });
  }
});

route.post("/", async (req, res) => {
  const userInfo = {
    username: req.body.username,
    password: req.body.password,
    pfp: req.body.pfp,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  try {
    if (userInfo.pfp !== "") {
      const createdUser = await db.any(
        "INSERT INTO users(username, password, firstname, lastname, pfp) VALUES($1, $2, $3, $4, $5)",
        [
          userInfo.username,
          userInfo.password,
          userInfo.firstname,
          userInfo.lastname,
          userInfo.pfp,
        ]
      );
      res.send(createdUser);
    } else {
      const createdUser = await db.any(
        "INSERT INTO users(username, password, firstname, lastname) VALUES($1, $2, $3, $4)",
        [
          userInfo.username,
          userInfo.password,
          userInfo.firstname,
          userInfo.lastname,
        ]
      );
      res.send(createdUser);
    }
  } catch (e) {
    console.log("post users", e);
    res.status(400).send({ e });
  }
});

// route.put("/:id", async (req, res) => {
//   const id = Number(req.params.id);
//   const postInfo = {
//     poster: req.body.poster,
//     title: req.body.title,
//     description: req.body.description,
//     content: req.body.content,
//     image: req.body.image,
//   };
//   console.log("line 58, put request", [id, postInfo]);
//   try {
//     await db.one(
//       "UPDATE posts SET poster=$1, title=$2, description=$3, content=$4, image=$5, last_updated=CURRENT_TIMESTAMP WHERE id=$6",
//       [
//         postInfo.poster,
//         postInfo.title,
//         postInfo.description,
//         postInfo.content,
//         postInfo.image,
//         id,
//       ]
//     );
//   } catch (e) {
//     console.log("put", e);
//     res.status(400).send({ e });
//   }
// });

// route.delete("/:id", (req, res) => {
//   const id = Number(req.params.id);
//   try {
//     const deletedPost = db.query("DELETE FROM posts WHERE id=$1", [id]);
//   } catch (e) {
//     console.log("delete", e);
//     res.status(400).send({ e });
//   }
// });

export default route;
