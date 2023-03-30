import { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Generate and send the OTP code to the user's email address
      const response = await axios.post('/generateOtp', { email });
      if (!response.data.success) {
        setMessage(response.data.message);
        return;
      }

      // Prompt the user to enter the OTP code
      setOTP('');
      setMessage('Please enter the OTP code that was sent to your email');
    } catch (err) {
      console.error(err);
      setMessage('Failed to generate OTP code');
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verify the OTP code entered by the user
      const response = await axios.post('/verifyOtp', { email, otp });
      if (response.data.success) {
        setMessage('Login successful');
      } else {
        setMessage('Invalid OTP code');
      }
    } catch (err) {
      console.error(err);
      setMessage('Failed to verify OTP code');
    }
  };

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Request OTP</button>
      </form>
      <br />
      {message && <p>{message}</p>}
      {otp && (
        <form onSubmit={handleOTPSubmit}>
          <label>
            OTP:
            <input type="number" value={otp} onChange={(e) => setOTP(e.target.value)} required />
          </label>
          <br />
          <button type="submit">Submit OTP</button>
        </form>
      )}
    </div>
  );
}

export default LoginForm;
