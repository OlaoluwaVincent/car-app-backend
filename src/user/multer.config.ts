import { diskStorage } from 'multer';
import { tmpdir } from 'os';
import { join } from 'path';

export const storage = diskStorage({
  destination: join(tmpdir(), 'uploads'),
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

export const multipleStorage = diskStorage({
  destination: join(tmpdir(), 'uploads'),
  filename: (req, file, cb) => {
    // Generating a unique filename for each file
    const uniqueFileName = `${file.fieldname}-${Date.now()}-${
      file.originalname
    }`;

    // // Adding a property to the request object to store the filenames
    // if (!req.fileNames) {
    //   req.fileNames = [];
    // }
    // req.fileNames.push(uniqueFileName);

    cb(null, uniqueFileName);
  },
});
