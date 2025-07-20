import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const handleAttend = async (eventId) => {
  const { error } = await supabase.from('attendances').insert([
    {
      event_id: eventId,
      user_id: user.id,
      attended_at: new Date().toISOString()
    }
  ]);
  if (error) {
    console.error('Error attending event:', error.message);
  } else {
    // Update local state
    setAttendances([...attendances, { event_id: eventId, attended_at: new Date().toISOString() }]);
  }
};

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErrorMsg(null);

      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setErrorMsg('User not found. Please log in again.');
        navigate('/login');
        return;
      }

      setUser(user);

      // Fetch events
      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (eventsError) {
        setErrorMsg('Failed to fetch events.');
        console.error(eventsError.message);
        return;
      }

      setEvents(eventsData);

      // Fetch user attendance
      const { data: attendanceData, error: attendanceError } = await supabase
        .from('attendances')
        .select('event_id, attended_at')
        .eq('user_id', user.id);

      if (attendanceError) {
        setErrorMsg('Failed to fetch attendance.');
        console.error(attendanceError.message);
        return;
      }

      setAttendances(attendanceData);
      setLoading(false);
    };

    fetchData();
  }, [navigate]);

  const isAttended = (eventId) =>
    attendances.some((a) => a.event_id === eventId);

  if (loading) return <p style={styles.info}>Loading...</p>;
  if (errorMsg) return <p style={styles.error}>{errorMsg}</p>;

  return (
    <div style={styles.container}>
      <h2>Welcome, {user.email}</h2>
      <h3>Your Events</h3>
      {events.length === 0 ? (
        <p style={styles.info}>No events available.</p>
      ) : (
        <ul style={styles.list}>
          {events.map((event) => {
  const attended = isAttended(event.id);
  return (
    <li key={event.id} style={styles.card}>
      <h4>{event.title}</h4>
      <p>{event.content}</p>
      <p>
        Attended:{' '}
        {attended ? (
          <span style={styles.attended}>✔ Yes</span>
        ) : (
          <>
            <span style={styles.notAttended}>✘ No</span>
            <button onClick={() => handleAttend(event.id)}>Attend</button>
          </>
        )}
      </p>
      {event.gform_link && (
        <a href={event.gform_link} target="_blank" rel="noreferrer">
          Event Form
        </a>
      )}
    </li>
  );
})}

        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '2rem auto',
    padding: '1rem'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem'
  },
  attended: {
    color: 'green',
    fontWeight: 'bold'
  },
  notAttended: {
    color: 'red',
    fontWeight: 'bold'
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '2rem'
  },
  info: {
    textAlign: 'center',
    marginTop: '2rem'
  }
};
