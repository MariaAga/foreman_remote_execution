import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Title, Button, Form } from '@patternfly/react-core';
import { translate as __ } from 'foremanReact/common/I18n';
import { ScheduleType } from './ScheduleType';
import { RepeatOn } from './RepeatOn';
import { QueryType } from './QueryType';
import { StartEndDates } from './StartEndDates';
import { isNumber } from '../form/FormHelpers';
import { repeatTypes } from '../../JobWizardConstants';
import { AdvancedScheduling } from './AdvancedScheduling';

const Schedule = ({ scheduleValue, setScheduleValue }) => {
  const { repeatType, repeatAmount, starts, ends, endType } = scheduleValue;
  // const [repeatType, setRepeatType] = useState(repeatTypes.noRepeat);
  // const [repeatAmount, setRepeatAmount] = useState('');
  // const [starts, setStarts] = useState('');
  // const [ends, setEnds] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Form className="schedule-tab">
      <AdvancedScheduling
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        scheduleValue={scheduleValue}
        setScheduleValue={setScheduleValue}
      />
      <Title headingLevel="h2">{__('Schedule')}</Title>
      <ScheduleType
        isFuture={scheduleValue.isFuture}
        setIsFuture={newValue => {
          if (!newValue) {
            // if schedule type is execute now
            setScheduleValue({
              starts: '',
            });
          }
          setScheduleValue({
            isFuture: newValue,
          });
        }}
      />

      <RepeatOn
        repeatType={repeatType}
        setRepeatType={newValue => {
          setScheduleValue({
            repeatType: newValue,
          });
        }}
        repeatAmount={repeatAmount}
        setRepeatAmount={newValue => {
          setScheduleValue({
            repeatAmount: newValue,
          });
        }}
      />
      <StartEndDates
        starts={starts}
        setStarts={newValue => {
          if (!scheduleValue.isFuture) {
            setScheduleValue({
              isFuture: true,
            });
          }
          setScheduleValue({
            starts: newValue,
          });
        }}
        ends={ends}
        setEnds={newValue => {
          setScheduleValue({
            ends: newValue,
          });
        }}
        isNeverEnds={endType === 'never'}
        setIsNeverEnds={newValue => {
          setScheduleValue({
            endType: newValue,
          });
        }}
      />
      <Button
        variant="link"
        className="advanced-scheduling-button"
        isInline
        onClick={() => setIsModalOpen(true)}
      >
        {__('Advanced scheduling')}
      </Button>
      <QueryType />
    </Form>
  );
};

Schedule.propTypes = {
  scheduleValue: PropTypes.shape({
    repeatType: PropTypes.string.isRequired,
    repeatAmount: PropTypes.string,
    starts: PropTypes.string,
    ends: PropTypes.string,
    isFuture: PropTypes.bool,
    endType: PropTypes.string,
  }).isRequired,
  setScheduleValue: PropTypes.func.isRequired,
};

export default Schedule;
