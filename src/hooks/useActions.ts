import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actions as actionsSelected } from '../store/selected.slice';
import { actions as actionsSearch } from '../store/search.slice';

const rootActions = {
  ...actionsSelected,
  ...actionsSearch,
};

const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};

export default useActions;
