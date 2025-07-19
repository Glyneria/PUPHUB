import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getEventsByOrgId } from '../../services/events'; 

export default function OrgDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role !== 'ORG') {
      navigate('/dashboard'); // or another page for normal users
      return;
    }

    const fetchEvents = async () => {
      try {
        const { data, error } = await getEventsByOrgId(user.id);
        if (error) throw error;
        setEvents(data);
      } catch (err) {
        setError('Failed to load events.');
        console.error(err.message);
      }
    };

    fetchEvents();
  }, [user, navigate]);

  return (
    <div>
      <h1>Organization Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {events.length === 0 && <li>No events found.</li>}
        {events.map(event => (
          <li key={event.id}>
            <strong>{event.title}</strong> – {event.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
