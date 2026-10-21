import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { TrashIcon, CloseIcon } from './Icons';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Delete', isDanger = true }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fittrack-modal-overlay"
      onClick={onCancel}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        margin: 0,
      }}
    >
      <div
        className="card-fittrack border-0 shadow-lg position-relative w-100"
        style={{
          maxWidth: '480px',
          maxHeight: '88vh',
          overflowY: 'auto',
          borderRadius: '18px',
          margin: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header border-bottom px-4 py-3 bg-light-section position-relative pe-5">
          <h5 className="modal-title fw-bold text-primary-custom d-flex align-items-center gap-2 mb-0 me-auto">
            {isDanger && <TrashIcon size={18} className="text-danger" />}
            <span>{title || 'Confirm Action'}</span>
          </h5>
          <button
            type="button"
            className="btn-close-custom"
            onClick={onCancel}
            aria-label="Close"
            title="Close Modal"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        <div className="modal-body p-4 text-secondary">
          {message || 'Are you sure you want to proceed? This action cannot be undone.'}
        </div>

        <div className="modal-footer border-top px-4 py-3 bg-light-section d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-light border rounded-3 px-3" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className={`btn ${isDanger ? 'btn-danger' : 'btn-primary-green'} rounded-3 px-3`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ConfirmModal;
