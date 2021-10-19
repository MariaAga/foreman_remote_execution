import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Radio, TextInput, Title } from '@patternfly/react-core';
import { translate as __ } from 'foremanReact/common/I18n';
import { DateTimePicker } from '../form/DateTimePicker';

export const AdvancedEnds = ({
  ends,
  setEnds,
  endsAfter,
  setEndsAfter,
  isNeverEnds,
  setIsNeverEnds,
}) => (
  <>
    <Title headingLevel="h3">{__('Ends')}</Title>
    <Radio
      isChecked={isNeverEnds}
      name="end-type-never"
      id="end-type-never"
      onChange={() => setIsNeverEnds(true)}
      className="radio-advanced-schedule"
      label={
        <div className="pf-c-form pf-m-horizontal">
          <FormGroup label={__('Never')} id="set-ends-never" />
        </div>
      }
    />

    <Radio
      isChecked={!isNeverEnds && !endsAfter}
      name="end-type-at"
      onChange={() => {
        setEnds(new Date());
        setIsNeverEnds(false);
      }}
      id="end-at-advanced"
      className="radio-advanced-schedule"
      label={
        <div className="pf-c-form pf-m-horizontal">
          <FormGroup label={__('At')} id="set-ends-at">
            <DateTimePicker
              isDisabled={!(!isNeverEnds && !endsAfter)}
              dateTime={ends}
              setDateTime={setEnds}
            />
          </FormGroup>
        </div>
      }
    />
    <Radio
      isChecked={!isNeverEnds && endsAfter}
      name="end-type-after"
      onChange={() => {
        setEndsAfter(new Date());
        setIsNeverEnds(false);
      }}
      id="end-after-advanced"
      className="radio-advanced-schedule"
      label={
        <div className="pf-c-form pf-m-horizontal">
          <FormGroup label={__('After')} id="set-ends-after">
            <div>
              <TextInput
                isDisabled={!(!isNeverEnds && endsAfter)}
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
  </>
);

AdvancedEnds.propTypes = {
  ends: PropTypes.string.isRequired,
  setEnds: PropTypes.func.isRequired,
  isNeverEnds: PropTypes.bool.isRequired,
  setIsNeverEnds: PropTypes.func.isRequired,
  endsAfter: PropTypes.string.isRequired,
  setEndsAfter: PropTypes.func.isRequired,
};
