import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';

function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/clients`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClients(res.data);
      } catch (err) {
        console.error('Error fetching clients:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <ul>
        {clients.map((client) => (
          <li key={client._id}>{client.name} - {client.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Clients;
