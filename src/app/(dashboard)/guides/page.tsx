'use client';

import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  ChevronRight,
  BookOpen,
  Info,
  AlertTriangle,
  Lightbulb,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { CodeBlock } from '@/components/ui/CodeBlock';

interface GuideDoc {
  id: string;
  category: 'HTML' | 'CSS' | 'JavaScript';
  title: string;
  slug: string;
  excerpt: string;
  content: {
    heading: string;
    intro: string;
    codeExample: {
      title: string;
      language: string;
      code: string;
    };
    explanation: string;
    keyPoints: string[];
    tip?: string;
  };
}

const guideDocs: GuideDoc[] = [
  // HTML Docs
  {
    id: 'html-intro',
    category: 'HTML',
    title: 'HTML ga Kirish',
    slug: 'kirish',
    excerpt: 'HTML nima, uning vazifasi va brauzer qanday qilib veb-sahifalarni aks ettirishi haqida.',
    content: {
      heading: 'HTML nima va u qanday ishlaydi?',
      intro:
        'HTML (HyperText Markup Language) — bu veb-sahifalarning tayanch skeletini yaratish uchun ishlatiladigan standart belgilash tilidir. Brauzerlar HTML kodini o‘qib, uni biz ko‘radigan matn, rasm, tugma va jadvallarga aylantiradi.',
      codeExample: {
        title: 'Asosiy HTML5 Hujjati Strukturasi',
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Astra Academy — HTML Darsi</title>
</head>
<body>
  <header>
    <h1>Xush kelibsiz!</h1>
    <p>Astra Academy dasturlash akademiyasi.</p>
  </header>
</body>
</html>`,
      },
      explanation:
        '<!DOCTYPE html> — brauzerga ushbu hujjat zamonaviy HTML5 standartida ekanligini bildiradi. <html> barcha elementlarning ildiz konteyneri, <head> sahifa haqidagi metama’lumotlar (sarlavha, shriftlar, kodlash), <body> esa foydalanuvchi ekranda ko‘radigan butun asosiy qismdir.',
      keyPoints: [
        'HTML dasturlash tili emas, balki belgilash (markup) tilidir.',
        'Har bir element ochiluvchi <teg> va yopiluvchi </teg> teglardan iborat bo‘ladi.',
        'Metama’lumotlar <head> ichida saqlanadi va bevosita sahifada ko‘rinmaydi.',
      ],
      tip: 'Har doim <html lang="uz"> orqali sahifa tilini ko‘rsating, bu SEO va ekran o‘quvchilar uchun juda muhim.',
    },
  },
  {
    id: 'html-elements',
    category: 'HTML',
    title: 'Elementlar va Teglar',
    slug: 'elementlar',
    excerpt: 'Blok va qator (inline) elementlar, semantik teglar.',
    content: {
      heading: 'Blok (Block) va Qator (Inline) Elementlar',
      intro:
        'HTML elementlari ko‘rinishiga ko‘ra ikki guruhga bo‘linadi: Blok elementlar butun satr bo‘ylab cho‘ziladi va yangi qatordan boshlanadi (masalan: <div>, <h1>, <p>). Inline elementlar faqat o‘z matni kengligida joy oladi (masalan: <span>, <a>, <strong>).',
      codeExample: {
        title: 'Blok va Inline Misoli',
        language: 'html',
        code: `<div class="card">
  <h2>Blok Sarlavha</h2>
  <p>Bu matn ichida <strong>muhim so‘z</strong> va <a href="#">havola</a> mavjud.</p>
</div>`,
      },
      explanation:
        '<div> va <h2> yangi satr yaratadi, <strong> va <a> esa paragraf matni ichida yonma-yon davom etadi.',
      keyPoints: [
        'Blok elementlar kengligi odatda ota elementning 100% ini egallaydi.',
        'Inline elementlarga odatiy width va height o‘lchamlarini berib bo‘lmaydi (display: inline-block kerak).',
      ],
    },
  },
  {
    id: 'html-forms',
    category: 'HTML',
    title: 'Formalar va Inputlar',
    slug: 'formlar',
    excerpt: 'Foydalanuvchi ma’lumotlarini qabul qilish va validatsiya.',
    content: {
      heading: 'HTML Formalari bilan Ishlash',
      intro:
        'Formalar foydalanuvchidan email, parol, xabar yoki boshqa ma’lumotlarni yig‘ib, serverga yuborish uchun xizmat qiladi.',
      codeExample: {
        title: 'Kirish Formasi',
        language: 'html',
        code: `<form action="/login" method="POST">
  <label for="user-email">Email manzilingiz:</label>
  <input type="email" id="user-email" name="email" required placeholder="nom@domain.uz">

  <label for="user-pass">Parol:</label>
  <input type="password" id="user-pass" name="password" required minlength="8">

  <button type="submit">Kirish</button>
</form>`,
      },
      explanation:
        'required atributi kiritish majburiy ekanligini bildiradi. input type="email" esa email formati to‘g‘ri kiritilganligini brauzer darajasida avtomatik tekshiradi.',
      keyPoints: [
        'Har doim <label> tegi bilan tegishli inputni bog‘lang (for va id orqali).',
        'type="password" kiritilgan belgilarni nuqtalar ko‘rinishida yashiradi.',
      ],
    },
  },

  // CSS Docs
  {
    id: 'css-flexbox',
    category: 'CSS',
    title: 'Flexbox Layout',
    slug: 'flexbox',
    excerpt: 'Elementlarni 1 o‘lchamli yo‘nalishda oson va aniq boshqarish tizimi.',
    content: {
      heading: 'Flexbox Nima va U Qanday Ishlatiladi?',
      intro:
        'Flexbox — elementlarni bir o‘lchamli yo‘nalishda (satr yoki ustun bo‘ylab) joylashtirish va ularning o‘lchami hamda holatini boshqarish uchun ishlatiladigan CSS layout tizimidir.',
      codeExample: {
        title: 'Flexbox Konteyneri',
        language: 'css',
        code: `.navigation-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  background-color: #070c18;
  padding: 16px 24px;
}

.navigation-links {
  display: flex;
  gap: 16px;
  list-style: none;
}`,
      },
      explanation:
        'display: flex orqali .navigation-bar flex-konteynerga aylanadi. justify-content: space-between birinchi va oxirgi elementni chekkaga suradi, qolgan elementlar orasida esa teng masofa hosil qiladi.',
      keyPoints: [
        'justify-content asosiy o‘q (main axis) bo‘yicha elementlarni tekislaydi.',
        'align-items ko‘ndalang o‘q (cross axis) bo‘yicha tekislaydi.',
        'gap xususiyati elementlar orasiga oson marja beradi.',
      ],
      tip: 'Flexbox bir qatorli elementlar (navbar, kartalar ro‘yxati) uchun eng yaxshi yechimdir.',
    },
  },
  {
    id: 'css-grid',
    category: 'CSS',
    title: 'CSS Grid Tizimi',
    slug: 'grid',
    excerpt: 'Ikki o‘lchamli (ustun va qatorlar) murakkab veb maketlari.',
    content: {
      heading: 'CSS Grid Bilan Murakkab Maketlar',
      intro:
        'CSS Grid — 2 o‘lchamli (satrlar va ustunlar bo‘yicha) to‘liq tartibni ta’minlovchi eng qudratli CSS tizimidir.',
      codeExample: {
        title: 'Moslashuvchan Grid Maketi',
        language: 'css',
        code: `.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}`,
      },
      explanation:
        'repeat(auto-fit, minmax(280px, 1fr)) qoidasi har qanday ekranda kartalarni avtomatik moslashtiradi: agar joy yetarli bo‘lsa 3-4 ustun, kichik ekranda esa 1 ustunga aylanadi.',
      keyPoints: [
        'Flexbox 1 o‘lchamli, Grid esa 2 o‘lchamli maketlar uchun mo‘ljallangan.',
        'fr birligi bo‘sh joyning ma’lum bir ulushini (fraction) ifodalaydi.',
      ],
    },
  },

  // JavaScript Docs
  {
    id: 'js-variables',
    category: 'JavaScript',
    title: 'O‘zgaruvchilar va Turlar',
    slug: 'variables',
    excerpt: 'let, const, primitive turlar va xotira boshqaruvi.',
    content: {
      heading: 'JavaScript O‘zgaruvchilari: let vs const',
      intro:
        'Zamonaviy JavaScriptda (ES6+) o‘zgaruvchilarni e’lon qilish uchun let va const kalit so‘zlaridan foydalaniladi. Eski var dan foydalanish tavsiya etilmaydi.',
      codeExample: {
        title: 'O‘zgaruvchilar va Ma’lumot Turlari',
        language: 'javascript',
        code: `// O'zgarmas qiymat (const)
const academyName = "Astra Academy";
const maxCoinReward = 100;

// O'zgarishi mumkin bo'lgan qiymat (let)
let currentScore = 80;
currentScore += 20;

console.log(\`\${academyName} talabasi balli: \${currentScore}\`);`,
      },
      explanation:
        'const qiymati qayta tayinlanmaydi (reassign). Obyektlar yoki massivlar const bo‘lsa ham, ularning ichki xususiyatlarini o‘zgartirish mumkin.',
      keyPoints: [
        'Dasturlashda doim birinchi tanlov sifatida const dan foydalaning.',
        'Faqatgina qiymat keyinchalik o‘zgarishi aniq bo‘lgandagina let ishlating.',
      ],
    },
  },
  {
    id: 'js-async',
    category: 'JavaScript',
    title: 'Asinxron JS va Fetch API',
    slug: 'async',
    excerpt: 'Serverdan ma’lumotlarni yuklash, async/await va xatoliklarni ushlash.',
    content: {
      heading: 'Asinxron Dasturlash va Fetch API',
      intro:
        'Veb sahifa muzlab qolmasligi uchun tashqi serverlardan ma’lumot olish jarayoni asinxron bajariladi.',
      codeExample: {
        title: 'Async / Await bilan Ma’lumot Yuklash',
        language: 'javascript',
        code: `async function fetchCourses() {
  try {
    const response = await fetch('https://api.astra.uz/courses');
    if (!response.ok) {
      throw new Error('Tarmoq xatosi yoki server javob bermadi');
    }
    const courses = await response.json();
    return courses;
  } catch (error) {
    console.error('Xatolik yuz berdi:', error.message);
  }
}`,
      },
      explanation:
        'await buyrug‘i Promise natijasi kelguniga qadar kutadi, lekin asosiy brauzer jarayonini to‘xtatib qo‘ymaydi. try...catch orqali esa yuzaga kelishi mumkin bo‘lgan tarmoq xatoliklari ushlanadi.',
      keyPoints: [
        'async funksiya doimo Promise qaytaradi.',
        'Tarmoq so‘rovlarida har doim response.ok holatini tekshirish zarur.',
      ],
    },
  },
];

