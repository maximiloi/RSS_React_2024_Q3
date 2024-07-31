import { useSelector } from 'react-redux';
import useActions from '../../hooks/useActions';
import { RootState } from '../../store/store';

import './style.scss';
import saveToCSV from '../../utils/saveToCSV';

const Modal: React.FC = () => {
  const { deleteSelected } = useActions();
  const selected = useSelector((state: RootState) => {
    return state.selected;
  });

  if (selected.length > 0) {
    return (
      <section className="modal">
        <h4>{selected.length} items are selected</h4>
        <div className="modal__inner">
          <button
            className="button"
            type="button"
            onClick={() => {
              deleteSelected();
            }}
          >
            Unselect all
          </button>
          <button
            className="button"
            type="button"
            onClick={() => {
              saveToCSV(selected);
            }}
          >
            Download
          </button>
        </div>
      </section>
    );
  }
  return null;
};

export default Modal;
