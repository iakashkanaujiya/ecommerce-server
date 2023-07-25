import { Router } from "express";
const router = Router();
import multer, { diskStorage } from "multer";
import { uploadImage, getAllImages, getImage, deleteImage } from "../controllers/fileUpload.js";
import { isAdminSignedIn, isAdminAuthenticated, isAdmin } from "../controllers/adminAuth.js";
import { getAdminUserById } from "../controllers/adminUser.js";
import { access } from "fs";


//multer file uploader
const storage = diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
        let uploadedFileName;
        access("public/uploads/" + file.originalname.replace(/\s/g, "-"), (err) => {
            if (err) {
                uploadedFileName = file.originalname.replace(/\s/g, "-");
            } else {
                uploadedFileName = Date.now() + "." + file.originalname.replace(/\s/g, "-");
            }
            cb(null, uploadedFileName);
        });
    }
});

const filter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jfif' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
        callback(null, true)
    } else {
        callback(new Error('Image type not supported!'), false);
    }
};

var fileUpload = multer({ storage: storage, fileFilter: filter });

// params
router.param("adminId", getAdminUserById);

//upload image
router.post("/image/upload/:adminId", isAdminSignedIn, isAdminAuthenticated, isAdmin, fileUpload.array('image'), uploadImage);
//delete Image
router.delete("/image/:id/:adminId", isAdminSignedIn, isAdminAuthenticated, isAdmin, deleteImage);

//get all images
router.get("/images", getAllImages);
//get single image
router.get("/image/:id", getImage);

export default router;