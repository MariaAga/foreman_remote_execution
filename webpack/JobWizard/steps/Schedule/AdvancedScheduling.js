import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal, Title } from '@patternfly/react-core';
import { translate as __ } from 'foremanReact/common/I18n';
import { RepeatOn } from './RepeatOn';
import { AdvancedStarts } from './AdvancedStarts';
import { AdvancedEnds } from './AdvancedEnds';

export const AdvancedScheduling = ({
  isModalOpen,
  setIsModalOpen,
  scheduleValue: {
    repeatType,
    repeatAmount,
    repeatData,
    starts,
    startsBefore,
    ends,
    endsAfter,
    isNeverEnds,
    isFuture,
    endType,
  },
  setScheduleValue,
}) => {
  const [formData, setFormData] = useState({
    repeatType,
    repeatAmount,
    repeatData,
    starts,
    ends,
    endType,
    isNeverEnds,
  });
  return (
    <Modal
      title={__('Advance scheduling')}
      className="advanced-schedule-modal"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      appendTo={() => document.getElementsByClassName('job-wizard')[0]}
      actions={[
        <Button
          key="confirm"
          variant="primary"
          onClick={() => {
            setScheduleValue(formData);
            setIsModalOpen(false);
          }}
        >
          {__('Save')}
        </Button>,
        <Button
          key="cancel"
          variant="link"
          onClick={() => setIsModalOpen(false)}
        >
          {__('Cancel')}
        </Button>,
      ]}
    >
      <Form isHorizontal>
        <AdvancedStarts
          starts={formData.starts}
          startsBefore={formData.startsBefore}
          setStarts={newValue => {
            setFormData(oldData => ({
              ...oldData,
              startsBefore: null,
              starts: newValue,
            }));
          }}
          setStartsBefore={newValue => {
            setFormData(oldData => ({
              ...oldData,
              starts: null,
              startsBefore: newValue,
            }));
          }}
        />
        <Title headingLevel="h3">{__('Repeat on')}</Title>
        <RepeatOn
          repeatType={formData.repeatType}
          repeatData={formData.repeatData}
          repeatAmount={formData.repeatAmount}
          setRepeatType={newValue => {
            setFormData(oldData => ({ ...oldData, repeatType: newValue }));
          }}
          setRepeatData={newValue => {
            setFormData(oldData => ({ ...oldData, repeatData: newValue }));
          }}
          setRepeatAmount={newValue => {
            setFormData(oldData => ({ ...oldData, repeatAmount: newValue }));
          }}
        />
        <AdvancedEnds
          endType={formData.endType}
          ends={formData.ends}
          endsAfter={formData.endsAfter}
          isNeverEnds={formData.isNeverEnds}
          setIsNeverEnds={newValue => {
            setFormData(oldData => ({
              ...oldData,
              isNeverEnds: newValue,
            }));
          }}
          setEndsAfter={newValue => {
            setFormData(oldData => ({
              ...oldData,
              ends: null,
              endsAfter: newValue,
            }));
          }}
          setEnds={newValue => {
            setFormData(oldData => ({
              ...oldData,
              endsAfter: null,
              ends: newValue,
            }));
          }}
        />
      </Form>
    </Modal>
  );
};

AdvancedScheduling.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  scheduleValue: PropTypes.shape({
    repeatType: PropTypes.string.isRequired,
    repeatAmount: PropTypes.string,
    repeatData: PropTypes.object,
    starts: PropTypes.string,
    ends: PropTypes.string,
    isFuture: PropTypes.bool,
    isNeverEnds: PropTypes.bool,
  }).isRequired,
  setScheduleValue: PropTypes.func.isRequired,
};
