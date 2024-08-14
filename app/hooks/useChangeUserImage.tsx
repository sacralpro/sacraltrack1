import { storage } from "@/libs/AppWriteClient";
import Image from "image-js";

const useChangeUserImage = async (file: File, cropper: any, currentImage: string) => {
    let audioId = Math.random().toString(36).slice(2, 22);

    const x = cropper.left;
    const y = cropper.top;
    const width = cropper.width;
    const height = cropper.height;

    console.log('useChangeUserImage called with:', { file, cropper, currentImage });

    try {
        const response = await fetch(URL.createObjectURL(file));
        const imageBuffer = await response.arrayBuffer();
        
        console.log('Loaded image buffer:', imageBuffer);

        const image = await Image.load(imageBuffer);
        
        console.log('Loaded image:', image);

        const croppedImage = image.crop({ x, y, width, height });
        
        console.log('Cropped image:', croppedImage);

        const resizedImage = croppedImage.resize({ width: 200, height: 200 });
        
        console.log('Resized image:', resizedImage);

        const blob = await resizedImage.toBlob();
        
        console.log('Blob:', blob);

        const arrayBuffer = await blob.arrayBuffer();
        const finalFile = new File([arrayBuffer], file.name, { type: blob.type });

        console.log('Final file to upload:', finalFile);

        const result = await storage.createFile(String(process.env.NEXT_PUBLIC_BUCKET_ID), audioId, finalFile);

        console.log('File uploaded, ID:', result?.$id);

        // if current image is not default image delete
        if (currentImage !== String(process.env.NEXT_PUBLIC_PLACEHOLDER_DEAFULT_IMAGE_ID)) {
            await storage.deleteFile(String(process.env.NEXT_PUBLIC_BUCKET_ID), currentImage);
            console.log('Old file deleted:', currentImage);
        }

        return result?.$id;
    } catch (error) {
        console.error('Error occurred in useChangeUserImage:', error);
        throw error;
    }
};

export default useChangeUserImage;
