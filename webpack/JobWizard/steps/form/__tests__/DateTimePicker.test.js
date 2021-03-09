import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { DateTimePicker } from '../DateTimePicker';

const setDateTime = jest.fn();
const props = {
  dateTime: 'Mar 17 2020 15:45',
  setDateTime,
  isDisabled: false,
};

describe('DateTimePicker', () => {
  it('edit', async () => {
    await act(async () => {
      render(<DateTimePicker {...props} />);
    });

    const datepickers = screen.getAllByRole('textbox', { name: 'Date picker' });
    await act(async () => {
      fireEvent.change(datepickers[0], { target: { value: '2020/03/12' } });
    });
    expect(setDateTime).lastCalledWith(new Date('2020/03/12 15:45').toString());

    const timepickers = screen.getAllByRole('textbox', { name: 'Time picker' });
    await act(async () => {
      fireEvent.change(timepickers[0], { target: { value: '17:42' } });
    });
    expect(setDateTime).lastCalledWith(new Date('2020/03/17 17:42').toString());
  });
});
