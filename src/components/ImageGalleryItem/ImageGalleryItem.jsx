import PropTypes from 'prop-types'; 
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({imageUrl, onItemClick}) => {
    return (
        <li className={css.ImageGalleryItem} onClick={onItemClick}>
        <img className={css.ImageGalleryItem_image} src={imageUrl} alt="" />
        </li>
    );
    }


ImageGalleryItem.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
};