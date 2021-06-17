import React from 'react';
import * as patternfly from '@patternfly/react-core';
import { testComponentSnapshotsWithFixtures } from '@theforeman/test';
import { RepeatOn } from '../RepeatOn';
import { repeatTypes } from '../../../JobWizardConstants';

jest.spyOn(patternfly, 'FormGroup');
patternfly.FormGroup.mockImplementation(props => <div props={props} />);

const fixtures = {
  renders: {
    repeatType: Object.values(repeatTypes)[1],
    setRepeatType: jest.fn(),
    repeatAmount: 1,
    setRepeatAmount: jest.fn(),
  },
};

describe('RepeatOn', () => {
  testComponentSnapshotsWithFixtures(RepeatOn, fixtures);
});
