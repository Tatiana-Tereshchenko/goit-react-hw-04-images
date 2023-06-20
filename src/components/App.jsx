import {useState, useEffect} from 'react';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ApiService } from './ApiService/ApiService';
import css from './App.module.css'



export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;
    const fetchImages = () => {
      setIsLoading(true);

      ApiService.fetchImages(searchQuery, currentPage)
        .then((response) => {
          const { hits, totalHits } = response.data;
          setImages((prevImages) => (currentPage === 1 ? hits : [...prevImages, ...hits]));
          setTotalPages(Math.ceil(totalHits / 12));
        })
        .catch((error) => {
          console.log('Error fetching images:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchImages();
  }, [searchQuery, currentPage]);

  useEffect(() => {
    localStorage.setItem('searchQuery', searchQuery);
    localStorage.setItem('currentPage', currentPage);
  }, [searchQuery, currentPage]);

  const handleSubmit = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setImages([]);
    setTotalPages(0);
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      setIsLoading(true);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const showLoadMoreButton = images.length > 0 && currentPage < totalPages;

  return (
    <div className={css.container}>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} onItemClick={handleImageClick} />
      {isLoading && <Loader />}
      {showLoadMoreButton && <Button onClick={handleLoadMore} />}
      {selectedImage && <Modal imageUrl={selectedImage} onClose={handleCloseModal} />}
    </div>
  );
};