import { useEffect } from 'react';
import PropTypes from 'prop-types'; 
import css from './Modal.module.css';

export const Modal = ({imageUrl, onClose})  => {
    useEffect(() => {
    const handleKeyDown = (e) => {
        if (e.keyCode === 27) {
        onClose();
        }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
        document.removeEventListener('keydown', handleKeyDown);
    };
    }, [onClose]);

    const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
    }; 
    return (
        <div className={css.Overlay} onClick={handleOverlayClick}>
        <div className={css.Modal}>
            <img src={imageUrl} alt="" />
        </div>
        </div>
    );
    }


Modal.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};