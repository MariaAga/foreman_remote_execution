import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Title } from '@patternfly/react-core';
import { translate as __ } from 'foremanReact/common/I18n';
import { DateTimePicker } from '../form/DateTimePicker';
import { helpLabel } from '../form/FormHelpers';

export const AdvancedStarts = ({
  starts,
  setStarts,
  startsBefore,
  setStartsBefore,
}) => (
  // <FormGroup label={__('Starts')} id="starts-advanced">
  <>
    <Title headingLevel="h3">{__('Starts')}</Title>
    <div className="pf-c-form pf-m-horizontal">
      <FormGroup
        label={__('At')}
        id="set-starts-at"
        labelIcon={helpLabel(
          __(
            'Indicates that the action should be cancelled if it cannot be started before this time.'
          ),
          'set-starts-at'
        )}
      >
        <DateTimePicker dateTime={starts} setDateTime={setStarts} />
      </FormGroup>
      <FormGroup label={__('Before')} id="set-starts-before">
        <DateTimePicker dateTime={startsBefore} setDateTime={setStartsBefore} />
      </FormGroup>
    </div>
    {/* </FormGroup> */}
  </>
);

AdvancedStarts.propTypes = {
  starts: PropTypes.string.isRequired,
  setStarts: PropTypes.func.isRequired,
  startsBefore: PropTypes.string.isRequired,
  setStartsBefore: PropTypes.func.isRequired,
};
