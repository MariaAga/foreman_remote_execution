import React, { useState } from 'react';
import { Wizard } from '@patternfly/react-core';
import { translate as __ } from 'foremanReact/common/I18n';
import CategoryAndTemplate from './steps/CategoryAndTemplate/';

export const JobWizard = () => {
  const [jobTemplate, setJobTemplate] = useState(null);
  const [category, setCategory] = useState('');
  const steps = [
    {
      name: __('Category and template'),
      component: (
        <CategoryAndTemplate
          jobTemplate={jobTemplate}
          setJobTemplate={setJobTemplate}
          category={category}
          setCategory={setCategory}
        />
      ),
    },
    {
      name: __('Target hosts'),
      component: <p>TargetHosts </p>,
      canJumpTo: !!jobTemplate,
    },
    {
      name: __('Advanced fields'),
      component: <p> AdvancedFields </p>,
      canJumpTo: !!jobTemplate,
    },
    {
      name: __('Schedule'),
      component: <p>Schedule</p>,
      canJumpTo: !!jobTemplate,
    },
    {
      name: __('Review details'),
      component: <p>ReviewDetails</p>,
      nextButtonText: 'Run',
      canJumpTo: !!jobTemplate,
    },
  ];
  const title = __('Run Job');
  return <Wizard navAriaLabel={`${title} steps`} steps={steps} height="70vh" />;
};
