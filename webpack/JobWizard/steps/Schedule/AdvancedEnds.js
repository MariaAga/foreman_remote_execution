import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Radio, TextInput, Title } from '@patternfly/react-core';
import { translate as __ } from 'foremanReact/common/I18n';
import { DateTimePicker } from '../form/DateTimePicker';

export const AdvancedEnds = ({
  endType,
  setEndType,
  ends,
  setEnds,
  endsAfter,
  setEndsAfter,
}) => (
  <>
    {/* <FormGroup label={__('Ends')} id="ends-advanced"> */}
    <Title headingLevel="h3">{__('Ends')}</Title>
    <Radio
      isChecked={endType === 'never'}
      name="end-type-never"
      id="end-type-never"
      onChange={() => setEndType('never')}
      className="radio-advanced-schedule"
      label={
        <div className="pf-c-form pf-m-horizontal">
          <FormGroup label={__('Never')} id="set-ends-never" />
        </div>
      }
    />

    <Radio
      isChecked={endType === 'at'}
      name="end-type-at"
      onChange={() => setEndType('at')}
      id="end-at-advanced"
      className="radio-advanced-schedule"
      label={
        <div className="pf-c-form pf-m-horizontal">
          <FormGroup label={__('At')} id="set-ends-at">
            <DateTimePicker
              isDisabled={endType !== 'at'}
              dateTime={ends}
              setDateTime={setEnds}
            />
          </FormGroup>
        </div>
      }
    />
    <Radio
      isChecked={endType === 'after'}
      name="end-type-after"
      onChange={() => setEndType('after')}
      id="end-after-advanced"
      className="radio-advanced-schedule"
      label={
        <div className="pf-c-form pf-m-horizontal">
          <FormGroup label={__('After')} id="set-ends-after">
            <div>
              <TextInput
                isDisabled={endType !== 'after'}
                id="after-end-date"
                value={endsAfter}
                type="number"
                onChange={newValue => setEndsAfter(newValue)}
              />
              <span>{__('occurrences')}</span>
            </div>
          </FormGroup>
        </div>
      }
    />
    {/* </FormGroup> */}
  </>
);

AdvancedEnds.propTypes = {
  ends: PropTypes.string.isRequired,
  setEnds: PropTypes.func.isRequired,
  endType: PropTypes.string.isRequired,
  setEndType: PropTypes.func.isRequired,
  endsAfter: PropTypes.string.isRequired,
  setEndsAfter: PropTypes.func.isRequired,
};
