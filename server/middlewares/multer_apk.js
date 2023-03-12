import multer, { diskStorage } from "multer";
import { join, dirname } from "path";
import { fileURLToPath } from "url";


export default multer({
  storage: diskStorage({
    destination: (req, file, callback) => {
      const _dirname = dirname(fileURLToPath(import.meta.url));
      callback(null, join(_dirname), "public");
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
  }),
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(apk)$/)) {
      return cb(new Error("Please upload a valid APK file"));
    }
    cb(undefined, true);
  },
}).single("apkFile");
