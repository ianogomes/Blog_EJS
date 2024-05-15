import express from "express";
import bodyParser from "body-parser";
import multer from "multer";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const upload = multer()

const postList = new Object();

const random = () => Math.random().toString(36).slice(-5);
postList[random()] = ["title1", "Lorem ipsum dolor sit amet, et proin, justo mus. Porta suspendisse turpis netus sagittis tortor at, vitae aliquetpharetra cras velit, id gravida, neque nulla lorem, posuere hac. Ultricies eget lacus vehicula, in ante aliquamet,facilisis tempor duis orci. Sed molestie sem in duis eu id, nisl id ultricies metus blandit eget praesent, pedetempornullam, vitae arcu tortor suspendisse nibh risus. Nulla id suscipit reiciendis nulla erat. Porta enim auteluctus,ducimus sodales dolor."];
postList[random()] = ["title2", "text2"];

app.get("/", (req, res) => {
    res.render("index.ejs", {list: postList});
});

app.get("/create", (req, res) => {
    res.render("create.ejs", {title: "", text: "", key: ""});
});

app.post("/submit", (req, res) => {
    postList[random()] = [req.body.title, req.body.text];
    res.render("index.ejs", {list: postList});
});

for (const key of Object.keys(postList)){
    let link = "/" + key;
    let link_delete = "/delete" + key;
    let link_update = "/create" + key;
    let link_submit = "/submit" + key;

	app.get(link, (req, res) => {
        res.render("post.ejs", {list: postList, key: key});
    });

    app.get(link_delete, (req, res) => {
        delete postList[key];
        res.render("index.ejs", {list: postList});
    });

    app.get(link_update, (req, res) => {
        res.render("create.ejs", {title: postList[key][0], text: postList[key][1], key: key});
    });

    app.post(link_submit, (req, res) => {
        postList[key] = [req.body.title, req.body.text]
        res.render("post.ejs", {list: postList, key: key});
    });
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

