import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal, Title } from '@patternfly/react-core';
import { translate as __ } from 'foremanReact/common/I18n';
import { RepeatOn } from './RepeatOn';
import { AdvancedStarts } from './AdvancedStarts';
import { AdvancedEnds } from './AdvancedEnds';
import { RepeatsEvery } from './RepeatsEvery';

export const AdvancedScheduling = ({
  isModalOpen,
  setIsModalOpen,
  scheduleValue,
  setScheduleValue,
}) => {
  const {
    repeatType,
    repeatAmount,
    starts,
    startsBefore,
    ends,
    endType,
    endsAfter,
  } = scheduleValue;
  const [repeatOn, setRepeatOn] = useState({});
  const [formData, setFormData] = useState({ endType });
  useEffect(() => {
    setFormData({
      starts,
      ends,
      endType,
    });
  }, [starts, ends, endType]);
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
          starts={starts}
          startsBefore={startsBefore}
          setStarts={newValue => {
            setFormData({ starts: newValue });
          }}
          setStartsBefore={newValue => {
            setFormData({ startsBefore: newValue });
          }}
        />
        {/* <RepeatsEvery /> */}
        <Title headingLevel="h3">{__('Repeat on')}</Title>
        <RepeatOn repeatOn={repeatOn} setRepeatOn={setRepeatOn} />
        <AdvancedEnds
          endType={formData.endType}
          setEndType={newValue => {
            setFormData({ endType: newValue });
          }}
          ends={ends}
          setEnds={newValue => {
            setFormData({ ends: newValue });
          }}
          endsAfter={endsAfter}
        />
      </Form>
    </Modal>
  );
};

AdvancedScheduling.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};
