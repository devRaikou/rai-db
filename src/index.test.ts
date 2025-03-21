import RaiDB from './index';
import * as path from 'path';
import * as fs from 'fs-extra';

const TEST_DB_PATH = path.join(__dirname, '..', 'test', 'test.json');

describe('RaiDB', () => {
  let db: RaiDB;

  beforeEach(async () => {
    await fs.ensureFile(TEST_DB_PATH);
    db = new RaiDB(TEST_DB_PATH);
  });

  afterEach(async () => {
    try {
      await fs.remove(TEST_DB_PATH);
    } catch (error) {
      console.error('Test temizleme hatası:', error);
    }
  });

  describe('Temel CRUD İşlemleri', () => {
    it('veri ekleyip alabilmeli', () => {
      const testData = { name: 'test', value: 123 };
      db.set('test', testData);
      expect(db.get('test')).toEqual(testData);
    });

    it('verinin varlığını kontrol edebilmeli', () => {
      db.set('test', { value: 'test' });
      expect(db.has('test')).toBe(true);
      expect(db.has('nonexistent')).toBe(false);
    });

    it('veriyi silebilmeli', () => {
      db.set('test', { value: 'test' });
      expect(db.delete('test')).toBe(true);
      expect(db.has('test')).toBe(false);
    });

    it('tüm verileri temizleyebilmeli', () => {
      db.set('test1', { value: 1 });
      db.set('test2', { value: 2 });
      db.clear();
      expect(db.count()).toBe(0);
    });
  });

  describe('Sorgu İşlemleri', () => {
    beforeEach(() => {
      db.set('user1', { name: 'Ali', age: 25, city: 'Istanbul' });
      db.set('user2', { name: 'Ayşe', age: 30, city: 'Ankara' });
      db.set('user3', { name: 'Mehmet', age: 35, city: 'Istanbul' });
    });

    it('basit sorgu yapabilmeli', () => {
      const results = db.find({ city: 'Istanbul' });
      expect(results).toHaveLength(2);
      expect(results.every(r => r.city === 'Istanbul')).toBe(true);
    });

    it('sıralama yapabilmeli', () => {
      const results = db.find({}, { sort: { age: 'asc' } });
      expect(results).toHaveLength(3);
      expect(results[0].age).toBe(25);
      expect(results[2].age).toBe(35);
    });

    it('limit ve atlama seçeneklerini kullanabilmeli', () => {
      const results = db.find({}, { skip: 1, limit: 1 });
      expect(results).toHaveLength(1);
    });
  });

  describe('Veritabanı Seçenekleri', () => {
    it('otomatik kaydetme özelliğini devre dışı bırakabilmeli', async () => {
      const customDb = new RaiDB(TEST_DB_PATH, { autoSave: false });
      customDb.set('test', { value: 'test' });
      
      // Yeni bir veritabanı örneği oluşturup dosyayı okuyoruz
      const newDb = new RaiDB(TEST_DB_PATH);
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(newDb.get('test')).toBeUndefined();
    });

    it('pretty print özelliğini kullanabilmeli', async () => {
      const prettyDb = new RaiDB(TEST_DB_PATH, { pretty: true });
      prettyDb.set('test', { value: 'test' });
      await prettyDb.save();

      const fileContent = await fs.promises.readFile(TEST_DB_PATH, 'utf-8');
      expect(fileContent).toContain('\n');
      expect(fileContent).toContain('  ');
    });
  });
});
