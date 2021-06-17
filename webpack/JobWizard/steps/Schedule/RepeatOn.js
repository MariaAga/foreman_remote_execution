import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  Grid,
  GridItem,
  FormGroup,
  Checkbox,
} from '@patternfly/react-core';
import { translate as __, documentLocale } from 'foremanReact/common/I18n';
import { SelectField } from '../form/SelectField';
import { repeatTypes } from '../../JobWizardConstants';

const getWeekDays = () => {
  const locale = documentLocale().replace(/-/g, '_');
  const baseDate = new Date(Date.UTC(2017, 0, 2)); // just a Monday
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    try {
      weekDays.push(baseDate.toLocaleDateString(locale, { weekday: 'short' }));
    } catch {
      weekDays.push(baseDate.toLocaleDateString('en', { weekday: 'short' }));
    }
    baseDate.setDate(baseDate.getDate() + 1);
  }
  return weekDays;
};

export const RepeatOn = ({
  repeatType,
  setRepeatType,
  repeatAmount,
  setRepeatAmount,
}) => {
  const [repeatValidated, setRepeatValidated] = useState('default');
  const handleRepeatInputChange = newValue => {
    setRepeatValidated(newValue >= 1 ? 'default' : 'error');
    setRepeatAmount(newValue);
  };
  const days = getWeekDays();
  const [repeatOn, setRepeatOn] = useState([]);
  const handleChangeDays = (checked, event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    setRepeatOn(oldValue => ({ ...oldValue, [name]: value }));
  };
  return (
    <Grid id="repeat-on">
      <GridItem span={6}>
        <SelectField
          fieldId="repeat-select"
          options={Object.values(repeatTypes)}
          setValue={newValue => {
            setRepeatType(newValue);
            if (newValue === repeatTypes.noRepeat) {
              setRepeatValidated('default');
            }
          }}
          value={repeatType}
        />
      </GridItem>
      <GridItem span={1} />
      <GridItem span={5}>
        <FormGroup
          isInline
          helperTextInvalid={__('Repeat amount can only be a positive number')}
          validated={repeatValidated}
        >
          {repeatType === repeatTypes.weekly ? (
            <div id="repeat-on-grid">
              {days.map((day, index) => (
                <Checkbox
                  key={index}
                  isChecked={repeatOn[index]}
                  name={index}
                  id={`repeat-on-day-${index}`}
                  onChange={handleChangeDays}
                  label={day}
                />
              ))}
            </div>
          ) : (
            <TextInput
              isDisabled={repeatType === repeatTypes.noRepeat}
              id="repeat-amount"
              value={repeatAmount}
              type="text"
              onChange={newValue => handleRepeatInputChange(newValue)}
              // placeholder={__('Repeat N times')}
            />
          )}
        </FormGroup>
      </GridItem>
    </Grid>
  );
};

RepeatOn.propTypes = {
  repeatType: PropTypes.oneOf(Object.values(repeatTypes)).isRequired,
  setRepeatType: PropTypes.func.isRequired,
  repeatAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  setRepeatAmount: PropTypes.func.isRequired,
};
