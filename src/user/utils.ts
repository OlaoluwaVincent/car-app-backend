import { jwt_constants } from '../auth/constants';
import { Request } from 'express';

import { v2 as cloudinary } from 'cloudinary';
// import * as sgMail from '@sendgrid/mail';

// sgMail.setApiKey(process.env.SENDGRID_SECRET);

export async function updateImage(
  fileImage: Express.Multer.File,
  folderName: string,
) {
  cloudinary.config({
    cloud_name: jwt_constants.cloud_name,
    api_key: jwt_constants.api_key,
    api_secret: jwt_constants.api_secret,
  });

  try {
    if (!fileImage) {
      return;
    }
    // Upload the new image
    const uploadedImage = await cloudinary.uploader.upload(fileImage.path, {
      folder: folderName,
    });

    const secureUrl = uploadedImage.secure_url;
    return secureUrl;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
}

export async function uploadImage(image: Express.Multer.File, folder: string) {
  cloudinary.config({
    cloud_name: jwt_constants.cloud_name,
    api_key: jwt_constants.api_key,
    api_secret: jwt_constants.api_secret,
  });
  try {
    if (image) {
      const uploadedImages = await cloudinary.uploader.upload(image.path, {
        folder: folder,
      });

      const secureUrls = uploadedImages.secure_url;
      return secureUrls;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
}

export async function uploadMultipleImages(images: Array<Express.Multer.File>) {
  try {
    cloudinary.config({
      cloud_name: jwt_constants.cloud_name,
      api_key: jwt_constants.api_key,
      api_secret: jwt_constants.api_secret,
    });
    if (images) {
      const uploadedImages = await Promise.all(
        images.map((file) =>
          cloudinary.uploader.upload(file.path, { folder: 'car_mages' }),
        ),
      );
      const secureUrls = uploadedImages.map((image) => image.secure_url);

      // Return the secure URLs in the response
      return secureUrls;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
}

// export async function sendGridMail(email: string, dynamicData: any) {
//   const msg = {
//     to: email,
//     from: 'olaoluwa.dev@gmail.com',
//     dynamicTemplateData: dynamicData,
//     templateId: template_id,
//   };

//   sgMail
//     .send(msg)
//     .then(() => {
//       console.log('Email sent');
//     })
//     .catch((error: any) => {
//       console.error(error);
//     });
// }
