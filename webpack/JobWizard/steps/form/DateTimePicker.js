import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, TimePicker } from '@patternfly/react-core';

export const DateTimePicker = ({ dateTime, setDateTime, isDisabled }) => {
  const dateFormat = date =>
    `${date.getFullYear()}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date
      .getDate()
      .toString()
      .padStart(2, '0')}`;

  const dateObject = dateTime ? new Date(dateTime) : new Date();
  const formattedDate = dateTime ? dateFormat(dateObject) : '';
  const dateParse = date =>
    new Date(`${date} ${dateObject.getHours()}:${dateObject.getMinutes()}`);

  const isValidDate = date => date && !Number.isNaN(date.getTime());

  const isValidTime = time => {
    if (!time) return false;
    const split = time.split(':');
    if (!(split[0].length === 2 && split[1].length === 2)) return false;

    return isValidDate(new Date(`${formattedDate} ${time}`));
  };

  const onDateChange = newDate => {
    const parsedNewDate = new Date(newDate);

    if (isValidDate(parsedNewDate)) {
      parsedNewDate.setHours(dateObject.getHours());
      parsedNewDate.setMinutes(dateObject.getMinutes());
      setDateTime(parsedNewDate.toString());
    }
  };

  const onTimeChange = newTime => {
    if (isValidTime(newTime)) {
      const parsedNewTime = new Date(`${formattedDate} ${newTime}`);
      setDateTime(parsedNewTime.toString());
    }
  };
  return (
    <>
      <DatePicker
        value={formattedDate}
        placeholder="yyyy/mm/dd"
        onChange={onDateChange}
        dateFormat={dateFormat}
        dateParse={dateParse}
        isDisabled={isDisabled}
      />
      <TimePicker
        className="time-picker"
        defaultTime={dateTime ? dateObject.toString() : ''}
        placeholder="hh:mm"
        onChange={onTimeChange}
        is24Hour
        isDisabled={isDisabled || !dateTime} // Can't control the time value in this pf4 version so instead of passing an empty value we disable it
      />
    </>
  );
};

DateTimePicker.propTypes = {
  dateTime: PropTypes.string,
  setDateTime: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};
DateTimePicker.defaultProps = {
  dateTime: null,
  isDisabled: false,
};
