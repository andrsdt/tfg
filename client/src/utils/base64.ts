import { api } from '@/lib/api';

export const fileToBase64 = (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// https://stackoverflow.com/a/62227874
const urlToDataUrl = async (url: string): Promise<string> => {
  const response = await api.getAxiosInstance().get(url, {
    responseType: 'blob',
  });
  const blob = await response.data;
  return await fileToBase64(blob);
};

export const urltoFile = async (url) => {
  const dataUrl = await urlToDataUrl(url);
  const filename = url.split('/').pop().split('?')[0].split('#')[0];
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
