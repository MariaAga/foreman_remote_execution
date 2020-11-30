import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  TextInput,
  TextArea,
  FormSelect,
  Checkbox,
  Popover,
  ActionGroup,
  Button,
  Radio,
} from '@patternfly/react-core';
import { HelpIcon, ExclamationCircleIcon } from '@patternfly/react-icons';

import { translate as __ } from 'foremanReact/common/I18n';

const generateDefaultDescription = (descriptionFormat, templateInputs) => {
  if (descriptionFormat) {
    return descriptionFormat;
  }
  const generatedDescription = '%{template_name}';
  if (templateInputs) {
    const inputs = templateInputs
      .map(input => input.name)
      .map(name => `${name}=\\"%{${name}}\\"`)
      .join(' ');
    return generatedDescription.concat(' ', `with inputs ${inputs}`);
  }
  return generatedDescription;
};

const DescriptionTemplateField = ({
  description,
  setDescription,
  disabled,
  descriptionFormat,
  templateInputs,
}) => {
  // const defaultValue = generateDefaultDescription(
  //   descriptionFormat,
  //   templateInputs
  // );
  // :value => f.object.description_format || job_template.generate_description_format,

  const helpBlock = (
    <p>
      {__('This template is used to generate the description.')}
      {__('Input values can be used using the syntax %{package}.')}{' '}
      {__(
        'You may also include the job category and templatename using %{job_category} and %{template_name}.'
      )}
    </p>
  );
  return (
    <FormGroup
      label={__('Description template')}
      labelIcon={helpLabel(helpBlock)}
      fieldId="description_format'"
      type="text"
    >
      <TextArea
        disabled={disabled}
        id="description_format"
        rows={2}
        value={description}
        setValue={setDescription}
      />
    </FormGroup>
  );
};
const DescriptionField = ({
  description,
  setDescription,
  disabled,
  descriptionFormat,
  templateInputs,
}) => {
  const [isChecked, setIsChecked] = useState(true);
  const defaultValue = generateDefaultDescription(
    descriptionFormat,
    templateInputs
  );
  const handleCheck = (checked, event) => {
    setIsChecked(checked);
    setDescription(defaultValue);
  };
  return (
    <FormGroup
      label={__('Description')}
      labelIcon={helpLabel(
        __(
          'A user to be used for executing the script. If it differs from the SSH user, su or sudo is used to switch the accounts.'
        )
      )}
      fieldId="description"
      type="text"
    >
      <TextArea
        readOnly={isChecked}
        disabled={disabled}
        id="description"
        rows={2}
        value={description}
        setValue={setDescription}
      />
      <Checkbox isChecked={isChecked} onChange={handleCheck} />
      {__('Use default description template')}
    </FormGroup>
  );
};
