# 📝 Post Management App

Ziyaretçilerin gönderi oluşturabildiği, düzenleyebildiği ve silebildiği tam işlevli bir gönderi yönetim uygulamasıdır.

---

## 🚀 Özellikler

- ✅ Yeni gönderi oluşturma
- ✏️ Gönderileri düzenleme
- 🗑️ Gönderileri silme
- 🧠 Global state yönetimi (Zustand)
- ✔️ Form doğrulama (React Hook Form + Zod)
- ⚡ Server Actions ile backend işlemleri
- 🌈 Responsive kullanıcı arayüzü (Tailwind CSS)

---

## 🖼️ Ekran Görüntüleri

### 📄 Gönderi Listesi

<img width="1892" height="903" alt="Ekran görüntüsü 2025-07-18 012128" src="https://github.com/user-attachments/assets/73154484-e2ea-49a6-a77b-9654eea79330" />


### 🎯 Gönderi Oluşturma Formu

<img width="1135" height="359" alt="Ekran görüntüsü 2025-07-18 013009" src="https://github.com/user-attachments/assets/bc9c3610-d621-49a6-a018-e70f624577d7" />


### ✏️ Gönderi Düzenleme Formu

<img width="995" height="554" alt="Ekran görüntüsü 2025-07-18 012149" src="https://github.com/user-attachments/assets/cbdbeb83-4112-4ef8-9a09-4b3d226f436e" />

---

## 🧰 Kullanılan Teknolojiler

| Katman          | Teknoloji                     |
|----------------|-------------------------------|
| Frontend       | Next.js (App Router)          |
| Form Doğrulama | React Hook Form + Zod         |
| State Yönetimi | Zustand                       |
| Backend        | Next.js Server Actions        |
| Stil           | Tailwind CSS                  |
| ORM            | Prisma                        |
| Veritabanı     | MongoDB                       |

---

## ⚙️ Kurulum ve Geliştirme Ortamı

``` bash
npm install
npx prisma generate
npx prisma db push
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p

npm install react-hook-form zod @hookform/resolvers
npm install zustand
npm install @prisma/client
npm install -D prisma
```
