import { jwt_constants } from '../auth/constants';
import { Request } from 'express';

import { v2 as cloudinary } from 'cloudinary';
import { Prisma } from '@prisma/client';
import { Image } from 'src/typings';
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
  if (!images) {
    return null;
  }

  try {
    cloudinary.config({
      cloud_name: jwt_constants.cloud_name,
      api_key: jwt_constants.api_key,
      api_secret: jwt_constants.api_secret,
    });
    const uploadedImages = await Promise.all(
      images.map((file) =>
        cloudinary.uploader.upload(file.path, { folder: 'car_images' }),
      ),
    );
    const imageData = uploadedImages.map((image) => ({
      url: image.secure_url,
      public_id: image.public_id,
    }));

    // Return the secure URLs in the response
    return imageData;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
}

export const getImgIdToDelete = (imagesData: Prisma.JsonValue) => {
  // * MAP OUT THE CLOUDINARY PUBLIC_ID FROM THE IMAGE DB
  const imgs: Image[] = (imagesData as unknown[]).map((item) => {
    const image = item as { url: string; public_id: string };
    return {
      url: image.url,
      public_id: image.public_id,
    };
  });
  return imgs;
};

export async function destroyExistingImage(
  imagesId: string[] | Prisma.JsonArray,
) {
  cloudinary.config({
    cloud_name: jwt_constants.cloud_name,
    api_key: jwt_constants.api_key,
    api_secret: jwt_constants.api_secret,
  });
  // * IF NO IMAGES DO NOT PROCEEED
  if (!imagesId.length) {
    return null;
  }

  const isDeleted = await Promise.all(
    imagesId.map(async (id: string) => {
      const result = await cloudinary.uploader.destroy(id);
      return result;
    }),
  );

  return isDeleted;
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
