import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FormGroup, TextInput } from '@patternfly/react-core';
import { translate as __ } from 'foremanReact/common/I18n';
import { helpLabel } from '../form/FormHelpers';
import { formatter, isNumber } from './Formatter';

export const EffectiveUserField = ({ value, setValue }) => (
  <FormGroup
    label={__('Effective user')}
    labelIcon={helpLabel(
      __(
        'A user to be used for executing the script. If it differs from the SSH user, su or sudo is used to switch the accounts.'
      )
    )}
    fieldId="effective-user"
  >
    <TextInput
      autoComplete="effective-user"
      id="effective-user"
      type="text"
      value={value}
      onChange={newValue => setValue(newValue)}
    />
  </FormGroup>
);

export const TimeoutToKillField = ({ value, setValue }) => {
  const [validated, setValidated] = useState('default');
  const handleTextInputChange = newValue => {
    setValidated(isNumber(newValue) ? 'default' : 'error');
    setValue(newValue);
  };

  return (
    <FormGroup
      label={__('Timeout to kill')}
      labelIcon={helpLabel(
        __(
          'Time in seconds from the start on the remote host after which the job should be killed.'
        )
      )}
      fieldId="timeout-to-kill"
      validated={validated}
      helperTextInvalid={__('Timeout to kill has to be a number')}
    >
      <TextInput
        type="number"
        value={value}
        placeholder={__('For example: 1, 2, 3, 4, 5...')}
        autoComplete="timeout-to-kill"
        id="timeout-to-kill"
        validated={validated}
        onChange={handleTextInputChange}
      />
    </FormGroup>
  );
};

export const PasswordField = ({ value, setValue }) => (
  <FormGroup
    label={__('Password')}
    labelIcon={helpLabel(
      __(
        'Password is stored encrypted in DB until the job finishes. For future or recurring executions, it is removed after the last execution.'
      )
    )}
    fieldId="password"
  >
    <TextInput
      autoComplete="password"
      id="password"
      type="password"
      placeholder="*****"
      value={value}
      onChange={newValue => setValue(newValue)}
    />
  </FormGroup>
);

export const KeyPassphraseField = ({ value, setValue }) => (
  <FormGroup
    label={__('Private key passphrase')}
    labelIcon={helpLabel(
      __(
        'Key passphrase is only applicable for SSH provider. Other providers ignore this field. Passphrase is stored encrypted in DB until the job finishes. For future or recurring executions, it is removed after the last execution.'
      )
    )}
    fieldId="key-passphrase"
  >
    <TextInput
      autoComplete="key-passphrase"
      id="key-passphrase"
      type="password"
      placeholder="*****"
      value={value}
      onChange={newValue => setValue(newValue)}
    />
  </FormGroup>
);

export const EffectiveUserPasswordField = ({ value, setValue }) => (
  <FormGroup
    label={__('Effective user password')}
    labelIcon={helpLabel(
      __(
        'Effective user password is only applicable for SSH provider. Other providers ignore this field. Password is stored encrypted in DB until the job finishes. For future or recurring executions, it is removed after the last execution.'
      )
    )}
    fieldId="effective-user-password"
  >
    <TextInput
      autoComplete="effective-user-password"
      id="effective-user-password"
      type="password"
      placeholder="*****"
      value={value}
      onChange={newValue => setValue(newValue)}
    />
  </FormGroup>
);

export const ConcurrencyLevelField = ({ value, setValue }) => {
  const [validated, setValidated] = useState('default');
  const handleTextInputChange = newValue => {
    setValidated(isNumber(newValue) && newValue >= 1 ? 'default' : 'error');
    setValue(newValue);
  };
  return (
    <FormGroup
      label={__('Concurrency level')}
      labelIcon={helpLabel(
        __(
          'Run at most N tasks at a time. If this is set and proxy batch triggering is enabled, then tasks are triggered on the smart proxy in batches of size 1.'
        )
      )}
      fieldId="concurrency-level"
      validated={validated}
      helperTextInvalid={__(
        'Concurrency level has to be a number, and at least 1'
      )}
    >
      <TextInput
        type="number"
        autoComplete="concurrency-level"
        id="concurrency-level"
        placeholder={__('For example: 1, 2, 3, 4, 5...')}
        value={value}
        validated={validated}
        onChange={newValue => handleTextInputChange(newValue)}
      />
    </FormGroup>
  );
};

export const TimeSpanLevelField = ({ value, setValue }) => {
  const [validated, setValidated] = useState('default');
  const handleTextInputChange = newValue => {
    setValidated(isNumber(newValue) && newValue >= 1 ? 'default' : 'error');
    setValue(newValue);
  };
  return (
    <FormGroup
      label={__('Time span')}
      labelIcon={helpLabel(
        __(
          'Distribute execution over N seconds. If this is set and proxy batch triggering is enabled, then tasks are triggered on the smart proxy in batches of size 1.'
        )
      )}
      fieldId="time-span"
      validated={validated}
      helperTextInvalid={__(
        'Concurrency level has to be a number, and at least 1'
      )}
    >
      <TextInput
        min={1}
        type="number"
        autoComplete="time-span"
        id="time-span"
        placeholder={__('For example: 1, 2, 3, 4, 5...')}
        value={value}
        validated={validated}
        onChange={newValue => handleTextInputChange(newValue)}
      />
    </FormGroup>
  );
};

export const TemplateInputsFields = ({ inputs, value, setValue }) => {
  inputs = inputs?.filter(input => input.advanced);
  return <>{inputs?.map(input => formatter(input, value, setValue))}</>;
};

EffectiveUserField.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};
TimeoutToKillField.propTypes = EffectiveUserField.propTypes;
PasswordField.propTypes = EffectiveUserField.propTypes;
KeyPassphraseField.propTypes = EffectiveUserField.propTypes;
EffectiveUserPasswordField.propTypes = EffectiveUserField.propTypes;
ConcurrencyLevelField.propTypes = EffectiveUserField.propTypes;
TimeSpanLevelField.propTypes = EffectiveUserField.propTypes;

TemplateInputsFields.propTypes = {
  inputs: PropTypes.array.isRequired,
  value: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
};
