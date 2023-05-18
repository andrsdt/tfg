import { act, renderHook } from '@testing-library/react';
import { useToastStore } from '../toasts';
import Toast from '@/types/toasts';

test('should add and remove toasts', () => {
  const { result } = renderHook(() => useToastStore());

  expect(result.current.toasts.length).toBe(0);

  const toast: Toast = {
    id: '123',
    title: 'Hello World',
    type: 'info',
    message: 'This is a toast',
  };

  act(() => {
    result.current.addToast(toast);
  });

  expect(result.current.toasts).toContainEqual(toast);

  act(() => {
    result.current.dismissToast(toast.id);
  });

  expect(result.current.toasts).not.toContainEqual(toast);
});
