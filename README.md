# Mind Cars — คู่มือติดตั้ง (ฟรีทั้งหมด)

ใช้ GitHub Pages เป็นที่วางแอป และ Firebase แผน Spark (ฟรี ไม่ต้องผูกบัตร) เก็บข้อมูลและระบบล็อกอิน
แนะนำให้ทำบนคอมพิวเตอร์ เพราะต้องอัปโหลดโฟลเดอร์ `icons`

## ไฟล์ในชุดนี้
| ไฟล์ | หน้าที่ |
|---|---|
| index.html | ตัวแอปทั้งหมด (อัปเดตแอปในอนาคต = อัปโหลดไฟล์นี้ไฟล์เดียว) |
| firebase-config.js | ค่าเชื่อมต่อ Firebase ของคุณ แก้ครั้งเดียว |
| manifest.json, sw.js | ทำให้ติดตั้งลงหน้าจอมือถือได้ และเปิดได้แม้ออฟไลน์ |
| icons/ | ไอคอนแอป |
| firestore.rules | กฎความปลอดภัยฐานข้อมูล (ใช้คัดลอกไปวางใน Firebase ไม่ต้องอัปโหลด) |

---

## ขั้นที่ 1 — สร้างโปรเจกต์ Firebase ใหม่ (ประมาณ 10 นาที)
แนะนำแยกจากโปรเจกต์ของ Mindmoney เพื่อไม่ให้กฎฐานข้อมูลของสองแอปชนกัน

1. เข้า https://console.firebase.google.com → **Add project** → ตั้งชื่อ `mindcars` → ปิด Google Analytics ได้ → Create
2. **เพิ่มเว็บแอป:** หน้า Project overview กดไอคอน `</>` (Web) → ตั้งชื่อ `Mind Cars` → ไม่ต้องติ๊ก Hosting → Register app
   - จะเห็นโค้ด `const firebaseConfig = { apiKey: ..., ... }` **คัดลอกเก็บไว้**
3. **เปิดล็อกอินด้วยอีเมล:** เมนู Build → **Authentication** → Get started → แท็บ Sign-in method → **Email/Password** → Enable → Save
4. **อนุญาตโดเมน GitHub:** Authentication → แท็บ **Settings** → Authorized domains → Add domain → ใส่ `golfpee1999.github.io`
5. **สร้างฐานข้อมูล:** Build → **Firestore Database** → Create database
   - Location: `asia-southeast1 (Singapore)` (เปลี่ยนภายหลังไม่ได้)
   - เลือก **Start in production mode**
6. **ใส่กฎความปลอดภัย:** Firestore → แท็บ **Rules** → ลบของเดิม วางเนื้อหาจากไฟล์ `firestore.rules` → **Publish**

## ขั้นที่ 2 — ใส่ค่า Firebase ลงไฟล์
เปิด `firebase-config.js` ด้วย Notepad / TextEdit แล้วแทนค่า `PASTE...` ทั้ง 6 บรรทัดด้วยค่าที่คัดลอกมาจากขั้นที่ 1 ข้อ 2 แล้วบันทึก

```js
export const firebaseConfig = {
  apiKey: "AIza....",
  authDomain: "mindcars-xxxx.firebaseapp.com",
  projectId: "mindcars-xxxx",
  storageBucket: "mindcars-xxxx.firebasestorage.app",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcd..."
};
```
> apiKey ของ Firebase เปิดเผยในเว็บได้ตามปกติ ความปลอดภัยของข้อมูลมาจากกฎในขั้นที่ 1 ข้อ 6

## ขั้นที่ 3 — ขึ้น GitHub Pages
1. เข้า https://github.com/new → Repository name: `Mindcars` → **Public** → Create repository
2. กด **uploading an existing file** → ลากไฟล์ทั้งหมด **รวมโฟลเดอร์ `icons`** ลงไป (ไม่ต้องใส่ README.md และ firestore.rules ก็ได้) → Commit changes
3. เมนู **Settings** → **Pages** → Source: `Deploy from a branch` → Branch: `main` / `(root)` → Save
4. รอ 1–2 นาที แอปจะอยู่ที่ **https://golfpee1999.github.io/Mindcars/**

## ขั้นที่ 4 — ติดตั้งลงมือถือ
- **iPhone:** เปิดลิงก์ด้วย **Safari** → ปุ่มแชร์ → **เพิ่มไปยังหน้าจอโฮม**
- **Android:** เปิดด้วย Chrome → เมนู ⋮ → **ติดตั้งแอป / Add to Home screen**

เปิดแอปครั้งแรก → **สร้างบัญชีใหม่** ด้วยอีเมลและรหัสผ่าน (อย่างน้อย 6 ตัว) คนในบ้านใช้เครื่องตัวเองสมัครแยกบัญชีได้

---

## อัปเดตแอปในอนาคต
อัปโหลดแค่ `index.html` ไฟล์ใหม่ทับใน repo (Add file → Upload files) **ห้ามอัปโหลด firebase-config.js ทับ** เพราะค่าของคุณจะหาย
แอปบนมือถือจะได้เวอร์ชันใหม่เมื่อเปิดครั้งถัดไปตอนมีเน็ต (ถ้ายังเป็นของเก่า ปิดแอปแล้วเปิดใหม่อีกรอบ)

## ถ้ามีปัญหา
| อาการ | วิธีแก้ |
|---|---|
| ขึ้นว่า "ยังไม่ได้ตั้งค่า Firebase" | ตรวจ firebase-config.js ว่าแทนค่า PASTE ครบ และอัปโหลดขึ้น repo แล้ว |
| ล็อกอินแล้วขึ้น error เรื่อง domain | ยังไม่ได้เพิ่ม `golfpee1999.github.io` ใน Authorized domains |
| บันทึกได้แต่เครื่องอื่นไม่เห็นข้อมูล | ตรวจว่า Publish กฎ Firestore แล้ว และล็อกอินบัญชีเดียวกัน |
| หน้าเว็บขึ้น 404 | รอ Pages สร้างเสร็จ 1–2 นาที และเช็กว่า index.html อยู่ชั้นนอกสุดของ repo |

## ข้อมูลเดิมในเวอร์ชันทดลองบน Claude
ข้อมูลใน Claude ย้ายมาอัตโนมัติไม่ได้ (คนละที่เก็บ) ทางที่ง่ายที่สุดคือเริ่มบันทึกใหม่ในแอปจริง
