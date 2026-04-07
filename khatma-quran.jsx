import { useState, useEffect, useCallback } from "react";

const SURAHS = [
  {n:1,name:"الفاتحة",verses:7,type:"مكية",juz:1},{n:2,name:"البقرة",verses:286,type:"مدنية",juz:1},
  {n:3,name:"آل عمران",verses:200,type:"مدنية",juz:3},{n:4,name:"النساء",verses:176,type:"مدنية",juz:4},
  {n:5,name:"المائدة",verses:120,type:"مدنية",juz:6},{n:6,name:"الأنعام",verses:165,type:"مكية",juz:7},
  {n:7,name:"الأعراف",verses:206,type:"مكية",juz:8},{n:8,name:"الأنفال",verses:75,type:"مدنية",juz:9},
  {n:9,name:"التوبة",verses:129,type:"مدنية",juz:10},{n:10,name:"يونس",verses:109,type:"مكية",juz:11},
  {n:11,name:"هود",verses:123,type:"مكية",juz:11},{n:12,name:"يوسف",verses:111,type:"مكية",juz:12},
  {n:13,name:"الرعد",verses:43,type:"مدنية",juz:13},{n:14,name:"إبراهيم",verses:52,type:"مكية",juz:13},
  {n:15,name:"الحجر",verses:99,type:"مكية",juz:14},{n:16,name:"النحل",verses:128,type:"مكية",juz:14},
  {n:17,name:"الإسراء",verses:111,type:"مكية",juz:15},{n:18,name:"الكهف",verses:110,type:"مكية",juz:15},
  {n:19,name:"مريم",verses:98,type:"مكية",juz:16},{n:20,name:"طه",verses:135,type:"مكية",juz:16},
  {n:21,name:"الأنبياء",verses:112,type:"مكية",juz:17},{n:22,name:"الحج",verses:78,type:"مدنية",juz:17},
  {n:23,name:"المؤمنون",verses:118,type:"مكية",juz:18},{n:24,name:"النور",verses:64,type:"مدنية",juz:18},
  {n:25,name:"الفرقان",verses:77,type:"مكية",juz:18},{n:26,name:"الشعراء",verses:227,type:"مكية",juz:19},
  {n:27,name:"النمل",verses:93,type:"مكية",juz:19},{n:28,name:"القصص",verses:88,type:"مكية",juz:20},
  {n:29,name:"العنكبوت",verses:69,type:"مكية",juz:20},{n:30,name:"الروم",verses:60,type:"مكية",juz:21},
  {n:31,name:"لقمان",verses:34,type:"مكية",juz:21},{n:32,name:"السجدة",verses:30,type:"مكية",juz:21},
  {n:33,name:"الأحزاب",verses:73,type:"مدنية",juz:21},{n:34,name:"سبأ",verses:54,type:"مكية",juz:22},
  {n:35,name:"فاطر",verses:45,type:"مكية",juz:22},{n:36,name:"يس",verses:83,type:"مكية",juz:22},
  {n:37,name:"الصافات",verses:182,type:"مكية",juz:23},{n:38,name:"ص",verses:88,type:"مكية",juz:23},
  {n:39,name:"الزمر",verses:75,type:"مكية",juz:23},{n:40,name:"غافر",verses:85,type:"مكية",juz:24},
  {n:41,name:"فصلت",verses:54,type:"مكية",juz:24},{n:42,name:"الشورى",verses:53,type:"مكية",juz:25},
  {n:43,name:"الزخرف",verses:89,type:"مكية",juz:25},{n:44,name:"الدخان",verses:59,type:"مكية",juz:25},
  {n:45,name:"الجاثية",verses:37,type:"مكية",juz:25},{n:46,name:"الأحقاف",verses:35,type:"مكية",juz:26},
  {n:47,name:"محمد",verses:38,type:"مدنية",juz:26},{n:48,name:"الفتح",verses:29,type:"مدنية",juz:26},
  {n:49,name:"الحجرات",verses:18,type:"مدنية",juz:26},{n:50,name:"ق",verses:45,type:"مكية",juz:26},
  {n:51,name:"الذاريات",verses:60,type:"مكية",juz:26},{n:52,name:"الطور",verses:49,type:"مكية",juz:27},
  {n:53,name:"النجم",verses:62,type:"مكية",juz:27},{n:54,name:"القمر",verses:55,type:"مكية",juz:27},
  {n:55,name:"الرحمن",verses:78,type:"مدنية",juz:27},{n:56,name:"الواقعة",verses:96,type:"مكية",juz:27},
  {n:57,name:"الحديد",verses:29,type:"مدنية",juz:27},{n:58,name:"المجادلة",verses:22,type:"مدنية",juz:28},
  {n:59,name:"الحشر",verses:24,type:"مدنية",juz:28},{n:60,name:"الممتحنة",verses:13,type:"مدنية",juz:28},
  {n:61,name:"الصف",verses:14,type:"مدنية",juz:28},{n:62,name:"الجمعة",verses:11,type:"مدنية",juz:28},
  {n:63,name:"المنافقون",verses:11,type:"مدنية",juz:28},{n:64,name:"التغابن",verses:18,type:"مدنية",juz:28},
  {n:65,name:"الطلاق",verses:12,type:"مدنية",juz:28},{n:66,name:"التحريم",verses:12,type:"مدنية",juz:28},
  {n:67,name:"الملك",verses:30,type:"مكية",juz:29},{n:68,name:"القلم",verses:52,type:"مكية",juz:29},
  {n:69,name:"الحاقة",verses:52,type:"مكية",juz:29},{n:70,name:"المعارج",verses:44,type:"مكية",juz:29},
  {n:71,name:"نوح",verses:28,type:"مكية",juz:29},{n:72,name:"الجن",verses:28,type:"مكية",juz:29},
  {n:73,name:"المزمل",verses:20,type:"مكية",juz:29},{n:74,name:"المدثر",verses:56,type:"مكية",juz:29},
  {n:75,name:"القيامة",verses:40,type:"مكية",juz:29},{n:76,name:"الإنسان",verses:31,type:"مدنية",juz:29},
  {n:77,name:"المرسلات",verses:50,type:"مكية",juz:29},{n:78,name:"النبأ",verses:40,type:"مكية",juz:30},
  {n:79,name:"النازعات",verses:46,type:"مكية",juz:30},{n:80,name:"عبس",verses:42,type:"مكية",juz:30},
  {n:81,name:"التكوير",verses:29,type:"مكية",juz:30},{n:82,name:"الانفطار",verses:19,type:"مكية",juz:30},
  {n:83,name:"المطففين",verses:36,type:"مكية",juz:30},{n:84,name:"الانشقاق",verses:25,type:"مكية",juz:30},
  {n:85,name:"البروج",verses:22,type:"مكية",juz:30},{n:86,name:"الطارق",verses:17,type:"مكية",juz:30},
  {n:87,name:"الأعلى",verses:19,type:"مكية",juz:30},{n:88,name:"الغاشية",verses:26,type:"مكية",juz:30},
  {n:89,name:"الفجر",verses:30,type:"مكية",juz:30},{n:90,name:"البلد",verses:20,type:"مكية",juz:30},
  {n:91,name:"الشمس",verses:15,type:"مكية",juz:30},{n:92,name:"الليل",verses:21,type:"مكية",juz:30},
  {n:93,name:"الضحى",verses:11,type:"مكية",juz:30},{n:94,name:"الشرح",verses:8,type:"مكية",juz:30},
  {n:95,name:"التين",verses:8,type:"مكية",juz:30},{n:96,name:"العلق",verses:19,type:"مكية",juz:30},
  {n:97,name:"القدر",verses:5,type:"مكية",juz:30},{n:98,name:"البينة",verses:8,type:"مدنية",juz:30},
  {n:99,name:"الزلزلة",verses:8,type:"مدنية",juz:30},{n:100,name:"العاديات",verses:11,type:"مكية",juz:30},
  {n:101,name:"القارعة",verses:11,type:"مكية",juz:30},{n:102,name:"التكاثر",verses:8,type:"مكية",juz:30},
  {n:103,name:"العصر",verses:3,type:"مكية",juz:30},{n:104,name:"الهمزة",verses:9,type:"مكية",juz:30},
  {n:105,name:"الفيل",verses:5,type:"مكية",juz:30},{n:106,name:"قريش",verses:4,type:"مكية",juz:30},
  {n:107,name:"الماعون",verses:7,type:"مكية",juz:30},{n:108,name:"الكوثر",verses:3,type:"مكية",juz:30},
  {n:109,name:"الكافرون",verses:6,type:"مكية",juz:30},{n:110,name:"النصر",verses:3,type:"مدنية",juz:30},
  {n:111,name:"المسد",verses:5,type:"مكية",juz:30},{n:112,name:"الإخلاص",verses:4,type:"مكية",juz:30},
  {n:113,name:"الفلق",verses:5,type:"مكية",juz:30},{n:114,name:"الناس",verses:6,type:"مكية",juz:30},
];

