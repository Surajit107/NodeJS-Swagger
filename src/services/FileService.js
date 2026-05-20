import fs from 'fs';
import path from 'path';

const uploadDirectory = path.join(process.cwd(), 'public', 'temp');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

export const fileService = {
    saveFileLocally: (file) => {
        if (!file) return "";

        const fileExtension = path.extname(file.originalname);
        const localFilePath = path.join(uploadDirectory, `${file.filename}${fileExtension}`);

        fs.renameSync(file.path, localFilePath);
        const newAvatarFilePath = `${process.env.SERVER_HOST}/temp/${file.filename}${fileExtension}`;

        return newAvatarFilePath;
    },

    deleteFile: (filePath) => {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
};