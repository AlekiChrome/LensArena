import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

function CommentBox({ imageId }) {
  const [text, setText] = useState('');

  const handleComment = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("Please sign in to comment.");
      return;
    }

    if (text.trim() === '') return;

    await addDoc(collection(db, 'images', imageId, 'comments'), {
      text,
      uid: auth.currentUser.uid,
      createdAt: serverTimestamp()
    });

    setText('');
  };

  return (
    <form onSubmit={handleComment}>
      <input
        type="text"
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: '100%', marginTop: '0.5rem' }}
      />
      <button type="submit" style={{ marginTop: '0.5rem' }}>Post</button>
    </form>
  );
}

export default CommentBox;
