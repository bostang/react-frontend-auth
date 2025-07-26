import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// Main App component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(localStorage.getItem('access_token') || ''); // Load token from localStorage
  const [currentUser, setCurrentUser] = useState(null);

  // --- PERUBAHAN DIMULAI DI SINI ---
  // Gunakan path relatif karena Nginx di frontend akan mem-proxy '/api' ke backend
  const API_BASE_PATH = '/api'; // Base path for all API calls, handled by Nginx proxy
  const API_AUTH_URL = `${API_BASE_PATH}/auth`; // Untuk endpoint /api/auth/register dan /api/auth/login
  const USERS_ME_URL = `${API_BASE_PATH}/users/me`; // Untuk endpoint /api/users/me
  // --- PERUBAHAN BERAKHIR DI SINI ---

  // Effect to check login status and fetch user data on component mount or token change
  useEffect(() => {
    const checkLoginStatus = async () => {
      if (token) {
        try {
          // Menggunakan USERS_ME_URL yang sudah diperbarui
          const response = await fetch(USERS_ME_URL, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setCurrentUser(userData);
            setIsLoggedIn(true);
            setMessage('Berhasil login!');
          } else {
            console.error('Failed to fetch user data:', response.statusText);
            setMessage('Sesi tidak valid atau kedaluwarsa. Silakan login kembali.');
            setIsLoggedIn(false);
            setToken('');
            localStorage.removeItem('access_token');
            setCurrentUser(null);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setMessage('Terjadi kesalahan saat memverifikasi sesi.');
          setIsLoggedIn(false);
          setToken('');
          localStorage.removeItem('access_token');
          setCurrentUser(null);
        }
      }
    };

    checkLoginStatus();
  }, [token]); // Re-run when token changes

  // Handle Register Form Submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('Mendaftarkan...');
    try {
      // Menggunakan API_AUTH_URL yang sudah diperbarui
      const response = await fetch(`${API_AUTH_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Pendaftaran berhasil untuk ${data.username}! Silakan login.`);
        setShowRegisterForm(false);
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        setMessage(`Pendaftaran gagal: ${data.detail || 'Terjadi kesalahan.'}`);
      }
    } catch (error) {
      setMessage('Terjadi kesalahan jaringan atau server.');
      console.error('Error during registration:', error);
    }
  };

  // Handle Login Form Submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('Mencoba login...');
    try {
      // Menggunakan API_AUTH_URL yang sudah diperbarui
      const response = await fetch(`${API_AUTH_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.access_token);
        localStorage.setItem('access_token', data.access_token);
        setIsLoggedIn(true);
        setMessage('Login berhasil!');
      } else {
        setMessage(`Login gagal: ${data.detail || 'Nama pengguna atau kata sandi salah.'}`);
        setIsLoggedIn(false);
        setToken('');
        localStorage.removeItem('access_token');
        setCurrentUser(null);
      }
    } catch (error) {
      setMessage('Terjadi kesalahan jaringan atau server.');
      console.error('Error during login:', error);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken('');
    localStorage.removeItem('access_token');
    setCurrentUser(null);
    setMessage('Anda telah logout.');
    setUsername('');
    setPassword('');
    setEmail('');
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light p-3">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="text-center mb-4 h3">
          {isLoggedIn ? 'Dashboard' : (showRegisterForm ? 'Daftar Akun Baru' : 'Login')}
        </h1>

        {message && (
          <div className="alert alert-info text-center" role="alert">
            {message}
          </div>
        )}

        {isLoggedIn ? (
          <div className="text-center">
            <p className="lead mb-3">Selamat datang, {currentUser?.username}!</p>
            <p className="text-muted mb-4">Email: {currentUser?.email}</p>
            <button
              onClick={handleLogout}
              className="btn btn-danger w-100"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            {showRegisterForm ? (
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Nama Pengguna
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Kata Sandi
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Daftar
                </button>
              </form>
            ) : (
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Nama Pengguna
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Kata Sandi
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Login
                </button>
              </form>
            )}

            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  setShowRegisterForm(!showRegisterForm);
                  setMessage('');
                  setUsername('');
                  setEmail('');
                  setPassword('');
                }}
                className="btn btn-link"
              >
                {showRegisterForm ? 'Sudah punya akun? Login' : 'Belum punya akun? Daftar sekarang'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
