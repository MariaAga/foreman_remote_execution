import React from 'react';
import PropTypes from 'prop-types';
import { Formatter } from './Formatter';

export const TemplateInputsFields = ({ inputs, value, setValue }) => (
  <>
    {inputs?.map((input, index) => (
      <Formatter key={index} input={input} values={value} setValue={setValue} />
    ))}
  </>
);

TemplateInputsFields.propTypes = {
  inputs: PropTypes.array.isRequired,
  value: PropTypes.object,
  setValue: PropTypes.func.isRequired,
};

TemplateInputsFields.defaultProps = {
  value: {},
};
