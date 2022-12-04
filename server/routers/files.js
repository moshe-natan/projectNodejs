const express = require("express");
const router = express.Router();
router.use(express.json());
const fs = require("fs");
const multer = require('multer');

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'items/')
    },
    filename : (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

router.get("*/info", (req, res) => {
    fs.stat(req.baseUrl.slice(1) + req.url.slice(0, req.url.lastIndexOf("/")), (err, stats) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(stats);
    });
});

router.get('*/download', (req, res) => {
    res.download(req.baseUrl.slice(1) + req.url.slice(0, req.url.lastIndexOf("/")))
})

router.post('*/upload', upload.single('myFile'), (req, res) => {
    res.send(req.file)
})

router.post('*/new', (req, res) => {
    const path = req.baseUrl.slice(1) + req.url.slice(0, req.url.lastIndexOf("/")) + '/'+ req.body.newName;
    if (!fs.existsSync(path)){
        console.log(true);
        fs.mkdirSync(path, err => {
            if (err)  res.status(404).send(err)
        });
    }
    
})

router.post("*/copy", (req, res) => {
    const oldPath =
    req.baseUrl.slice(1) + req.url.slice(0, req.url.lastIndexOf("/"));
    const newPath =
    oldPath.slice(0, oldPath.lastIndexOf("/")) + "/" + req.body.newName;
    fs.copyFile(oldPath, newPath, (err) => {
        if (err) res.status(400).send(err);
        else res.status(200).send("OK");
    });
});


router.put("*/rename", (req, res) => {
    const oldPath =
        req.baseUrl.slice(1) + req.url.slice(0, req.url.lastIndexOf("/"));
    const newPath =
        oldPath.slice(0, oldPath.lastIndexOf("/")) + "/" + req.body.newName;
    fs.rename(oldPath, newPath, function (err) {
        if (err) res.status(404).send("ERROR: " + err);
        else res.status(200).send("OK");
    });
});



router.delete("*", (req, res) => {
    const path = req.baseUrl.slice(1) + req.url;
    fs.stat(req.baseUrl.slice(1) + req.url, (err, stats) => {
        if (err) {
            console.log(err);
            return;
        }
        if (stats.isDirectory()) {
            fs.rmdir(
                req.baseUrl.slice(1) + req.url,
                { withFileTypes: true },
                (err, files) => {
                    if (err) res.status(400).json(err);
                    else res.status(200).json("OK");
                }
                );
            } else if (stats.isFile()) {
                fs.unlink(path, (err) => {
                    if (err) res.status(400).json(err);
                    else res.status(200).json("OK");
                });
            }
        });
    });
    
    router.get("*", (req, res) => {
        fs.stat(req.baseUrl.slice(1) + req.url, (err, stats) => {
            if (err) {
            console.log(err);
            return;
        }
        if (stats.isDirectory()) {
            fs.readdir(
                req.baseUrl.slice(1) + req.url,
                { withFileTypes: true },
                (err, files) => {
                    if(err) {
                        res.send(err)
                    }
                    res.json(files);
                }
                );
            }
        });
    });

    
    module.exports = router;
    