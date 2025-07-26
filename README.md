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

### Apabila ingin membuat proyek sendiri

```bash
npx create-react-app my-fastapi-frontend
cd my-fastapi-frontend

# install library tambahan yang dibutuhkan
npm install bootstrap @popperjs/core
npm install --save-dev react-scripts
npm install --save-dev eslint
npm install --save-dev eslint-plugin-react@latest @eslint/js@latest eslint-plugin-jsx-a11y@latest eslint-plugin-react-hooks@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
npm install --save-dev eslint-config-react-app
```

## Linting

```bash
npx eslint --init

npm run lint
```

## Error saat test

apabila muncul error seperti:

```log
> react-frontend-auth@0.1.0 test

> react-scripts test --watchAll=false


sh: 1: react-scripts: not found
```

lakukan lagi :

```bash
npm uninstall react-scripts
npm install --save-dev react-scripts@latest

npm test -- --watchAll=false
```
