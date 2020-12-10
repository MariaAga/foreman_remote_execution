import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Wizard } from '@patternfly/react-core';
import { get } from 'foremanReact/redux/API';
import { translate as __ } from 'foremanReact/common/I18n';
import history from 'foremanReact/history';
import CategoryAndTemplate from './steps/CategoryAndTemplate/';
import { AdvancedFields } from './steps/AdvancedFields/AdvancedFields';
import { JOB_TEMPLATE } from './JobWizardConstants';
import HostsAndInputs from './steps/HostsAndInputs/';
import './JobWizard.scss';

export const JobWizard = () => {
  const [jobTemplateID, setJobTemplateID] = useState(null);
  const [category, setCategory] = useState('');
  const [advancedValue, setAdvancedValue] = useState({});
  const [templateValues, setTemplateValues] = useState({}); // TODO use templateValues in advanced fields - description
  const [selectedHosts, setSelectedHosts] = useState(['host1', 'host2']);
  const dispatch = useDispatch();

  const setDefaults = useCallback(
    response => {
      const responseJob = response.data;
      const defaultAdvancedTemplateValues = {};
      const defaultTemplateValues = {};
      const inputs = responseJob.template_inputs_with_foreign;
      if (inputs) {
        inputs.forEach(input => {
          if (input.advanced)
            defaultAdvancedTemplateValues[input.name] = input?.default || '';
          else defaultTemplateValues[input.name] = input?.default || '';
        });
      }
      setTemplateValues(defaultTemplateValues);
      setAdvancedValue({
        ...advancedValue,
        effectiveUserValue: responseJob.effective_user?.value || '',
        timeoutToKill: responseJob.job_template?.executionTimeoutInterval || '',
        templateValues,
      });
    },
    [advancedValue, templateValues]
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      name: __('Target hosts and inputs'),
      component: (
        <HostsAndInputs
          templateValues={templateValues}
          setTemplateValues={setTemplateValues}
          selectedHosts={selectedHosts}
          setSelectedHosts={setSelectedHosts}
        />
      ),
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
