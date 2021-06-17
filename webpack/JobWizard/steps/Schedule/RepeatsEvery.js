import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Select, SelectOption } from '@patternfly/react-core';
import { translate as __ } from 'foremanReact/common/I18n';

import { SelectField } from '../form/SelectField';

export const RepeatsEvery = ({}) => {
  const repeatTypes = [{ a: 'a' }, { b: 'b' }];
  const onSelect = (event, selection) => {
    // setValue(selection);
    setIsOpen(false);
  };
  // const [isOpen, setIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <FormGroup label={__('Repeats Every')} id="repeats-every">
      {/* <div className="pf-c-form pf-m-horizontal"> */}
        {/* <Select
          selections={'a'}
          onSelect={onSelect}
          onToggle={setIsOpen}
          isOpen={isOpen}
          className="without_select2"
          maxHeight="45vh"
          menuAppendTo={() => document.body}
        >
          {repeatTypes.map((option, index) => (
            <SelectOption key={index} value={option} />
          ))}
        </Select>{' '}
        <Select
          selections={'a'}
          onSelect={onSelect}
          onToggle={setIsOpen}
          isOpen={isOpen}
          className="without_select2"
          maxHeight="45vh"
          menuAppendTo={() => document.body}
        >
          {repeatTypes.map((option, index) => (
            <SelectOption key={index} value={option} />
          ))}
        </Select> */}
      {/* </div> */}
    </FormGroup>
  );
};

RepeatsEvery.propTypes = {};