export default function GuidesPage() {
  const [selectedCategory, setSelectedCategory] = useState<'HTML' | 'CSS' | 'JavaScript'>('HTML');
  const [selectedDocId, setSelectedDocId] = useState('html-intro');

  const categories: ('HTML' | 'CSS' | 'JavaScript')[] = ['HTML', 'CSS', 'JavaScript'];

  const categoryDocs = guideDocs.filter((d) => d.category === selectedCategory);
  const currentDoc = guideDocs.find((d) => d.id === selectedDocId) || categoryDocs[0];

  const currentDocIndex = categoryDocs.findIndex((d) => d.id === currentDoc.id);
  const prevDoc = currentDocIndex > 0 ? categoryDocs[currentDocIndex - 1] : null;
  const nextDoc =
    currentDocIndex < categoryDocs.length - 1 ? categoryDocs[currentDocIndex + 1] : null;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Astra Academy Qo‘llanmasi</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Dasturlash Bo‘yicha To‘liq Qo‘llanma
        </h1>
        <p className="text-sm text-slate-300 mt-1 max-w-2xl">
          HTML, CSS va JavaScript bo‘yicha nazariy va amaliy ma’lumotlar, kod namunalari va professional maslahatlar.
        </p>
      </div>

      {/* Main Documentation Layout: Sidebar on Left, Content on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Documentation Navigation */}
        <div className="lg:col-span-1 space-y-6">
          {/* Category Tabs */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  const firstInCat = guideDocs.find((d) => d.category === cat);
                  if (firstInCat) setSelectedDocId(firstInCat.id);
                }}
                className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-between transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 shadow-glow-sm'
                    : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <span>{cat} Qo‘llanmasi</span>
                <ChevronRight className="w-4 h-4 hidden lg:inline" />
              </button>
            ))}
          </div>

          {/* Topics List */}
          <div className="glass-panel p-4 rounded-3xl border border-slate-800 space-y-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase px-2 mb-2 tracking-wider">
              {selectedCategory} Mavzulari
            </h3>
            {categoryDocs.map((doc) => {
              const isSelected = doc.id === currentDoc.id;

              return (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <span className="truncate">{doc.title}</span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-glow-sm flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Documentation Article Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-6">
            {/* Article Heading */}
            <div className="border-b border-slate-800 pb-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                  {currentDoc.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  docs / {currentDoc.category.toLowerCase()} / {currentDoc.slug}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {currentDoc.content.heading}
              </h2>
            </div>

            {/* Introduction */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {currentDoc.content.intro}
            </p>

            {/* Code Block with Copy Button */}
            <CodeBlock
              title={currentDoc.content.codeExample.title}
              language={currentDoc.content.codeExample.language}
              code={currentDoc.content.codeExample.code}
            />

            {/* Code Explanation */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400" />
                Kod Tahlili va Tushuntirish
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {currentDoc.content.explanation}
              </p>
            </div>

            {/* Key Takeaways */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Asosiy Qoidalar:
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {currentDoc.content.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tip Box */}
            {currentDoc.content.tip && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-cyan-200 leading-relaxed">
                  <strong className="text-cyan-300 font-semibold block mb-0.5">
                    Foydali Maslahat:
                  </strong>
                  {currentDoc.content.tip}
                </div>
              </div>
            )}

            {/* Next / Previous Article Navigation */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
              {prevDoc ? (
                <button
                  onClick={() => setSelectedDocId(prevDoc.id)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white border border-slate-800 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Oldingi: {prevDoc.title}</span>
                  <span className="sm:hidden">Oldingi</span>
                </button>
              ) : (
                <div />
              )}

              {nextDoc && (
                <button
                  onClick={() => setSelectedDocId(nextDoc.id)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-xs font-semibold text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 transition-all"
                >
                  <span className="hidden sm:inline">Keyingi: {nextDoc.title}</span>
                  <span className="sm:hidden">Keyingi</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
