import React from 'react';
import './ImageOverlay.css'

const ImageOverlay = ({ imageUrl, onClose }) => {
    return (
        <div className="image-overlay">
            <div className="image-overlay-content">
                <button className="close-overlay-button" onClick={onClose}>
                    <i className="bi bi-x-circle"></i>
                </button>
                <div className="fixed-image-container">
                    <img src={imageUrl} alt="Overlay" />
                </div>
            </div>
        </div>
    );
};

export default ImageOverlay;