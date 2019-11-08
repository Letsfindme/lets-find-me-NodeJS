// Imports
import path from "path";
// import multer from "multer";
var multer = require("multer");
const uuidv4 = require("uuid/v4");
import authentication from "../middleware/authentication";
// App Imports
import serverConfig from "../config/server.json";

// File upload configurations and route
export default function(server) {
  console.info("SETUP - Upload...");

  // Set destination
  const storage = multer.diskStorage({
    destination: path.join(
      // __dirname,
      // "..",
      // "..",
      "public",
      "images",
      "uploads"
    ),
    filename: function(request, file, callback) {
      callback(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    }
  });

  const upload = multer({
    storage: storage
  }).array("file");

  // Upload route
  server.post(serverConfig.upload.endpoint, (request, response) => {
    upload(request, response, function(error) {
      if (!error) {
        let fileNames = [];
        for (let filename in request.files) {
          fileNames.push(request.files[filename].filename);
        }
        return response.status(201).json({
          success: true,
          file: fileNames
        });
      } else {
        return response.json({
          success: false,
          file: null
        });
      }
    });
  });

  //todo
  server.use(authentication);

  //filter file type
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/icon" ||
      file.mimetype === "image/vnd.microsoft.icon" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  //todo none used code
  const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "file");
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4());
    }
  });

  // limit file size
  server.use(
    multer({
      storage: storage,
      fileFilter: fileFilter,
      limits: {
        fileSize: 1000 * 1000 * 2
      }
    }).array("image")
  );
}
