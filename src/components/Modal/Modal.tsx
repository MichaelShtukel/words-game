import { FC } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({isOpen, onClose}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Две вкладки с игрой?</h2>
        </div>
        <div className="modal-body">
          <p>
            Похоже, игра открыта в нескольких вкладках браузера. Чтобы продолжить
            играть в этой вкладке, обновите страницу.
          </p>
        </div>
        <div className="modal-footer">
          <button onClick={onClose}>Обновить</button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
}

export default Modal;
