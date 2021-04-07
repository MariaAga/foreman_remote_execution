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

  const setDefaults = useCallback(response => {
    const responseJob = response.data;
    setAdvancedValue({
      effectiveUserValue: responseJob.effective_user?.value || '',
      timeoutToKill: responseJob.job_template.execution_timeout_interval || '',
    });
  }, []);
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
  }, [jobTemplateID, dispatch, setDefaults]);

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
      navAriaLabel={`${title} steps`}
      steps={steps}
      height="70vh"
      className="job-wizard"
    />
  );
};

export default JobWizard;
