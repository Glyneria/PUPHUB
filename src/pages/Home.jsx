import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <h1>Welcome to PupHub</h1>
      <nav>
        <Link to="/login">Go to Login</Link> | 
        <Link to="/dashboard">Go to Dashboard</Link>
      </nav>
    </>
  );
}
