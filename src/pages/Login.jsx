import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    // Step 1: Try logging in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setErrorMsg('Invalid credentials. Please try again.');
      console.error('Login error:', error.message);
      return;
    }

    // Step 2: Check role from 'users' or 'orgs' table
    const { user } = data;
    const { data: userProfile, error: roleError } = await supabase
      .from('users') // or 'orgs' depending on your logic
      .select('role') // make sure this field exists
      .eq('id', user.id)
      .single();

    if (roleError || !userProfile) {
      setErrorMsg('Failed to retrieve user role.');
      console.error('Role fetch error:', roleError?.message);
      return;
    }

    const role = userProfile.role;

    // Step 3: Navigate based on role
    if (role === 'user') {
      navigate('/dashboard');
    } else if (role === 'org') {
      navigate('/org');
    } else {
      setErrorMsg('Invalid user role. Contact support.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
        {errorMsg && <p style={styles.error}>{errorMsg}</p>}
      </form>
    </div>
  );
}

// Styles (basic inline)
const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginTop: '4rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem'
  },
  button: {
    padding: '0.5rem',
    backgroundColor: '#0077cc',
    color: 'white',
    border: 'none',
    borderRadius: '4px'
  },
  error: {
    color: 'red',
    marginTop: '1rem'
  }
};
