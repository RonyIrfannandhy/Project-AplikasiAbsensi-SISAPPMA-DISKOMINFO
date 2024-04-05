import React from 'react';

function ImageModal({ imageUrl, onClose }) {
  return (
    <div>
      <div className="image-modal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.7)', zIndex: 999 }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '4px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', maxWidth: '50%', maxHeight: '80%', overflow: 'auto', position: 'relative' }}>
          <img src={imageUrl} alt="Presensi Image" style={{ width: '100%', height: 'auto' }} />
        </div>
      </div>
      <button className="close-button" onClick={onClose} style={{ position: 'fixed', top: '20px', right: '20px', cursor: 'pointer', background: 'none', border: 'none', fontSize: '24px', lineHeight: '1', zIndex: 1000, color: 'white' }}>&times;</button>
    </div>
  );
}

export default ImageModal;
