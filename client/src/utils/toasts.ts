import { useToastStore } from '@/stores/toasts';
import Toast from '@/types/toasts';

const emitToast = (type = 'error', title = 'Error', message = '') => {
  useToastStore.getState().addToast({
    type,
    title,
    message,
  } as Toast);
};

const emitError = ({ title = 'Error', message = '' }) => {
  emitToast('error', title, message);
};

const emitWarning = ({ title = 'warning', message = '' }) => {
  emitToast('warning', title, message);
};

const emitInfo = ({ title = 'info', message = '' }) => {
  emitToast('info', title, message);
};

const emitSuccess = ({ title = 'success', message = '' }) => {
  emitToast('success', title, message);
};

export { emitError, emitWarning, emitInfo, emitSuccess };
