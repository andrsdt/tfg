import { useSubmissionHandler } from '@/hooks/useSubmissionHandler';
import { Components } from '@/types/openapi';
import { fileToBase64 } from '@/utils/base64';
import { compressImage } from '@/utils/compressor';
import { emitSuccess } from '@/utils/toasts';
import { CameraIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { updateProfile } from '../../api/update';
import { Avatar } from '.';
import clsx from 'clsx';

type EditableAvatarProps = {
  user: Components.Schemas.CustomUserDetails;
};

const notify = () => {
  emitSuccess({
    title: 'Perfil actualizado',
    message: 'Se ha actualizado tu foto de perfil correctamente',
  });
};

export const EditableAvatar = ({ user }: EditableAvatarProps) => {
  const [currentPhoto, setCurrentPhoto] = useState(user.photo);
  const [handleUpdateProfile, isUploadingImage] = useSubmissionHandler(
    updateProfile,
    {
      onSuccess: notify,
    }
  );

  return (
    <label
      htmlFor="uploadProfilePicture"
      className={clsx(
        'relative',
        isUploadingImage ? 'opacity-80 grayscale' : 'cursor-pointer'
      )}
    >
      <CameraIcon className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-green p-1.5 text-white outline outline-8 outline-white" />
      <Avatar
        props={{
          id: 'profilePicture',
        }}
        src={currentPhoto}
        alt={user.first_name}
        className="w-32"
      />
      <input
        id="uploadProfilePicture"
        type="file"
        accept="image/*"
        className="hidden"
        disabled={isUploadingImage}
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = async (e) => {
            const newPhoto = e.target?.result as string; // base64
            const compressedImage = await compressImage(file);
            const compressedBase64image = await fileToBase64(compressedImage);
            await handleUpdateProfile({
              photo: compressedBase64image,
            });
            setCurrentPhoto(newPhoto);
          };
          reader.readAsDataURL(file);
        }}
      />
    </label>
  );
};
