import { fileToBase64 } from '@/utils/base64';
import { compressImage } from '@/utils/compressor';
import { CameraIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { UpdateProfileValues } from '../../api/update';
import { AuthenticatedUser } from '../../types/users';
import { Avatar } from '../Avatar';
import clsx from 'clsx';

type EditableAvatarProps = {
  setValue: UseFormSetValue<UpdateProfileValues>;
  user: AuthenticatedUser;
};

export const AvatarFormField = ({ setValue, user }: EditableAvatarProps) => {
  const [photoPreview, setPhotoPreview] = useState(user.photo);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  return (
    <div className="flex w-full justify-center">
      <label
        htmlFor="uploadProfilePicture"
        className={clsx(
          'relative',
          isLoadingImage ? 'opacity-80 grayscale' : 'cursor-pointer'
        )}
      >
        <CameraIcon className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-green p-1.5 text-white outline outline-8 outline-white" />
        <Avatar
          props={{
            id: 'profilePicture',
          }}
          src={photoPreview}
          alt={user.first_name}
          className="h-32 w-32"
        />
        <input
          id="uploadProfilePicture"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;
            setIsLoadingImage(true);
            const reader = new FileReader();
            reader.onload = async (e) => {
              const newPhoto = e.target?.result as string; // base64
              const compressedImage = await compressImage(file);
              const compressedBase64image = await fileToBase64(compressedImage);
              setPhotoPreview(newPhoto);
              setValue('photo', compressedBase64image);
              setIsLoadingImage(false);
            };
            reader.readAsDataURL(file);
          }}
        />
      </label>
    </div>
  );
};
