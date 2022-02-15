import express from "express";

const multer = require('multer');
const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require("path")

const uploadImage = multer({
    storage: multer.diskStorage({
        // Image Destination Directory
        destination: (req, file, cb) => {
            // Get Type of File
            let type = path.parse(file.originalname).ext
            // Set Directory Path : /public/uploads/images/${year}/${month}/${day}
            let dir = getDirImage(type);
            // Make Directory
            mkdirp(dir).then(() => cb(null, dir));
        },
        // Image FileName
        filename: (req, file, cb) => {
            // Get Type of File
            let type = path.parse(file.originalname).ext;
            // Convert OriginalName to Slug
            let originalName = slugImage(file.originalname);
            // Create File Path : /public/uploads/images/${year}/${month}/${day}/OriginalName.(jpg,png,...)
            let filePath = `${getDirImage(type)}/${originalName}`;
            // If FileName Not Exist
            if (!fs.existsSync(filePath))
                cb(null, originalName);
            else // If FileName is Exist Change to 1564651548-OriginalName.(jpg,png,...)
                cb(null, `${Date.now()}-${originalName}`);
        }
    }),
});

// Slug Image
function slugImage(title: any) {
    return title.replace(/ /g, "-");
}

// Return Directory Path
const getDirImage = (type) => {
    let videoTypes = [".mkv",".mp4",".mpeg",".MKV",".MP4",".MPEG"];
    let audioTypes = [".MP3",".mp3",".FLAC",".flac",".WAV",".wav"];
    let imageTypes = ['.png', '.PNG', '.jpg', '.JPG', '.jpeg', '.JPEG', '.svg', '.SVG'];
    let documentTypes = [".doc",".DOC",".docx",".DOCX" , ".ppt",".PPT",".pptx",".PPTX",".txt",".TXT",".pdf",".PDF"];
    let compressTypes = [".rar",".RAR",".zip",".ZIP" , ".7z",".7Z"];
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    if (videoTypes.includes(type)) return `./public/uploads/${year}/${month}/${day}/videos`;
    if (audioTypes.includes(type)) return `./public/uploads/${year}/${month}/${day}/audios`;
    if (imageTypes.includes(type)) return `./public/uploads/${year}/${month}/${day}/images`;
    if (documentTypes.includes(type)) return `./public/uploads/${year}/${month}/${day}/documents`;
    if (compressTypes.includes(type)) return `./public/uploads/${year}/${month}/${day}/compress`;
    else return `./public/uploads/${year}/${month}/${day}/other`
}
export default uploadImage;

