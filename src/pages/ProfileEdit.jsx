import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function ProfileEdit() {
  const user = auth.currentUser;
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarURL, setAvatarURL] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists()) {
        const data = snap.data();
        setName(data.name || '');
        setBio(data.bio || '');
        setAvatarURL(data.avatar || '');
      }
    };
    fetchProfile();
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();

    let avatarUrl = avatarURL;
    if (avatar) {
      const avatarRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(avatarRef, avatar);
      avatarUrl = await getDownloadURL(avatarRef);
    }

    await setDoc(doc(db, 'users', user.uid), {
      name,
      bio,
      avatar: avatarUrl,
      email: user.email
    });

    alert('Profile updated!');
  };

  return (
    <form onSubmit={handleSave} style={{ padding: '2rem' }}>
      <h2>Edit Profile</h2>
      {avatarURL && <img src={avatarURL} alt="avatar" width="100" />}
      <input
        type="file"
        onChange={(e) => setAvatar(e.target.files[0])}
      />
      <input
        placeholder="Display Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Short bio..."
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default ProfileEdit;
