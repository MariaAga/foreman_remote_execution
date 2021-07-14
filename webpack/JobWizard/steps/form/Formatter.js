import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, TextInput, TextArea } from '@patternfly/react-core';
import { helpLabel } from './FormHelpers';
import { SelectField } from './SelectField';
import { TemplateSearchField } from './TemplateSearchField';

export const Formatter = ({ input, values, setValue }) => {
  const isSelectType = !!input?.options;
  const inputType = input.value_type;
  const isTextType = inputType === 'plain' || !inputType; // null defaults to plain

  const { name, required, hidden_value: hidden } = input;
  const labelText = input.description;
  const value = values[name];
  const id = name.replace(/ /g, '-');
  if (isSelectType) {
    const options = input.options.split(/\r?\n/).map(option => option.trim());
    return (
      <SelectField
        aria-label={name}
        key={id}
        isRequired={required}
        label={name}
        fieldId={id}
        options={options}
        labelIcon={helpLabel(labelText, name)}
        value={value}
        setValue={newValue => setValue({ ...values, [name]: newValue })}
      />
    );
  }
  if (isTextType) {
    return (
      <FormGroup
        key={name}
        label={name}
        labelIcon={helpLabel(labelText, name)}
        fieldId={id}
        isRequired={required}
      >
        <TextArea
          aria-label={name}
          className={hidden ? 'masked-input' : null}
          required={required}
          rows={2}
          id={id}
          value={value}
          onChange={newValue => setValue({ ...values, [name]: newValue })}
        />
      </FormGroup>
    );
  }
  if (inputType === 'date') {
    return (
      <FormGroup
        key={name}
        label={name}
        labelIcon={helpLabel(labelText, name)}
        fieldId={id}
        isRequired={required}
      >
        <TextInput
          aria-label={name}
          placeholder="YYYY-mm-dd HH:MM"
          className={hidden ? 'masked-input' : null}
          required={required}
          id={id}
          type="text"
          value={value}
          onChange={newValue => setValue({ ...values, [name]: newValue })}
        />
      </FormGroup>
    );
  }
  if (inputType === 'search') {
    const controller = input.resource_type;
    // TODO: get text from redux autocomplete
    return (
      <TemplateSearchField
        key={id}
        name={name}
        defaultValue={value}
        controller={controller}
        labelText={labelText}
        required={required}
        setValue={setValue}
        values={values}
      />
    );
  }

  return null;
};

Formatter.propTypes = {
  input: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};
