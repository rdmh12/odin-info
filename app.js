import express from "express";
import path from "path";

const app = express();

const options = {
  root: path.join(import.meta.dirname),
};

app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.get("/", (_req, res) => {
  res.render("index", {
    title: "Home",
    content: "This is a home page",
  });
});

app.get("/about", (_req, res) => {
  res.render("index", {
    title: "About",
    content: "This is a page containing information about somebody",
  });
});

app.get("/contact-me", (_req, res) => {
  res.render("index", {
    title: "Contact Me",
    content: "This is a page with contact information",
  });
});

app.use(express.static("public", options));

app.use((_req, res, _next) => {
  console.log(" -> 404");
  res.status(404).render("index", {
    title: "Error",
    content: "ERROR: 404 not found",
  });
});

app.use((err, _req, res, _next) => {
  console.log(`error: ${err.message}`);
  res.status(500).send("Server error.");
});

const port = process.env.PORT ?? 8080;

app.listen(port, (error) => {
  if (error) {
    console.error(error.message);
  } else {
    console.log(`started listening on port ${port}`);
  }
});
