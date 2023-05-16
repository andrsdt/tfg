import Compressor from 'compressorjs';

export const compressImage = (file: File) => {
  return new Promise<File>((resolve, reject) => {
    new Compressor(file, {
      quality: 0.4,
      success: (result) => {
        resolve(result as File);
      },
      error: (err) => {
        reject(err);
      },
    });
  });
};
