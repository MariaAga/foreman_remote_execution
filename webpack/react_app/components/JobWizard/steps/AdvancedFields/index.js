import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { get } from 'foremanReact/redux/API';
import { AdvancedFields } from './AdvancedFields';
import { selectJobTemplate } from '../../JobWizardSelectors';
import { JOB_TEMPLATE } from '../../JobWizardConsts';

const ConnectedAdvancedFields = ({
  jobTemplateID,
  advancedValue,
  setAdvancedValue,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      get({
        key: JOB_TEMPLATE,
        url: `/ui_job_wizard/template/${jobTemplateID}`,
      })
    );
  }, [jobTemplateID, dispatch]);

  useEffect(() => setAdvancedValueDefaults, [
    jobTemplate,
    setAdvancedValueDefaults,
  ]);

  const jobTemplate = useSelector(selectJobTemplate);
  const setAdvancedValueDefaults = useCallback(
    () =>
      setAdvancedValue({
        ...advancedValue,
        effectiveUserValue: jobTemplate.effectiveUser?.value || '',
        timeoutToKill: jobTemplate.job_template?.executionTimeoutInterval || '',
      }),
    [setAdvancedValue, jobTemplate]
  );
  return (
    <AdvancedFields
      {...jobTemplate}
      advancedValue={advancedValue}
      setAdvancedValue={setAdvancedValue}
    />
  );
};

ConnectedAdvancedFields.propTypes = {
  jobTemplateID: PropTypes.number.isRequired,
};

export default ConnectedAdvancedFields;
