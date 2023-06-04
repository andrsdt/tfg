import MuiSlider, { SliderProps } from '@mui/base/Slider';
import { forwardRef } from 'react';

export const Slider = forwardRef(function Slider(
  props: SliderProps,
  ref: React.ForwardedRef<HTMLSpanElement>
) {
  return (
    <MuiSlider
      {...props}
      ref={ref}
      slotProps={{
        thumb: {
          className:
            'ring-green ring-2 w-5 h-5 -mt-1.5 -ml-2 flex items-center justify-center bg-green rounded-full shadow absolute',
        },
        root: {
          className: 'w-full relative inline-block cursor-pointer',
        },
        rail: {
          className: 'bg-light-gray h-2 w-full rounded-full block absolute',
        },
        track: {
          className: 'bg-green h-2 absolute rounded-full',
        },
      }}
    />
  );
});
