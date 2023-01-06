import { forwardRef } from 'react';

export const DetailSalePrint = forwardRef((props, ref) => (
  <div ref={ref}>
    {' '}
    <style type="text/css" media="print">
      {'\
   @page { size: landscape; }\
'}
    </style>
    My cool content here!
  </div>
));
