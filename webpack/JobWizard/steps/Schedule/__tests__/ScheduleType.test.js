import React from 'react';
import * as patternfly from '@patternfly/react-core';
import { testComponentSnapshotsWithFixtures } from '@theforeman/test';
import { ScheduleType } from '../ScheduleType';

jest.spyOn(patternfly, 'FormGroup');
patternfly.FormGroup.mockImplementation(props => <div props={props} />);
const fixtures = {
  renders: {},
};

describe('ScheduleType', () => {
  testComponentSnapshotsWithFixtures(ScheduleType, fixtures);
});
