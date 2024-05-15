import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

//Creating objects for linking each generated post
const postList = new Object();
// function Content(tit,txt){
// 	let arr = [tit.toString(), txt.toString()];
//     return arr;
// }

//Test Link
const random = () => Math.random().toString(36).slice(-5);
postList[random()] = ["Lorem ipsum dolor sit amet, et proin, justo mus. Porta suspendisse turpis netus sagittis tortor at, vitae aliquetpharetra cras velit, id gravida, neque nulla lorem, posuere hac. Ultricies eget lacus vehicula, in ante aliquamet,facilisis tempor duis orci. Sed molestie sem in duis eu id, nisl id ultricies metus blandit eget praesent, pedetempornullam, vitae arcu tortor suspendisse nibh risus. Nulla id suscipit reiciendis nulla erat. Porta enim auteluctus,ducimus sodales dolor.", "Lorem ipsum dolor sit amet, et proin, justo mus. Porta suspendisse turpis netus sagittis tortor at, vitae aliquetpharetra cras velit, id gravida, neque nulla lorem, posuere hac. Ultricies eget lacus vehicula, in ante aliquamet,facilisis tempor duis orci. Sed molestie sem in duis eu id, nisl id ultricies metus blandit eget praesent, pedetempornullam, vitae arcu tortor suspendisse nibh risus. Nulla id suscipit reiciendis nulla erat. Porta enim auteluctus,ducimus sodales dolor."];
postList[random()] = ["title2", "text2"];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {list: postList});
});

app.get("/create", (req, res) => {
    res.render("create.ejs", {title: "", text: ""});
});

for (const key of Object.keys(postList)){
    let link = "/" + key;
    let link_delete = "/delete" + key;

	app.get(link, (req, res) => {
        res.render("post.ejs", {list: postList, key: key});
    });

    app.get(link_delete, (req, res) => {
        delete postList[key];
        res.render("index.ejs", {list: postList});
    });
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

