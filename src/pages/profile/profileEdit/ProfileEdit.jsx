import React, { useState, useEffect } from 'react';
import './profileEdit.scss';
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, updateUser, editUser, hideProfileEditForm } from '../../../features/usersSlice';


const ProfileEdit = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState(''); 
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);

  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUser());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setSurname(user.surname || ''); 
      setPicture(user.picture || null);
      setPreview(user.picture ? URL.createObjectURL(new Blob([user.picture], { type: 'image/jpeg' })) : null);
    }
  }, [user]);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result); 
        setPreview(URL.createObjectURL(file)); 
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      id: user.id, 
      name,        
      surname,    
      picture,     
    };

    try {
      dispatch(editUser(userData)); 
      dispatch(hideProfileEditForm())
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="edit-area">
      <IoCloseCircle className="close" onClick={() => dispatch(hideProfileEditForm())} />
      <h2> Profili Redaktə et</h2>
      <form onSubmit={handleSubmit} className="profile-edit-form">
        <div className="edit-input-group">
          <label htmlFor="profile-picture">Şəklinizi dəyişin:</label>
          <input
            type="file"
            id="profile-picture"
            accept="image/*"
            onChange={handlePictureChange}
          />
          {preview && <img src={preview} alt="Preview" className="image-preview" />}
        </div>

        <div className="edit-input-group">
          <label htmlFor="profile-name">Adınızı dəyişin:</label>
          <input
            type="text"
            id="profile-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Adınızı daxil edin"
          />
        </div>
        <div className="edit-input-group">
          <label htmlFor="profile-surname">Soyadınzı dəyişin:</label>
          <input
            type="text"
            id="profile-surname"
            value={surname} 
            onChange={(e) => setSurname(e.target.value)} 
            placeholder="Soyadınızı daxil edin"
          />
        </div>

        <button type="submit" className="edit-submit-btn">Yadda saxla</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
