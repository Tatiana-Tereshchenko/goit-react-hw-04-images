import PropTypes from 'prop-types'; 
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({images, onItemClick}) =>  {
    return (
        <ul className={css.ImageGallery}>
        {images.map((image, index) => (
    <ImageGalleryItem
    key={`image-${image.id}-${index}`}
    imageUrl={image.webformatURL}
    onItemClick={() => onItemClick(image.largeImageURL)}
    />
))}
        </ul>
    );
    }


ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
    PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    })
    ).isRequired,
    onItemClick: PropTypes.func.isRequired,
};