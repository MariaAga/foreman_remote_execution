import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@patternfly/react-core';
import {
  EffectiveUserField,
  TimeoutToKillField,
  PasswordField,
  KeyPassphraseField,
  EffectiveUserPasswordField,
  ConcurrencyLevelField,
  TimeSpanLevelField,
  TemplateInputsFields,
} from './Fields';

export const AdvancedFields = ({
  effective_user: effectiveUser,
  template_inputs_with_foreign: templateInputs,
  job_template: {
    execution_timeout_interval: executionTimeoutInterval,
    // description_format: descriptionFormat,
  },
  advancedValue,
  setAdvancedValue,
}) => {
  return (
    <Form>
      <TemplateInputsFields
        inputs={templateInputs}
        value={advancedValue.templateValues}
        setValue={newValue =>
          setAdvancedValue({ ...advancedValue, templateValues: newValue })
        }
      />
      {effectiveUser?.overridable && (
        <EffectiveUserField
          value={advancedValue.effectiveUserValue}
          setValue={newValue =>
            setAdvancedValue({ ...advancedValue, effectiveUserValue: newValue })
          }
        />
      )}
      <TimeoutToKillField
        value={advancedValue.timeoutToKill}
        setValue={newValue =>
          setAdvancedValue({ ...advancedValue, timeoutToKill: newValue })
        }
      />
      {/* <DescriptionField
        description={description}
        setDescription={setDescription}
        templateInputs={templateInputs}
        descriptionFormat={descriptionFormat}
      />
      <DescriptionTemplateField /> */}
      <PasswordField
        value={advancedValue.password}
        setValue={newValue =>
          setAdvancedValue({ ...advancedValue, password: newValue })
        }
      />
      <KeyPassphraseField
        value={advancedValue.keyPassphrase}
        setValue={newValue =>
          setAdvancedValue({ ...advancedValue, keyPassphrase: newValue })
        }
      />
      <EffectiveUserPasswordField
        value={advancedValue.effectiveUserPassword}
        setValue={newValue =>
          setAdvancedValue({
            ...advancedValue,
            effectiveUserPassword: newValue,
          })
        }
      />

      <ConcurrencyLevelField
        value={advancedValue.concurrencyLevel}
        setValue={newValue =>
          setAdvancedValue({ ...advancedValue, concurrencyLevel: newValue })
        }
      />
      <TimeSpanLevelField
        value={advancedValue.timeSpan}
        setValue={newValue =>
          setAdvancedValue({ ...advancedValue, timeSpan: newValue })
        }
      />
    </Form>
  );
};

AdvancedFields.propTypes = {
  effective_user: PropTypes.object,
  job_template: PropTypes.shape({
    execution_timeout_interval: PropTypes.string,
  }),
  template_inputs_with_foreign: PropTypes.array,
  advancedValue: PropTypes.object.isRequired,
  setAdvancedValue: PropTypes.func.isRequired,
};
AdvancedFields.defaultProps = {
  effective_user: {},
  job_template: {},
  template_inputs_with_foreign: [],
};
export default AdvancedFields;
