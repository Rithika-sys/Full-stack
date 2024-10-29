// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './signup.css'; // Make sure to import your CSS file

// const Signup = () => {
//     const [name, setName] = useState(''); // Changed from firstName and lastName to name
//     const [username, setUsername] = useState(''); // Added username state
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(''); // To handle any errors
//     const navigate = useNavigate(); // Initialize the navigate function

//     const handleSignup = async (e) => {
//         e.preventDefault();

//         if (name && username && email && password) {
//             try {
//                 const response = await fetch('http://localhost:3000/api/register', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         name,
//                         username,
//                         email,
//                         password,
//                     }),
//                 });

//                 const data = await response.json();

//                 if (response.isCreated) {
//                     // Signup successful, navigate to home page
//                     //console.log('Signup successful:', data);
//                     navigate('/home');
//                 } else {
//                     // If signup fails, display an error message
//                   //  setError(data.message || 'Signup failed. Please try again.');
//                 }
//             } catch (err) {
//                 // Handle any network or server errors
//                 console.error('Error during signup:', err);
//                 setError('An error occurred. Please try again.');
//             }
//         } else {
//             setError('Please fill in all fields.');
//         }
//     };

//     return (
//         <div className="signup-container">
//             <h2>Create Account</h2>
//             <form onSubmit={handleSignup}>
//                 <input
//                     type="text"
//                     placeholder="Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="email"
//                     placeholder="Email Address"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />

//                 {error && <p className="error">{error}</p>} {/* Display error if any */}

//                 <p className="or">or</p>

//                 <div className="inline-buttons">
//                     <button type="button" className="google-btn">Sign up with Google</button>
//                     <button type="button" className="facebook-btn">Sign up with Facebook</button>
//                 </div>

//                 <button type="submit">Sign Up</button>
//             </form>
//             <div className="centered-links">
//                 <p>Already have an account? <a href="/">Login</a></p>
//             </div>
//         </div>
//     );
// };

// export default Signup;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const apiUrl = 'http://localhost:3000/api/register';

    const handleSignup = async (e) => {
        e.preventDefault();

        if (name && username && email && password) {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, username, email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    // Redirect to the home page if signup is successful
                    navigate('/home');
                } else {
                    // Show specific error from server or a default message
                    setError(data.message || 'Signup failed. Please try again.');
                }
            } catch (err) {
                console.error('Error during signup:', err);
                setError('An error occurred. Please try again.');
            }
        } else {
            setError('Please fill in all fields.');
        }
    };

    return (
        <div className="signup-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <p className="error">{error}</p>}

                <p className="or">or</p>

                <div className="inline-buttons">
                    <button type="button" className="google-btn">Sign up with Google</button>
                    <button type="button" className="facebook-btn">Sign up with Facebook</button>
                </div>

                <button type="submit">Sign Up</button>
            </form>
            <div className="centered-links">
                <p>Already have an account? <a href="/">Login</a></p>
            </div>
        </div>
    );
};

export default Signup;
