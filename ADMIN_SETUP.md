# دليل إعداد وتشغيل لوحة التحكم — إدارة الموقع

يشرح هذا الدليل البنية الفعلية لقاعدة بيانات Supabase، وكيفية إضافة وتفعيل حسابات مسؤولي الموقع، ومتطلبات التخزين (Storage)، وسياسات الأمان المعمول بها.

---

## 1. البنية الفعلية لقاعدة البيانات (Existing Schema)

الجداول التالية منشأة بالفعل في قاعدة بيانات المشروع (لا تقم بإعادة إنشائها أو حذفها):

### أ. جدول مسؤولي النظام (`admin_users`)
يُستخدم للتحقق الصارم من صلاحيات المسؤولين. أي مستخدم يسجل دخوله يجب أن يكون معرفه موجوداً هنا:
* `user_id`: UUID (المعرف الفريد للمستخدم في `auth.users`)
* `created_at`: TIMESTAMPTZ

### ب. جدول إعدادات الموقع (`site_settings`)
يحتوي سجلاً واحداً مهيكلاً لبيانات المؤسسة العامة:
* `id`: BIGINT (المفتاح الأساسي Primary Key)
* `site_name`: TEXT (اسم المؤسسة / الموقع)
* `phone`: TEXT (رقم الهاتف المباشر)
* `whatsapp`: TEXT (رقم الواتساب)
* `description`: TEXT (نبذة عن المؤسسة)
* `seo_title`: TEXT (عنوان محركات البحث SEO Title)
* `seo_description`: TEXT (وصف محركات البحث SEO Description)
* `logo_url`: TEXT (رابط الشعار Logo URL)
* `updated_at`: TIMESTAMPTZ (تاريخ ووقت آخر تعديل)

### ج. جدول الخدمات (`services`)
إدارة قائمة الخدمات المعروضة بالموقع وترتيبها:
* `id`: BIGINT (Primary Key)
* `title`: TEXT (عنوان الخدمة)
* `description`: TEXT (تفاصيل ووصف الخدمة)
* `image_url`: TEXT (رابط صورة الخدمة)
* `sort_order`: INTEGER (ترتيب ظهور الخدمة)
* `is_active`: BOOLEAN (حالة التفعيل: نشط / معطل)
* `created_at`: TIMESTAMPTZ

### د. جدول معرض الصور (`gallery`)
إدارة صور المعرض والمشاريع المنجزة:
* `id`: BIGINT (Primary Key)
* `title`: TEXT (عنوان اختياري للصورة)
* `image_url`: TEXT (رابط الصورة المباشر)
* `alt_text`: TEXT (النص البديل لمحركات البحث ومساعدات القراءة)
* `sort_order`: INTEGER (ترتيب ظهور الصورة)
* `created_at`: TIMESTAMPTZ

---

## 2. خطوات تسجيل وتفعيل حساب مسؤول جديد (Admin User Enrollment)

تتطلب عملية منح صلاحية الإدارة خطوتين إجباريتين لمنع أي دخول غير مصرح:

### الخطوة الأولى: إنشاء المستخدم في Supabase Auth
1. توجّه إلى لوحة تحكم مشروعك في Supabase.
2. انتقل إلى **Authentication** -> **Users**.
3. انقر على **Add user** -> **Create user**.
4. أدخل البريد الإلكتروني وكلمة المرور للمسؤول، وتأكد من تفعيل **Auto Confirm User**.
5. انسخ معرف المستخدم الفريد الناتج (**User UID**) الذي يظهر بجوار البريد الإلكتروني (مثال: `c4a5f829-1234-4567-89ab-cdef01234567`).

### الخطوة الثانية: قيد المعرف في جدول المسؤولين (`admin_users`)
افتح **SQL Editor** في Supabase ونفّذ الاستعلام التالي لربط المستخدم بصلاحية الإدارة:

```sql
INSERT INTO admin_users (user_id) 
VALUES ('ضع_معرف_المستخدم_هنا');
```

---

## 3. إعداد حاوية تخزين الصور (Supabase Storage Bucket)

لتمكين رفع واستبدال الصور من الحاسوب عبر لوحة التحكم:
1. توجّه إلى **Storage** في Supabase.
2. أنشئ Bucket جديد باسم: `website-assets`.
3. اضبط خيار **Public Bucket** على **مفعّل (Enabled)** لتمكين الزوار من رؤية الصور.

أو قم بتنفيذ الاستعلام التالي في SQL Editor:
```sql
-- إنشاء حاوية التخزين كحاوية عامة
INSERT INTO storage.buckets (id, name, public) 
VALUES ('website-assets', 'website-assets', true)
ON CONFLICT (id) DO NOTHING;

-- سياسة قراءة الصور للجميع (Public Read)
CREATE POLICY "Public Access website-assets" 
ON storage.objects FOR SELECT 
TO public 
USING (bucket_id = 'website-assets');

-- سياسة رفع وتعديل الصور للمسؤولين فقط
CREATE POLICY "Admin Upload website-assets" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (
  bucket_id = 'website-assets' AND
  EXISTS (SELECT 1 FROM admin_users WHERE admin_users.user_id = auth.uid())
);
```

---

## 4. متغيرات البيئة (Environment Configuration)

### محلياً (Local Development):
ضع بيانات الاتصال في ملف `.env.local`:
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

### على GitHub Actions (CI/CD Production Deployment):
تُمرّر المتغيرات عبر **Repository Secrets**:
* مسار الإعداد: `GitHub Repository -> Settings -> Secrets and variables -> Actions -> Repository secrets`
* الأسماء المطابقة:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`

---

## 5. الوصول إلى لوحة الإدارة

1. في بيئة التطوير: `http://localhost:8080/rubou-albilad/admin/login`
2. بعد تسجيل الدخول كمسؤول معتمد، يتم التوجيه مباشرة إلى `http://localhost:8080/rubou-albilad/admin/dashboard` حيث تتوفر الأقسام السبعة:
   - إعدادات الموقع
   - القائمة
   - الخدمات (22 خدمة)
   - المشاريع
   - المعرض
   - صفحات التفصيل (22 صفحة)
   - تحسين محركات البحث SEO
