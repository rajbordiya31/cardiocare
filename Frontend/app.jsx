// =============================================================
//  CardioCare – Full React App (CDN / Babel)
// =============================================================
const { useState, useEffect, useRef } = React;

// ── Configuration ─────────────────────────────────────────────
const API_URL = 'https://cardiocare-1wh0.onrender.com';

// ── Intersection Observer hook ────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── SVG Icons ─────────────────────────────────────────────────
const HeartIcon = ({ size = 24, className = '' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const PhoneIcon = ({ size = 20, className = '' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

const EmailIcon = ({ size = 20, className = '' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const LocationIcon = ({ size = 20, className = '' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const StarIcon = ({ filled = true }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? '#f59e0b' : '#d1d5db'} className="inline-block">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

// ── Services data ──────────────────────────────────────────────
const SERVICES = [
  {
    icon: '💓',
    title: 'ECG',
    desc: 'Advanced 12-lead ECG analysis for accurate heart rhythm diagnosis and cardiac monitoring.',
  },
  {
    icon: '🫀',
    title: 'Angioplasty',
    desc: 'Minimally invasive balloon angioplasty and stenting to restore blood flow to the heart.',
  },
  {
    icon: '🏥',
    title: 'Heart Checkup',
    desc: 'Comprehensive cardiac health assessment including echo, stress test, and lipid profiling.',
  },
  {
    icon: '📊',
    title: 'BP Monitoring',
    desc: '24-hour ambulatory blood pressure monitoring with expert interpretation and guidance.',
  },
  {
    icon: '🩺',
    title: 'Cardiac Consultation',
    desc: 'Expert one-on-one consultations for heart disease prevention, treatment, and management.',
  },
];

// ── Why Choose Us data ─────────────────────────────────────────
const WHY_US = [
  {
    icon: '🏆',
    title: 'Experienced Specialist',
    desc: '3+ years of dedicated cardiology practice with 1,000+ successful procedures performed.',
    color: 'from-blue-500 to-blue-700',
  },
  {
    icon: '🔬',
    title: 'Modern Equipment',
    desc: 'State-of-the-art cardiac imaging, 4D echo, and AI-assisted diagnostic technology.',
    color: 'from-indigo-500 to-indigo-700',
  },
  {
    icon: '🚨',
    title: '24/7 Emergency Support',
    desc: 'Round-the-clock cardiac emergency services with a dedicated rapid response team.',
    color: 'from-red-500 to-red-700',
  },
  {
    icon: '💙',
    title: 'Trusted Treatment',
    desc: 'Evidence-based care protocols recognised by leading national and international bodies.',
    color: 'from-cyan-500 to-cyan-700',
  },
];


// ─────────────────────────────────────────────────────────────
//  Components
// ─────────────────────────────────────────────────────────────

// ── Navbar ────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = ['Home', 'About', 'Services', 'Why Us', 'Appointment', 'Contact'];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'navbar-blur shadow-sm' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <a href="index.html" className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-85">
              <div className="relative">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-md pulse-ring">
                  <HeartIcon size={20} className="text-white animate-heartbeat" />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold text-blue-800 tracking-tight">Cardio</span>
                <span className="text-xl font-bold text-blue-500">Care</span>
              </div>
            </a>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/\s/g, '-')}`}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition-all duration-200"
              >
                {l}
              </a>
            ))}
            {/* Added Check Status Link */}
            <a
              href="status.html"
              className="px-4 py-2 text-sm font-bold text-blue-600 hover:text-blue-800 bg-blue-50/50 rounded-xl border border-blue-100/50 ml-2 transition-all hover:bg-blue-100"
            >
              🔍 Check Status
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <a href="#appointment">
              <button className="btn-primary text-sm">Book Appointment</button>
            </a>
          </div>

          {/* Mobile burger */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-blue-50 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''} lg:hidden`}>
          <div className="pb-4 space-y-1">
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/\s/g, '-')}`}
                className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition"
                onClick={() => setMenuOpen(false)}
              >
                {l}
              </a>
            ))}
            {/* Mobile Check Status Link */}
            <a
              href="status.html"
              className="block px-4 py-2.5 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition"
              onClick={() => setMenuOpen(false)}
            >
              🔍 Check Appointment Status
            </a>
            <div className="pt-2 px-4">
              <a href="#appointment" onClick={() => setMenuOpen(false)}>
                <button className="btn-primary w-full text-sm">Book Appointment</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="home" className="hero-gradient relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Decorative blobs */}
      <div className="hero-blob w-96 h-96 bg-blue-300 top-10 -right-24" style={{ position: 'absolute' }} />
      <div className="hero-blob w-72 h-72 bg-indigo-200 bottom-20 -left-16" style={{ position: 'absolute' }} />
      <div className="hero-blob w-48 h-48 bg-cyan-200 top-1/2 left-1/2 -translate-x-1/2" style={{ position: 'absolute' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16">

          {/* Left text */}
          <div className="space-y-7">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm border border-blue-100">
              <HeartIcon size={16} className="text-red-500 animate-heartbeat" />
              <span className="text-sm font-semibold text-blue-700 tracking-wide uppercase">Advanced Heart Care</span>
            </div>

            <div>
              <p className="text-blue-600 font-semibold text-lg mb-1">Senior Cardiologist</p>
              <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                Dr. Narendra Bordiya
              </h1>
              <div className="ecg-line my-4 w-48" />
              <p className="text-xl lg:text-2xl text-gray-500 font-light mt-3 leading-relaxed">
                Advanced Heart Care<br />
                <span className="text-blue-600 font-medium">with Compassion</span>
              </p>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-4">
              {[['3+', 'Years Exp.'], ['1,000+', 'Procedures'], ['99%', 'Success Rate']].map(([val, lbl]) => (
                <div key={lbl} className="stat-badge px-5 py-3 text-center">
                  <div className="text-2xl font-bold">{val}</div>
                  <div className="text-xs text-blue-200 font-medium">{lbl}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a href="#appointment">
                <button className="btn-primary px-8 py-4 text-base flex items-center gap-2">
                  <span>📅</span> Book Appointment
                </button>
              </a>
              <a href="+91-9826371817">
                <button className="btn-emergency px-8 py-4 text-base flex items-center gap-2">
                  <span>🚨</span> Emergency Contact
                </button>
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {['MBBS, MD (Medicine)', 'DM(Cardiology)'].map((b) => (
                <div key={b} className="flex items-center gap-1.5 text-sm text-gray-600">
                  <CheckIcon />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right – doctor image */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Decorative ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full border-2 border-blue-200 opacity-40 animate-pulse" />
            </div>
            <div className="relative">
              <img
                src="doctor.png"
                alt="Dr. Narendra Bordiya – Senior Cardiologist"
                className="doctor-img w-72 h-96 lg:w-80 lg:h-[480px] object-cover relative z-10"
                style={{ animation: 'float 4s ease-in-out infinite' }}
                onError={(e) => {
                  // Fallback placeholder if image fails
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback */}
              <div
                className="doctor-img w-72 h-96 lg:w-80 lg:h-[480px] bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center justify-center text-blue-600 relative z-10"
                style={{ display: 'none', animation: 'float 4s ease-in-out infinite' }}
              >
                <span style={{ fontSize: '5rem' }}>👨‍⚕️</span>
                <p className="font-semibold mt-2">Dr. Narendra Bordiya</p>
                <p className="text-sm">Senior Cardiologist</p>
              </div>

              {/* Floating card – experience */}
              <div className="absolute -bottom-4 -left-8 bg-white rounded-2xl shadow-card p-4 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-lg">🏆</div>
                  <div>
                    <div className="font-bold text-blue-800 text-lg">3+ Years</div>
                    <div className="text-xs text-gray-500">Cardiology Experience</div>
                  </div>
                </div>
              </div>

              {/* Floating card – patients */}
              <div className="absolute -top-4 -right-6 bg-white rounded-2xl shadow-card p-4 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-2xl">😊</div>
                  <div>
                    <div className="font-bold text-gray-800 text-lg">1,000+</div>
                    <div className="text-xs text-gray-500">Happy Patients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────
function About() {
  const ref = useReveal();
  const certs = ['MBBS – MGM Medical College, Indore', 'MD Medicine – MGM Medical College, Indore', 'DM Cardiology – AIIMS, Jodhpur'];
  const specs = ['Interventional Cardiology', 'Heart Failure Management', 'Preventive Cardiology', 'Angioplasty Surgery', 'Structural Heart Disease'];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal grid lg:grid-cols-2 gap-16 items-center">

          {/* Left image / decorative */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-10 text-center">
              <div className="text-8xl mb-6">👨‍⚕️</div>
              <h3 className="font-display text-3xl font-bold text-blue-900">Dr. Narendra Bordiya</h3>
              <p className="text-blue-600 font-medium mt-1">MBBS, MD (Medicine), DM(Cardiology)</p>
              <div className="ecg-line mt-6 w-full" />
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[['3+', 'Years'], ['1K+', 'Procedures'], ['99%', 'Success']].map(([v, l]) => (
                  <div key={l} className="bg-white rounded-2xl p-4 shadow-card">
                    <div className="text-2xl font-bold text-blue-700">{v}</div>
                    <div className="text-xs text-gray-500">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Decorative circle */}
            <div className="absolute -top-6 -left-6 w-28 h-28 bg-blue-600 rounded-full opacity-10" />
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-indigo-400 rounded-full opacity-15" />
          </div>

          {/* Right content */}
          <div className="space-y-7">
            <div>
              <span className="inline-block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">About Dr. Narendra Bordiya</span>
              <h2 className="font-display text-4xl font-bold text-gray-900 leading-tight">
                Dedicated to Your <span className="text-blue-600">Heart Health</span>
              </h2>
              <p className="text-gray-500 mt-4 leading-relaxed text-lg">
                Dr. Narendra Bordiya is a board-certified interventional cardiologist with over 3+ years of dedicated experience in diagnosing and treating complex cardiovascular conditions. He combines cutting-edge medical science with genuine compassion for every patient.
              </p>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">🎓 Qualifications & Certifications</h3>
              <ul className="space-y-2">
                {certs.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-gray-600 text-sm">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <CheckIcon />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specialisations */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">🫀 Areas of Specialisation</h3>
              <div className="flex flex-wrap gap-2">
                {specs.map((s) => (
                  <span key={s} className="bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────────
function Services() {
  const ref = useReveal();
  return (
    <section id="services" className="py-24 section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal text-center mb-16">
          <span className="inline-block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Our Services</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900">
            Comprehensive <span className="text-blue-600">Cardiac Care</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            From diagnosis to advanced intervention, we offer the full spectrum of cardiac services with world-class precision.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} {...s} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon, title, desc, delay }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal service-card bg-white rounded-3xl p-8 shadow-card border border-gray-50 cursor-default"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="service-icon-wrap w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center text-4xl mb-5 shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
      <div className="mt-5">
        <a href="#appointment" className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm hover:gap-2 transition-all">
          Book Now <span>→</span>
        </a>
      </div>
    </div>
  );
}

// ── Why Choose Us ─────────────────────────────────────────────
function WhyChooseUs() {
  const ref = useReveal();
  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal text-center mb-16">
          <span className="inline-block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Why CardioCare</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900">
            Why Patients <span className="text-blue-600">Trust Us</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto text-lg">
            Our commitment to excellence in cardiac care sets us apart.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_US.map((w, i) => <WhyCard key={i} {...w} delay={i * 100} />)}
        </div>
      </div>
    </section>
  );
}

function WhyCard({ icon, title, desc, color, delay }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal why-card bg-white rounded-3xl p-7 shadow-card border border-gray-50 cursor-default" style={{ transitionDelay: `${delay}ms` }}>
      <div className={`w-14 h-14 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center text-3xl text-white shadow-md mb-5`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

// ── Appointment Form ──────────────────────────────────────────
function Appointment() {
  const ref = useReveal();
  const [form, setForm] = useState({ name: '', phone: '', date: '', preferred_slot: 'Morning', symptoms: '' });
  const [submittedData, setSubmittedData] = useState(null); // Changed from boolean to store data

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();
        setSubmittedData(data); // Store the returned appointment (contains ID)
        setForm({ name: '', phone: '', date: '', symptoms: '' });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.detail || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
      alert('Unable to connect to the server. Please try again later.');
    }
  };

  return (
    <section id="appointment" className="py-24" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #3b82f6 100%)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal text-center mb-12">
          <span className="inline-block bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">Book Appointment</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">
            Schedule Your Consultation
          </h2>
          <p className="text-blue-200 mt-4 text-lg">
            Fill the form below and our team will confirm your appointment within 2 hours.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl">
          {submittedData ? (
            <div className="text-center py-12">
              <div className="text-7xl mb-6">✅</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-3">Appointment Requested!</h3>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-6 inline-block">
                <p className="text-blue-800 font-semibold mb-1">Your Appointment ID</p>
                <div className="text-4xl font-black text-blue-600 tracking-wider">#{submittedData.id}</div>
              </div>
              <p className="text-gray-500 text-lg mb-8">Please save this ID. You can use it to check your appointment status on our website.</p>
              <button
                onClick={() => setSubmittedData(null)}
                className="btn-primary px-8 py-3 text-sm"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Patient Name *</label>
                  <input
                    className="form-input"
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handle}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <input
                    className="form-input"
                    type="tel"
                    name="phone"
                    placeholder="+91 00000 00000"
                    value={form.phone}
                    onChange={handle}
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date *</label>
                  <input
                    className="form-input"
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handle}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Session *</label>
                  <select
                    className="form-input"
                    name="preferred_slot"
                    value={form.preferred_slot}
                    onChange={handle}
                    required
                  >
                    <option value="Morning">Morning (9 AM - 12 PM)</option>
                    <option value="Evening">Evening (3 PM - 6 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Describe Your Symptoms</label>
                <textarea
                  className="form-input"
                  name="symptoms"
                  rows={4}
                  placeholder="Please describe your symptoms or reason for visit..."
                  value={form.symptoms}
                  onChange={handle}
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button type="submit" className="btn-primary w-full py-4 text-base mt-2">
                📅 Request Appointment
              </button>
              <p className="text-center text-xs text-gray-400 mt-2">
                By submitting, you agree to our privacy policy. We'll call you to confirm.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────
function Contact() {
  const ref = useReveal();
  const info = [
    { icon: <LocationIcon size={22} className="text-blue-600" />, label: 'Clinic Address', value: 'Granth Library Murai Mohalla Chawani Indore' },
    { icon: <PhoneIcon size={22} className="text-blue-600" />, label: 'Phone', value: '+91 9826371817' },
    { icon: <EmailIcon size={22} className="text-blue-600" />, label: 'Email', value: 'Dr.narendrabordiya@gmail.com' },
  ];
  const hours = [['Mon – Fri', '9:00 AM – 7:00 PM'], ['Saturday', '9:00 AM – 4:00 PM'], ['Sunday', 'Emergency Only']];

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal text-center mb-16">
          <span className="inline-block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Get In Touch</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900">
            Visit <span className="text-blue-600">CardioCare Clinic</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto text-lg">
            We are here to help you on your journey to better heart health.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <div className="space-y-6">
            {info.map((item, i) => (
              <div key={i} className="flex gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-colors cursor-default">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="font-semibold text-gray-700 mb-0.5">{item.label}</div>
                  <div className="text-gray-500 text-sm whitespace-pre-line leading-relaxed">{item.value}</div>
                </div>
              </div>
            ))}

            {/* Hours */}
            <div className="p-5 bg-blue-50 rounded-2xl">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span>🕐</span> Clinic Hours
              </h3>
              {hours.map(([day, time]) => (
                <div key={day} className="flex justify-between py-1.5 border-b border-blue-100 last:border-0">
                  <span className="text-gray-700 text-sm font-medium">{day}</span>
                  <span className="text-blue-700 text-sm font-semibold">{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map placeholder */}
          <div className="map-placeholder shadow-card">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="font-bold text-blue-800 text-xl mb-2">CardioCare Clinic</h3>
            <p className="text-blue-600 text-sm text-center px-8">5/4, Granth Library Murai Mohalla Chawani Indore<br />Indore – 452001</p>
            <div className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold cursor-pointer hover:bg-blue-700 transition">
              Open in Google Maps
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  const quickLinks = ['Home', 'About', 'Services', 'Why Us', 'Appointment', 'Contact'];
  const services = ['ECG', 'Angioplasty', 'Heart Checkup', 'BP Monitoring', 'Cardiac Consultation'];

  return (
    <footer id="footer" className="footer-gradient text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center">
                <HeartIcon size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold">CardioCare</span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Advanced Heart Care with Compassion. Trusted by 12,000+ patients across India.
            </p>
            {/* Emergency */}
            <div className="bg-red-600/30 border border-red-400/30 rounded-xl p-4">
              <div className="text-red-300 text-xs font-bold mb-1 uppercase tracking-wider">🚨 Emergency 24/7</div>
              <a href="+91-9826371817" className="text-white font-bold text-lg hover:text-red-300 transition">
                +919826371817
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase().replace(/\s/g, '-')}`}
                    className="text-blue-200 text-sm hover:text-white hover:pl-1 transition-all"
                  >
                    → {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-blue-200 text-sm hover:text-white hover:pl-1 transition-all">
                    → {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Connect With Us</h4>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { icon: '📘', label: 'Facebook', color: '#1877F2' },
                { icon: '📷', label: 'Instagram', color: '#E4405F' },
                { icon: '🐦', label: 'Twitter', color: '#1DA1F2' },
                { icon: '▶️', label: 'YouTube', color: '#FF0000' },
                { icon: '💼', label: 'LinkedIn', color: '#0A66C2' },
                { icon: '💬', label: 'WhatsApp', color: '#25D366' },
              ].map(({ icon, label, color }) => (
                <button
                  key={label}
                  title={label}
                  className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl transition-all hover:scale-110"
                >
                  {icon}
                </button>
              ))}
            </div>
            <div className="text-blue-200 text-sm space-y-1">
              <div>📧 dr.narendrabordiya.in</div>
              <div>📍 Indore, India</div>
            </div>
          </div>
        </div>

        {/* ECG Divider */}
        <div className="ecg-line opacity-30 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-blue-300">
          <div>© 2026 CardioCare. All rights reserved. Dr. Narendra Bordiya.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="status.html" className="font-bold text-white hover:underline transition">Check Appointment</a>
            <a href="admin.html" className="hover:text-white transition underline decoration-blue-500/30">Admin Portal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Scroll to Top button ───────────────────────────────────────
function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return visible ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-full shadow-glow flex items-center justify-center text-xl hover:scale-110 transition-transform"
      aria-label="Back to top"
    >
      ↑
    </button>
  ) : null;
}

// ── App ───────────────────────────────────────────────────────
function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Appointment />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

// ── Mount ─────────────────────────────────────────────────────
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
