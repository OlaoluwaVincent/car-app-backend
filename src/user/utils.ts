import { cloudinary_constants, jwt_constants } from '../auth/constants';

import { v2 as cloudinary } from 'cloudinary';
import { Prisma } from '@prisma/client';
import { Image } from 'src/typings';

export async function uploadProfileImage(
  profileImg: Express.Multer.File,
  folderName: string,
) {
  cloudinary.config(cloudinary_constants);

  try {
    if (!profileImg) {
      return;
    }
    // Upload the new image
    const uploadedImage = await cloudinary.uploader.upload(profileImg.path, {
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
  cloudinary.config(cloudinary_constants);

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
    cloudinary.config(cloudinary_constants);

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

// export const getImgIdToDelete = (imagesData: Prisma.JsonValue) => {
//   // * MAP OUT THE CLOUDINARY PUBLIC_ID FROM THE IMAGE DB
//   const imgs: Image[] = (imagesData as unknown[]).map((item) => {
//     const image = item as { url: string; public_id: string };
//     return {
//       url: image.url,
//       public_id: image.public_id,
//     };
//   });
//   return imgs;
// };

export const getImgIdToDelete = (imagesData: Prisma.JsonValue) => {
  // * MAP OUT THE CLOUDINARY PUBLIC_ID FROM THE IMAGE DB
  const imgs = (imagesData as { url: string; public_id: string }[]).map(
    (item) => {
      return item;
    },
  );
  return imgs;
};

export async function destroyExistingImage(
  imagesId: string[] | Prisma.JsonArray,
) {
  cloudinary.config(cloudinary_constants);
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
