import { forwardRef, Ref } from 'react';
import Image from 'next/image';
import { DEFAULT_DASHBOARD_ICONS } from '@/constants/general';

const CustomDropdownIcon = forwardRef(function CustomDropdownIcon(props, ref) {
  return (
    <span {...props} ref={ref as Ref<HTMLSpanElement>}>
      <Image
        alt=""
        src={`${DEFAULT_DASHBOARD_ICONS}/pen.png`}
        width={17}
        height={17}
      />
    </span>
  );
});

export default CustomDropdownIcon;
