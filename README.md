# RaiDB

Simple and efficient JSON database library for Node.js applications. A lightweight, fast, and easy-to-use data storage solution.

## Features

- 💡 Simple and easy-to-use API
- 🚀 Auto-save functionality
- 🔍 Advanced query capabilities
- 📦 Sorting, limit, and skip options
- 🛠 TypeScript support
- 📝 Pretty print support

## Installation

```bash
npm install raikoudb
```

## Usage

### TypeScript

```typescript
import RaiDB from 'raikoudb';

// Create database
const db = new RaiDB('database.json', {
  autoSave: true,     // Auto-save (default: true)
  saveTimeout: 1000,  // Save delay in ms (default: 1000)
  pretty: true        // Pretty print JSON (default: false)
});

// Add data
db.set('user1', { name: 'John', age: 25, city: 'London' });

// Read data
const user = db.get('user1');
console.log(user); // { name: 'John', age: 25, city: 'London' }

// Delete data
db.delete('user1');

// Query data
const users = db.find(
  { city: 'London' },   // Query criteria
  { 
    sort: { age: 'asc' }, // Sort by age ascending
    limit: 10,            // Maximum 10 results
    skip: 0               // Start from beginning
  }
);

// Count data
const count = db.count({ city: 'London' });

// Manual save
await db.save();
```

### JavaScript

#### ES Modules

```javascript
import RaiDB from 'raikoudb';

// Create database
const db = new RaiDB('database.json', {
  autoSave: true,     // Auto-save (default: true)
  saveTimeout: 1000,  // Save delay in ms (default: 1000)
  pretty: true        // Pretty print JSON (default: false)
});

// Add data
db.set('user1', { name: 'John', age: 25, city: 'London' });

// Read data
const user = db.get('user1');
console.log(user); // { name: 'John', age: 25, city: 'London' }

// Delete data
db.delete('user1');

// Query data
const users = db.find(
  { city: 'London' },   // Query criteria
  { 
    sort: { age: 'asc' }, // Sort by age ascending
    limit: 10,            // Maximum 10 results
    skip: 0               // Start from beginning
  }
);

// Count data
const count = db.count({ city: 'London' });

// Manual save
await db.save();
```

#### CommonJS

```javascript
const RaiDB = require('raikoudb');

// Create database
const db = new RaiDB('database.json', {
  autoSave: true,     // Auto-save (default: true)
  saveTimeout: 1000,  // Save delay in ms (default: 1000)
  pretty: true        // Pretty print JSON (default: false)
});

// Add data
db.set('user1', { name: 'John', age: 25, city: 'London' });

// Read data
const user = db.get('user1');
console.log(user); // { name: 'John', age: 25, city: 'London' }

// Delete data
db.delete('user1');

// Query data
const users = db.find(
  { city: 'London' },   // Query criteria
  { 
    sort: { age: 'asc' }, // Sort by age ascending
    limit: 10,            // Maximum 10 results
    skip: 0               // Start from beginning
  }
);

// Count data
const count = db.count({ city: 'London' });

// Manual save
await db.save();
```

## Events

RaiDB provides event listeners for database operations:

```typescript
// When data is updated
db.on('updated', ({ key, value }) => {
  console.log(`${key} updated:`, value);
});

// When data is deleted
db.on('deleted', ({ key }) => {
  console.log(`${key} deleted`);
});

// When database is loaded
db.on('loaded', () => {
  console.log('Database loaded');
});

// When database is saved
db.on('saved', () => {
  console.log('Database saved');
});

// When database is cleared
db.on('cleared', () => {
  console.log('Database cleared');
});
```

---

# RaiDB (Türkçe)

Basit ve verimli bir JSON veritabanı kütüphanesi. Node.js uygulamalarınız için hafif, hızlı ve kullanımı kolay bir veri depolama çözümü.

## Özellikler

- 💡 Basit ve kullanımı kolay API
- 🚀 Otomatik kaydetme özelliği
- 🔍 Gelişmiş sorgu yetenekleri
- 📦 Sıralama, limit ve atlama seçenekleri
- 🛠 TypeScript desteği
- 📝 Pretty print desteği

## Kurulum

```bash
npm install raikoudb
```

