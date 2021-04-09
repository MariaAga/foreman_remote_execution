import React from 'react';
import PropTypes from 'prop-types';
import { Chip, ChipGroup, Button } from '@patternfly/react-core';
import { translate as __ } from 'foremanReact/common/I18n';
import { hostMethods } from '../../JobWizardConstants';

const SelectedChip = ({ selected, setSelected, categoryName }) => {
  const deleteItem = itemToRemove => {
    setSelected(oldSelected =>
      oldSelected.filter(item => item !== itemToRemove)
    );
  };
  return (
    <ChipGroup className="hosts-chip-group" categoryName={categoryName}>
      {selected.map(chip => (
        <Chip key={chip} id={chip} onClick={() => deleteItem(chip)}>
          {chip}
        </Chip>
      ))}
    </ChipGroup>
  );
};

export const SelectedChips = ({
  selectedHosts,
  setSelectedHosts,
  selectedHostCollections,
  setSelectedHostCollections,
  selectedHostGroups,
  setSelectedHostGroups,
}) => (
  <div className="selected-chips">
    <SelectedChip
      selected={selectedHosts}
      categoryName={hostMethods.hosts}
      setSelected={setSelectedHosts}
    />
    <SelectedChip
      selected={selectedHostCollections}
      categoryName={hostMethods.hostCollections}
      setSelected={setSelectedHostCollections}
    />

    <SelectedChip
      selected={selectedHostGroups}
      categoryName={hostMethods.hostGroups}
      setSelected={setSelectedHostGroups}
    />
    <Button variant="link">{__('Clear filters')}</Button>
  </div>
);

SelectedChips.propTypes = {
  selectedHosts: PropTypes.array.isRequired,
  setSelectedHosts: PropTypes.func.isRequired,
  selectedHostCollections: PropTypes.array.isRequired,
  setSelectedHostCollections: PropTypes.func.isRequired,
  selectedHostGroups: PropTypes.array.isRequired,
  setSelectedHostGroups: PropTypes.func.isRequired,
};

SelectedChip.propTypes = {
  categoryName: PropTypes.string.isRequired,
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
};
