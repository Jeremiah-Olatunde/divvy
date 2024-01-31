
import express from "express";

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (_, response) => {
  response.redirect("/index.html");
});

app.listen(6969, () => {
  console.log(`listening on port: ${6969}`)
});

