import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login form or register link', () => {
  render(<App />);

  // Pengujian untuk teks yang ada di komponen App Anda saat ini
  // Lebih spesifik: cari heading "Login"
  const loginHeading = screen.getByRole('heading', { name: /Login/i });
  expect(loginHeading).toBeInTheDocument();

  // Cari tombol "Login"
  const loginButton = screen.getByRole('button', { name: /Login/i });
  expect(loginButton).toBeInTheDocument();

  // Cari tombol yang mengalihkan ke pendaftaran
  const registerLinkButton = screen.getByRole('button', { name: /Belum punya akun\? Daftar sekarang/i });
  expect(registerLinkButton).toBeInTheDocument();

  // Anda juga bisa menguji keberadaan input username dan password
  const usernameInput = screen.getByLabelText(/Nama Pengguna/i);
  expect(usernameInput).toBeInTheDocument();

  const passwordInput = screen.getByLabelText(/Kata Sandi/i);
  expect(passwordInput).toBeInTheDocument();
});

// Anda bisa menambahkan pengujian lain di sini,
// misalnya, menguji pendaftaran, login, atau logout.
