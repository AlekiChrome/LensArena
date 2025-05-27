import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

function Gallery() {
  const [publicImages, setPublicImages] = useState([]);

  useEffect(() => {
    const fetchPublicImages = async () => {
      const q = query(collection(db, 'images'), where('public', '==', true));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => doc.data());
      setPublicImages(data);
    };

    fetchPublicImages();
  }, []);

  return (
    <div>
      <h2>Explore the Public Gallery</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {publicImages.map((img, i) => (
          <div key={i}>
            <img src={img.url} alt="submission" width="200" />
            <p>{img.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
