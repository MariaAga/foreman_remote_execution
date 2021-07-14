import React from 'react';
import PropTypes from 'prop-types';
import { translate as __ } from 'foremanReact/common/I18n';
import { TemplateInputsFields } from '../form/TemplateInputsFields';

export const TemplateInputs = ({ inputs, value, setValue }) => {
  if (inputs.length)
    return (
      <TemplateInputsFields inputs={inputs} value={value} setValue={setValue} />
    );
  return (
    <p className="gray-text">
      {__('There are no available input fields for the selected template.')}
    </p>
  );
};
TemplateInputs.propTypes = {
  inputs: PropTypes.array.isRequired,
  value: PropTypes.object,
  setValue: PropTypes.func.isRequired,
};

TemplateInputs.defaultProps = {
  value: {},
};