const TODAY = new Date().toISOString().slice(0, 10);
const STORAGE_KEY = `khatma-shared-${TODAY}`;
const NAME_KEY = "khatma-my-name";

const AVATAR_COLORS = [
  "#C9A84C","#2A7A62","#7C5CBF","#C45E3E","#3A8CC1",
  "#B85C8A","#4E9E6B","#D4874A","#5E7EC4","#8AAD3A"
];

function getColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % AVATAR_COLORS.length;
  return AVATAR_COLORS[h];
}

function Avatar({ name, size = 28 }) {
  const color = getColor(name);
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color, display: "flex", alignItems: "center",
      justifyContent: "center", fontSize: size * 0.42, fontWeight: 700,
      color: "#fff", flexShrink: 0, border: "2px solid rgba(255,255,255,0.15)"
    }}>
      {name[0]}
    </div>
  );
}

export default function KhatmaApp() {
  const [bookings, setBookings] = useState({});
  const [myName, setMyName] = useState(() => {
    try { return localStorage.getItem(NAME_KEY) || ""; } catch { return ""; }
  });
  const [nameInput, setNameInput] = useState("");
  const [screen, setScreen] = useState("name"); // name | main
  const [modalSurah, setModalSurah] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  // ── Persistent shared storage ──
  const loadFromStorage = useCallback(async () => {
    try {
      const result = await window.storage.get(STORAGE_KEY, true);
      if (result && result.value) {
        setBookings(JSON.parse(result.value));
      }
    } catch {
      // no data yet
    }
    setLoading(false);
  }, []);

  const saveToStorage = useCallback(async (data) => {
    setSyncing(true);
    try {
      await window.storage.set(STORAGE_KEY, JSON.stringify(data), true);
    } catch (e) { console.error(e); }
    setSyncing(false);
  }, []);

  useEffect(() => {
    if (myName) { setScreen("main"); loadFromStorage(); }
  }, [myName, loadFromStorage]);

  // Poll every 15 seconds for live updates
  useEffect(() => {
    if (screen !== "main") return;
    const interval = setInterval(loadFromStorage, 15000);
    return () => clearInterval(interval);
  }, [screen, loadFromStorage]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSetName = () => {
    const n = nameInput.trim();
    if (!n) return;
    try { localStorage.setItem(NAME_KEY, n); } catch {}
    setMyName(n);
    setScreen("main");
    loadFromStorage();
  };

  const book = async (surahNum) => {
    if (bookings[surahNum]) return;
    const updated = { ...bookings, [surahNum]: { name: myName, time: Date.now() } };
    setBookings(updated);
    await saveToStorage(updated);
    const s = SURAHS.find(x => x.n === surahNum);
    showToast(`✅ حجزتِ سورة ${s.name}`);
    setModalSurah(null);
  };

  const unbook = async (surahNum) => {
    if (!bookings[surahNum] || bookings[surahNum].name !== myName) return;
    const updated = { ...bookings };
    delete updated[surahNum];
    setBookings(updated);
    await saveToStorage(updated);
    showToast("🗑️ تم إلغاء الحجز");
  };

  const isMine = (n) => bookings[n]?.name === myName;

  // ── Filter & Search ──
  const filtered = SURAHS.filter(s => {
    if (search && !s.name.includes(search.trim())) return false;
    if (filter === "free") return !bookings[s.n];
    if (filter === "mine") return isMine(s.n);
    return true;
  });

  const bookedCount = Object.keys(bookings).length;
  const percent = Math.round((bookedCount / 114) * 100);

  // unique participants
  const participants = [...new Set(Object.values(bookings).map(b => b.name))];

  // Group by juz
  const juzGroups = [];
  let lastJuz = null;
  filtered.forEach(s => {
    if (s.juz !== lastJuz) { juzGroups.push({ juz: s.juz, surahs: [] }); lastJuz = s.juz; }
    juzGroups[juzGroups.length - 1].surahs.push(s);
  });

  // ── Styles ──
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Tajawal:wght@300;400;500;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { direction: rtl; }

    .app {
      min-height: 100vh;
      background: #0D3D30;
      font-family: 'Tajawal', sans-serif;
      color: #F5EDD8;
      position: relative;
      overflow-x: hidden;
    }
    .app::before {
      content: '';
      position: fixed; inset: 0;
      background:
        radial-gradient(ellipse at 15% 15%, rgba(201,168,76,0.07) 0%, transparent 50%),
        radial-gradient(ellipse at 85% 85%, rgba(201,168,76,0.05) 0%, transparent 50%);
      pointer-events: none;
      z-index: 0;
    }

    /* NAME SCREEN */
    .name-screen {
      min-height: 100vh;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      padding: 32px 20px;
      position: relative; z-index: 1;
      gap: 0;
      animation: fadeIn 0.6s ease;
    }
    .bismillah {
      font-family: 'Amiri', serif;
      font-size: clamp(20px, 4vw, 30px);
      color: #C9A84C;
      margin-bottom: 6px;
      text-align: center;
    }
    .app-title {
      font-family: 'Amiri', serif;
      font-size: clamp(32px, 7vw, 56px);
      color: #F5EDD8;
      text-align: center;
      line-height: 1.2;
      margin-bottom: 6px;
    }
    .app-title span { color: #C9A84C; }
    .app-tagline {
      font-size: 15px; color: #c8bda0;
      text-align: center; font-weight: 300;
      margin-bottom: 40px; line-height: 1.7;
    }
    .name-card {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(201,168,76,0.25);
      border-radius: 20px;
      padding: 32px 28px;
      width: 100%; max-width: 420px;
      text-align: center;
    }
    .name-card h2 {
      font-family: 'Amiri', serif;
      font-size: 22px; color: #C9A84C;
      margin-bottom: 8px;
    }
    .name-card p { font-size: 14px; color: #c8bda0; margin-bottom: 24px; line-height: 1.7; }
    .name-input {
      width: 100%;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(201,168,76,0.3);
      border-radius: 12px;
      padding: 14px 18px;
      color: #F5EDD8;
      font-family: 'Tajawal', sans-serif;
      font-size: 17px;
      text-align: center;
      outline: none;
      margin-bottom: 16px;
      transition: border-color 0.3s;
    }
    .name-input:focus { border-color: #C9A84C; }
    .name-input::placeholder { color: rgba(245,237,216,0.35); }
    .btn-primary {
      width: 100%;
      background: linear-gradient(135deg, #C9A84C, #E8C97A);
      color: #1A1208;
      border: none; border-radius: 12px;
      padding: 15px; font-family: 'Tajawal', sans-serif;
      font-size: 17px; font-weight: 700;
      cursor: pointer; transition: all 0.2s;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(201,168,76,0.3); }
    .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

    /* MAIN SCREEN */
    .main { position: relative; z-index: 1; }

    /* TOP BAR */
    .topbar {
      background: rgba(13,61,48,0.95);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(201,168,76,0.15);
      padding: 14px 20px;
      display: flex; align-items: center;
      justify-content: space-between;
      position: sticky; top: 0; z-index: 50;
    }
    .topbar-title {
      font-family: 'Amiri', serif;
      font-size: 20px; color: #C9A84C;
    }
    .topbar-user {
      display: flex; align-items: center; gap: 8px;
      font-size: 14px; color: #c8bda0;
    }

    /* HERO */
    .hero {
      padding: 28px 20px 20px;
      max-width: 860px; margin: 0 auto;
    }
    .stats-row {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 10px; margin-bottom: 20px;
    }
    .stat-box {
      background: rgba(201,168,76,0.08);
      border: 1px solid rgba(201,168,76,0.18);
      border-radius: 14px; padding: 16px 10px;
      text-align: center;
    }
    .stat-num {
      font-family: 'Amiri', serif;
      font-size: 30px; color: #C9A84C;
      display: block; font-weight: 700;
    }
    .stat-lbl { font-size: 12px; color: #c8bda0; margin-top: 2px; }

    /* Progress */
    .progress-wrap { margin-bottom: 20px; }
    .progress-top {
      display: flex; justify-content: space-between;
      font-size: 13px; color: #c8bda0; margin-bottom: 8px;
    }
    .progress-bar {
      height: 10px; background: rgba(255,255,255,0.08);
      border-radius: 100px; overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #8B6914, #C9A84C, #E8C97A);
      border-radius: 100px;
      transition: width 0.7s cubic-bezier(0.34,1.2,0.64,1);
    }

    /* Participants */
    .participants-row {
      display: flex; align-items: center; gap: 8px;
      margin-bottom: 20px; flex-wrap: wrap;
    }
    .participants-label { font-size: 13px; color: #c8bda0; }
    .avatars { display: flex; gap: -4px; }

    /* Sync indicator */
    .sync-badge {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 12px; color: #c8bda0;
      background: rgba(255,255,255,0.05);
      padding: 4px 12px; border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.08);
    }
    .sync-dot {
      width: 7px; height: 7px;
      border-radius: 50%; background: #2A7A62;
      animation: pulse 2s infinite;
    }
    .sync-dot.syncing { background: #C9A84C; animation: spin 1s linear infinite; }

    /* Controls */
    .controls {
      display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;
    }
    .search-wrap { flex: 1; min-width: 160px; position: relative; }
    .search-input {
      width: 100%;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(201,168,76,0.2);
      border-radius: 10px; padding: 11px 16px;
      color: #F5EDD8; font-family: 'Tajawal', sans-serif;
      font-size: 14px; outline: none; transition: border-color 0.3s;
    }
    .search-input:focus { border-color: #C9A84C; }
    .search-input::placeholder { color: rgba(245,237,216,0.35); }
    .filter-btn {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(201,168,76,0.18);
      border-radius: 10px; padding: 11px 14px;
      color: #c8bda0; font-family: 'Tajawal', sans-serif;
      font-size: 13px; cursor: pointer; transition: all 0.25s;
      white-space: nowrap;
    }
    .filter-btn.active {
      background: rgba(201,168,76,0.18);
      border-color: #C9A84C; color: #E8C97A;
    }

    /* My bookings */
    .section-label {
      font-size: 12px; color: #C9A84C;
      letter-spacing: 2px; text-transform: uppercase;
      display: flex; align-items: center; gap: 8px;
      margin-bottom: 10px;
    }
    .section-label::after {
      content: ''; flex: 1; height: 1px;
      background: rgba(201,168,76,0.18);
    }

    /* Juz separator */
    .juz-sep {
      text-align: center; font-size: 12px;
      color: #C9A84C; letter-spacing: 2px;
      display: flex; align-items: center; gap: 8px;
      margin: 14px 0 8px;
    }
    .juz-sep::before, .juz-sep::after {
      content: ''; flex: 1; height: 1px;
      background: rgba(201,168,76,0.15);
    }

    /* Surah card */
    .surah-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(201,168,76,0.1);
      border-radius: 12px; padding: 13px 16px;
      display: flex; align-items: center; gap: 12px;
      margin-bottom: 7px;
      transition: all 0.25s ease;
      cursor: default;
    }
    .surah-card.free { cursor: pointer; }
    .surah-card.free:hover {
      border-color: rgba(201,168,76,0.35);
      background: rgba(201,168,76,0.05);
      transform: translateX(-2px);
    }
    .surah-card.mine {
      background: rgba(26,92,74,0.35);
      border-color: rgba(42,122,98,0.5);
    }
    .surah-card.taken {
      background: rgba(201,168,76,0.06);
      border-color: rgba(201,168,76,0.2);
    }
    .surah-num-badge {
      width: 38px; height: 38px;
      background: rgba(201,168,76,0.12);
      border: 1px solid rgba(201,168,76,0.25);
      border-radius: 50%; display: flex;
      align-items: center; justify-content: center;
      font-family: 'Amiri', serif; font-size: 14px;
      color: #C9A84C; flex-shrink: 0;
    }
    .surah-info { flex: 1; min-width: 0; }
    .surah-name-ar {
      font-family: 'Amiri', serif;
      font-size: 19px; color: #F5EDD8; display: block;
    }
    .surah-sub {
      font-size: 11px; color: rgba(245,237,216,0.45);
      margin-top: 2px;
    }
    .card-action { flex-shrink: 0; }

    .btn-book {
      background: #C9A84C; color: #1A1208;
      border: none; border-radius: 8px;
      padding: 8px 14px; font-family: 'Tajawal', sans-serif;
      font-size: 13px; font-weight: 700;
      cursor: pointer; transition: all 0.2s;
    }
    .btn-book:hover { background: #E8C97A; transform: scale(1.04); }
    .btn-unbook {
      background: transparent;
      color: #2A7A62; border: 1px solid #2A7A62;
      border-radius: 8px; padding: 8px 12px;
      font-family: 'Tajawal', sans-serif;
      font-size: 12px; cursor: pointer; transition: all 0.2s;
    }
    .btn-unbook:hover { background: rgba(42,122,98,0.2); }
    .taken-info {
      display: flex; flex-direction: column;
      align-items: flex-end; gap: 3px;
    }
    .taken-badge {
      background: rgba(201,168,76,0.15);
      color: #C9A84C; border-radius: 6px;
      padding: 5px 10px; font-size: 12px;
      font-weight: 600; display: flex;
      align-items: center; gap: 4px;
    }
    .taken-name {
      font-size: 11px; color: rgba(245,237,216,0.5);
      display: flex; align-items: center; gap: 4px;
    }

    /* Modal */
    .overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.65);
      backdrop-filter: blur(10px);
      z-index: 100; display: flex;
      align-items: center; justify-content: center;
      padding: 20px;
      animation: fadeIn 0.2s ease;
    }
    .modal {
      background: #0D3D30;
      border: 1px solid rgba(201,168,76,0.3);
      border-radius: 22px; padding: 32px;
      max-width: 400px; width: 100%;
      text-align: center;
      animation: popIn 0.3s cubic-bezier(0.34,1.56,0.64,1);
    }
    .modal h2 {
      font-family: 'Amiri', serif;
      font-size: 26px; color: #C9A84C;
      margin-bottom: 6px;
    }
    .modal-surah-name {
      font-family: 'Amiri', serif;
      font-size: 22px; color: #F5EDD8;
      background: rgba(201,168,76,0.1);
      border: 1px solid rgba(201,168,76,0.2);
      border-radius: 12px; padding: 14px;
      margin: 16px 0;
    }
    .modal-meta { font-size: 13px; color: #c8bda0; margin-bottom: 20px; }
    .modal-btns { display: flex; gap: 10px; margin-top: 4px; }
    .btn-cancel {
      flex: 1; background: transparent;
      color: #c8bda0; border: 1px solid rgba(245,237,216,0.2);
      border-radius: 12px; padding: 14px;
      font-family: 'Tajawal', sans-serif;
      font-size: 15px; cursor: pointer;
      transition: all 0.2s;
    }
    .btn-cancel:hover { border-color: rgba(245,237,216,0.4); }

    /* Toast */
    .toast {
      position: fixed; bottom: 28px; left: 50%;
      transform: translateX(-50%);
      background: #1A5C4A; border: 1px solid #C9A84C;
      color: #F5EDD8; padding: 13px 28px;
      border-radius: 30px; font-size: 15px;
      z-index: 200; white-space: nowrap;
      box-shadow: 0 10px 40px rgba(0,0,0,0.4);
      animation: toastIn 0.4s cubic-bezier(0.34,1.56,0.64,1);
    }

    /* Empty */
    .empty { text-align: center; padding: 50px 20px; color: rgba(245,237,216,0.35); }
    .empty .icon { font-size: 36px; margin-bottom: 10px; }

    /* Loading */
    .loading-screen {
      min-height: 100vh; display: flex;
      align-items: center; justify-content: center;
      flex-direction: column; gap: 16px;
    }
    .spinner {
      width: 48px; height: 48px;
      border: 3px solid rgba(201,168,76,0.2);
      border-top-color: #C9A84C;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes fadeDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes popIn { from { opacity:0; transform:scale(0.88); } to { opacity:1; transform:scale(1); } }
    @keyframes toastIn { from { opacity:0; transform:translateX(-50%) translateY(20px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
    @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
    @keyframes spin { to { transform: rotate(360deg); } }

    @media (max-width: 480px) {
      .stats-row { gap: 7px; }
      .stat-num { font-size: 24px; }
      .modal { padding: 24px 20px; }
    }
  `;

  // ── NAME SCREEN ──
  if (screen === "name") {
    return (
      <>
        <style>{css}</style>
        <div className="app">
          <div className="name-screen">
            <div className="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
            <h1 className="app-title">ختمة <span>القرآن</span><br/>الكريم</h1>
            <p className="app-tagline">نختم القرآن الكريم معاً كل يوم<br/>كل شخص يحجز الجزء اللي رح يقرأه</p>
            <div className="name-card">
              <h2>أهلاً وسهلاً 🌿</h2>
              <p>أدخل اسمك للانضمام للختمة اليومية المشتركة مع المجموعة</p>
              <input
                className="name-input"
                placeholder="اكتب اسمك هنا..."
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSetName()}
                maxLength={30}
                autoFocus
              />
              <button
                className="btn-primary"
                onClick={handleSetName}
                disabled={!nameInput.trim()}
              >
                انضم للختمة ✨
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── LOADING ──
  if (loading) {
    return (
      <>
        <style>{css}</style>
        <div className="app">
          <div className="loading-screen">
            <div className="spinner" />
            <div style={{ fontFamily: "'Amiri', serif", color: "#C9A84C", fontSize: 18 }}>جارٍ تحميل الختمة…</div>
          </div>
        </div>
      </>
    );
  }

  const myBookedSurahs = SURAHS.filter(s => isMine(s.n));

  // ── MAIN SCREEN ──
  return (
    <>
      <style>{css}</style>
      <div className="app" dir="rtl">

        {/* TOPBAR */}
        <div className="topbar">
          <div className="topbar-title">🕌 ختمة القرآن</div>
          <div className="topbar-user">
            <Avatar name={myName} size={30} />
            <span>{myName}</span>
          </div>
        </div>

        <div className="hero">
          {/* STATS */}
          <div className="stats-row">
            <div className="stat-box">
              <span className="stat-num">{bookedCount}</span>
              <div className="stat-lbl">سورة محجوزة</div>
            </div>
            <div className="stat-box">
              <span className="stat-num">{114 - bookedCount}</span>
              <div className="stat-lbl">متبقية</div>
            </div>
            <div className="stat-box">
              <span className="stat-num">{percent}%</span>
              <div className="stat-lbl">الإنجاز</div>
            </div>
          </div>

          {/* PROGRESS */}
          <div className="progress-wrap">
            <div className="progress-top">
              <span>تقدم الختمة اليومية</span>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div className={`sync-badge`}>
                  <div className={`sync-dot ${syncing ? "syncing" : ""}`} />
                  {syncing ? "يُزامن..." : "مباشر"}
                </div>
                <span>{bookedCount} / 114</span>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: percent + "%" }} />
            </div>
          </div>

          {/* PARTICIPANTS */}
          {participants.length > 0 && (
            <div className="participants-row">
              <span className="participants-label">المشاركون ({participants.length}):</span>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {participants.map(p => (
                  <div key={p} style={{ display: "flex", alignItems: "center", gap: 5,
                    background: "rgba(255,255,255,0.05)", borderRadius: 20,
                    padding: "4px 10px 4px 6px", fontSize: 13, color: "#c8bda0" }}>
                    <Avatar name={p} size={22} />
                    <span>{p}</span>
                    <span style={{ fontSize: 11, color: "#C9A84C" }}>
                      ({Object.values(bookings).filter(b => b.name === p).length})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MY BOOKINGS */}
          {myBookedSurahs.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div className="section-label">حجوزاتي اليوم ✦</div>
              {myBookedSurahs.map(s => (
                <div key={s.n} className="surah-card mine">
                  <div className="surah-num-badge">{s.n}</div>
                  <div className="surah-info">
                    <span className="surah-name-ar">سورة {s.name}</span>
                    <div className="surah-sub">{s.verses} آية • {s.type}</div>
                  </div>
                  <div className="card-action">
                    <button className="btn-unbook" onClick={() => unbook(s.n)}>إلغاء</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CONTROLS */}
          <div className="controls">
            <div className="search-wrap">
              <input
                className="search-input"
                placeholder="🔍  ابحث عن سورة..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            {["all", "free", "mine"].map(f => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f === "all" ? "الكل" : f === "free" ? "المتاحة" : "حجوزاتي"}
              </button>
            ))}
          </div>

          {/* SURAH LIST */}
          {filtered.length === 0 ? (
            <div className="empty">
              <div className="icon">🔍</div>
              <p>لا توجد نتائج</p>
            </div>
          ) : (
            <>
              {(search || filter !== "all") ? (
                filtered.map(s => <SurahCard key={s.n} s={s} bookings={bookings}
                  isMine={isMine(s.n)} onBook={() => setModalSurah(s)} onUnbook={() => unbook(s.n)} />)
              ) : (
                juzGroups.map(g => (
                  <div key={g.juz}>
                    <div className="juz-sep">الجزء {g.juz}</div>
                    {g.surahs.map(s => (
                      <SurahCard key={s.n} s={s} bookings={bookings}
                        isMine={isMine(s.n)} onBook={() => setModalSurah(s)} onUnbook={() => unbook(s.n)} />
                    ))}
                  </div>
                ))
              )}
            </>
          )}

          <div style={{ height: 40 }} />
        </div>

        {/* MODAL */}
        {modalSurah && (
          <div className="overlay" onClick={e => e.target === e.currentTarget && setModalSurah(null)}>
            <div className="modal">
              <h2>احجز سورتك 📖</h2>
              <div className="modal-surah-name">سورة {modalSurah.name}</div>
              <div className="modal-meta">
                {modalSurah.verses} آية • {modalSurah.type} • الجزء {modalSurah.juz}
              </div>
              <p style={{ fontSize: 14, color: "#c8bda0", marginBottom: 20, lineHeight: 1.7 }}>
                ستكون مسؤولاً عن قراءة هذه السورة اليوم باسم <strong style={{ color: "#E8C97A" }}>{myName}</strong>
              </p>
              <div className="modal-btns">
                <button className="btn-primary" style={{ flex: 1 }} onClick={() => book(modalSurah.n)}>
                  احجز الآن ✓
                </button>
                <button className="btn-cancel" onClick={() => setModalSurah(null)}>إلغاء</button>
              </div>
            </div>
          </div>
        )}

        {/* TOAST */}
        {toast && <div className="toast">{toast}</div>}
      </div>
    </>
  );
}

function SurahCard({ s, bookings, isMine, onBook, onUnbook }) {
  const booking = bookings[s.n];
  const isTaken = !!booking && !isMine;

  let cardClass = "surah-card";
  if (isMine) cardClass += " mine";
  else if (isTaken) cardClass += " taken";
  else cardClass += " free";

  return (
    <div className={cardClass} onClick={!isTaken && !isMine ? onBook : undefined}>
      <div className="surah-num-badge">{s.n}</div>
      <div className="surah-info">
        <span className="surah-name-ar">سورة {s.name}</span>
        <div className="surah-sub">{s.verses} آية • {s.type} • ج{s.juz}</div>
      </div>
      <div className="card-action">
        {isMine ? (
          <button className="btn-unbook" onClick={e => { e.stopPropagation(); onUnbook(); }}>إلغاء</button>
        ) : isTaken ? (
          <div className="taken-info">
            <div className="taken-badge">✓ محجوزة</div>
            <div className="taken-name">
              <Avatar name={booking.name} size={16} />
              {booking.name}
            </div>
          </div>
        ) : (
          <button className="btn-book">احجز</button>
        )}
      </div>
    </div>
  );
}
