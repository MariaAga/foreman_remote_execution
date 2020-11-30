import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FormGroup, TextInput } from '@patternfly/react-core';
import SearchBar from 'foremanReact/components/SearchBar';
import { helpLabel } from '../form/FormHelpers';
import { SelectField } from '../form/SelectField';

const TemplateSearchField = ({
  name,
  controller,
  labelText,
  required,
  defaultValue,
  setValue,
  values,
}) => {
  const searchQuery = useSelector(
    state => state.autocomplete[name]?.searchQuery
  );
  useEffect(() => {
    setValue({ ...values, [name]: searchQuery });
  }, [searchQuery]);
  return (
    <FormGroup
      key={name}
      label={name}
      labelIcon={helpLabel(labelText)}
      fieldId={name}
      isRequired={required}
    >
      <SearchBar
        initialQuery={defaultValue}
        data={{
          controller,
          autocomplete: {
            id: name,
            url: `/${controller}/auto_complete_search`,
            useKeyShortcuts: true,
          },
        }}
      />
    </FormGroup>
  );
};

export const formatter = (input, values, setValue) => {
  const isSelectType = !!input?.options;
  const inputType = input.value_type;
  const isTextType = inputType === 'plain' || !inputType; // null defaults to plain

  const { name, required, hidden_value: hidden } = input;
  const labelText = input.description;
  const defaultValue = input.default;
  const value = values[name] || defaultValue;

  if (isSelectType) {
    const options = input.options.split(/\r?\n/).map(option => option.trim());
    return (
      <SelectField
        key={name}
        isRequired={required}
        label={name}
        fieldId={name}
        options={options}
        labelText={labelText}
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
        labelIcon={helpLabel(labelText)}
        fieldId={name}
        isRequired={required}
      >
        <TextInput
          className={hidden ? 'masked-input' : null}
          required={required}
          rows={2}
          id={name}
          type="text"
          value={value}
          onChange={newValue => setValue({ ...values, [name]: newValue })}
        />
      </FormGroup>
    );
  }
  if (inputType === 'date') {
    return <span key={name}>DateTime here</span>;
  }
  if (inputType === 'search') {
    const controller = input.resource_type;
    // TODO: get text from redux autocomplete
    return (
      <TemplateSearchField
        name={name}
        controller={controller}
        labelText={labelText}
        required={required}
        defaultValue={defaultValue}
        setValue={setValue}
        values={values}
      />
    );
  }

  return null;
};
