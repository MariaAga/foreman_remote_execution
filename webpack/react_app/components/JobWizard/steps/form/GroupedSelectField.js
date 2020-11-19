import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SelectOption,
  Select,
  SelectGroup,
  SelectVariant,
  FormGroup,
} from '@patternfly/react-core';
/* typeahead issue fixed in 2020.14 */
export const GroupedSelectField = ({
  label,
  fieldId,
  groups,
  selected,
  setSelected,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onSelect = selection => {
    setIsOpen(false);
    setSelected(selection);
  };

  const onClear = () => {
    onSelect(null);
  };
  const options = groups.map((group, groupIndex) => (
    <SelectGroup key={groupIndex} label={group.groupLabel}>
      {group.options.map((option, optionIndex) => (
        <SelectOption
          key={optionIndex}
          value={option.label}
          onClick={() => onSelect(option.value)}
        />
      ))}
    </SelectGroup>
  ));

  return (
    <FormGroup label={label} fieldId={fieldId}>
      <Select
        isGrouped
        variant={SelectVariant.typeahead}
        onToggle={setIsOpen}
        isOpen={isOpen}
        onSelect={() => null}
        selections={selected}
        className="without_select2"
        onClear={onClear}
      >
        {options}
      </Select>
    </FormGroup>
  );
};

GroupedSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  groups: PropTypes.array,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setSelected: PropTypes.func.isRequired,
};

GroupedSelectField.defaultProps = {
  groups: [],
  selected: null,
};
