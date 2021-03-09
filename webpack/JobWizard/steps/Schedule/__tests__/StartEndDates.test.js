import React from 'react';
import * as patternfly from '@patternfly/react-core';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { testComponentSnapshotsWithFixtures } from '@theforeman/test';
import { StartEndDates } from '../StartEndDates';

jest.spyOn(patternfly, 'FormGroup');
patternfly.FormGroup.mockImplementation(props => <div props={props} />);

const setEnds = jest.fn();
const setIsNeverEnds = jest.fn();
const props = {
  starts: '',
  setStarts: jest.fn(),
  ends: 'some-end-date',
  setEnds,
  setIsNeverEnds,
  isNeverEnds: false,
};
const fixtures = {
  'renders isNeverEnds false': props,
  'renders isNeverEnds true': { ...props, isNeverEnds: true },
};

describe('StartEndDates', () => {
  testComponentSnapshotsWithFixtures(StartEndDates, fixtures);
  it('never ends', async () => {
    patternfly.FormGroup.mockRestore();
    await act(async () => render(<StartEndDates {...props} />));
    const neverEnds = screen.getByRole('checkbox', { name: 'Never ends' });
    await act(async () => fireEvent.click(neverEnds));
    expect(setIsNeverEnds).toBeCalledWith(true);
  });
});
