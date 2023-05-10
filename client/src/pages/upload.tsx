import { LayoutWithNavbar } from '@/components/Layouts';

const Upload = () => {
  return (
    <LayoutWithNavbar>
      THIS IS THE UPLOAD PAGE, RESTRICTED TO USERS WHO ARE PRODUCERS. IT WOULD
      BE A FORM, BUT IF YOU ARE NOT A PRODUCER, YOU WILL BE REDIRECTED TO BECOME
      ONE
    </LayoutWithNavbar>
  );
};

export default Upload;
