import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { get } from 'foremanReact/redux/API';
import { HOST_IDS } from './JobWizardConstants';
import './JobWizard.scss';

export const useAutoFill = ({
  fills,
  setSelectedTargets,
  setHostsSearchQuery,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(fills).length) {
      if (fills['host_ids[]']) {
        dispatch(
          get({
            key: HOST_IDS,
            url: '/api/hosts',
            params: { search: `id = ${fills['host_ids[]'].join(' or id = ')}` },
            handleSuccess: ({ data }) => {
              setSelectedTargets(currentTargets => ({
                ...currentTargets,
                hosts: (data.results || []).map(result => result.name),
              }));
            },
          })
        );
      }
      if (fills.search) {
        setHostsSearchQuery(fills.search);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
