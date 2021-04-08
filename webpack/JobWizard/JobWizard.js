import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Wizard } from '@patternfly/react-core';
import { get } from 'foremanReact/redux/API';
import { translate as __ } from 'foremanReact/common/I18n';
import history from 'foremanReact/history';
import CategoryAndTemplate from './steps/CategoryAndTemplate/';
import { AdvancedFields } from './steps/AdvancedFields/AdvancedFields';
import { JOB_TEMPLATE } from './JobWizardConstants';
import './JobWizard.scss';

export const JobWizard = () => {
  const [jobTemplateID, setJobTemplateID] = useState(null);
  const [category, setCategory] = useState('');
  const [advancedValue, setAdvancedValue] = useState({});
  const dispatch = useDispatch();

  const setDefaults = useCallback(
    response => {
      const responseJob = response.data;
      const templateValues = {};
      const inputs = responseJob.template_inputs_with_foreign;
      if (inputs) {
        inputs
          .filter(input => input.advanced)
          .forEach(input => {
            templateValues[input.name] = input?.default || '';
          });
      }
      setAdvancedValue({
        ...advancedValue,
        effectiveUserValue: responseJob.effective_user?.value || '',
        timeoutToKill: responseJob.job_template?.executionTimeoutInterval || '',
        templateValues,
      });
    },
    [advancedValue]
  );
  useEffect(() => {
    if (jobTemplateID) {
      dispatch(
        get({
          key: JOB_TEMPLATE,
          url: `/ui_job_wizard/template/${jobTemplateID}`,
          handleSuccess: setDefaults,
        })
      );
    }
  }, [jobTemplateID, dispatch]);

  const steps = [
    {
      name: __('Category and template'),
      component: (
        <CategoryAndTemplate
          jobTemplate={jobTemplateID}
          setJobTemplate={setJobTemplateID}
          category={category}
          setCategory={setCategory}
        />
      ),
    },
    {
      name: __('Target hosts'),
      component: <p>TargetHosts </p>,
      canJumpTo: !!jobTemplateID,
    },
    {
      name: __('Advanced fields'),
      component: (
        <AdvancedFields
          advancedValue={advancedValue}
          setAdvancedValue={newValue => {
            setAdvancedValue(currentAdvancedValue => ({
              ...currentAdvancedValue,
              ...newValue,
            }));
          }}
          jobTemplateID={jobTemplateID}
        />
      ),
      canJumpTo: !!jobTemplateID,
    },
    {
      name: __('Schedule'),
      component: <p>Schedule</p>,
      canJumpTo: !!jobTemplateID,
    },
    {
      name: __('Review details'),
      component: <p>ReviewDetails</p>,
      nextButtonText: 'Run',
      canJumpTo: !!jobTemplateID,
    },
  ];
  const title = __('Run Job');
  return (
    <Wizard
      onClose={() => history.goBack()}
      className="job-wizard"
      navAriaLabel={`${title} steps`}
      steps={steps}
      height="100%"
    />
  );
};

export default JobWizard;
