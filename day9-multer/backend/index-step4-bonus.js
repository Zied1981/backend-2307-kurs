import express from "express";
import multer from "multer";

const app = express();

app.use((req, _, next) => {
  console.log("new request", req.method, req.url);
  next();
});

app.get("/", (req, res) => res.send("it works ;)"));

// START neue syntax:
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "_" + file.originalname;
    cb(null, fileName);
  },
});
const upload = multer({ storage: diskStorage }); // setup von der multer upload middlware
// upload.single("rezeptFoto") ===> middleware
// END neue syntax

app.post("/api/files/upload", upload.single("rezeptFoto"), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  res.json({ fileName: req.file.filename });
});

const PORT = 3003;
app.listen(PORT, () => console.log("Server ready at port", PORT));