## Kullanım

### TypeScript

```typescript
import RaiDB from 'raikoudb';

// Veritabanı oluşturma
const db = new RaiDB('database.json', {
  autoSave: true,     // Otomatik kaydetme (varsayılan: true)
  saveTimeout: 1000,  // Kaydetme gecikmesi ms cinsinden (varsayılan: 1000)
  pretty: true        // JSON formatını düzenli yazdırma (varsayılan: false)
});

// Veri ekleme
db.set('user1', { name: 'Ali', age: 25, city: 'Istanbul' });

// Veri okuma
const user = db.get('user1');
console.log(user); // { name: 'Ali', age: 25, city: 'Istanbul' }

// Veri silme
db.delete('user1');

// Sorgu yapma
const users = db.find(
  { city: 'Istanbul' },  // Sorgu kriterleri
  { 
    sort: { age: 'asc' }, // Yaşa göre artan sıralama
    limit: 10,            // En fazla 10 sonuç
    skip: 0               // Başlangıçtan itibaren
  }
);

// Veri sayısı
const count = db.count({ city: 'Istanbul' });

// Manuel kaydetme
await db.save();
```

### JavaScript

#### ES Modules

```javascript
import RaiDB from 'raikoudb';

// Veritabanı oluşturma
const db = new RaiDB('database.json', {
  autoSave: true,     // Otomatik kaydetme (varsayılan: true)
  saveTimeout: 1000,  // Kaydetme gecikmesi ms cinsinden (varsayılan: 1000)
  pretty: true        // JSON formatını düzenli yazdırma (varsayılan: false)
});

// Veri ekleme
db.set('user1', { name: 'Ali', age: 25, city: 'Istanbul' });

// Veri okuma
const user = db.get('user1');
console.log(user); // { name: 'Ali', age: 25, city: 'Istanbul' }

// Veri silme
db.delete('user1');

// Sorgu yapma
const users = db.find(
  { city: 'Istanbul' },  // Sorgu kriterleri
  { 
    sort: { age: 'asc' }, // Yaşa göre artan sıralama
    limit: 10,            // En fazla 10 sonuç
    skip: 0               // Başlangıçtan itibaren
  }
);

// Veri sayısı
const count = db.count({ city: 'Istanbul' });

// Manuel kaydetme
await db.save();
```

#### CommonJS

```javascript
const RaiDB = require('raikoudb');

// Veritabanı oluşturma
const db = new RaiDB('database.json', {
  autoSave: true,     // Otomatik kaydetme (varsayılan: true)
  saveTimeout: 1000,  // Kaydetme gecikmesi ms cinsinden (varsayılan: 1000)
  pretty: true        // JSON formatını düzenli yazdırma (varsayılan: false)
});

// Veri ekleme
db.set('user1', { name: 'Ali', age: 25, city: 'Istanbul' });

// Veri okuma
const user = db.get('user1');
console.log(user); // { name: 'Ali', age: 25, city: 'Istanbul' }

// Veri silme
db.delete('user1');

// Sorgu yapma
const users = db.find(
  { city: 'Istanbul' },  // Sorgu kriterleri
  { 
    sort: { age: 'asc' }, // Yaşa göre artan sıralama
    limit: 10,            // En fazla 10 sonuç
    skip: 0               // Başlangıçtan itibaren
  }
);

// Veri sayısı
const count = db.count({ city: 'Istanbul' });

// Manuel kaydetme
await db.save();
```

## Olaylar

RaiDB, veritabanı işlemleri için olay dinleyicileri sağlar:

```typescript
// Veri güncellendiğinde
db.on('updated', ({ key, value }) => {
  console.log(`${key} güncellendi:`, value);
});

// Veri silindiğinde
db.on('deleted', ({ key }) => {
  console.log(`${key} silindi`);
});

// Veritabanı yüklendiğinde
db.on('loaded', () => {
  console.log('Veritabanı yüklendi');
});

// Veritabanı kaydedildiğinde
db.on('saved', () => {
  console.log('Veritabanı kaydedildi');
});

// Veritabanı temizlendiğinde
db.on('cleared', () => {
  console.log('Veritabanı temizlendi');
});
```

## Lisans

MIT
