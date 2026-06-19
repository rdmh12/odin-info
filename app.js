import express from "express";
import path from "path";

const app = express();

const options = {
  root: path.join(import.meta.dirname),
};

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.get("/", (_req, res) => {
  res.sendFile("index.html", options);
});

app.get("/about", (_req, res) => {
  res.sendFile("about.html", options);
});

app.get("/contact-me", (_req, res) => {
  res.sendFile("contact-me.html", options);
});

app.use(express.static("public", options));

app.use((_req, res, _next) => {
  console.log(" -> 404");
  res.status(404).sendFile("404.html", options);
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
