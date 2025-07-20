import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import { getEventsByOrgId } from '../../services/events'; 

const OrgDashboard = () => {
  const { user, role } = useAuth(); // user.id is needed
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (role === 'org' && user?.id) {
      getEventsByOrgId(user.id).then(setEvents).catch(console.error);
    }
  }, [user, role]);

  return (
    <div>
      <h1>Organization Dashboard</h1>
      <ul>
        {events.length === 0 && <li>No events found.</li>}
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.title}</strong> – {event.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrgDashboard;
