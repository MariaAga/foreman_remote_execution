import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Wizard } from '@patternfly/react-core';
import { get } from 'foremanReact/redux/API';
import { translate as __ } from 'foremanReact/common/I18n';
import history from 'foremanReact/history';
import { noop } from 'foremanReact/common/helpers';
import CategoryAndTemplate from './steps/CategoryAndTemplate/';
import { AdvancedFields } from './steps/AdvancedFields/AdvancedFields';
import { JOB_TEMPLATE } from './JobWizardConstants';
import { selectTemplateError } from './JobWizardSelectors';
import Schedule from './steps/Schedule/';
import HostsAndInputs from './steps/HostsAndInputs/';
import { useAutoFill } from './autofill';
import './JobWizard.scss';

export const JobWizard = ({ fills, setFills }) => {
  const [jobTemplateID, setJobTemplateID] = useState(null);
  const [category, setCategory] = useState('');

  const [advancedValues, setAdvancedValues] = useState({});
  const [templateValues, setTemplateValues] = useState({}); // TODO use templateValues in advanced fields - description
  const [selectedTargets, setSelectedTargets] = useState({
    hosts: [],
    hostCollections: [],
    hostGroups: [],
  });
  const [hostsSearchQuery, setHostsSearchQuery] = useState('');
  const dispatch = useDispatch();

  const setDefaults = useCallback(response => {
    if (!category.length) {
      setCategory(current =>
        current.length ? current : response.data.job_template.job_category
      );
    }
    const responseJob = response.data;
    const advancedTemplateValues = {};
    const defaultTemplateValues = {};
    const inputs = responseJob.template_inputs;
    const advancedInputs = responseJob.advanced_template_inputs;
    if (advancedInputs) {
      advancedInputs.forEach(input => {
        advancedTemplateValues[input.name] = input?.default || '';
      });
    }
    if (inputs) {
      inputs.forEach(input => {
        defaultTemplateValues[input.name] = input?.default || '';
      });
    }
    setTemplateValues(prev => ({ ...prev, defaultTemplateValues }));
    setAdvancedValues(currentAdvancedValues => ({
      ...currentAdvancedValues,
      effectiveUserValue: responseJob.effective_user?.value || '',
      timeoutToKill: responseJob.job_template?.executionTimeoutInterval || '',
      templateValues: advancedTemplateValues,
    }));
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
  }, [jobTemplateID, setDefaults, dispatch]);

  useAutoFill({
    fills,
    setFills,
    setSelectedTargets,
    setHostsSearchQuery,
    setJobTemplateID,
    setTemplateValues,
  });
  const templateError = !!useSelector(selectTemplateError);
  const isTemplate = !templateError && !!jobTemplateID;
  const steps = [
    {
      name: __('Category and Template'),
      component: (
        <CategoryAndTemplate
          jobTemplate={jobTemplateID}
          setJobTemplate={setJobTemplateID}
          category={category}
          setCategory={setCategory}
          isFeature={!!fills.feature}
        />
      ),
    },
    {
      name: __('Target hosts and inputs'),
      component: (
        <HostsAndInputs
          templateValues={templateValues}
          setTemplateValues={setTemplateValues}
          selected={selectedTargets}
          setSelected={setSelectedTargets}
          hostsSearchQuery={hostsSearchQuery}
          setHostsSearchQuery={setHostsSearchQuery}
        />
      ),
      canJumpTo: isTemplate,
    },
    {
      name: __('Advanced Fields'),
      component: (
        <AdvancedFields
          advancedValues={advancedValues}
          setAdvancedValues={newValues => {
            setAdvancedValues(currentAdvancedValues => ({
              ...currentAdvancedValues,
              ...newValues,
            }));
          }}
          jobTemplateID={jobTemplateID}
        />
      ),
      canJumpTo: isTemplate,
    },
    {
      name: __('Schedule'),
      component: <Schedule />,
      canJumpTo: isTemplate,
    },
    {
      name: __('Review Details'),
      component: <p>Review Details</p>,
      nextButtonText: 'Run',
      canJumpTo: isTemplate,
    },
  ];
  return (
    <Wizard
      onClose={() => history.goBack()}
      navAriaLabel="Run Job steps"
      steps={steps}
      height="100%"
      className="job-wizard"
    />
  );
};

JobWizard.propTypes = {
  fills: PropTypes.object,
  setFills: PropTypes.func,
};
JobWizard.defaultProps = {
  fills: {},
  setFills: noop,
};

export default JobWizard;
