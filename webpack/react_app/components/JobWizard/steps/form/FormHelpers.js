import React from 'react';
import { Popover } from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons';

export const isNumber = newValue => !Number.isNaN(Number(newValue));

export const helpLabel = text => {
  if (!text) return null;
  return (
    <Popover bodyContent={text} aria-label="help-text">
      <button
        aria-label="More info for name field"
        onClick={e => e.preventDefault()}
        className="pf-c-form__group-label-help"
      >
        <HelpIcon noVerticalAlign />
      </button>
    </Popover>
  );
};
