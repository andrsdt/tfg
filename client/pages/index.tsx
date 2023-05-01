import { useState } from 'react';
import api from '@/lib/axios';
import { Client } from '@/types/openapi';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState(null);
  const [endpoint, setEndpoint] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const client = await api.getClient<Client>();
    const res = await client.auth_login_create(null, {
      email: username,
      password: password,
    });
  };

  return (
    <div style={{ marginLeft: '20px' }}>
      <div style={{ height: '50px' }}></div>
      {/* <button onClick={setCSRF}>Set CSRF Token</button> */}
      <div style={{ height: '50px' }}></div>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input type="submit" value="Login"></input>
      </form>
      <div style={{ height: '50px' }}></div>
      <div>
        {auth === null ? '' : auth ? 'Login successful' : 'Login Failed'}
      </div>
      <div style={{ height: '50px' }}></div>
      {/* <button onClick={testEndpoint}>Test Endpoint</button> */}
      <div>
        {endpoint === null
          ? ''
          : endpoint
          ? 'Successful Request'
          : 'Request Rejected'}
      </div>
    </div>
  );
}
