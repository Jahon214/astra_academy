import { Course, Guide, Quiz, PracticalTask, Project, Achievement, UserProfile, CoinTransaction, NotificationItem, LeaderboardUser } from './types';

export const initialProfile: UserProfile = {
  id: 'usr-student-01',
  email: 'ali@astra.uz',
  first_name: 'Ali',
  last_name: 'Valiyev',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'student',
  coins: 240,
  xp: 720,
  level: 3,
  streak: 7,
  last_active_date: new Date().toISOString().split('T')[0],
  created_at: '2026-09-01T08:00:00Z',
};

export const adminProfile: UserProfile = {
  id: 'usr-admin-01',
  email: 'admin@astra.uz',
  first_name: 'Astra',
  last_name: 'Boshqaruvchi',
  avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  role: 'admin',
  coins: 9999,
  xp: 9999,
  level: 7,
  streak: 30,
  last_active_date: new Date().toISOString().split('T')[0],
  created_at: '2026-08-01T08:00:00Z',
};

export const initialCourses: Course[] = [
  {
    id: 'course-html',
    slug: 'html-asoslari',
    title: 'HTML5 Asoslari va Semantika',
    description: 'Zamonaviy veb-sahifalarning mustahkam skeletini to‘g‘ri va semantik teglar bilan yaratishni noldan o‘rganing.',
    thumbnail_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
    difficulty: 'Boshlang\'ich',
    category: 'Frontend',
    is_published: true,
    total_lessons: 9,
    order_index: 1,
    modules: [
      {
        id: 'mod-html-1',
        course_id: 'course-html',
        title: '1. Kirish va Asosiy Konsepsiyalar',
        order_index: 1,
        lessons: [
          {
            id: 'les-html-1',
            module_id: 'mod-html-1',
            course_id: 'course-html',
            title: 'HTML nima? Veb qanday ishlaydi?',
            description: 'HTML nima, brauzer veb-sahifalarni qanday o‘qiydi va sahifaning asosiy tuzilishi (head, body).',
            youtube_video_id: 'UB1O30fR-EE',
            duration_minutes: 12,
            coin_reward: 20,
            xp_reward: 30,
            order_index: 1,
            is_completed: true,
            quiz_id: 'quiz-html-1',
          },
          {
            id: 'les-html-2',
            module_id: 'mod-html-1',
            course_id: 'course-html',
            title: 'Matn teglari, Sarlavhalar va Paragraflar',
            description: 'h1 dan h6 gacha sarlavhalar, p, strong, em va boshqa matn formatlash teglari bilan ishlash.',
            youtube_video_id: 'UB1O30fR-EE',
            duration_minutes: 15,
            coin_reward: 20,
            xp_reward: 30,
            order_index: 2,
            is_completed: true,
            quiz_id: 'quiz-html-1',
          },
          {
            id: 'les-html-3',
            module_id: 'mod-html-1',
            course_id: 'course-html',
            title: 'Havolalar (a) va Rasmlar (img)',
            description: 'Giperhavolalar, absolute va relative manzillar, rasm optimallashtirish va alt atributining SEOdagi o‘rni.',
            youtube_video_id: 'UB1O30fR-EE',
            duration_minutes: 18,
            coin_reward: 20,
            xp_reward: 30,
            order_index: 3,
            is_completed: true,
          },
        ],
      },
      {
        id: 'mod-html-2',
        course_id: 'course-html',
        title: '2. Interaktiv Elementlar va Semantika',
        order_index: 2,
        lessons: [
          {
            id: 'les-html-4',
            module_id: 'mod-html-2',
            course_id: 'course-html',
            title: 'Ro‘yxatlar (ul, ol) va Jadvallar (table)',
            description: 'Tartiblangan va tartiblanmagan ro‘yxatlar, ma’lumotlarni qulay jadvallar shaklida ko‘rsatish.',
            youtube_video_id: 'UB1O30fR-EE',
            duration_minutes: 16,
            coin_reward: 20,
            xp_reward: 30,
            order_index: 4,
            is_completed: false,
          },
          {
            id: 'les-html-5',
            module_id: 'mod-html-2',
            course_id: 'course-html',
            title: 'Formalar va Input Elementlari',
            description: 'Foydalanuvchidan ma’lumot qabul qilish: input, select, textarea, button va form validatsiyasi.',
            youtube_video_id: 'UB1O30fR-EE',
            duration_minutes: 22,
            coin_reward: 20,
            xp_reward: 30,
            order_index: 5,
            is_completed: false,
          },
          {
            id: 'les-html-6',
            module_id: 'mod-html-2',
            course_id: 'course-html',
            title: 'Semantik HTML5 va Accessibility (a11y)',
            description: 'header, nav, main, section, article, footer, aside teglari va ekran o‘quvchi dasturlar uchun qulaylik.',
            youtube_video_id: 'UB1O30fR-EE',
            duration_minutes: 20,
            coin_reward: 25,
            xp_reward: 35,
            order_index: 6,
            is_completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 'course-css',
    slug: 'css-asoslari',
    title: 'CSS3 va Zamonaviy Veb Dizayn',
    description: 'Flexbox, CSS Grid, zamonaviy animatsiyalar va har qanday qurilmaga moslashuvchi (responsive) dizayn texnikalari.',
    thumbnail_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    difficulty: 'Boshlang\'ich',
    category: 'Frontend',
    is_published: true,
    total_lessons: 10,
    order_index: 2,
    modules: [
      {
        id: 'mod-css-1',
        course_id: 'course-css',
        title: '1. CSS Sintaksisi va Box Model',
        order_index: 1,
        lessons: [
          {
            id: 'les-css-1',
            module_id: 'mod-css-1',
            course_id: 'course-css',
            title: 'CSS Selektorlari va Box Model',
            description: 'Margin, border, padding, content — veb sahifadagi har bir element qutichasining ishlash printsipi.',
            youtube_video_id: '1Rs2ND1ryYc',
            duration_minutes: 18,
            coin_reward: 20,
            xp_reward: 30,
            order_index: 1,
            is_completed: true,
            quiz_id: 'quiz-css-1',
          },
          {
            id: 'les-css-2',
            module_id: 'mod-css-1',
            course_id: 'course-css',
            title: 'CSS Flexbox Asoslari va Amaliyot',
            description: 'Flex konteyner, justify-content, align-items, flex-wrap xususiyatlari orqali elementlarni 1 o‘lchamda qulay joylashtirish.',
            youtube_video_id: 'JJSoEo8JSnc',
            duration_minutes: 24,
            coin_reward: 25,
            xp_reward: 35,
            order_index: 2,
            is_completed: true,
            quiz_id: 'quiz-css-1',
          },
        ],
      },
      {
        id: 'mod-css-2',
        course_id: 'course-css',
        title: '2. Grid va Moslashuvchanlik',
        order_index: 2,
        lessons: [
          {
            id: 'les-css-3',
            module_id: 'mod-css-2',
            course_id: 'course-css',
            title: 'CSS Grid Tizimi',
            description: '2 o‘lchamli to‘rlar (grid-template-columns, fr birligi, gap, minmax) orqali murakkab maketlar yasash.',
            youtube_video_id: 'jV8B24rSN5o',
            duration_minutes: 25,
            coin_reward: 25,
            xp_reward: 35,
            order_index: 3,
            is_completed: false,
          },
          {
            id: 'les-css-4',
            module_id: 'mod-css-2',
            course_id: 'course-css',
            title: 'Responsive Dizayn va Media Queries',
            description: 'Mobil qurilmalar, planshet va katta monitorlar uchun @media so‘rovlari yordamida moslashuvchan interfeyslar.',
            youtube_video_id: 'JJSoEo8JSnc',
            duration_minutes: 20,
            coin_reward: 20,
            xp_reward: 30,
            order_index: 4,
            is_completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 'course-js',
    slug: 'javascript-asoslari',
    title: 'JavaScript: Boshlang\'ichdan Professionalgacha',
    description: 'Zamonaviy ES6+, asinxron dasturlash, DOM bilan ishlash, Event Loop va haqiqiy interaktiv veb-ilovalar ishlab chiqish.',
    thumbnail_url: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&auto=format&fit=crop&q=80',
    difficulty: 'O\'rta',
    category: 'Frontend',
    is_published: true,
    total_lessons: 14,
    order_index: 3,
    modules: [
      {
        id: 'mod-js-1',
        course_id: 'course-js',
        title: '1. O‘zgaruvchilar va Ma’lumot Turlari',
        order_index: 1,
        lessons: [
          {
            id: 'les-js-1',
            module_id: 'mod-js-1',
            course_id: 'course-js',
            title: 'JavaScript Asoslari: let, const va Turlar',
            description: 'Primitive va Reference turlar, o‘zgaruvchilarni e’lon qilish qoidalari va dinamik tiplashtirish.',
            youtube_video_id: 'W6NZfCO5SIk',
            duration_minutes: 20,
            coin_reward: 20,
            xp_reward: 30,
            order_index: 1,
            is_completed: true,
            quiz_id: 'quiz-js-1',
          },
          {
            id: 'les-js-2',
            module_id: 'mod-js-1',
            course_id: 'course-js',
            title: 'Funksiyalar va Arrow Functions',
            description: 'Function Declaration, Expression va Arrow funksiyalar, parametrlar hamda return qiymat.',
            youtube_video_id: 'W6NZfCO5SIk',
            duration_minutes: 22,
            coin_reward: 20,
            xp_reward: 30,
            order_index: 2,
            is_completed: false,
          },
        ],
      },
      {
        id: 'mod-js-2',
        course_id: 'course-js',
        title: '2. DOM Manipulyatsiyasi va Asinxronlik',
        order_index: 2,
        lessons: [
          {
            id: 'les-js-3',
            module_id: 'mod-js-2',
            course_id: 'course-js',
            title: 'DOM bilan ishlash va Hodisalar (Events)',
            description: 'querySelector, addEventListener, elementlarni yaratish va stilini dinamik o‘zgartirish.',
            youtube_video_id: '0ik6X4DJKCc',
            duration_minutes: 28,
            coin_reward: 25,
            xp_reward: 40,
            order_index: 3,
            is_completed: false,
          },
          {
            id: 'les-js-4',
            module_id: 'mod-js-2',
            course_id: 'course-js',
            title: 'Promises, async/await va Fetch API',
            description: 'Serverdan ma’lumotlarni olish, JSON format bilan ishlash va asinxron operatsiyalarni xatosiz boshqarish.',
            youtube_video_id: 'PoRJizFvM7s',
            duration_minutes: 30,
            coin_reward: 30,
            xp_reward: 45,
            order_index: 4,
            is_completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 'course-git',
    slug: 'git-va-github',
    title: 'Git va GitHub: Professional Jamoaviy Ish',
    description: 'Kodni professional nazorat qilish, branchlar bilan ishlash, merge konfliktlarni hal qilish va GitHub orqali jamoada ishlash.',
    thumbnail_url: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=80',
    difficulty: 'Boshlang\'ich',
    category: 'Asboblar',
    is_published: true,
    total_lessons: 6,
    order_index: 4,
    modules: [],
  },
  {
    id: 'course-react',
    slug: 'react-asoslari',
    title: 'React.js: Zamonaviy Komponentlar',
    description: 'Virtual DOM, JSX, useState, useEffect, Custom Hooks va zamonaviy Single Page Application (SPA) arxitekturasi.',
    thumbnail_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    difficulty: 'O\'rta',
    category: 'Frontend',
    is_published: true,
    total_lessons: 12,
    order_index: 5,
    modules: [],
  },
  {
    id: 'course-nextjs',
    slug: 'nextjs-fullstack',
    title: 'Next.js: To‘liq Full-Stack Platforma',
    description: 'Server Components, App Router, SSR, SSG, SEO optimallashtirish va Vercel platformasiga tezkor joylashtirish.',
    thumbnail_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    difficulty: 'Murakkab',
    category: 'Full-Stack',
    is_published: true,
    total_lessons: 10,
    order_index: 6,
    modules: [],
  },
  {
    id: 'course-ts',
    slug: 'typescript-xavfsiz-kod',
    title: 'TypeScript: Ishonchli va Xavfsiz Kod',
    description: 'Turlar tizimi, Interfaces, Generics, Utility Types orqali xatolarsiz va kengaytiriladigan kod yozish mahorati.',
    thumbnail_url: 'https://images.unsplash.com/photo-1516116211227-bbc785b9b8b7?w=800&auto=format&fit=crop&q=80',
    difficulty: 'O\'rta',
    category: 'Frontend',
    is_published: true,
    total_lessons: 8,
    order_index: 7,
    modules: [],
  },
];

export const initialGuides: Guide[] = [
  {
    id: 'guide-html-intro',
    slug: 'html-kirish',
    category: 'HTML',
    title: 'HTML nima va u qanday ishlaydi?',
    description: 'Veb-saytning skeleti va semantik elementlar haqida umumiy tushuncha.',
    order_index: 1,
    content_markdown: `
# HTML ga Kirish

HTML (**HyperText Markup Language**) — bu veb-sahifalarning tuzilishini yaratish uchun ishlatiladigan standart belgilar tilidir. U brauzerga matn, rasm, havola yoki boshqa elementlarni qanday qilib ekranda ko‘rsatish kerakligini aytadi.

### Asosiy HTML hujjati strukturasi:

\`\`\`html
<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Astra Academy — Mening Birinchi Sahifam</title>
</head>
<body>
  <h1>Xush kelibsiz!</h1>
  <p>Ushbu sahifa Astra Academy yordamida yaratildi.</p>
</body>
</html>
\`\`\`

### Asosiy tushunchalar:
- **Teglar (Tags)**: Belgilash elementlari (masalan: \`<h1>\`, \`<p>\`). Ko‘pincha ochiluvchi va yopiluvchi teglardan iborat.
- **Element**: Ochilish tegi, uning ichidagi kontent va yopilish tegining yig‘indisi.
- **Atributlar (Attributes)**: Teglarga qo‘shimcha xususiyat beruvchi qiymatlar (masalan: \`src\`, \`href\`, \`alt\`).
`,
  },
  {
    id: 'guide-css-flexbox',
    slug: 'css-flexbox',
    category: 'CSS',
    title: 'CSS Flexbox Chuqur Tahlil',
    description: 'Elementlarni bir o‘lchamli tartibda oson va qulay joylashtirish mexanizmi.',
    order_index: 2,
    content_markdown: `
# CSS Flexbox Tizimi

**Flexbox (Flexible Box Layout)** — veb-elementlarni bir o‘lchamli yo‘nalishda (qator yoki ustun) joylashtirish, ularning o‘lchami va bo‘sh joyini oqilona taqsimlash uchun ishlatiladigan zamonaviy CSS texnologiyasidir.

### Flexbox konteynerini yaratish:

\`\`\`css
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  background-color: #070c18;
  padding: 1rem 2rem;
}
\`\`\`

### Asosiy Xususiyatlar:
- **\`justify-content\`**: Asosiy o‘q bo‘ylab elementlarni tekislash (\`flex-start\`, \`center\`, \`space-between\`, \`space-around\`).
- **\`align-items\`**: Ko‘ndalang o‘q bo‘yicha elementlarni vertikal tekislash (\`stretch\`, \`center\`, \`flex-start\`, \`flex-end\`).
- **\`flex-direction\`**: Yo‘nalishni belgilash (\`row\`, \`row-reverse\`, \`column\`, \`column-reverse\`).
- **\`gap\`**: Elementlar orasidagi masofa.
`,
  },
  {
    id: 'guide-js-async',
    slug: 'javascript-async-await',
    category: 'JavaScript',
    title: 'Asinxron JavaScript va Fetch API',
    description: 'Promises va async/await yordamida tashqi API lar bilan ishlash.',
    order_index: 3,
    content_markdown: `
# Asinxron JavaScript: Async/Await va Fetch

JavaScript bir oqimli (single-threaded) dasturlash tili bo‘lishiga qaramay, u **Event Loop** mexanizmi orqali serverdan ma’lumotlarni sahifani qotirib qo‘ymasdan yuklab olish imkonini beradi.

### Misol: Fetch yordamida ma’lumot olish:

\`\`\`javascript
async function loadUserData(userId) {
  try {
    const response = await fetch(\`https://api.astra.uz/users/\${userId}\`);
    if (!response.ok) {
      throw new Error("Tarmoq xatosi yoki foydalanuvchi topilmadi!");
    }
    const data = await response.json();
    console.log("Talaba ma'lumotlari:", data);
    return data;
  } catch (error) {
    console.error("Xatolik yuz berdi:", error.message);
  }
}
\`\`\`

### Nima uchun async/await?
- Kod sinxron kod kabi toza va o‘qishga juda qulay bo‘ladi.
- \`try...catch\` bloki orqali barcha xatoliklarni xavfsiz ushlash mumkin.
`,
  },
];

export const initialQuizzes: Quiz[] = [
  {
    id: 'quiz-html-1',
    course_id: 'course-html',
    title: 'HTML Asoslari bo‘yicha Sinov Testi',
    description: 'HTML5 ning boshlang‘ich teglari, sintaksisi va tuzilishi bo‘yicha bilimingizni sinab ko‘ring.',
    coin_reward: 20,
    xp_reward: 30,
    passing_score_percentage: 70,
    questions: [
      {
        id: 'q-h1',
        quiz_id: 'quiz-html-1',
        question_text: 'HTML qisqartmasining to‘liq kengaytmasi nima?',
        explanation: 'HTML — HyperText Markup Language so‘zlarining qisqartmasi bo‘lib, gipermatnli belgilash tili hisoblanadi.',
        options: [
          { id: 'opt-h1-1', text: 'HyperText Markup Language', is_correct: true },
          { id: 'opt-h1-2', text: 'High Tech Modern Language', is_correct: false },
          { id: 'opt-h1-3', text: 'Hyperlink Text Modular Logic', is_correct: false },
          { id: 'opt-h1-4', text: 'Home Tool Markup Language', is_correct: false },
        ],
      },
      {
        id: 'q-h2',
        quiz_id: 'quiz-html-1',
        question_text: 'Veb sahifada eng yuqori darajadagi asosiy sarlavha qaysi teg orqali yaratiladi?',
        explanation: '<h1> tegi sahifaning eng asosiy sarlavhasi bo‘lib, SEO uchun sahifada odatda 1 marta ishlatilishi tavsiya etiladi.',
        options: [
          { id: 'opt-h2-1', text: '<heading>', is_correct: false },
          { id: 'opt-h2-2', text: '<h6>', is_correct: false },
          { id: 'opt-h2-3', text: '<h1>', is_correct: true },
          { id: 'opt-h2-4', text: '<head>', is_correct: false },
        ],
      },
      {
        id: 'q-h3',
        quiz_id: 'quiz-html-1',
        question_text: 'Rasmlarga tavsif berish va agar rasm yuklanmasa ko‘rsatish uchun qaysi atribut ishlatiladi?',
        explanation: 'alt (alternative text) atributi rasm yuklanmay qolganda va ko‘zi ojizlar uchun ekran o‘quvchi dasturlarda o‘qib beriladi.',
        options: [
          { id: 'opt-h3-1', text: 'title', is_correct: false },
          { id: 'opt-h3-2', text: 'alt', is_correct: true },
          { id: 'opt-h3-3', text: 'description', is_correct: false },
          { id: 'opt-h3-4', text: 'src', is_correct: false },
        ],
      },
    ],
  },
  {
    id: 'quiz-css-1',
    course_id: 'course-css',
    title: 'CSS Flexbox va Box Model Testi',
    description: 'CSS elementlarining joylashuvi, margin, padding va Flexbox qoidalari bo‘yicha viktorina.',
    coin_reward: 25,
    xp_reward: 35,
    passing_score_percentage: 70,
    questions: [
      {
        id: 'q-c1',
        quiz_id: 'quiz-css-1',
        question_text: 'CSS’da konteynerni Flexbox rejimiga o‘tkazish uchun qaysi property qiymati yoziladi?',
        explanation: 'display: flex; qoidasi elementni flex konteyneriga aylantiradi va uning bolalarini boshqarish imkonini beradi.',
        options: [
          { id: 'opt-c1-1', text: 'position: flex;', is_correct: false },
          { id: 'opt-c1-2', text: 'display: flex;', is_correct: true },
          { id: 'opt-c1-3', text: 'flex-direction: row;', is_correct: false },
          { id: 'opt-c1-4', text: 'layout: flexbox;', is_correct: false },
        ],
      },
      {
        id: 'q-c2',
        quiz_id: 'quiz-css-1',
        question_text: 'Flexbox konteyneridagi elementlarni gorizontal o‘q bo‘yicha markazga joylashtirish uchun qaysi xususiyat kerak?',
        explanation: 'justify-content: center; asosiy o‘q (main axis) bo‘yicha elementlarni markazlashtiradi.',
        options: [
          { id: 'opt-c2-1', text: 'justify-content: center;', is_correct: true },
          { id: 'opt-c2-2', text: 'align-items: middle;', is_correct: false },
          { id: 'opt-c2-3', text: 'text-align: center;', is_correct: false },
          { id: 'opt-c2-4', text: 'float: center;', is_correct: false },
        ],
      },
    ],
  },
  {
    id: 'quiz-js-1',
    course_id: 'course-js',
    title: 'JavaScript O‘zgaruvchilar va Turlar',
    description: 'let, const, var farqlari va ma’lumot turlari bo‘yicha test.',
    coin_reward: 20,
    xp_reward: 30,
    passing_score_percentage: 70,
    questions: [
      {
        id: 'q-j1',
        quiz_id: 'quiz-js-1',
        question_text: 'Qayta o‘zgartirib bo‘lmaydigan (o‘zgarmas) qiymat e’lon qilish uchun qaysi kalit so‘z ishlatiladi?',
        explanation: 'const kalit so‘zi o‘zgarmas o‘zgaruvchilarni e’lon qilish uchun xizmat qiladi.',
        options: [
          { id: 'opt-j1-1', text: 'let', is_correct: false },
          { id: 'opt-j1-2', text: 'var', is_correct: false },
          { id: 'opt-j1-3', text: 'const', is_correct: true },
          { id: 'opt-j1-4', text: 'static', is_correct: false },
        ],
      },
    ],
  },
];

export const initialPracticalTasks: PracticalTask[] = [
  {
    id: 'task-1',
    title: 'CSS Flexbox Moslashuvchan Navbar',
    description: 'Flexbox yordamida zamonaviy, qorong‘i uslubdagi va mobil qurilmalarga moslashuvchi navigatsiya panelini yarating.',
    requirements: [
      'Astra Academy logotipi chap tomonda joylashishi kerak',
      'O‘ng tomonda havolalar ro‘yxati (Bosh sahifa, Kurslar, Qo‘llanma) bo‘lsin',
      'Havolalar ustiga sichqoncha kelganda (hover) yorqin ko‘k (#00d2ff) neon effekt hosil bo‘lsin',
      'justify-content: space-between va align-items: center qo‘llansin',
    ],
    starter_code: `<!-- HTML -->
<nav class="astra-nav">
  <div class="logo">⚡ ASTRA</div>
  <ul class="nav-links">
    <li><a href="#">Bosh sahifa</a></li>
    <li><a href="#">Kurslar</a></li>
    <li><a href="#">Qo‘llanma</a></li>
  </ul>
</nav>

<!-- CSS -->
<style>
  .astra-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #0b1326;
    padding: 1rem 2rem;
    border-radius: 8px;
    border: 1px solid rgba(56, 189, 248, 0.2);
  }
  .nav-links {
    display: flex;
    gap: 20px;
    list-style: none;
  }
  .nav-links a {
    color: #e2e8f0;
    text-decoration: none;
    transition: color 0.3s;
  }
  .nav-links a:hover {
    color: #00d2ff;
  }
</style>`,
    difficulty: 'Boshlang\'ich',
    coin_reward: 50,
    xp_reward: 60,
    is_completed: true,
  },
  {
    id: 'task-2',
    title: 'JavaScript Dinamik Modal Oynasi',
    description: 'Tugma bosilganda animatsiya bilan ochiluvchi va "Yopish" tugmasi yoki fon bosilganda yopiluvchi dialog oyna yarating.',
    requirements: [
      'Ochish tugmasi va yopish ikonkasi bo‘lsin',
      'classList.toggle() yoki add/remove metodlaridan foydalaning',
      'ESC tugmasi bosilganda ham oyna yopilsin',
    ],
    starter_code: `<button id="openModalBtn">Oynani ochish</button>
<div id="modal" class="hidden">
  <div class="modal-content">
    <p>Astra Academy xabari!</p>
    <button id="closeModalBtn">Yopish</button>
  </div>
</div>`,
    difficulty: 'O\'rta',
    coin_reward: 60,
    xp_reward: 70,
    is_completed: false,
  },
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    slug: 'portfolio-landing-page',
    title: 'Zamonaviy IT Portfolio Veb-sayti',
    description: 'Dasturchi sifatida o‘z tajribangiz, loyihalaringiz va ko‘nikmalaringizni namoyish qiluvchi premium darajadagi portfolio yarating.',
    difficulty: 'Boshlang\'ich',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive'],
    requirements: [
      'Hero banner va ta’sirchan sarlavha',
      'Ko‘nikmalar (Skills) va loyihalar kartalari',
      'Aloqa formasi (Validatsiya bilan)',
      'Mobil va planshet versiyalarga 100% moslashuvchanlik',
    ],
    youtube_tutorial_id: 'ldwlOzRvYOU',
    starter_files_url: 'https://github.com/astra-academy/portfolio-starter',
    coin_reward: 100,
    xp_reward: 150,
    is_completed: true,
    github_url: 'https://github.com/ali-valiyev/my-portfolio',
    live_url: 'https://ali-valiyev-portfolio.vercel.app',
  },
  {
    id: 'proj-2',
    slug: 'todo-app-pro',
    title: 'Interaktiv Todo App (Vazifalar Menejeri)',
    description: 'LocalStorage orqali ma’lumotlarni saqlovchi, filtrlash (barchasi, bajarilgan, faol) imkoniyatiga ega qulay ilova.',
    difficulty: 'Boshlang\'ich',
    technologies: ['JavaScript', 'DOM', 'LocalStorage', 'CSS Grid'],
    requirements: [
      'Yangi vazifa qo‘shish va o‘chirish',
      'Bajarilgan deb belgilash (Checkmark)',
      'Sahifa yangilanganda ham saqlanib qolish (LocalStorage)',
      'Statistika (Masalan: 3 tadan 2 tasi bajarildi)',
    ],
    youtube_tutorial_id: 'G0jO8kUrg-I',
    starter_files_url: 'https://github.com/astra-academy/todo-starter',
    coin_reward: 100,
    xp_reward: 150,
    is_completed: false,
  },
  {
    id: 'proj-3',
    slug: 'ob-havo-ilovasi',
    title: 'Ob-havo Qidiruv Ilovasi (Weather App)',
    description: 'OpenWeatherMap API orqali dunyoning istalgan shahridagi harorat, shamol tezligi va namlikni aniq ko‘rsatuvchi dastur.',
    difficulty: 'O\'rta',
    technologies: ['JavaScript', 'Fetch API', 'Async/Await', 'JSON'],
    requirements: [
      'Shahar nomi bo‘yicha qidiruv',
      'API dan real vaqt rejimida ma’lumot yuklash',
      'Yuklanish holati (Spinner) va xatoliklar (Shahar topilmadi)',
      'Havo haroratiga mos dinamik fon rasmlari',
    ],
    youtube_tutorial_id: 'MIYQR-Ybrn4',
    coin_reward: 120,
    xp_reward: 180,
    is_completed: false,
  },
  {
    id: 'proj-4',
    slug: 'kalkulyator-web',
    title: 'Zamonaviy Ilmiy Web Kalkulyator',
    description: 'Arifmetik amallarni aniq bajaruvchi, chiroyli dizayn va klaviatura yordamida boshqarish imkoniyatiga ega kalkulyator.',
    difficulty: 'Boshlang\'ich',
    technologies: ['HTML', 'CSS Flexbox', 'JavaScript Logic'],
    requirements: [
      'Asosiy arifmetik amallar (+, -, *, /)',
      'Natijani xotirada tozalash (Clear / AC)',
      'Klaviatura tugmalari orqali kiritish',
    ],
    youtube_tutorial_id: 'QS6Y0ezhyCs',
    coin_reward: 80,
    xp_reward: 120,
    is_completed: false,
  },
  {
    id: 'proj-5',
    slug: 'movie-search-app',
    title: 'Kinolar Qidirish Platformasi (Movie App)',
    description: 'TMDB API bilan integratsiya qilingan, mashhur filmlar reytingi va treylerlarini ko‘rsatuvchi interaktiv portal.',
    difficulty: 'O\'rta',
    technologies: ['React', 'Tailwind CSS', 'API Integration'],
    requirements: [
      'Janrlar bo‘yicha filtrlash',
      'Qidiruv satri (Debounce bilan)',
      'Film kartasi ustiga bosilganda batafsil modal oyna',
    ],
    youtube_tutorial_id: 'b9eMGE7QtTk',
    coin_reward: 150,
    xp_reward: 220,
    is_completed: false,
  },
  {
    id: 'proj-6',
    slug: 'ecommerce-store',
    title: 'E-commerce Onlayn Do‘kon Interfeysi',
    description: 'Mahsulotlar katalogi, xarid savatchasi (Cart), narxlar hisobi va buyurtma berish formasiga ega to‘liq do‘kon.',
    difficulty: 'Murakkab',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand'],
    requirements: [
      'Savatchaga qo‘shish va sonini o‘zgartirish',
      'Jami summani avtomatik hisoblash',
      'Filtrlar (kategoriya va narx oralig‘i)',
    ],
    youtube_tutorial_id: 'A7go0wFqBqA',
    coin_reward: 200,
    xp_reward: 300,
    is_completed: false,
  },
];

export const initialAchievements: Achievement[] = [
  {
    id: 'ach-1',
    code: 'FIRST_LESSON',
    title: 'Birinchi Dars',
    description: 'Ilk darsingizni muvaffaqiyatli yakunladingiz!',
    icon: '🎯',
    requirement_count: 1,
    current_count: 1,
    reward_coins: 20,
    reward_xp: 30,
    is_unlocked: true,
  },
  {
    id: 'ach-2',
    code: 'LESSONS_10',
    title: 'Bilimdon Qadam',
    description: '10 ta darsni muvaffaqiyatli tugatdingiz.',
    icon: '📚',
    requirement_count: 10,
    current_count: 5,
    reward_coins: 50,
    reward_xp: 80,
    is_unlocked: false,
  },
  {
    id: 'ach-3',
    code: 'FIRST_QUIZ',
    title: 'Ilk Sinov',
    description: 'Birinchi testdan muvaffaqiyatli o‘tdingiz!',
    icon: '🧪',
    requirement_count: 1,
    current_count: 1,
    reward_coins: 20,
    reward_xp: 30,
    is_unlocked: true,
  },
  {
    id: 'ach-4',
    code: 'FIRST_PROJECT',
    title: 'Katta Loyiha',
    description: 'Ilk amaliy loyihangizni to‘liq topshirdingiz!',
    icon: '🚀',
    requirement_count: 1,
    current_count: 1,
    reward_coins: 100,
    reward_xp: 150,
    is_unlocked: true,
  },
  {
    id: 'ach-5',
    code: 'STREAK_7',
    title: 'O‘chmas Olov',
    description: '7 kun davomida har kuni uzluksiz ta’lim oldingiz.',
    icon: '🔥',
    requirement_count: 7,
    current_count: 7,
    reward_coins: 50,
    reward_xp: 100,
    is_unlocked: true,
  },
  {
    id: 'ach-6',
    code: 'QUIZ_MASTER',
    title: 'Test Ustasi',
    description: '5 ta testdan a’lo baho bilan o‘tdingiz.',
    icon: '🧠',
    requirement_count: 5,
    current_count: 2,
    reward_coins: 60,
    reward_xp: 90,
    is_unlocked: false,
  },
];

export const initialTransactions: CoinTransaction[] = [
  {
    id: 'tx-1',
    user_id: 'usr-student-01',
    amount: 50,
    category: 'bonus',
    description: 'Astra Academyga a’zo bo‘lganingiz uchun xush kelibsiz bonusi',
    created_at: '2026-09-01T08:00:00Z',
  },
  {
    id: 'tx-2',
    user_id: 'usr-student-01',
    amount: 20,
    category: 'lesson',
    description: '"HTML nima? Veb qanday ishlaydi?" darsini tugatdingiz',
    created_at: '2026-09-02T10:15:00Z',
  },
  {
    id: 'tx-3',
    user_id: 'usr-student-01',
    amount: 20,
    category: 'quiz',
    description: 'HTML Asoslari testidan 100% natija oldingiz',
    created_at: '2026-09-03T14:20:00Z',
  },
  {
    id: 'tx-4',
    user_id: 'usr-student-01',
    amount: 50,
    category: 'task',
    description: '"CSS Flexbox Navbar" amaliy topshirig‘ini bajardingiz',
    created_at: '2026-09-05T18:30:00Z',
  },
  {
    id: 'tx-5',
    user_id: 'usr-student-01',
    amount: 100,
    category: 'project',
    description: '"Zamonaviy IT Portfolio" loyihasini muvaffaqiyatli topshirdingiz',
    created_at: '2026-09-10T16:00:00Z',
  },
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    user_id: 'usr-student-01',
    title: 'Yangi kurs qo‘shildi! 🚀',
    message: '"Next.js: To‘liq Full-Stack" kursi platformaga joylandi. Hoziroq o‘rganishni boshlang!',
    type: 'course',
    is_read: false,
    created_at: '2026-09-15T09:00:00Z',
  },
  {
    id: 'notif-2',
    user_id: 'usr-student-01',
    title: 'Tabriklaymiz! Yangi daraja ⭐',
    message: 'Siz "Explorer (Daraja 3)" pog‘onasiga muvaffaqiyatli ko‘tarildingiz!',
    type: 'achievement',
    is_read: false,
    created_at: '2026-09-10T16:05:00Z',
  },
  {
    id: 'notif-3',
    user_id: 'usr-student-01',
    title: '+100 Coin hisobingizga tushdi 🪙',
    message: 'IT Portfolio loyihasi topshirilgani uchun sizga 100 coin berildi.',
    type: 'reward',
    is_read: true,
    created_at: '2026-09-10T16:01:00Z',
  },
];

export const initialLeaderboard: LeaderboardUser[] = [
  { id: 'u1', name: 'Ali Valiyev', xp: 720, coins: 240, level: 3, rank: 1 },
  { id: 'u2', name: 'Madina Karimova', xp: 680, coins: 210, level: 3, rank: 2 },
  { id: 'u3', name: 'Javohir Toshmatov', xp: 540, coins: 180, level: 3, rank: 3 },
  { id: 'u4', name: 'Sardor Rahimqulov', xp: 420, coins: 140, level: 2, rank: 4 },
  { id: 'u5', name: 'Nodira Yusupova', xp: 390, coins: 130, level: 2, rank: 5 },
  { id: 'u6', name: 'Bobur Mirzayev', xp: 280, coins: 90, level: 2, rank: 6 },
  { id: 'u7', name: 'Shahzod Ergashev', xp: 190, coins: 60, level: 1, rank: 7 },
];
