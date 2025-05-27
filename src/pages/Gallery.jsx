import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import CommentBox from '../components/CommentBox';

function Gallery() {
  const [publicImages, setPublicImages] = useState([]);
  const currentUser = auth.currentUser;

  const fetchPublicImages = async () => {
    const q = query(collection(db, 'images'), where('public', '==', true));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    setPublicImages(data);
  };

  const handleLike = async (imageId, likedByUser) => {
    const imageRef = doc(db, 'images', imageId);

    if (!currentUser) {
      alert('Please sign in to like images.');
      return;
    }

    await updateDoc(imageRef, {
      likes: likedByUser
        ? arrayRemove(currentUser.uid)
        : arrayUnion(currentUser.uid)
    });

    fetchPublicImages(); 
  };

  useEffect(() => {
    fetchPublicImages();
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ marginBottom: '2rem' }}>Explore the Public Gallery</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        {publicImages.map((img) => {
          const likesArray = img.likes || [];
          const likedByUser = currentUser && likesArray.includes(currentUser.uid);

          return (
            <div
              key={img.id}
              style={{
                maxWidth: '280px',
                background: 'var(--color-light)',
                padding: '1rem',
                borderRadius: 'var(--border-radius)',
                boxShadow: 'var(--box-shadow)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <img
                src={img.url}
                alt={img.caption}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 'var(--border-radius)',
                  marginBottom: '0.5rem'
                }}
              />

              <p style={{ fontWeight: '600' }}>{img.caption}</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <p style={{ margin: 0 }}>{likesArray.length} ❤️</p>
                <button onClick={() => handleLike(img.id, likedByUser)} style={{ fontSize: '0.9rem' }}>
                  {likedByUser ? 'Unlike' : 'Like'}
                </button>
              </div>

              <CommentBox imageId={img.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Gallery;
