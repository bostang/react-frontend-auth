# react-frontend-auth

Sebuah frontend sederhana menggunakan React.js dan Bootstrap untuk berinteraksi dengan API register dan login FastAPI.

Aplikasi React ini memiliki:

- Form pendaftaran (`/api/auth/register`)
- Form login (`/api/auth/login`)
- Tampilan setelah login yang menunjukkan informasi pengguna (`/api/users/me`)
- Penanganan status dan pesan error sederhana.

## Cara Menjalankan

```bash
# pastikan backend sudah berjalan (uvicorn main:app --reload)

npm install
    # package yang harus di-install sudah ter-daftar di `package.json`

npm start
```

```bash
npx create-react-app my-fastapi-frontend
cd my-fastapi-frontend

# install library tambahan yang dibutuhkan
npm install bootstrap @popperjs/core
npm install --save-dev react-scripts
```
