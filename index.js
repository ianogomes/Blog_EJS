import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE,
	password: process.env.PG_PASSWORD,
	port: process.env.PG_PORT
  });
  db.connect();

// HOME
app.get("/", async (req, res) => {
    const result = await db.query("SELECT * FROM posts ORDER BY id");
    let posts = result.rows;
    res.render("index.ejs", {list: posts});
});

// WRITING AREA
app.get("/create", (req, res) => {
    res.render("create.ejs", {title: "", text: "", key: ""});
});

// SAVING NEW POST
app.post("/submit", async (req, res) => {
    try{
        const result = await db.query("INSERT INTO posts (title, text) VALUES ($1, $2) RETURNING *",[req.body.title, req.body.text]);
        const id = result.rows[0].id;
        res.redirect("/"+String(id));
    } catch (err) {
        console.log(err);
    }
});

// POST
app.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        // console.log(id);
        const result = await db.query("SELECT * FROM posts WHERE id = $1",[id]);
        let post = result.rows[0];
        // console.log(post);
        if (post) {
            res.render("post.ejs", {post: post, key: String(id)});
        } else {
            throw new SyntaxError("Custom error: The post id is not registered");
        }
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
    
});

// DELETING
app.get("/delete/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try{
        await db.query("DELETE FROM posts WHERE id = $1",[id]);
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});

// WRITING AREA FOR UPDATING
app.get("/create/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await db.query("SELECT * FROM posts WHERE id = $1",[id]);
    let post = result.rows[0];

    res.render("create.ejs", {title: post.title, text: post.text, key: post.id});
});

// SAVING UPDATE
app.post("/submit/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    try{
        await db.query("UPDATE posts SET title = $1, text =$2 WHERE id = $3",[req.body.title, req.body.text, id]);
        res.redirect("/"+String(id));
    } catch (err) {
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

