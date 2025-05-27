import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc
} from 'firebase/firestore';
import { auth, storage, db } from '../firebase';

function Dashboard() {
  const user = auth.currentUser;

  const [name, setName] = useState('');
  const [avatarURL, setAvatarURL] = useState('');

  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [images, setImages] = useState([]);

  // Fetch profile info
  const fetchProfile = async () => {
    if (!user) return;
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setName(data.name || '');
      setAvatarURL(data.avatar || '');
    }
  };

  // Fetch user uploads
  const fetchImages = async () => {
    if (!user) return;
    const q = query(collection(db, 'images'), where('uid', '==', user.uid));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => doc.data());
    setImages(data);
  };

  // Handle new upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !user) return;

    const fileRef = ref(storage, `images/${user.uid}/${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    await addDoc(collection(db, 'images'), {
      uid: user.uid,
      caption,
      url,
      public: isPublic,
      timestamp: new Date()
    });

    alert('Image uploaded!');
    setFile(null);
    setCaption('');
    setIsPublic(false);
    fetchImages();
  };

  useEffect(() => {
    fetchProfile();
    fetchImages();
  }, [user]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>My Dashboard</h2>

      {avatarURL && (
        <div style={{ marginBottom: '2rem' }}>
          <img src={avatarURL} alt="avatar" width="80" style={{ borderRadius: '50%' }} />
          <p>Hello, {name || user.email}</p>
          <Link to="/edit-profile">
            <button>Edit Profile</button>
          </Link>
        </div>
      )}

      <form onSubmit={handleUpload} style={{ marginBottom: '2rem' }}>
        <h3>Upload New Image</h3>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        <input
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          Make Public
        </label>
        <br />
        <button type="submit">Upload</button>
      </form>

      <div>
        <h3>My Uploads</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {images.map((img, index) => (
            <div key={index} style={{ maxWidth: '200px' }}>
              <img src={img.url} alt={img.caption} width="200" />
              <p>{img.caption}</p>
              {img.public && <small>🌍 Public</small>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;


