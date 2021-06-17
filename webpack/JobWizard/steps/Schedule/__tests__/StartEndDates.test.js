import React from 'react';
import * as patternfly from '@patternfly/react-core';
import { render, fireEvent, screen } from '@testing-library/react';
import { testComponentSnapshotsWithFixtures } from '@theforeman/test';
import { StartEndDates } from '../StartEndDates';

jest.spyOn(patternfly, 'FormGroup');
patternfly.FormGroup.mockImplementation(props => <div props={props} />);

const setEnds = jest.fn();
const props = {
  starts: '',
  setStarts: jest.fn(),
  ends: 'some-end-date',
  setEnds,
};
const fixtures = {
  renders: props,
};

describe('StartEndDates', () => {
  testComponentSnapshotsWithFixtures(StartEndDates, fixtures);
  it('never ends', () => {
    patternfly.FormGroup.mockRestore();
    render(<StartEndDates {...props} />);
    const neverEnds = screen.getByLabelText('Never ends', {
      selector: 'input',
    });
    fireEvent.click(neverEnds);
    expect(setEnds).toBeCalledWith('');
  });
});
