import React, { useState } from 'react';
import GeneralMemoriesInfo from './GeneralMemoriesInfo';
import SocialMediaMemoriesInfo from './SocialMediaMemoriesInfo';

const STEP_COMPONENTS = [
  <GeneralMemoriesInfo key="general" />,
  <SocialMediaMemoriesInfo key="social" />,
];

const Memories = () => {
  const [step, setStpe] = useState(0);
  return <>{STEP_COMPONENTS[step]}</>;
};

export default Memories;
