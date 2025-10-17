# 🧑‍💼 Employee Management Dashboard

Project ini adalah aplikasi dashboard sederhana untuk mengelola data karyawan (employee management system).  
Dibangun menggunakan **React + TypeScript + Vite**, dengan integrasi **React Query** untuk data fetching, serta mendukung **fake pagination client-side**.

---

## 🚀 Tech Stack

| Teknologi                        | Deskripsi                                                                  |
| -------------------------------- | -------------------------------------------------------------------------- |
| **React + TypeScript**           | Frontend utama berbasis komponen                                           |
| **Vite**                         | Build tool yang cepat untuk React                                          |
| **React Query (TanStack Query)** | Data fetching & caching dari API                                           |
| **TailwindCSS**                  | Utility-first CSS framework                                                |
| **Axios**                        | HTTP client untuk koneksi ke API backend                                   |
| **ESLint + Prettier**            | Code linting & formatting                                                  |
| **Custom Hooks**                 | `useEmployeesWithPagination`, `useCreateDataEmployee`, `useFakePagination` |

---

## 🧩 Fitur Utama

- ✅ Menampilkan list data karyawan
- 🔍 Client-side pagination (maks. 5 item per halaman)
- ➕ Tambah data karyawan lewat modal
- 🧠 Validasi form & error handling dari API
- 🔄 React Query integration untuk refetch otomatis
- 💬 Custom error handling & reset error state
- 💅 Desain UI konsisten dengan Tailwind

---

## How To Clone

git clone https://github.com/username/fairatmos-employee.git
cd fairatmos-employee

## How To Install

npm install

# atau

yarn install

# atau

pnpm install

## How To Run Dev

npm run dev

# atau

yarn dev

# atau

pnpm dev
