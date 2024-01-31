import React,{ useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {toast} from 'react-hot-toast';
import axios from 'axios'
import person from '../../assets/images/person.png';
import './style.css';

const SignupForm = () => {
	const apiKey = import.meta.env.CLOUDINARY_API_KEY
	const uploadUrl = import.meta.env.CLOUDINARY_UPLOAD_URL
	const uploadPreset = import.meta.env.CLOUDINARY_UPLOAD_PRESET
	const deleteUrl = import.meta.env.CLOUDINARY_DELETE_URL
	const navigate = useNavigate()

	const [signup, setSignup] = useState({
		name: '',
		date: '',
		email: '',
		password: '',
		picture: '',

	})
	const [loading, setLoading] = useState(true);
	const signupUser = async (e) => {
		e.preventDefault();
		const { name, date, email, password, picture } = signup

		try {
		  const response = await axios.post('/auth/signUp', {
			name,
			date,
			email,
			password,
			picture,
		  });
		  if (signup.error) {
			toast.error(signup.error)
		  }
		  else {
			setSignup({})
			toast.success('Signup Successful. Welcome!')
			navigate('/auth/login')
		  }

		} catch (error) {

		  console.error(error);
		}
	  };
	  const handleImageUpload = async (e) => {
		const file = e.target.files[0];

		if (file) {
		  try {
			setLoading(true);

			const formData = new FormData();
			formData.append('file', file);
			formData.append('upload_preset', `${uploadPreset}`);

			const response = await fetch(`${uploadUrl}`, {
			  method: 'POST',
			  body: formData,
			});

			if (response.ok) {
			  const result = await response.json();
			  setSignup({ ...signup, picture: result.secure_url });
			  console.log('Image URL:', result.secure_url);
			} else {
			  console.error('Image upload failed:', response.statusText);

			}
		  } catch (error) {
			console.error('Image upload error:', error);
		  } finally {
			setLoading(false);
		  }
		}
	  };

	  const deleteImage = async () => {
		// Check if there is a Cloudinary public ID
		if (signup.cloudinaryPublicId) {
		  // Make a request to Cloudinary to delete the image
		  const cloudinaryDeleteUrl = `${deleteUrl}${signup.cloudinaryPublicId}`;
		  const response = await fetch(cloudinaryDeleteUrl, {
			method: 'DELETE',
			headers: {
			  Authorization: `${apiKey}`,
			},
		  });

		  if (response.ok) {
			console.log('Image deleted from Cloudinary');
		  } else {
			console.error('Failed to delete image from Cloudinary');
		  }
		}

		// Reset the picture and Cloudinary public ID in your local state
		setSignup({
		  ...signup,
		  picture: null,
		  cloudinaryPublicId: null,

		});
	  };


  return (
	<div className="body-background">
			  <div className="d-flex justify-content-center align-items-center vh-100">
		  <div className="signup-card">
			  <div className="text-center pb-5">
				  <Link to="/auth/login" style={{ textDecoration: 'none' }}>
					  <h1 className="sign-card">Login</h1>
				  </Link>
			  </div>
			  <div className="img-class pb-4 text-center">
				  <img src={person} alt="" />
			  </div>
			  <form  onSubmit={signupUser}>

				  <input type="name" id="inputName" placeholder="name" autoComplete="name" required value={signup.name} onChange={(e) => setSignup({ ...signup, name: e.target.value })} />
				  <input type="date" id="dateofbirth" placeholder="Date of birth" autoComplete="dateofbirth" required value={signup.phone} onChange={(e) => setSignup({ ...signup, date: e.target.value })} />

				  <input type="email" id="email" placeholder="name@test.com" name="email" autoComplete="email" required value={signup.email} onChange={(e) => setSignup({ ...signup, email: e.target.value })} />

				  <input type="password" id="password" placeholder="password" autoComplete="current-password" required value={signup.password} onChange={(e) => setSignup({ ...signup, password: e.target.value })} />
				  <label htmlFor="inputProfileImage" className="form-label" >Upload Profile image</label>
				  <input type="file" id="myFile" onChange={handleImageUpload} autoComplete="file" />
				  {signup.picture && (
					  <div>
						  <span>{signup.picture.name}</span>
						  <img
							  src={signup.picture}
							  alt="Profile"
							  style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }}
						  />
						  <button type="button" className="btn btn-danger" onClick={deleteImage}>
							  Delete Image
						  </button>
					  </div>
				  )}
				  <input type="submit" value="SIGN UP" />
			  </form>
		  </div>
	  </div>
	</div>
  );
};

export default SignupForm;
