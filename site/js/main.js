/* ============================================
   Naja Safety — Main JavaScript
   Taste-Skill Edition: scroll reveals, liquid nav,
   clean accordion, zero emoji policy.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- WhatsApp reference codes ----------
  (function() {
    const refMap = [
      { prefix: '/services/cidb-green-card', code: 'WEB-GC' },
      { prefix: '/services/osh-coordinator-section-29a', code: 'WEB-OSHC' },
      { prefix: '/services/hrdcorp', code: 'WEB-HRD' },
      { prefix: '/courses/first-aid', code: 'WEB-FA' },
      { prefix: '/courses/first-aid-cpr', code: 'WEB-FA' },
    ];
    const path = window.location.pathname;
    let code = 'WEB-GEN';
    for (const entry of refMap) {
      if (path.startsWith(entry.prefix)) { code = entry.code; break; }
    }
    document.querySelectorAll('a[href^="https://wa.me/601120776678"]').forEach(a => {
      let href = a.getAttribute('href');
      if (href.includes('[WEB-')) return; // already tagged
      if (href.includes('?text=')) {
        href = href.replace(/(%20|+)$/, '') + '%20%5B' + code + '%5D';
      } else {
        href += '?text=Hi%20Naja%20Safety%2C%20I%27m%20enquiring%20from%20your%20website.%20%5B' + code + '%5D';
      }
      a.setAttribute('href', href);
    });
  })();

  // ---------- Mobile menu toggle ----------
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const iconMenu = menuBtn ? menuBtn.querySelector('.icon-menu') : null;
  const iconClose = menuBtn ? menuBtn.querySelector('.icon-close') : null;

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      if (iconMenu && iconClose) {
        iconMenu.style.display = isOpen ? 'none' : 'block';
        iconClose.style.display = isOpen ? 'block' : 'none';
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        if (iconMenu && iconClose) {
          iconMenu.style.display = 'block';
          iconClose.style.display = 'none';
        }
      });
    });
  }

  // ---------- FAQ accordion ----------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close all others
      faqItems.forEach(i => {
        i.classList.remove('active');
        const ans = i.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = '0';
      });
      if (!isActive) {
        item.classList.add('active');
        const answer = item.querySelector('.faq-answer');
        const inner = item.querySelector('.faq-answer-inner');
        if (answer && inner) {
          answer.style.maxHeight = inner.scrollHeight + 'px';
        }
      }
    });
  });

  // ---------- Smooth scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- Form validation ----------
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      let valid = true;
      const required = form.querySelectorAll('[required]');
      required.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#dc3545';
        } else {
          field.style.borderColor = '';
        }
      });
      if (!valid) {
        e.preventDefault();
        const firstInvalid = form.querySelector('[style*="border-color: rgb(220, 53, 69)"]');
        if (firstInvalid) firstInvalid.focus();
      }
    });
  });

  // ---------- Scroll Reveal (Taste-Skill) ----------
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .stagger-children').forEach(el => {
    revealObserver.observe(el);
  });

  // ---------- Count-up stat animation ----------
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      if (isNaN(target)) return;
      const duration = 1500;
      const start = performance.now();
      const startVal = 0;
      const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuart(progress);
        el.textContent = Math.round(startVal + (target - startVal) * eased);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => countObserver.observe(el));

  // ---------- Certificate lightbox ----------
  const certModal = document.getElementById('cert-modal');
  const certModalImg = document.getElementById('cert-modal-img');
  const certModalCaption = document.querySelector('.cert-modal-caption');
  const certModalClose = document.querySelector('.cert-modal-close');

  if (certModal) {
    document.querySelectorAll('.cert-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        const img = thumb.querySelector('img');
        if (!img) return;
        certModalImg.src = img.src;
        certModalImg.alt = img.alt;
        certModalCaption.textContent = img.alt;
        certModal.classList.add('active');
        certModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      certModal.classList.remove('active');
      certModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      certModalImg.src = '';
    };

    if (certModalClose) certModalClose.addEventListener('click', closeModal);
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && certModal.classList.contains('active')) closeModal();
    });
  }

  // ---------- Multi-Language Toggle (EN / BM / ZH / TA) ----------
  const fullSiteDictionary = {
    // Nav (shared)
    navHome:     { en:"Home",        ms:"Laman Utama",   zh:"首页",     ta:"முகப்பு" },
    navServices: { en:"Services",    ms:"Perkhidmatan",  zh:"服务",     ta:"சேவைகள்" },
    navCourses:  { en:"Courses",     ms:"Kursus",        zh:"课程",     ta:"படிப்புகள்" },
    navAbout:    { en:"About",       ms:"Tentang Kami",  zh:"关于",     ta:"எங்களைப் பற்றி" },
    navContact:  { en:"Contact",     ms:"Hubungi",       zh:"联系",     ta:"தொடர்பு" },
    navWhatsApp: { en:"WhatsApp Us", ms:"WhatsApp Kami", zh:"WhatsApp", ta:"வாட்ஸ்அப்" },
    navArticles: { en:"Articles", ms:"Artikel", zh:"文章", ta:"கட்டுரைகள்" },

    // Homepage Hero
    heroTitle: {
      en: "20+ Years Keeping Malaysian Workplaces Safe",
      ms: "Pengalaman 20+ Tahun Memastikan Keselamatan Tempat Kerja Malaysia",
      zh: "20余年守护马来西亚职场安全",
      ta: "20+ ஆண்டுகள் மலேசியா பணியிடங்களை பாதுகாத்தல்"
    },
    heroSubtitle: {
      en: "We train and equip your internally appointed OSH Coordinator (OSH-C) to clear Malaysian regulatory benchmarks smoothly. Under Section 29A of the OSH (Amendment) Act 2022, any enterprise with 5 or more employees must appoint an OSH Coordinator. We prepare your designated employee to meet this mandate.",
      ms: "Kami melatih dan menyediakan Penyelaras OSH (OSH-C) yang dilantik secara dalaman untuk anda memenuhi piawaian kawal selia Malaysia dengan lancar. Di bawah Seksyen 29A Akta OSHA (Pindaan) 2022, mana-mana syarikat dengan 5 atau lebih pekerja mesti melantik penyelaras OSH. Kami menyediakan pekerja yang dilantik untuk memenuhi mandat ini.",
      zh: "我们培训并装备贵公司内部指定的职业安全卫生协调员（OSH-C），使其顺利通过马来西亚监管基准。根据2022年《职业安全卫生法（修正）法》第29A条，任何雇用5名或以上员工的企业必须任命OSH协调员。我们为贵公司指定的员工做好合规准备。",
      ta: "உங்கள் உள்ளக நியமிக்கப்பட்ட OSH ஒருங்கிணைப்பாளரை (OSH-C) மலேசியா கட்டுப்பாட்டு தரங்களை சீராக கடக்க தயார்படுத்துகிறோம். 2022 OSH சட்டத்தின் பிரிவு 29A-ன் கீழ், 5 அல்லது அதற்கு மேற்பட்ட ஊழியர்களைக் கொண்ட நிறுவனம் OSH ஒருங்கிணைப்பாளரை நியமிக்க வேண்டும். நாங்கள் உங்கள் நியமிக்கப்பட்ட ஊழியரை இந்த கட்டளைக்கு தயார் செய்கிறோம்."
    },
    heroLead: {
      en: "Your trusted safety partner for training, consultancy & compliance. HRD Corp claimable courses. CIDB-certified instruction. Nationwide on-site training from Johor Bahru.",
      ms: "Rakan keselamatan dipercayai anda untuk latihan, perundingan & pematuhan. Kursus tuntut HRD Corp. Pengajaran bertauliah CIDB. Penempatan ke seluruh negara dari Johor Bahru.",
      zh: "您在培训、咨询与合规方面的可靠安全合作伙伴。HRD Corp可索回课程。CIDB认证教学。从柔佛新山全国部署。",
      ta: "பயிற்சி, ஆலோசனை மற்றும் இணக்கத்திற்கான உங்கள் நம்பகமான பாதுகாப்பு கூட்டாளி. HRD Corp திரும்பப் பெறக்கூடிய படிப்புகள். CIDB சான்றளிக்கப்பட்ட வழிநடத்தல். ஜொகூர் பாருவிலிருந்து நாடு முழுவதும்."
    },
    heroBtnWhatsApp: { en:"WhatsApp Us", ms:"WhatsApp Kami", zh:"WhatsApp", ta:"வாட்ஸ்அப்" },
    heroBtnCourses:  { en:"View Courses", ms:"Lihat Kursus", zh:"查看课程", ta:"படிப்புகளைக் காண்க" },

    // Homepage Services
    servicesTitle: { en:"What We Deliver", ms:"Perkhidmatan Kami", zh:"我们的服务", ta:"எங்கள் சேவைகள்" },
    servicesSubtitle: {
      en: "From mandated OSH training to CIDB construction certifications and on-site consultancy — we handle compliance so you can focus on operations.",
      ms: "Dari latihan OSH wajib hingga pensijilan pembinaan CIDB dan perundingan di tapak — kami uruskan pematuhan supaya anda boleh fokus kepada operasi.",
      zh: "从强制性OSH培训到CIDB建筑认证及现场咨询——我们负责合规，让您专注于运营。",
      ta: "கட்டாய OSH பயிற்சி முதல் CIDB கட்டுமான சான்றிதழ்கள் மற்றும் தள ஆலோசனை வரை — நாங்கள் இணக்கத்தை கையாளுகிறோம், நீங்கள் செயல்பாடுகளில் கவனம் செலுத்தலாம்."
    },
    pillarOshTitle:       { en:"OSH Training", ms:"Latihan OSH", zh:"OSH培训", ta:"OSH பயிற்சி" },
    pillarOshDesc:        { en:"Certified programmes for Incident Investigation, Safety Committees, Forklift Safety, HIRARC, First Aid & CPR — claimable under HRD Corp.", ms:"Program bertauliah untuk Siasatan Insiden, Jawatankuasa Keselamatan, Keselamatan Forklift, HIRARC, Bantuan Kecemasan & CPR — boleh dituntut di bawah HRD Corp.", zh:"事故调查、安全委员会、叉车安全、HIRARC、急救与心肺复苏认证课程——可通过HRD Corp索回。", ta:"சம்பவ விசாரணை, பாதுகாப்பு குழுக்கள், ஃபோர்க்லிஃப்ட் பாதுகாப்பு, HIRARC, முதலுதவி & CPR-க்கான சான்றளிக்கப்பட்ட திட்டங்கள் — HRD Corp-ல் திரும்பப் பெறலாம்." },
    pillarCidbTitle:      { en:"CIDB & Construction Safety", ms:"CIDB & Keselamatan Pembinaan", zh:"CIDB与建筑安全", ta:"CIDB & கட்டுமான பாதுகாப்பு" },
    pillarCidbDesc:       { en:"Green Card (SICW), Working at Height, Scaffold Safety, Site Safety Management — all CIDB-aligned with on-site delivery.", ms:"Kad Hijau (SICW), Bekerja Di Ketinggian, Keselamatan Perancah, Pengurusan Keselamatan Tapak — semua sejajar CIDB dengan penghantaran di tapak.", zh:"绿卡（SICW）、高空作业、脚手架安全、工地安全管理——全部CIDB对齐，可现场授课。", ta:"பச்சை அட்டை (SICW), உயரத்தில் வேலை, தூண் பாதுகாப்பு, தள பாதுகாப்பு மேலாண்மை — அனைத்தும் CIDB வரிசைப்படுத்தப்பட்டது, தள விநியோகத்துடன்." },
    pillarConsultTitle:   { en:"Safety Consultancy", ms:"Perundingan Keselamatan", zh:"安全咨询", ta:"பாதுகாப்பு ஆலோசனை" },
    pillarConsultDesc:    { en:"HIRARC, Safety Audits, PPE supply, Safety Documentation — full-spectrum advisory to keep your sites audit-ready.", ms:"HIRARC, Audit Keselamatan, Pembekalan PPE, Dokumentasi Keselamatan — nasihat menyeluruh untuk memastikan tapak anda bersedia untuk audit.", zh:"HIRARC、安全审计、个人防护装备供应、安全文件——全方位咨询，让您的工地随时备审。", ta:"HIRARC, பாதுகாப்பு தணிக்கைகள், PPE வழங்கல், பாதுகாப்பு ஆவணங்கள் — உங்கள் தளங்களை தணிக்கைக்கு தயாராக வைக்க முழு அளவிலான ஆலோசனை." },
    pillarHrdTitle:       { en:"HRD Corp Support", ms:"Sokongan HRD Corp", zh:"HRD Corp支持", ta:"HRD Corp ஆதரவு" },
    pillarHrdDesc:        { en:"James Issachar (Trainer ID: 62976) guides you through e-TRiS grant applications so your training investment is recoverable.", ms:"James Issachar (ID Pengajar: 62976) membantu anda melalui permohonan geran e-TRiS supaya pelaburan latihan anda boleh dipulihkan.", zh:"James Issachar（培训师ID：62976）指导您完成e-TRiS资助申请，让您的培训投资可回收。", ta:"James Issachar (பயிற்சியாளர் ID: 62976) உங்கள் பயிற்சி முதலீடு மீட்கக்கூடியதாக இருக்க e-TRiS மானிய விண்ணப்பங்களில் உங்களுக்கு வழிகாட்டுகிறார்." },
    btnEnquireOsh:        { en:"Enquire about OSH Training", ms:"Tanya tentang Latihan OSH", zh:"咨询OSH培训", ta:"OSH பயிற்சி பற்றி விசாரிக்க" },
    btnEnquireCidb:       { en:"Enquire about CIDB Training", ms:"Tanya tentang Latihan CIDB", zh:"咨询CIDB培训", ta:"CIDB பயிற்சி பற்றி விசாரிக்க" },
    btnEnquireConsult:    { en:"Enquire about Consultancy", ms:"Tanya tentang Perundingan", zh:"咨询安全顾问服务", ta:"ஆலோசனை பற்றி விசாரிக்க" },
    btnEnquireHrd:        { en:"Check HRD Claim Eligibility", ms:"Semak Kelayakan Tuntutan HRD", zh:"查询HRD索回资格", ta:"HRD திரும்பப் பெறும் தகுதியை சரிபார்க்க" },

    // Homepage Clients (C-06 reframed)
    clientsTitle: {
      en: "A Historical Track Record of Field Delivery Across Two Decades",
      ms: "Rekod Penghantaran Padang Bersejarah Merentasi Dua Dekad",
      zh: "二十年实地交付历史记录",
      ta: "இரண்டு தசாப்தங்களாக கள வழங்கலின் வரலாற்று பதிவு"
    },
    clientsSubtitle: {
      en: "Real companies. Real sites. Real compliance outcomes across two decades.",
      ms: "Syarikat sebenar. Tapak sebenar. Keputusan pematuhan sebenar merentasi dua dekad.",
      zh: "真实企业。真实工地。二十年真实合规成果。",
      ta: "உண்மையான நிறுவனங்கள். உண்மையான தளங்கள். இரண்டு தசாப்தங்களாக உண்மையான இணக்க முடிவுகள்."
    },
    clientsPreamble: {
      en: "Naja Safety's practitioners have proudly trained personnel and managed project hazard parameters past and present for components of:",
      ms: "Pengamal Naja Safety dengan bangga telah melatih kakitangan dan mengurus parameter bahaya projek pada masa lalu dan kini untuk komponen:",
      zh: "Naja Safety的执业人员自豪地为以下机构的组成部分培训人员并管理项目风险参数（过去及现在）：",
      ta: "Naja Safety-யின் நிபுணர்கள் கீழ்க்கண்டவற்றின் கூறுகளுக்கு பெருமையுடன் ஊழியர்களுக்கு பயிற்சி அளித்து திட்ட அபாய அளவீட்டை நிர்வகித்துள்ளனர்:"
    },
    clientStatCompanies: { en:"Client Companies", ms:"Syarikat Pelanggan", zh:"客户企业", ta:"வாடிக்கையாளர் நிறுவனங்கள்" },
    clientStatYears:     { en:"Years in Operation", ms:"Tahun Beroperasi", zh:"运营年数", ta:"செயல்பாட்டில் உள்ள ஆண்டுகள்" },
    clientStatReach:     { en:"Nationwide Reach", ms:"Jangkauan Seluruh Negara", zh:"全国覆盖范围", ta:"நாடு முழுவதும் விநியோகம்" },
    clientFootnote: {
      en: "Naja Safety's practitioners have proudly trained personnel and managed project hazard parameters past and present for components of the organisations listed above.",
      ms: "Pengamal Naja Safety dengan bangga telah melatih kakitangan dan mengurus parameter bahaya projek pada masa lalu dan kini untuk komponen organisasi yang disenaraikan di atas.",
      zh: "Naja Safety的执业人员自豪地为上述所列机构的组成部分培训人员并管理项目风险参数（过去及现在）。",
      ta: "Naja Safety-யின் நிபுணர்கள் மேலே பட்டியலிடப்பட்டுள்ள நிறுவனங்களின் கூறுகளுக்கு பெருமையுடன் ஊழியர்களுக்கு பயிற்சி அளித்து திட்ட அபாய அளவீட்டை நிர்வகித்துள்ளனர்."
    },

    // Homepage Benefits
    benefitsTitle:    { en:"Why Safety Pays", ms:"Mengapa Keselamatan Berbaloi", zh:"安全为何值得投资", ta:"பாதுகாப்பு ஏன் பயனளிக்கிறது" },
    benefitsSubtitle: { en:"Promotion, education, and awareness are vital elements of occupational safety and health programs.", ms:"Promosi, pendidikan, dan kesedaran adalah elemen penting dalam program keselamatan dan kesihatan pekerjaan.", zh:"推广、教育和意识是职业安全与健康计划的重要组成部分。", ta:"விளம்பரம், கல்வி மற்றும் விழிப்புணர்வு தொழில் பாதுகாப்பு மற்றும் சுகாதார திட்டங்களின் முக்கிய அம்சங்களாகும்." },
    benefitInjuries: { en:"Reduce and Eliminate Worker Injuries", ms:"Kurangkan dan Hapuskan Kecederaan Pekerja", zh:"减少并消除工伤", ta:"தொழிலாளர் காயங்களை குறைத்து அகற்றுதல்" },
    benefitInjuriesDesc: { en:"Proactive safety systems catch hazards before they become incidents. Fewer injuries mean fewer lost workdays and less disruption.", ms:"Sistem keselamatan proaktif menangkap bahaya sebelum menjadi insiden. Kecederaan yang lebih kurang bermakna lebih kurang hari kerja yang hilang dan kurang gangguan.", zh:"主动安全系统在危险变成事故之前将其拦截。工伤越少，损失工作日和干扰就越少。", ta:"முன்னெச்சரிக்கை பாதுகாப்பு அமைப்புகள் அபாயங்களை சம்பவங்களாக மாறுவதற்கு முன்பே பிடிக்கின்றன. குறைந்த காயங்கள் என்றால் குறைந்த இழந்த வேலை நாட்கள் மற்றும் குறைந்த இடையூறு." },
    benefitCosts: { en:"Reduce Accident Costs", ms:"Kurangkan Kos Kemalangan", zh:"降低事故成本", ta:"விபத்து செலவுகளை குறைக்க" },
    benefitCostsDesc: { en:"Every ringgit spent on prevention saves multiple ringgits in compensation, repairs, and legal exposure down the line.", ms:"Setiap ringgit yang dibelanjakan untuk pencegahan menjimatkan berbilang ringgit dalam pampasan, pembaikan, dan pendedahan undang-undang pada masa hadapan.", zh:"每一分花在预防上的令吉，都能在未来节省数倍于赔偿、维修和法律风险上的令吉。", ta:"தடுப்பில் செலவழிக்கப்படும் ஒவ்வொரு ரிங்கிட்டும் இழப்பீடு, பழுதுபார்ப்பு மற்றும் சட்ட வெளிப்பாட்டில் பல மடங்கு ரிங்கிட்டை சேமிக்கிறது." },
    benefitProductivity: { en:"Increase Productivity", ms:"Tingkatkan Produktiviti", zh:"提高生产力", ta:"விளைச்சலை அதிகரிக்க" },
    benefitProductivityDesc: { en:"Safe workplaces run smoother. When workers feel protected, morale rises and output stabilises.", ms:"Tempat kerja yang selamat berjalan dengan lancar. Apabila pekerja berasa dilindungi, semangat meningkat dan hasil penstabilan.", zh:"安全的工作场所运行更顺畅。当员工感到受到保护时，士气上升，产出稳定。", ta:"பாதுகாப்பான பணியிடங்கள் மெதுவாக இயங்குகின்றன. தொழிலாளர்கள் பாதுகாக்கப்படுவதாக உணரும்போது, மனநிலை உயர்ந்து வெளியீடு நிலைப்படுத்தப்படுகிறது." },
    benefitMorale: { en:"Boost Employee Morale", ms:"Tingkatkan Semangat Pekerja", zh:"提升员工士气", ta:"ஊழியர் மனநிலையை மேம்படுத்து" },
    benefitMoraleDesc: { en:"Goodwill between employees and management grows when safety is visibly prioritised at every level.", ms:"Kesihatan di antara pekerja dan pengurusan berkembang apabila keselamatan diberi keutamaan pada setiap peringkat.", zh:"当安全在每个层级都被 visibly 优先考虑时，员工与管理层之间的信任会增长。", ta:"ஒவ்வொரு நிலையிலும் பாதுகாப்பு தெளிவாக முன்னுரிமை அளிக்கப்படும்போது ஊழியர்களுக்கும் மேலாண்மைக்கும் இடையே நல்லெண்ணம் வளர்கிறது." },

    // Homepage CTA
    ctaTitle: { en:"Ready to Secure Your Workforce?", ms:"Sedia untuk Lindungi Tenaga Kerja Anda?", zh:"准备好保护您的员工了吗？", ta:"உங்கள் பணியாளர்களை பாதுகாக்க தயாரா?" },
    ctaSubtitle: { en:"Book a training session, request a site audit, or enquire about HRD Corp claimable programmes. Our team responds within 24 hours.", ms:"Tempah sesi latihan, minta audit tapak, atau tanya tentang program tuntut HRD Corp. Pasukan kami menjawab dalam masa 24 jam.", zh:"预约培训课程、请求现场审计或咨询HRD Corp可索回项目。我们的团队在24小时内回复。", ta:"பயிற்சி அமர்வை முன்பதிவு செய்யுங்கள், தள தணிக்கையை கோருங்கள், அல்லது HRD Corp திரும்பப் பெறக்கூடிய திட்டங்களைப் பற்றி விசாரியுங்கள். எங்கள் குழு 24 மணி நேரத்திற்குள் பதிலளிக்கிறது." },
    ctaBtnContact: { en:"Get in Touch", ms:"Hubungi Kami", zh:"联系我们", ta:"தொடர்பு கொள்ளுங்கள்" },
    ctaBtnWhatsApp: { en:"WhatsApp Us", ms:"WhatsApp Us", zh:"WhatsApp Us", ta:"வாட்ஸ்அப் சுஜென்" },

    // Footer (shared)
    footerCol1Title: { en:"Naja Safety", ms:"Naja Safety", zh:"Naja Safety", ta:"Naja Safety" },
    footerCol1Desc: { en:"Your trusted safety partner for training, consultancy & compliance across Malaysia.", ms:"Rakan keselamatan dipercayai anda untuk latihan, perundingan & pematuhan di seluruh Malaysia.", zh:"您在马来西亚培训、咨询与合规方面值得信赖的安全合作伙伴。", ta:"மலேசியா முழுவதும் பயிற்சி, ஆலோசனை & இணக்கத்திற்கான உங்கள் நம்பகமான பாதுகாப்பு கூட்டாளி." },
    footerCol2Title: { en:"Quick Links", ms:"Pautan Pantas", zh:"快速链接", ta:"விரைவு இணைப்புகள்" },
    footerCol3Title: { en:"Services", ms:"Perkhidmatan", zh:"服务", ta:"சேவைகள்" },
    footerCol4Title: { en:"Contact", ms:"Hubungi", zh:"联系", ta:"தொடர்பு" },
    footerHotline: { en:"Hotline: 016-730-1802", ms:"Hotline: 016-730-1802", zh:"热线：016-730-1802", ta:"ஹாட்லைன்: 016-730-1802" },
    footerWhatsApp: { en:"WhatsApp Us", ms:"WhatsApp Kami", zh:"WhatsApp我们", ta:"வாட்ஸ்அப் செய்யுங்கள்" },
    footerEmail: { en:"info@safetyconsultants.com.my", ms:"info@safetyconsultants.com.my", zh:"info@safetyconsultants.com.my", ta:"info@safetyconsultants.com.my" },
    footerAddr: { en:"09-03, Blok C, Kompleks Austin Perdana, Taman Mount Austin, 81100 Johor Bahru", ms:"09-03, Blok C, Kompleks Austin Perdana, Taman Mount Austin, 81100 Johor Bahru", zh:"09-03, Blok C, Kompleks Austin Perdana, Taman Mount Austin, 81100 Johor Bahru", ta:"09-03, Blok C, Kompleks Austin Perdana, Taman Mount Austin, 81100 Johor Bahru" },
    footerRights: { en:"All rights reserved.", ms:"Hak cipta terpelihara.", zh:"版权所有。", ta:"அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை." },

    // Course Landing Page Heroes
    oshcHeroTitle: { en:"OSH Coordinator (OSH-C) Training & Appointment", ms:"Latihan & Pelantikan Penyelaras OSH (OSH-C)", zh:"OSH协调员（OSH-C）培训与任命", ta:"OSH ஒருங்கிணைப்பாளர் (OSH-C) பயிற்சி & நியமனம்" },
    oshcHeroSubtitle: { en:"Section 29A of the OSH (Amendment) Act 2022 requires every Malaysian workplace with 5 or more employees to appoint an OSH Coordinator. We train and guide the appointment — on-site, 2–5 days, HRD Corp claimable.", ms:"Seksyen 29A Akta OSHA (Pindaan) 2022 menghendaki setiap tempat kerja Malaysia dengan 5 atau lebih pekerja melantik Penyelaras OSH. Kami melatih dan membantu pelantikan — di tapak, 2–5 hari, boleh dituntut HRD Corp.", zh:"2022年《职业安全卫生法（修正）法》第29A条要求每个拥有5名或以上员工的马来西亚工作场所任命一名OSH协调员。我们提供培训并协助任命——现场授课，2至5天，可申报HRD Corp。", ta:"2022 OSH சட்டத்தின் பிரிவு 29A, 5 அல்லது அதற்கு மேற்பட்ட தொழிலாளர்களைக் கொண்ட ஒவ்வொரு மலேசிய பணியிடமும் OSH ஒருங்கிணைப்பாளரை நியமிக்க வேண்டும். நாங்கள் பயிற்சி அளித்து நியமனத்தை வழிநடத்துகிறோம் — தளத்தில், 2–5 நாட்கள், HRD Corp உரிமை கோரக்கூடியது." },
    oshcHeroBtnBook: { en:"Book OSH-C Training", ms:"Tempah Latihan OSH-C", zh:"预约OSH-C培训", ta:"OSH-C பயிற்சியை முன்பதிவு செய்யுங்கள்" },
    oshcHeroBtnCall: { en:"Contact Naja Safety", ms:"Hubungi Naja Safety", zh:"联系Naja Safety", ta:"Naja Safety-ஐ தொடர்பு கொள்ளுங்கள்" },

    gcHeroTitle: { en:"CIDB Green Card Training (SICW)", ms:"Latihan Kad Hijau CIDB (SICW)", zh:"CIDB绿卡培训（SICW）", ta:"CIDB பச்சை அட்டை பயிற்சி (SICW)" },
    gcHeroSubtitle: { en:"Mandatory construction induction certification from CIDB Centre Code PLSICW20231022-068. Classroom and on-site delivery across Malaysia.", ms:"Pensijilan induksi pembinaan wajib dari Pusat CIDB Kod PLSICW20231022-068. Kelas dan penghantaran di tapak di seluruh Malaysia.", zh:"CIDB中心代码PLSICW20231022-068颁发的强制性建筑入门认证。马来西亚全国课堂及现场授课。", ta:"CIDB மையக் குறியீடு PLSICW20231022-068 இலிருந்து கட்டாய கட்டுமான அறிமுக சான்றிதழ். மலேசியா முழுவதும் வகுப்பறை மற்றும் தள விநியோகம்." },
    gcHeroBtnBook: { en:"Book Green Card Training", ms:"Tempah Latihan Kad Hijau", zh:"预约绿卡培训", ta:"பச்சை அட்டை பயிற்சியை முன்பதிவு செய்யுங்கள்" },

    ssHeroTitle: { en:"Scaffold Safety Awareness Program", ms:"Program Kesedaran Keselamatan Perancah", zh:"脚手架安全意识计划", ta:"தூண் பாதுகாப்பு விழிப்புணர்வு திட்டம்" },
    ssHeroSubtitle: { en:"Practical scaffold erection, inspection, and dismantling training for construction sites. On-site delivery with real equipment demonstrations.", ms:"Latihan praktikal pembinaan, pemeriksaan, dan pembongkaran perancah untuk tapak pembinaan. Penghantaran di tapak dengan demonstrasi peralatan sebenar.", zh:"建筑工地脚手架搭建、检查和拆除实用培训。现场授课，使用真实设备演示。", ta:"கட்டுமான தளங்களுக்கான நடைமுறை தூண் எrection, தணிக்கை, மற்றும் அகற்றல் பயிற்சி. உண்மையான உபகரண பயிற்சிகளுடன் தள விநியோகம்." },
    ssHeroBtnBook: { en:"Book Scaffold Training", ms:"Tempah Latihan Perancah", zh:"预约脚手架培训", ta:"தூண் பயிற்சியை முன்பதிவு செய்யுங்கள்" },

    chemHeroTitle: { en:"Chemical Safety Training", ms:"Latihan Keselamatan Bahan Kimia", zh:"化学品安全培训", ta:"வேதிப்பொருள் பாதுகாப்பு பயிற்சி" },
    chemHeroSubtitle: { en:"Safe handling, storage, labelling, and emergency response for hazardous chemicals in the workplace. Classroom and on-site delivery across Malaysia.", ms:"Pengendalian, penyimpanan, pelabelan, dan tindak balas kecemasan yang selamat untuk bahan kimia berbahaya di tempat kerja. Kelas dan penghantaran di tapak di seluruh Malaysia.", zh:"工作场所危险化学品的安全处理、储存、标识和应急响应。马来西亚全国课堂及现场授课。", ta:"பணியிடத்தில் அபாயமான வேதிப்பொருட்களுக்கான பாதுகாப்பான கையாளுதல், சேமிப்பு, குறியீட்டு மற்றும் அவசர பதில். மலேசியா முழுவதும் வகுப்பறை மற்றும் தள விநியோகம்." },
    chemHeroBtnBook: { en:"Book Chemical Safety Training", ms:"Tempah Latihan Keselamatan Bahan Kimia", zh:"预约化学品安全培训", ta:"வேதிப்பொருள் பாதுகாப்பு பயிற்சியை முன்பதிவு செய்யுங்கள்" },

    // Generic course CTA
    ctaReqSchedule: { en:"Request Training Schedule", ms:"Minta Jadual Latihan", zh:"请求培训时间表", ta:"பயிற்சி அட்டவணையை கோருங்கள்" },
    ctaWhatsAppSujen: { en:"WhatsApp Us", ms:"WhatsApp Us", zh:"WhatsApp Us", ta:"வாட்ஸ்அப் செய்யுங்கள்" },

    // Services page hero
    servicesHeroTitle: { en:"Safety Services & Training Programmes", ms:"Perkhidmatan Keselamatan & Program Latihan", zh:"安全服务与培训计划", ta:"பாதுகாப்பு சேவைகள் & பயிற்சி திட்டங்கள்" },
    servicesHeroSubtitle: { en:"From OSH compliance training and CIDB certifications to full-spectrum safety consultancy. On-site and classroom delivery across Malaysia.", ms:"Dari latihan pematuhan OSH dan pensijilan CIDB hingga perundingan keselamatan menyeluruh. Penghantaran di tapak dan bilik darjah di seluruh Malaysia.", zh:"从OSH合规培训、CIDB认证到全方位安全咨询。马来西亚全国现场及课堂授课。", ta:"OSH இணக்க பயிற்சி மற்றும் CIDB சான்றிதழ்கள் முதல் முழு அளவிலான பாதுகாப்பு ஆலோசனை வரை. மலேசியா முழுவதும் தள மற்றும் வகுப்பறை விநியோகம்." },

    // About page hero
    aboutHeroTitle: { en:"About Naja Safety", ms:"Tentang Naja Safety", zh:"关于Naja Safety", ta:"Naja Safety பற்றி" },
    aboutHeroSubtitle: { en:"Two decades of protecting people, places, and businesses across Malaysia.", ms:"Dua dekad melindungi orang, tempat, dan perniagaan di seluruh Malaysia.", zh:"二十年守护马来西亚的人、场所与企业。", ta:"இரண்டு தசாப்தங்களாக மலேசியா முழுவதும் மக்கள், இடங்கள் மற்றும் வணிகங்களை பாதுகாத்தல்." },

    // Contact page hero
    contactHeroTitle: { en:"Contact Naja Safety", ms:"Hubungi Naja Safety", zh:"联系Naja Safety", ta:"Naja Safety உடன் தொடர்பு கொள்ளுங்கள்" },
    contactHeroSubtitle: { en:"Ready to make your workplace safer? Reach us by phone, WhatsApp, email, or the form below.", ms:"Sedia untuk menjadikan tempat kerja anda lebih selamat? Hubungi kami melalui telefon, WhatsApp, emel, atau borang di bawah.", zh:"准备好让您的工作场所更安全了吗？通过电话、WhatsApp、电子邮件或下方表格联系我们。", ta:"உங்கள் பணியிடத்தை பாதுகாப்பானதாக மாற்ற தயாரா? தொலைபேசி, வாட்ஸ்அப், மின்னஞ்சல் அல்லது கீழே உள்ள படிவம் மூலம் எங்களை அணுகவும்." },
    contactFormName: { en:"Name", ms:"Nama", zh:"姓名", ta:"பெயர்" },
    contactFormEmail: { en:"Email", ms:"Emel", zh:"电子邮件", ta:"மின்னஞ்சல்" },
    contactFormPhone: { en:"Phone", ms:"Telefon", zh:"电话", ta:"தொலைபேசி" },
    contactFormService: { en:"Select a service...", ms:"Pilih perkhidmatan...", zh:"选择服务...", ta:"சேவையைத் தேர்ந்தெடுக்கவும்..." },
    contactFormMessage: { en:"Message", ms:"Mesej", zh:"留言", ta:"செய்தி" },
    contactFormPDPA: { en:"I consent to Naja Safety processing my personal data in accordance with the Malaysian Personal Data Protection Act 2010. I understand my data will be used solely to respond to this enquiry.", ms:"Saya bersetuju Naja Safety memproses data peribadi saya mengikut Akta Perlindungan Data Peribadi Malaysia 2010. Saya faham data saya akan digunakan semata-mata untuk menjawab pertanyaan ini.", zh:"本人同意Naja Safety根据2010年马来西亚个人数据保护法处理本人的个人数据。本人明白本人的数据将仅用于回复此咨询。", ta:"2010 மலேசியா தனிநபர் தரவு பாதுகாப்பு சட்டத்தின்படி Naja Safety எனது தனிப்பட்ட தரவை செயலாக்க நான் சம்மதிக்கிறேன். இந்த விசாரணைக்கு பதிலளிக்க மட்டுமே எனது தரவு பயன்படுத்தப்படும் என்பதை நான் புரிந்துகொள்கிறேன்." },
    contactBtnSend: { en:"Send Enquiry", ms:"Hantar Pertanyaan", zh:"发送咨询", ta:"விசாரணையை அனுப்பு" },

    // FAQ generic
    faqIndustriesQ: { en:"What industries do you serve?", ms:"Industri apa yang anda layani?", zh:"你们服务哪些行业？", ta:"நீங்கள் எந்த துறைகளுக்கு சேவை செய்கிறீர்கள்?" },
    faqIndustriesA: { en:"We serve construction, manufacturing, engineering, oil & gas, and government-linked projects. Notable clients include Econpile, Gadang Engineering, Penta Ocean Malaysia, GP Batteries, and CIDB.", ms:"Kami melayani pembinaan, pembuatan, kejuruteraan, minyak & gas, dan projek berkaitan kerajaan. Pelanggan terkemuka termasuk Econpile, Gadang Engineering, Penta Ocean Malaysia, GP Batteries, dan CIDB.", zh:"我们服务于建筑、制造、工程、石油天然气及政府关联项目。著名客户包括Econpile、Gadang Engineering、Penta Ocean Malaysia、GP Batteries及CIDB。", ta:"கட்டுமானம், உற்பத்தி, பொறியியல், எண்ணெய் & வாயு, மற்றும் அரசு தொடர்புடைய திட்டங்களுக்கு நாங்கள் சேவை செய்கிறோம். குறிப்பிடத்தக்க வாடிக்கையாளர்களில் Econpile, Gadang Engineering, Penta Ocean Malaysia, GP Batteries, மற்றும் CIDB அடங்கும்." },
    faqCustomQ: { en:"Can training be customised for our company?", ms:"Bolehkah latihan diubah suai untuk syarikat kami?", zh:"培训可以根据我们公司定制吗？", ta:"எங்கள் நிறுவனத்திற்கு பயிற்சி தனிப்பயனாக்கப்படலாமா?" },
    faqCustomA: { en:"Yes. We design customised, site-focused HSE frameworks built completely around your industry's specific HIRARC metrics. For small-to-medium operations crossing the 5-employee threshold, we fast-track internal team members through the official OSH Coordinator syllabus.", ms:"Ya. Kami mereka bentuk rangka kerja HSE yang disesuaikan dan berfokuskan tapak berdasarkan metrik HIRARC khusus industri anda. Untuk operasi kecil hingga sederhana yang melepasi ambang 5 pekerja, kami mempercepat ahli pasukan dalaman anda melalui sukatan pelajaran Penyelaras OSH rasmi.", zh:"可以。我们设计定制化、以现场为重点的HSE框架，完全围绕您所在行业的特定HIRARC指标。对于跨过5名员工门槛的中小型企业，我们加快内部团队成员通过官方OSH协调员教学大纲。", ta:"ஆம். உங்கள் தொழில்துறையின் குறிப்பிட்ட HIRARC அளவீடுகளை முழுமையாக சுற்றி கட்டப்பட்ட தனிப்பயனாக்கப்பட்ட, தள மைய HSE கட்டமைப்புகளை நாங்கள் வடிவமைக்கிறோம். 5 ஊழியர் வரம்பை கடக்கும் சிறு மற்றும் நடுத்தர செயல்பாடுகளுக்கு, எங்கள் அதிகாரப்பூர்வ OSH ஒருங்கிணைப்பாளர் பாடத்திட்டத்தின் மூலம் உள்ளக குழு உறுப்பினர்களை விரைவாக முன்னேற்றுகிறோம்." },

    // Courses page
    coursesHeroTitle: { en:"Safety Courses & Training Programmes", ms:"Kursus Keselamatan & Program Latihan", zh:"安全课程与培训计划", ta:"பாதுகாப்பு படிப்புகள் & பயிற்சி திட்டங்கள்" },
    coursesHeroSubtitle: { en:"HRD Corp claimable and CIDB-certified courses. Delivered at your site or in our classroom across Malaysia.", ms:"Kursus tuntut HRD Corp dan bertauliah CIDB. Dihantar di tapak anda atau di bilik darjah kami di seluruh Malaysia.", zh:"HRD Corp可索回及CIDB认证课程。在贵司现场或我们的教室授课，覆盖马来西亚全国。", ta:"HRD Corp திரும்பப் பெறக்கூடிய மற்றும் CIDB சான்றளிக்கப்பட்ட படிப்புகள். உங்கள் தளத்தில் அல்லது எங்கள் வகுப்பறையில் மலேசியா முழுவதும் வழங்கப்படுகிறது." },
    coursesCtaTitle: { en:"Need a Custom Training Package?", ms:"Perlukan Pakej Latihan Khusus?", zh:"需要定制培训方案吗？", ta:"தனிப்பயனாக்கப்பட்ட பயிற்சி தொகுப்பு தேவையா?" },
    coursesCtaSubtitle: { en:"We can tailor any programme to your site, industry, and workforce. Contact us for a free proposal.", ms:"Kami boleh ubah suai mana-mana program mengikut tapak, industri, dan tenaga kerja anda. Hubungi kami untuk cadangan percuma.", zh:"我们可以根据您的工地、行业和员工定制任何课程。联系我们获取免费方案。", ta:"உங்கள் தளம், தொழில் மற்றும் பணியாளர்களுக்கு ஏற்ப எந்த திட்டத்தையும் தனிப்பயனாக்க முடியும். இலவச முன்மொழிவுக்கு எங்களை தொடர்பு கொள்ளுங்கள்." },
    btnReqProposal: { en:"Request a Proposal", ms:"Minta Cadangan", zh:"请求方案", ta:"முன்மொழிவை கோருங்கள்" },
    btnWhatsAppSujen: { en:"WhatsApp Us", ms:"WhatsApp Us", zh:"WhatsApp Us", ta:"வாட்ஸ்அப் செய்யுங்கள்" },
    btnReqTraining: { en:"Request Training Schedule", ms:"Minta Jadual Latihan", zh:"请求培训时间表", ta:"பயிற்சி அட்டவணையை கோருங்கள்" },

    // Course landing CTAs
    oschCtaTitle: { en:"Book OSH-C Training and Get Your Appointment Letter Sorted", ms:"Tempah Latihan OSH-C dan Dapatkan Surat Pelantikan Anda", zh:"预约OSH-C培训并获取任命书", ta:"OSH-C பயிற்சியை முன்பதிவு செய்து நியமன கடிதத்தைப் பெறுங்கள்" },
    oschCtaSubtitle: { en:"Train your OSH Coordinator on-site over 2–5 days. We provide competency certification and an appointment letter template. HRD Corp claimable.", ms:"Latih Penyelaras OSH anda di tapak selama 2–5 hari. Kami menyediakan pensijilan kecekapan dan templat surat pelantikan. Boleh dituntut HRD Corp.", zh:"在您的现场培训OSH协调员，为期2至5天。我们提供能力认证和任命书模板。可申报HRD Corp。", ta:"உங்கள் OSH ஒருங்கிணைப்பாளரை தளத்தில் 2–5 நாட்கள் பயிற்சி அளிக்கிறோம். திறன் சான்றிதழ் மற்றும் நியமன கடித வார்ப்புருவை வழங்குகிறோம். HRD Corp உரிமை கோரக்கூடியது." },
    gcCtaTitle: { en:"Get Your Team CIDB Green Card Certified", ms:"Dapatkan Sijil Kad Hijau CIDB untuk Pasukan Anda", zh:"让您的团队获得CIDB绿卡认证", ta:"உங்கள் குழுவிற்கு CIDB பச்சை அட்டை சான்றிதழ் பெறுங்கள்" },
    gcCtaSubtitle: { en:"One-day mandatory induction training with official CIDB certification. Book classroom slots in Johor Bahru or schedule on-site delivery for your project.", ms:"Latihan induksi wajib sehari dengan pensijilan CIDB rasmi. Tempah slot bilik darjah di Johor Bahru atau jadualkan penghantaran di tapak untuk projek anda.", zh:"为期一天的强制性入门培训，附带官方CIDB认证。预约新山教室名额或安排项目现场授课。", ta:"அதிகாரப்பூர்வ CIDB சான்றிதழுடன் ஒருநாள் கட்டாய அறிமுக பயிற்சி. ஜொகூர் பாருவில் வகுப்பறை இடங்களை முன்பதிவு செய்யுங்கள் அல்லது உங்கள் திட்டத்திற்கு தள விநியோகத்தை திட்டமிடுங்கள்." },
    ssCtaTitle: { en:"Reduce Scaffold Risk On Your Site", ms:"Kurangkan Risiko Perancah Di Tapak Anda", zh:"降低您工地的脚手架风险", ta:"உங்கள் தளத்தில் தூண் அபாயத்தை குறைக்கவும்" },
    ssCtaSubtitle: { en:"One day of practical scaffold safety training can prevent months of project delays and protect your workers from preventable falls. Book on-site delivery anywhere in Malaysia.", ms:"Satu hari latihan keselamatan perancah praktikal dapat mengelakkan berbulan-bulan kelewatan projek dan melindungi pekerja anda dari jatuh yang boleh dicegah. Tempah penghantaran di tapak di mana-mana di Malaysia.", zh:"一天的实用脚手架安全培训可防止数月的项目延误，并保护您的工人免于可预防的坠落。在马来西亚任何地方预约现场授课。", ta:"ஒருநாள் நடைமுறை தூண் பாதுகாப்பு பயிற்சி மாதக்கணக்கான திட்ட தாமதங்களை தடுக்க முடியும் மற்றும் தடுக்கக்கூடிய விழுவதிலிருந்து உங்கள் தொழிலாளர்களை பாதுகாக்க முடியும். மலேசியாவில் எங்கும் தள விநியோகத்தை முன்பதிவு செய்யுங்கள்." },
    chemCtaTitle: { en:"Protect Your Team From Chemical Hazards", ms:"Lindungi Pasukan Anda Dari Bahaya Bahan Kimia", zh:"保护您的团队免受化学危害", ta:"வேதிப்பொருள் அபாயங்களிலிருந்து உங்கள் குழுவை பாதுகாக்கவும்" },
    chemCtaSubtitle: { en:"One day of chemical safety training reduces incident risk, ensures regulatory compliance, and builds workforce confidence when handling hazardous substances.", ms:"Satu hari latihan keselamatan bahan kimia mengurangkan risiko insiden, memastikan pematuhan peraturan, dan membina keyakinan tenaga kerja semasa mengendalikan bahan berbahaya.", zh:"一天的化学品安全培训可降低事故风险，确保法规合规，并在处理危险物质时增强员工信心。", ta:"ஒருநாள் வேதிப்பொருள் பாதுகாப்பு பயிற்சி சம்பவ அபாயத்தை குறைக்கிறது, கட்டுப்பாட்டு இணக்கத்தை உறுதி செய்கிறது, அபாயமான பொருட்களை கையாளும்போது பணியாளர்களின் நம்பிக்கையை உருவாக்குகிறது." },

    // Form labels & placeholders (shared)
    formLabelName: { en:"Name", ms:"Nama", zh:"姓名", ta:"பெயர்" },
    formLabelCompany: { en:"Company", ms:"Syarikat", zh:"公司", ta:"நிறுவனம்" },
    formLabelPhone: { en:"Phone or WhatsApp", ms:"Telefon atau WhatsApp", zh:"电话或WhatsApp", ta:"தொலைபேசி அல்லது வாட்ஸ்அப்" },
    formLabelService: { en:"Service Interested In", ms:"Perkhidmatan Yang Diminati", zh:"感兴趣的服务", ta:"ஆர்வமுள்ள சேவை" },
    formPlaceholderName: { en:"Your full name", ms:"Nama penuh anda", zh:"您的全名", ta:"உங்கள் முழு பெயர்" },
    formPlaceholderCompany: { en:"Your company", ms:"Syarikat anda", zh:"您的公司", ta:"உங்கள் நிறுவனம்" },
    formPlaceholderPhone: { en:"+60 12-345 6789", ms:"+60 12-345 6789", zh:"+60 12-345 6789", ta:"+60 12-345 6789" },
    formOptionDefault: { en:"Select a service...", ms:"Pilih perkhidmatan...", zh:"选择服务...", ta:"சேவையைத் தேர்ந்தெடுக்கவும்..." },
    formOptionOsh: { en:"OSH Training", ms:"Latihan OSH", zh:"OSH培训", ta:"OSH பயிற்சி" },
    formOptionCidb: { en:"CIDB / Construction Safety", ms:"CIDB / Keselamatan Pembinaan", zh:"CIDB / 建筑安全", ta:"CIDB / கட்டுமான பாதுகாப்பு" },
    formOptionConsult: { en:"Safety Consultancy", ms:"Perundingan Keselamatan", zh:"安全咨询", ta:"பாதுகாப்பு ஆலோசனை" },
    formOptionHrd: { en:"HRD Corp Support", ms:"Sokongan HRD Corp", zh:"HRD Corp支持", ta:"HRD Corp ஆதரவு" },
    formOptionOther: { en:"Other", ms:"Lain-lain", zh:"其他", ta:"மற்றவை" },
    formBtnSubmit: { en:"Send Enquiry", ms:"Hantar Pertanyaan", zh:"发送咨询", ta:"விசாரணையை அனுப்பு" },

    // Mobile sticky CTA
    mobileStickyCta: { en:"Chat on WhatsApp", ms:"Berbual di WhatsApp", zh:"WhatsApp咨询", ta:"வாட்ஸ்அப்பில் அரட்டை" },

    // HRD Corp flowchart SVG
    flowStep1Label: { en:"Audit", ms:"Audit", zh:"审计", ta:"தணிக்கை" },
    flowStep1Desc: { en:"Review levy balance & risk", ms:"Semak baki levi & risiko", zh:"审查征费余额与风险", ta:"லெவி இருப்பு & அபாயத்தை மதிப்பீடு" },
    flowStep2Label: { en:"Design", ms:"Reka Bentuk", zh:"设计", ta:"வடிவமைப்பு" },
    flowStep2Desc: { en:"Map programmes to gaps", ms:"Peta program ke jurang", zh:"规划课程填补缺口", ta:"குறைபாடுகளுக்கு திட்டங்களை வரைபடமாக்கு" },
    flowStep3Label: { en:"Train", ms:"Latih", zh:"培训", ta:"பயிற்சி" },
    flowStep3Desc: { en:"On-site by Trainer 62976", ms:"Di tapak oleh Pengajar 62976", zh:"由培训师62976现场授课", ta:"பயிற்சியாளர் 62976 மூலம் தளத்தில்" },
    flowStep4Label: { en:"Claim", ms:"Tuntut", zh:"索回", ta:"கோரிக்கை" },
    flowStep4Desc: { en:"e-TRiS documentation support", ms:"Sokongan dokumentasi e-TRiS", zh:"e-TRiS文件支持", ta:"e-TRiS ஆவண ஆதரவு" },

    // Operational Comparison Grid
    compareTitle: { en:"How We Deliver Training", ms:"Cara Kami Menghantar Latihan", zh:"我们如何提供培训", ta:"நாங்கள் பயிற்சியை எவ்வாறு வழங்குகிறோம்" },
    compareSubtitle: { en:"In-house programmes tailored to your facility vs. public seminar slots.", ms:"Program dalaman yang disesuaikan dengan kemudahan anda berbanding slot seminar awam.", zh:"为您设施量身定制的内部课程与公共研讨会名额对比。", ta:"உங்கள் வசதிக்கு ஏற்ப வடிவமைக்கப்பட்ட உள்ளக திட்டங்கள் vs பொதுக் கருத்தரங்க இடங்கள்." },
    compareFeaturedBadge: { en:"Recommended", ms:"Disyorkan", zh:"推荐", ta:"பரிந்துரைக்கப்பட்டது" },
    compareInHouseTitle: { en:"In-House Delivery", ms:"Penghantaran Dalam Rumah", zh:"内部授课", ta:"உள்ளக விநியோகம்" },
    compareInHouse1: { en:"Zero travel downtime — your team trains on-site without leaving the facility", ms:"Tiada masa henti perjalanan — pasukan anda dilatih di tapak tanpa meninggalkan kemudahan", zh:"零出行停工时间——您的团队在设施现场接受培训，无需离开", ta:"பயண இடைநிறுத்தம் இல்லை — உங்கள் குழு வசதியை விட்டு வெளியேறாமல் தளத்தில் பயிற்சி பெறுகிறது" },
    compareInHouse2: { en:"Specialized facility hazard mapping mapped into every module", ms:"Pemetaan bahaya kemudahan khusus dipetakan ke dalam setiap modul", zh:"将专业设施危害映射融入每个模块", ta:"ஒவ்வொரு தொகுதியிலும் சிறப்பு வசதி அபாய வரைபடமாக்கம் செய்யப்பட்டுள்ளது" },
    compareInHouse3: { en:"Class dates scheduled around your production calendar", ms:"Tarikh kelas dijadualkan mengikut kalendar pengeluaran anda", zh:"根据您的生产日历安排课程日期", ta:"உங்கள் உற்பத்தி நாள்காட்டியைச் சுற்றி வகுப்பு தேதிகள் திட்டமிடப்பட்டுள்ளன" },
    compareInHouse4: { en:"Group rates and HRD Corp levy optimisation", ms:"Kadar kumpulan dan pengoptimuman levi HRD Corp", zh:"团体费率和HRD Corp征费优化", ta:"குழு விகிதங்கள் மற்றும் HRD Corp லெவி மேம்பாடு" },
    compareInHouseCta: { en:"Request In-House Quote", ms:"Minta Sebut Harga Dalam Rumah", zh:"请求内部报价", ta:"உள்ளக மதிப்பீட்டை கோருங்கள்" },
    comparePublicBadge: { en:"Alternative", ms:"Alternatif", zh:"替代方案", ta:"மாற்று" },
    comparePublicTitle: { en:"Public Seminars", ms:"Seminar Awam", zh:"公共研讨会", ta:"பொதுக் கருத்தரங்குகள்" },
    comparePublic1: { en:"Fixed schedules that may clash with shift rotations", ms:"Jadual tetap yang mungkin bertembung dengan rotasi syif", zh:"可能与轮班冲突的固定时间表", ta:"மாற்று பணி சுழற்சிகளுடன் மோதக்கூடிய நிலையான அட்டவணைகள்" },
    comparePublic2: { en:"Generic curriculum — not mapped to your specific hazards", ms:"Kurikulum generik — tidak dipetakan kepada bahaya tertentu anda", zh:"通用课程——未针对您的特定危害进行映射", ta:"பொதுவான பாடத்திட்டம் — உங்கள் குறிப்பிட்ட அபாயங்களுக்கு வரைபடமாக்கப்படவில்லை" },
    comparePublic3: { en:"Travel time and transport costs for every participant", ms:"Masa perjalanan dan kos pengangkutan untuk setiap peserta", zh:"每位参与者的出行时间和交通费用", ta:"ஒவ்வொரு பங்கேற்பாளருக்கும் பயண நேரம் மற்றும் போக்குவரத்து செலவுகள்" },
    comparePublic4: { en:"Limited intake per batch; certification may be delayed", ms:"Pengambilan terhad setiap kelompok; pensijilan mungkin tertangguh", zh:"每批次名额有限；认证可能会延迟", ta:"ஒவ்வொரு தொகுப்புக்கும் வரம்புக்குட்பட்ட ப intake; சான்றிதழ் தாமதமாகலாம்" },
    comparePublicCta: { en:"Join Public Schedule", ms:"Sertai Jadual Awam", zh:"加入公共日程", ta:"பொது அட்டவணையில் சேருங்கள்" },

    // Social Proof Stream
    streamTitle: { en:"See Naja Safety In Action", ms:"Lihat Naja Safety Beraksi", zh:"观看Naja Safety实战", ta:"Naja Safety செயலில் காணுங்கள்" },
    streamSubtitle: { en:"Training snippets, facility tours, and real-site hazard assessments from across Malaysia.", ms:"Klips latihan, lawatan kemudahan, dan penilaian bahaya tapak sebenar dari seluruh Malaysia.", zh:"来自马来西亚各地的培训片段、设施导览和真实现场危害评估。", ta:"மலேசியா முழுவதும் பயிற்சி snippets, வசதி சுற்றுப்பயணங்கள், மற்றும் உண்மையான தள அபாய மதிப்பீடுகள்." },
    streamTag1: { en:"On-Site Training", ms:"Latihan Di Tapak", zh:"现场培训", ta:"தள பயிற்சி" },
    streamHeadline1: { en:"Live Training Floor", ms:"Lantai Latihan Langsung", zh:"实时培训现场", ta:"நேரடி பயிற்சி தளம்" },
    streamCaption1: { en:"Real drills with certified instructors and your own equipment on your own premises.", ms:"Latihan sebenar dengan pengajar bertauliah dan peralatan anda di premis anda sendiri.", zh:"在您自己的场所使用您自己的设备与认证讲师进行实战演练。", ta:"உங்கள் சான்றளிக்கப்பட்ட பயிற்சியாளர்களுடன் மற்றும் உங்கள் சொந்த வசதிகளில் உங்கள் சொந்த உபகரணங்களுடன் உண்மையான பயிற்சிகள்." },
    streamTag2: { en:"Hazard Mapping", ms:"Pemetaan Bahaya", zh:"危害映射", ta:"அபாய வரைபடமாக்கம்" },
    streamHeadline2: { en:"Fire Safety Drill", ms:"Latihan Keselamatan Kebakaran", zh:"消防安全演练", ta:"தீ பாதுகாப்பு பயிற்சி" },
    streamCaption2: { en:"Emergency response protocols tailored to your facility's layout and risk profile.", ms:"Protokol tindak balas kecemasan yang disesuaikan dengan susun atur dan profil risiko kemudahan anda.", zh:"根据您设施的布局和风险状况定制的应急响应协议。", ta:"உங்கள் வசதியின் அமைப்பு மற்றும் அபாய சுயவிவரத்திற்கு ஏற்ப அவசரகால பதில் நெறிமுறைகள்." },
    streamTag3: { en:"Site Assessment", ms:"Penilaian Tapak", zh:"现场评估", ta:"தள மதிப்பீடு" },
    streamHeadline3: { en:"Scaffold Inspection", ms:"Pemeriksaan Perancah", zh:"脚手架检查", ta:"தூண் பரிசோதனை" },
    streamCaption3: { en:"Practical scaffold erection and inspection on active construction sites.", ms:"Pembinaan dan pemeriksaan perancah praktikal di tapak pembinaan yang aktif.", zh:"在活跃的建筑工地上进行实用的脚手架搭建和检查。", ta:"செயலில் உள்ள கட்டுமான தளங்களில் நடைமுறை தூண் அமைப்பு மற்றும் பரிசோதனை." },

    // Updated contact CTAs
    heroBtnWhatsApp: { en:"WhatsApp Us", ms:"WhatsApp Kami", zh:"WhatsApp我们", ta:"வாட்ஸ்அப் செய்யுங்கள்" },
    navWhatsApp: { en:"WhatsApp Us", ms:"WhatsApp Kami", zh:"WhatsApp我们", ta:"வாட்ஸ்அப் செய்யுங்கள்" },
    navArticles: { en:"Articles", ms:"Artikel", zh:"文章", ta:"கட்டுரைகள்" },
    oschHeroBtnCall: { en:"WhatsApp Us", ms:"WhatsApp Kami", zh:"WhatsApp我们", ta:"வாட்ஸ்அப் செய்யுங்கள்" },
    btnWhatsAppSujen: { en:"WhatsApp Us", ms:"WhatsApp Kami", zh:"WhatsApp我们", ta:"வாட்ஸ்அப் செய்யுங்கள்" },

    // Authority Stat Callouts
    statSince: { en:"Since 2005", ms:"Sejak 2005", zh:"自2005年起", ta:"2005 முதல்" },
    statSinceLabel: { en:"Protecting Malaysian Workspaces", ms:"Melindungi Ruang Kerja Malaysia", zh:"保护马来西亚工作场所", ta:"மலேசிய பணியிடங்களை பாதுகாத்தல்" },
    statPractitioners: { en:"Nationwide", ms:"Seluruh Negara", zh:"全国", ta:"நாடு முழுவதும்" },
    statPractitionersLabel: { en:"Freelance Trainer Network, incl. Sabah & Sarawak", ms:"Rangkaian Jurulatih Freelance, termasuk Sabah & Sarawak", zh:"自由培训师网络（含沙巴与砂拉越）", ta:"சுயவேலை பயிற்சியாளர் வலையமைப்பு, சபா & சரவாக் உட்பட" },
    statStates: { en:"5", ms:"5", zh:"5", ta:"5" },
    statStatesLabel: { en:"States Covered — JB to Penang", ms:"Negeri Diliputi — JB ke Pulau Pinang", zh:"覆盖州属——从柔佛到槟城", ta:"JB இலிருந்து பினாங் வரை உள்ள மாநிலங்கள்" },

    // Coverage Areas
    coverageTitle: { en:"Our Coverage Areas", ms:"Kawasan Liputan Kami", zh:"我们的覆盖区域", ta:"எங்கள் ப覆盖 பகுதிகள்" },
    coverageSubtitle: { en:"From Johor Bahru to Penang — on-site safety training and consultancy delivered nationwide.", ms:"Dari Johor Bahru ke Pulau Pinang — latihan keselamatan di tapak dan perundingan dihantar di seluruh negara.", zh:"从新山到槟城——全国范围内提供现场安全培训和咨询服务。", ta:"ஜொகூர் பாருவிலிருந்து பினாங் வரை — தேசிய அளவில் தள பாதுகாப்பு பயிற்சி மற்றும் ஆலோசனை வழங்கப்படுகிறது." },
    coverageJohor: { en:"Johor", ms:"Johor", zh:"柔佛", ta:"ஜொகூர்" },
    coverageJohorDesc: { en:"HQ in Johor Bahru with full on-site training across the state.", ms:"Ibu pejabat di Johor Bahru dengan latihan penuh di tapak di seluruh negeri.", zh:"总部设在新山，可在全州提供现场培训。", ta:"ஜொகூர் பாருவில் தலைமையகம், மாநிலம் முழுவதும் முழு தள பயிற்சி." },
    coverageMelaka: { en:"Melaka", ms:"Melaka", zh:"马六甲", ta:"மலாக்கா" },
    coverageMelakaDesc: { en:"Regular training schedules for manufacturing and port operations.", ms:"Jadual latihan biasa untuk operasi pembuatan dan pelabuhan.", zh:"为制造业和港口运营提供定期培训时间表。", ta:"உற்பத்தி மற்றும் துறைமுக செயல்பாடுகளுக்கான வழக்கமான பயிற்சி அட்டவணைகள்." },
    coverageKL: { en:"Kuala Lumpur", ms:"Kuala Lumpur", zh:"吉隆坡", ta:"கோலாலம்பூர்" },
    coverageKLDesc: { en:"Corporate headquarters and federal compliance support.", ms:"Ibu pejabat korporat dan sokongan pematuhan persekutuan.", zh:"企业总部和联邦合规支持。", ta:"கார்ப்பரேட் தலைமையகம் மற்றும் கூட்டாட்சி இணக்க ஆதரவு." },
    coveragePerak: { en:"Perak", ms:"Perak", zh:"霹雳", ta:"பேராக்" },
    coveragePerakDesc: { en:"Industrial zone safety audits and plantation HSE programmes.", ms:"Audit keselamatan zon perindustrian dan program HSE ladang.", zh:"工业区安全审核和种植园HSE项目。", ta:"தொழிற்துறை மண்டல பாதுகாப்பு தணிக்கைகள் மற்றும் தோட்ட HSE திட்டங்கள்." },
    coveragePenang: { en:"Penang", ms:"Pulau Pinang", zh:"槟城", ta:"பினாங்" },
    coveragePenangDesc: { en:"Electronics manufacturing and semiconductor clean-room safety.", ms:"Pembuatan elektronik dan keselamatan bilik bersih semikonduktor.", zh:"电子制造和半导体洁净室安全。", ta:"மின்னணு உற்பத்தி மற்றும் அரைகடத்தான் சுத்தமான அறை பாதுகாப்பு." },

    chraEyebrow: { en:"DOSH Mandatory", ms:"Wajib DOSH", zh:"DOSH强制要求", ta:"DOSH கட்டாயம்" },
    chraHeroTitle: { en:"Chemical Health Risk Assessment (CHRA) — USECHH 2000 Compliance", ms:"Penilaian Risiko Kesihatan Kimia (CHRA) — Pematuhan USECHH 2000", zh:"化学品健康风险评估（CHRA）— 符合USECHH 2000法规", ta:"வேதிப்பொருள் சுகாதார அபாய மதிப்பீடு (CHRA) — USECHH 2000 இணக்கம்" },
    chraHeroSubtitle: { en:"Legally required for all workplaces using scheduled chemicals under USECHH Regulations 2000. Systematic evaluation, exposure monitoring, and control recommendations.", ms:"Diwajibkan oleh undang-undang untuk semua tempat kerja yang menggunakan bahan kimia berjadual di bawah Peraturan USECHH 2000. Penilaian sistematik, pemantauan pendedahan, dan cadangan kawalan.", zh:"根据USECHH 2000法规，所有使用附表化学品的工作场所必须进行CHRA。包括系统性评估、暴露监测和控制建议。", ta:"USECHH விதிமுறைகள் 2000-க்குட்பட்ட திட்டமிடப்பட்ட வேதிப்பொருட்களைப் பயன்படுத்தும் அனைத்து பணியிடங்களுக்கும் சட்டப்பூர்வமாகத் தேவை. அமைப்புமுறை மதிப்பீடு, புற்றுநோய் கண்காணிப்பு, மற்றும் கட்டுப்பாடு பரிந்துரைகள்." },
    chraHeroBtnWa: { en:"WhatsApp for CHRA Assessment", ms:"WhatsApp untuk Penilaian CHRA", zh:"WhatsApp咨询CHRA评估", ta:"CHRA மதிப்பீட்டிற்கு WhatsApp" },
    chraHeroBtnContact: { en:"Request Assessment Proposal", ms:"Mohon Cadangan Penilaian", zh:"索取评估方案", ta:"மதிப்பீட்டு முன்மொழிவைக் கோருக" },
    chraProblemTitle: { en:"Do You Need a CHRA?", ms:"Adakah Anda Memerlukan CHRA?", zh:"您需要进行CHRA吗？", ta:"உங்களுக்கு CHRA தேவையா?" },
    chraProblemText: { en:"Malaysian workplaces handling scheduled chemicals — including solvents, acids, heavy metals, and toxic gases — must conduct a Chemical Health Risk Assessment (CHRA) under the USECHH Regulations 2000. Many facilities have never completed a proper CHRA, or their assessment is outdated and will not survive a DOSH inspection.", ms:"Tempat kerja Malaysia yang mengendalikan bahan kimia berjadual — termasuk pelarut, asid, logam berat, dan gas toksik — mesti menjalankan Penilaian Risiko Kesihatan Kimia (CHRA) di bawah Peraturan USECHH 2000. Ramai kemudahan belum pernah menyiapkan CHRA yang betul, atau penilaian mereka sudah lapuk dan tidak akan lulus pemeriksaan DOSH.", zh:"在马来西亚，处理附表化学品（包括溶剂、酸类、重金属和有毒气体）的工作场所必须根据USECHH 2000法规进行化学品健康风险评估（CHRA）。许多厂房从未完成适当的CHRA，或其评估已过时，无法通过DOSH检查。", ta:"மலேசிய பணியிடங்கள் திட்டமிடப்பட்ட வேதிப்பொருட்களைக் கையாளுகின்றன — கரைப்பான்கள், அமிலங்கள், கனரக உலோகங்கள், நச்சு வாயுக்கள் உட்பட — USECHH விதிமுறைகள் 2000-ன் கீழ் Chemical Health Risk Assessment (CHRA) மேற்கொள்ள வேண்டும். பல வசதிகள் சரியான CHRA-வை முடிக்கவில்லை, அல்லது அவற்றின் மதிப்பீடு காலாவதியானது மற்றும் DOSH ஆய்வில் தாங்காது." },
    chraStakesTitle: { en:"The Stakes", ms:"Risiko Yang Dihadapi", zh:"风险所在", ta:"ஆபத்துகள்" },
    chraStakesH1: { en:"USECHH Non-Compliance Penalties", ms:"Penalti Ketidakpatuhan USECHH", zh:"USECHH不合规处罚", ta:"USECHH இணக்கமின்மை தண்டனைகள்" },
    chraStakesP1: { en:"Non-compliance with USECHH 2000 carries penalties under the OSH Act. DOSH inspectors now specifically request CHRA documentation during scheduled and surprise inspections.", ms:"Ketidakpatuhan dengan USECHH 2000 membawa penalti di bawah Akta OSH. Pemeriksa DOSH kini secara khusus meminta dokumen CHRA semasa pemeriksaan berjadual dan pemeriksaan mengejut.", zh:"不遵守USECHH 2000将根据OSH Act面临处罚。DOSH检查员现在在定期和突击检查中专门要求提供CHRA文件。", ta:"USECHH 2000-க்கு இணக்கமின்மை OSH சட்டத்தின் கீழ் தண்டனைகளை ஏற்படுத்துகிறது. DOSH ஆய்வாளர்கள் இப்போது திட்டமிடப்பட்ட மற்றும் திடீர் ஆய்வுகளின் போது CHRA ஆவணங்களைக் குறிப்பிட்டுக் கோருகிறார்கள்." },
    chraStakesH2: { en:"Criminal Liability for Exposure", ms:"Liability Jenayah bagi Pendedahan", zh:"暴露的刑事责任", ta:"புற்றுநோய்க்கான குற்றவியல் பொறுப்பு" },
    chraStakesP2: { en:"Accidents involving uncontrolled chemical exposure can trigger criminal liability for employers. Directors can be held personally accountable for inadequate controls.", ms:"Kemalangan yang melibatkan pendedahan kimia yang tidak terkawal boleh mencetuskan liability jenayah untuk majikan. Pengarah boleh dipertanggungjawabkan secara peribadi atas kawalan yang tidak mencukupi.", zh:"涉及化学品暴露失控的事故可能引发雇主的刑事责任。董事可能因控制措施不足而被追究个人责任。", ta:"கட்டுப்படுத்தப்படாத வேதிப்பொருள் புற்றுநோய் துன்பங்கள் வேலையாளர்களுக்கான குற்றவியல் பொறுப்பைத் தூண்டக்கூடும். போதுமான கட்டுப்பாடுகளுக்கு இயக்குநர்கள் தனிப்பட்ட முறையில் பொறுப்பாக்கப்படலாம்." },
    chraStakesH3: { en:"Insurance and Tender Disqualification", ms:"Disqualification Insurans dan Tender", zh:"保险和投标资格取消", ta:"காப்பீடு மற்றும் டெண்டர் தகுதியின்மை" },
    chraStakesP3: { en:"Insurance underwriters increasingly require current CHRA reports for renewal. Tender submissions for government contracts often mandate USECHH compliance proof.", ms:"Penunderwriters insurans semakin memerlukan laporan CHRA semasa untuk pembaharuan. Penyerahan tender untuk kontrak kerajaan sering memerlukan bukti pematuhan USECHH.", zh:"保险公司续保时越来越多地要求提供最新的CHRA报告。政府合同的投标提交通常要求提供USECHH合规证明。", ta:"காப்பீட்டு எழுத்தாளர்கள் புதுப்பிப்புக்கு தற்போதைய CHRA அறிக்கைகளை அதிகமாகக் கோருகிறார்கள். அரசாங்க ஒப்பந்தங்களுக்கான டெண்டர் சமர்ப்பிப்புகள் பெரும்பாலும் USECHH இணக்க சான்றைக் கோருகின்றன." },
    chraHazardTitle: { en:"Hazard Profile", ms:"Profil Bahaya", zh:"危害概况", ta:"அபாய சுயவிவரம்" },
    chraHazard1Name: { en:"Scheduled Chemicals", ms:"Bahan Kimia Berjadual", zh:"附表化学品", ta:"திட்டமிடப்பட்ட வேதிப்பொருட்கள்" },
    chraHazard1Desc: { en:"Substances listed in the USECHH First Schedule including benzene, lead compounds, asbestos, silica dust, and isocyanates.", ms:"Bahan yang disenaraikan dalam Jadual Pertama USECHH termasuk benzena, sebatian plumbum, asbestos, habuk silika, dan isosianat.", zh:"USECHH第一附表中列出的物质，包括苯、铅化合物、石棉、硅尘和异氰酸酯。", ta:"USECHH முதல் அட்டவணையில் பட்டியலிடப்பட்ட பொருட்கள் பென்சீன், ஈய சேர்மங்கள், அஸ்பெஸ்டாஸ், சிலிகா தூசு, மற்றும் ஐசோசயனேட்டுகள் உட்பட." },
    chraHazard2Name: { en:"Inadequate Ventilation", ms:"Pengudaraan Tidak Mencukupi", zh:"通风不足", ta:"போதுமான காற்றோட்டமின்மை" },
    chraHazard2Desc: { en:"LEV systems that have never been tested for capture velocity. Many facilities rely on general room ventilation for local exhaust tasks.", ms:"Sistem LEV yang belum pernah diuji untuk kelajuan penangkapan. Ramai kemudahan bergantung pada pengudaraan bilik umum untuk tugas ekzos tempatan.", zh:"LEV系统从未测试过捕集风速。许多设施依靠一般室内通风来处理局部排气任务。", ta:"பிடிப்பு வேகத்திற்கு ஒருபோதும் சோதனை செய்யப்படாத LEV அமைப்புகள். பல வசதிகள் உள்ளூர் வெளியேற்ற பணிகளுக்கு பொது அறை காற்றோட்டத்தை நம்பியுள்ளன." },
    chraHazard3Name: { en:"Missing Exposure Monitoring", ms:"Pemantauan Pendedahan Tiada", zh:"缺乏暴露监测", ta:"காணாமல் போன புற்றுநோய் கண்காணிப்பு" },
    chraHazard3Desc: { en:"No quantitative air sampling data to compare against DOSH Permissible Exposure Limits (PEL).", ms:"Tiada data pensampelan udara kuantitatif untuk dibandingkan dengan Had Pendedahan Yang Dibenarkan DOSH (PEL).", zh:"没有定量空气采样数据来与DOSH容许暴露限值（PEL）进行比较。", ta:"DOSH அனுமதிக்கக்கூடிய புற்றுநோய் வரம்புகளுடன் (PEL) ஒப்பிட காணாமல் போன அளவிடத்தக்க காற்று மாதிரி தரவு." },
    chraHazard4Name: { en:"Uncontrolled Storage", ms:"Penyimpanan Tidak Terkawal", zh:"存储失控", ta:"கட்டுப்படுத்தப்படாத சேமிப்பு" },
    chraHazard4Desc: { en:"Incompatible chemicals stored together without secondary containment or proper segregation.", ms:"Bahan kimia tidak serasi disimpan bersama tanpa pembekalan sekunder atau pengasingan yang betul.", zh:"不相容的化学品存放在一起，没有二次围堵或适当的隔离。", ta:"பொருத்தமற்ற வேதிப்பொருட்கள் இரண்டாவது கட்டுப்பாடு அல்லது சரியான பிரிப்பு இல்லாமல் ஒன்றாக சேமிக்கப்படுகின்றன." },
    chraDetectionTitle: { en:"Warning Signs", ms:"Tanda Amaran", zh:"警告信号", ta:"எச்சரிக்கை அறிகுறிகள்" },
    chraDetection1: { en:"Your facility uses any chemical listed in the USECHH First Schedule", ms:"Kemudahan anda menggunakan sebarang bahan kimia yang disenaraikan dalam Jadual Pertama USECHH", zh:"您的设施使用USECHH第一附表中的任何化学品", ta:"உங்கள் வசதி USECHH முதல் அட்டவணையில் பட்டியலிடப்பட்ட எந்த வேதிப்பொருளையும் பயன்படுத்துகிறது" },
    chraDetection2: { en:"You have received a DOSH letter requesting CHRA documentation", ms:"Anda telah menerima surat DOSH yang meminta dokumen CHRA", zh:"您收到DOSH要求提供CHRA文件的信函", ta:"CHRA ஆவணங்களைக் கோரும் DOSH கடிதத்தை நீங்கள் பெற்றுள்ளீர்கள்" },
    chraDetection3: { en:"Workers report headaches, dizziness, or respiratory irritation in chemical work areas", ms:"Pekerja melaporkan sakit kepala, pening, atau kerengsaan pernafasan di kawasan kerja kimia", zh:"工人在化学品作业区报告头痛、头晕或呼吸道刺激", ta:"வேதிப்பொருள் பணி பகுதிகளில் தொழிலாளர்கள் தலைவலி, மயக்கம், அல்லது சுவாச எரிச்சலைப் புகார் செய்கிறார்கள்" },
    chraDetection4: { en:"Your LEV system has never been tested for capture velocity", ms:"Sistem LEV anda belum pernah diuji untuk kelajuan penangkapan", zh:"您的LEV系统从未测试过捕集风速", ta:"உங்கள் LEV அமைப்பு பிடிப்பு வேகத்திற்கு ஒருபோதும் சோதனை செய்யப்படவில்லை" },
    chraDetection5: { en:"You are expanding production and need DOE/DOSH approval for environmental impact", ms:"Anda sedang mengembangkan pengeluaran dan memerlukan kelulusan DOE/DOSH untuk kesan alam sekitar", zh:"您正在扩大生产，需要DOE/DOSH批准环境影响评估", ta:"நீங்கள் உற்பத்தியை விரிவுபடுத்துகிறீர்கள் மற்றும் சுற்றுச்சூழல் தாக்கத்திற்கான DOE/DOSH ஒப்புதல் தேவை" },
    chraDetection6: { en:"Insurance auditors have flagged chemical safety gaps", ms:"Juruaudit insurans telah menandakan jurang keselamatan kimia", zh:"保险审计员已标记化学品安全缺口", ta:"காப்பீட்டு தணிக்கையாளர்கள் வேதிப்பொருள் பாதுகாப்பு இடைவெளிகளைக் குறிப்பிட்டுள்ளனர்" },
    chraProcessTitle: { en:"Our Process", ms:"Proses Kami", zh:"我们的流程", ta:"எங்கள் செயல்முறை" },
    chraProcess1Label: { en:"Chemical Inventory Audit", ms:"Audit Inventori Kimia", zh:"化学品库存审计", ta:"வேதிப்பொருள் பட்டியல் தணிக்கை" },
    chraProcess1Desc: { en:"We catalog every chemical on site, cross-reference against the USECHH First Schedule, and identify exposure pathways.", ms:"Kami mengkatalog setiap bahan kimia di tapak, merujuk silang dengan Jadual Pertama USECHH, dan mengenal pasti laluan pendedahan.", zh:"我们清点现场每一种化学品，对照USECHH第一附表进行交叉核对，并识别暴露途径。", ta:"தளத்தில் உள்ள ஒவ்வொரு வேதிப்பொருளையும் நாங்கள் பட்டியலிடுகிறோம், USECHH முதல் அட்டவணையுடன் குறுக்கு குறிப்பிடுகிறோம், மற்றும் புற்றுநோய் பாதைகளை அடையாளம் காண்கிறோம்." },
    chraProcess2Label: { en:"Exposure Monitoring", ms:"Pemantauan Pendedahan", zh:"暴露监测", ta:"புற்றுநோய் கண்காணிப்பு" },
    chraProcess2Desc: { en:"Calibrated air sampling and dosimetry in work zones. Results benchmarked against DOSH PEL and ACGIH TLV where applicable.", ms:"Pensampelan udara terkawal dan dosimetri di zon kerja. Keputusan dibandingkan dengan PEL DOSH dan ACGIH TLV jika berkenaan.", zh:"在工作区进行校准空气采样和剂量测定。结果对照DOSH PEL和适用的ACGIH TLV进行基准比较。", ta:"பணி மண்டலங்களில் அளவிடப்பட்ட காற்று மாதிரி மற்றும் டோசிமெட்ரி. DOSH PEL மற்றும் ACGIH TLV-உடன் ஒப்பீடு செய்யப்பட்ட முடிவுகள்." },
    chraProcess3Label: { en:"Risk Assessment Report", ms:"Laporan Penilaian Risiko", zh:"风险评估报告", ta:"அபாய மதிப்பீட்டு அறிக்கை" },
    chraProcess3Desc: { en:"Systematic evaluation of hazard severity, exposure frequency, and existing controls. Delivered as a DOSH-ready CHRA document.", ms:"Penilaian sistematik keparahan bahaya, kekerapan pendedahan, dan kawalan sedia ada. Dihantar sebagai dokumen CHRA yang sedia untuk DOSH.", zh:"系统评估危害严重性、暴露频率和现有控制措施。以DOSH就绪的CHRA文件形式交付。", ta:"அபாய கடுமை, புற்றுநோய் அதிர்வெண், மற்றும் உள்ள கட்டுப்பாடுகளின் அமைப்புமுறை மதிப்பீடு. DOSH-தயார CHRA ஆவணமாக வழங்கப்படுகிறது." },
    chraProcess4Label: { en:"Control Recommendations", ms:"Cadangan Kawalan", zh:"控制建议", ta:"கட்டுப்பாடு பரிந்துரைகள்" },
    chraProcess4Desc: { en:"Engineering controls (LEV upgrade), administrative controls (shift rotation, SOPs), and PPE selection aligned to the residual risk.", ms:"Kawalan kejuruteraan (naik taraf LEV), kawalan pentadbiran (pusingan syif, SOP), dan pemilihan PPE yang diselaraskan dengan risiko baki.", zh:"工程控制（LEV升级）、行政控制（轮班、SOP）和PPE选择，以匹配残余风险。", ta:"பொறியியல் கட்டுப்பாடுகள் (LEV மேம்படுத்தல்), நிர்வாக கட்டுப்பாடுகள் (மாற்று பணி, SOP-கள்), மற்றும் எஞ்சிய அபாயத்திற்கு ஏற்ப PPE தேர்வு." },
    chraProcess5Label: { en:"Implementation Advisory", ms:"Nasihat Pelaksanaan", zh:"实施咨询", ta:"செயல்படுத்தல் ஆலோசனை" },
    chraProcess5Desc: { en:"90-day follow-up to verify control implementation, conduct worker training, and prepare for DOSH inspection.", ms:"Susulan 90-hari untuk mengesahkan pelaksanaan kawalan, menjalankan latihan pekerja, dan mempersiapkan untuk pemeriksaan DOSH.", zh:"90天跟进，验证控制措施的实施情况，进行员工培训，并为DOSH检查做准备。", ta:"கட்டுப்பாடு செயல்படுத்தலை சரிபார்க்க, தொழிலாளர் பயிற்சி நடத்த, மற்றும் DOSH ஆய்வுக்கு தயாராக 90-நாள் தொடர்வு." },
    chraFailsTitle: { en:"Why Other Approaches Fail", ms:"Mengapa Pendekatan Lain Gagal", zh:"为什么其他方法会失败", ta:"மற்ற அணுகுமுறைகள் ஏன் தோல்வியடைகின்றன" },
    chraFailsText: { en:"Generic consultants produce template CHRA reports that do not reflect your actual chemical exposure profiles. Without calibrated monitoring data, the report is worthless in a DOSH inspection. One-off assessments without implementation support leave hazards uncontrolled.", ms:"Perunding generik menghasilkan laporan CHRA templat yang tidak mencerminkan profil pendedahan kimia sebenar anda. Tanpa data pemantauan terkawal, laporan itu tidak bernilai dalam pemeriksaan DOSH. Penilaian sekali tanpa sokongan pelaksanaan meninggalkan bahaya tidak terkawal.", zh:"普通咨询公司制作的模板CHRA报告无法反映您实际的化学品暴露情况。没有校准监测数据，报告在DOSH检查中毫无价值。一次性评估没有实施支持，危害仍未受控。", ta:"பொதுவான ஆலோசகர்கள் உங்கள் உண்மையான வேதிப்பொருள் புற்றுநோய் சுயவிவரங்களை பிரதிபலிக்காத வார்ப்புரு CHRA அறிக்கைகளை உருவாக்குகிறார்கள். அளவிடப்பட்ட கண்காணிப்பு தரவு இல்லாமல், அறிக்கை DOSH ஆய்வில் பயனற்றது. செயல்படுத்தல் ஆதரவு இல்லாத ஒருமுறை மதிப்பீடுகள் அபாயங்களை கட்டுப்படுத்தாமல் விடுகின்றன." },
    chraSchedulingTitle: { en:"Risk-Based Scheduling", ms:"Penjadualan Berdasarkan Risiko", zh:"基于风险的排程", ta:"அபாய அடிப்படையிலான திட்டமிடல்" },
    chraSchedulingHighTitle: { en:"High-Risk Environments", ms:"Persekitaran Berisiko Tinggi", zh:"高风险环境", ta:"அதிக அபாய சூழல்கள்" },
    chraSchedulingHighDesc: { en:"Chemical manufacturers, electroplating shops, paint booths — annual CHRA review plus quarterly exposure monitoring recommended.", ms:"Pengilang kimia, kedai penyaduran elektro, bilik cat — semakan CHRA tahunan ditambah pemantauan pendedahan suku tahunan disyorkan.", zh:"化学品制造商、电镀车间、喷漆房——建议每年进行CHRA审查，加上每季度暴露监测。", ta:"வேதிப்பொருள் உற்பத்தியாளர்கள், மின்முலாம் கடைகள், பெயின்ட் கூடங்கள் — ஆண்டு CHRA மதிப்பீடு கூடுதல் காலாண்டு புற்றுநோய் கண்காணிப்பு பரிந்துரைக்கப்படுகிறது." },
    chraSchedulingLowTitle: { en:"Low-Moderate Risk", ms:"Risiko Rendah-Sederhana", zh:"中低风险", ta:"குறைந்த-மிதமான அபாயம்" },
    chraSchedulingLowDesc: { en:"Warehouses with minimal chemical handling — bi-ennial CHRA sufficient if exposure remains unchanged.", ms:"Gudang dengan pengendalian kimia minimum — CHRA dwi-tahun mencukupi jika pendedahan kekal tidak berubah.", zh:"化学品处理最少的仓库——如果暴露情况未变，每两年进行一次CHRA即可。", ta:"குறைந்த வேதிப்பொருள் கையாளுதல் கொண்ட கிடங்குகள் — புற்றுநோய் மாறாவிட்டால் இரண்டாண்டுக்கு ஒருமுறை CHRA போதுமானது." },
    chraPropertyTitle: { en:"Property Types We Serve", ms:"Jenis Kemudahan yang Kami Layani", zh:"我们服务的物业类型", ta:"நாங்கள் சேவை செய்யும் சொத்து வகைகள்" },
    chraProperty1: { en:"Chemical manufacturing and blending plants", ms:"Kilang pengilangan dan pencampuran kimia", zh:"化学品制造和调配厂", ta:"வேதிப்பொருள் உற்பத்தி மற்றும் கலப்பு ஆலைகள்" },
    chraProperty2: { en:"Electroplating and metal finishing workshops", ms:"Bengkel penyaduran elektro dan kemasan logam", zh:"电镀和金属精加工车间", ta:"மின்முலாம் மற்றும் உலோக முடிப்பு பட்டறைகள்" },
    chraProperty3: { en:"Paint and coating facilities", ms:"Kemudahan cat dan salutan", zh:"油漆和涂料设施", ta:"பெயின்ட் மற்றும் பூச்சு வசதிகள்" },
    chraProperty4: { en:"Pharmaceutical and laboratory operations", ms:"Operasi farmaseutikal dan makmal", zh:"制药和实验室运营", ta:"மருந்து மற்றும் ஆய்வக செயல்பாடுகள்" },
    chraProperty5: { en:"Oil &amp; gas processing and maintenance", ms:"Pemprosesan dan penyelenggaraan minyak &amp; gas", zh:"石油天然气加工和维护", ta:"எண்ணெய் மற்றும் வாயு செயலாக்கம் மற்றும் பராமரிப்பு" },
    chraProperty6: { en:"Textile dyeing and printing works", ms:"Kilang mewarna dan mencetak tekstil", zh:"纺织染色和印花厂", ta:"ஜவுளி சாயமிடுதல் மற்றும் அச்சிடும் பணிகள்" },
    chraCoverageTitle: { en:"Coverage Areas", ms:"Kawasan Liputan", zh:"覆盖地区", ta:"பரவல் பகுதிகள்" },
    chraCoverageText: { en:"On-site CHRA assessment and exposure monitoring across Johor and Peninsular Malaysia.", ms:"Penilaian CHRA di tapak dan pemantauan pendedahan merentasi Johor dan Semenanjung Malaysia.", zh:"在柔佛和马来西亚半岛各地提供现场CHRA评估和暴露监测。", ta:"ஜொகூர் மற்றும் மலேசிய தீபகற்பம் முழுவதும் CHRA மதிப்பீடு மற்றும் புற்றுநோய் கண்காணிப்பு." },
    chraCoverage1: { en:"Johor Bahru", ms:"Johor Bahru", zh:"新山", ta:"ஜொகூர் பாரு" },
    chraCoverage2: { en:"Pasir Gudang", ms:"Pasir Gudang", zh:"巴西古当", ta:"பாசிர் கூடாங்" },
    chraCoverage3: { en:"Senai", ms:"Senai", zh:"士乃", ta:"செனாய்" },
    chraCoverage4: { en:"Pengerang", ms:"Pengerang", zh:"边佳兰", ta:"பெங்கெராங்" },
    chraCoverage5: { en:"Iskandar Puteri", ms:"Iskandar Puteri", zh:"依斯干达公主城", ta:"இஸ்கந்தார் புத்தேரி" },
    chraCoverage6: { en:"Skudai", ms:"Skudai", zh:"士古来", ta:"சுகுதை" },
    chraCoverage7: { en:"Kulai", ms:"Kulai", zh:"古来", ta:"குலாய்" },
    chraCoverage8: { en:"Ulu Tiram", ms:"Ulu Tiram", zh:"乌鲁地南", ta:"உலு திராம்" },
    chraFaqTitle: { en:"Frequently Asked Questions", ms:"Soalan Lazim", zh:"常见问题", ta:"அடிக்கடி கேட்கப்படும் கேள்விகள்" },
    chraFaq1Q: { en:"How often must a CHRA be conducted?", ms:"Berapa kerap CHRA mesti dijalankan?", zh:"CHRA必须多久进行一次？", ta:"CHRA எவ்வளவு அடிக்கடி நடத்தப்பட வேண்டும்?" },
    chraFaq1A: { en:"DOSH recommends reviewing your CHRA whenever there is a significant change in chemical usage, process, or workplace layout. High-risk facilities should conduct annual reviews.", ms:"DOSH mengesyorkan menyemak semula CHRA anda setiap kali ada perubahan ketara dalam penggunaan bahan kimia, proses, atau susun atur tempat kerja. Kemudahan berisiko tinggi harus menjalankan semakan tahunan.", zh:"DOSH建议在化学品使用、工艺或工作场所布局发生重大变化时审查CHRA。高风险设施应每年进行审查。", ta:"குறிப்பிடத்தக்க மாற்றம் வேதிப்பொருள் பயன்பாடு, செயல்முறை, அல்லது பணியிட அமைப்பில் ஏற்படும்போது DOSH உங்கள் CHRA-வை மதிப்பாய்வு செய்ய பரிந்துரைக்கிறது. அதிக அபாய வசதிகள் ஆண்டு மதிப்பீடுகள் நடத்த வேண்டும்." },
    chraFaq2Q: { en:"What is the difference between CHRA and HIRARC?", ms:"Apakah beza antara CHRA dan HIRARC?", zh:"CHRA和HIRARC有什么区别？", ta:"CHRA மற்றும் HIRARC-க்கு என்ன வித்தியாசம்?" },
    chraFaq2A: { en:"HIRARC covers all workplace hazards broadly. CHRA is specific to chemical health risks under USECHH 2000 and requires exposure monitoring data. Most chemical facilities need both.", ms:"HIRARC merangkumi semua bahaya tempat kerja secara umum. CHRA khusus untuk risiko kesihatan kimia di bawah USECHH 2000 dan memerlukan data pemantauan pendedahan. Kebanyakan kemudahan kimia memerlukan kedua-duanya.", zh:"HIRARC广泛涵盖所有工作场所危害。CHRA专门处理USECHH 2000下的化学品健康风险，需要暴露监测数据。大多数化学品设施两者都需要。", ta:"HIRARC அனைத்து பணியிட அபாயங்களையும் பரந்தளவில் உள்ளடக்குகிறது. CHRA USECHH 2000-க்குட்பட்ட வேதிப்பொருள் சுகாதார அபாயங்களுக்குக் குறிப்பிட்டது மற்றும் புற்றுநோய் கண்காணிப்பு தரவைக் கோருகிறது. பெரும்பாலான வேதிப்பொருள் வசதிகளுக்கு இரண்டும் தேவை." },
    chraFaq3Q: { en:"Do we need to stop production during monitoring?", ms:"Adakah kita perlu hentikan pengeluaran semasa pemantauan?", zh:"监测期间需要停止生产吗？", ta:"கண்காணிப்பின் போது உற்பத்தியை நிறுத்த வேண்டுமா?" },
    chraFaq3A: { en:"No. We conduct exposure monitoring during normal operations to capture real-world exposure levels. Workers should not modify their behaviour during sampling.", ms:"Tidak. Kami menjalankan pemantauan pendedahan semasa operasi biasa untuk menangkap tahap pendedahan dunia sebenar. Pekerja tidak harus mengubah tingkah laku mereka semasa pensampelan.", zh:"不需要。我们在正常操作期间进行暴露监测，以捕捉实际暴露水平。工人在采样期间不应改变其行为。", ta:"இல்லை. நாங்கள் சாதாரண செயல்பாடுகளின் போது புற்றுநோய் கண்காணிப்பை நடத்துகிறோம் உண்மையான உலக புற்றுநோய் அளவுகளைப் பிடிக்க. தொழிலாளர்கள் மாதிரி எடுக்கும் போது தங்கள் நடத்தையை மாற்றிக் கொள்ளக்கூடாது." },
    chraFaq4Q: { en:"How long does the assessment take?", ms:"Berapa lamakah penilaian ini mengambil masa?", zh:"评估需要多长时间？", ta:"மதிப்பீடு எவ்வளவு நேரம் எடுக்கும்?" },
    chraFaq4A: { en:"Typically 3–5 working days on site for monitoring, plus 7–10 working days for laboratory analysis and report preparation.", ms:"Biasanya 3–5 hari bekerja di tapak untuk pemantauan, ditambah 7–10 hari bekerja untuk analisis makmal dan penyediaan laporan.", zh:"通常现场监测需要3–5个工作日，加上实验室分析和报告准备需要7–10个工作日。", ta:"பொதுவாக கண்காணிப்புக்கு தளத்தில் 3–5 பணி நாட்கள், கூடுதல் ஆய்வக பகுப்பாய்வு மற்றும் அறிக்கை தயாரிப்புக்கு 7–10 பணி நாட்கள்." },
    chraFaq5Q: { en:"Can you help us upgrade our LEV system?", ms:"Bolehkah anda membantu kami menaik taraf sistem LEV?", zh:"你们能帮助我们升级LEV系统吗？", ta:"எங்கள் LEV அமைப்பை மேம்படுத்த உதவ முடியுமா?" },
    chraFaq5A: { en:"Yes. Our LEV inspection and upgrade recommendations are integrated into the CHRA process. We verify capture velocity, airflow rates, and system integrity.", ms:"Ya. Pemeriksaan LEV dan cadangan naik taraf kami adalah sebahagian daripada proses CHRA. Kami mengesahkan kelajuan penangkapan, kadar aliran udara, dan integriti sistem.", zh:"可以。我们的LEV检查和升级建议已整合到CHRA流程中。我们验证捕集风速、气流速率和系统完整性。", ta:"ஆம். எங்கள் LEV ஆய்வு மற்றும் மேம்பாட்டு பரிந்துரைகள் CHRA செயல்முறையுடன் ஒருங்கிணைக்கப்பட்டுள்ளன. பிடிப்பு வேகம், காற்றோட்ட விகிதங்கள், மற்றும் அமைப்பு ஒருமைப்பாட்டை சரிபார்க்கிறோம்." },
    chraFaq6Q: { en:"Is CHRA required for small workshops?", ms:"Adakah CHRA diwajibkan untuk bengkel kecil?", zh:"小型车间也需要CHRA吗？", ta:"சிறிய பட்டறைகளுக்கு CHRA தேவையா?" },
    chraFaq6A: { en:"If you use any scheduled chemical under USECHH 2000 — regardless of facility size — a CHRA is mandatory.", ms:"Jika anda menggunakan sebarang bahan kimia berjadual di bawah USECHH 2000 — tanpa mengira saiz kemudahan — CHRA adalah wajib.", zh:"如果您在USECHH 2000下使用任何附表化学品——无论设施大小——CHRA都是强制性的。", ta:"USECHH 2000-க்குட்பட்ட எந்த திட்டமிடப்பட்ட வேதிப்பொருளையும் நீங்கள் பயன்படுத்தினால் — வசதி அளவு பொருட்படியல் — CHRA கட்டாயம்." },
    chraCtaTitle: { en:"Get Your CHRA Done Before DOSH Asks for It", ms:"Selesaikan CHRA Anda Sebelum DOSH Memintanya", zh:"在DOSH要求之前完成您的CHRA", ta:"DOSH கேட்கும் முன் உங்கள் CHRA-வை முடிக்கவும்" },
    chraCtaSubtitle: { en:"Calibrated exposure monitoring, DOSH-ready reports, and control implementation advisory for chemical facilities across Johor and Malaysia.", ms:"Pemantauan pendedahan terkawal, laporan yang sedia untuk DOSH, dan nasihat pelaksanaan kawalan untuk kemudahan kimia merentasi Johor dan Malaysia.", zh:"为柔佛和马来西亚各地的化学品设施提供校准暴露监测、DOSH就绪报告和控制实施咨询。", ta:"அளவிடப்பட்ட புற்றுநோய் கண்காணிப்பு, DOSH-தயார் அறிக்கைகள், மற்றும் ஜொகூர் மற்றும் மலேசியாவின் வேதிப்பொருள் வசதிகளுக்கான கட்டுப்பாடு செயல்படுத்தல் ஆலோசனை." },
    chraCtaBtnWa: { en:"WhatsApp for CHRA Assessment", ms:"WhatsApp untuk Penilaian CHRA", zh:"WhatsApp咨询CHRA评估", ta:"CHRA மதிப்பீட்டிற்கு WhatsApp" },
    chraCtaBtnContact: { en:"Request Assessment Proposal", ms:"Mohon Cadangan Penilaian", zh:"索取评估方案", ta:"மதிப்பீட்டு முன்மொழிவைக் கோருக" },
    cidbEyebrow: { en:"CIDB Mandatory", ms:"Wajib CIDB", zh:"CIDB强制要求", ta:"CIDB கட்டாயம்" },
    cidbHeroTitle: { en:"CIDB Green Card Training (SICW) — Construction Site Access", ms:"Latihan Kad Hijau CIDB (SICW) — Akses Tapak Pembinaan", zh:"CIDB绿卡培训（SICW）— 建筑工地准入", ta:"CIDB பச்சை அட்டை பயிற்சி (SICW) — கட்டுமான தள அணுகல்" },
    cidbHeroSubtitle: { en:"CIDB-accredited SICW training on your construction site. Audit-ready attendance register included. Per-group-day pricing. Centre Code: PLSICW20231022-068.", ms:"Latihan SICW bertauliah CIDB yang disempurnakan di tapak pembinaan anda. Merangkumi daftar kehadiran yang sedia untuk audit dan harga per-hari-perkumpulan. Kod Pusat: PLSICW20231022-068.", zh:"在您的建筑工地完成的CIDB认证SICW培训。包含审计就绪的出勤登记表和按组日计价。中心代码：PLSICW20231022-068。", ta:"உங்கள் கட்டுமான தளத்தில் முடிக்கப்பட்ட CIDB-சான்றளிக்கப்பட்ட SICW பயிற்சி. தணிக்கை-தயார் வருகை பதிவேடு மற்றும் குழு-நாள் விலை நிர்ணயம் உட்பட. மையக் குறியீடு: PLSICW20231022-068." },
    cidbHeroBtnWa: { en:"WhatsApp for Batch Registration", ms:"WhatsApp untuk Pendaftaran Pukal", zh:"WhatsApp批量报名", ta:"தொகுப்பு பதிவுக்கு WhatsApp" },
    cidbHeroBtnContact: { en:"Request Batch Schedule", ms:"Mohon Jadual Pukal", zh:"索取批量培训时间表", ta:"தொகுப்பு அட்டவணையைக் கோருக" },
    cidbProblemTitle: { en:"Do You Need CIDB Green Cards?", ms:"Adakah Anda Memerlukan Kad Hijau CIDB?", zh:"您需要CIDB绿卡吗？", ta:"உங்களுக்கு CIDB பச்சை அட்டைகள் தேவையா?" },
    cidbProblemText: { en:"Under the CIDB Act 520, every person on an active construction site needs a valid Green Card. But arranging classroom training means transport costs, lost work hours, and no attendance proof for audits. We register your crew, deliver SICW on-site, and hand over an audit-ready register — priced per group-day, not per head.", ms:"Di bawah Akta CIDB 520, setiap orang di tapak pembinaan aktif memerlukan Kad Hijau yang sah. Tetapi menyusun latihan bilik darjah bermaksud kos pengangkutan, jam kerja yang hilang, dan tiada bukti kehadiran untuk audit. Kami mendaftarkan krew anda, menyampaikan SICW di tapak, dan menyerahkan daftar yang sedia untuk audit — dengan harga per-hari-perkumpulan, bukan per orang.", zh:"根据CIDB第520号法令，每个在活跃建筑工地的人员都需要有效绿卡。但安排课堂培训意味着交通费用、损失工时和缺乏审计所需的出勤证明。我们为您的团队注册、在工地现场提供SICW培训，并交付审计就绪的登记表——按组日计价，而非按人头收费。", ta:"CIDB சட்டம் 520-ன் கீழ், செயலில் உள்ள கட்டுமான தளத்தில் ஒவ்வொருவருக்கும் செல்லுபடியாகும் பச்சை அட்டை தேவை. ஆனால் வகுப்பறை பயிற்சியை ஏற்பாடு செய்வது போக்குவரத்து செலவுகள், இழந்த வேலை நேரம், மற்றும் தணிக்கைக்கான வருகை சான்றம் இல்லாததை அர்த்தப்படுத்துகிறது. நாங்கள் உங்கள் குழுவை பதிவு செய்கிறோம், தளத்தில் SICW வழங்குகிறோம், மற்றும் தணிக்கை-தயார் பதிவேட்டை ஒப்படைக்கிறோம் — தலைக்கு அல்ல, குழு-நாள் விலை." },
    cidbStakesTitle: { en:"The Stakes", ms:"Risiko Yang Dihadapi", zh:"风险所在", ta:"ஆபத்துகள்" },
    cidbStakesH1: { en:"Immediate Site Removal", ms:"Pengusiran Tapak Segera", zh:"立即离场", ta:"உடனடி தள அகற்றல்" },
    cidbStakesP1: { en:"CIDB enforcement officers conduct random site inspections. Workers without valid Green Cards can be removed immediately, halting your project.", ms:"Pegawai penguatkuasa CIDB menjalankan pemeriksaan tapak rawak. Pekerja tanpa Kad Hijau yang sah boleh disingkirkan segera, menghentikan projek anda.", zh:"CIDB执法人员进行随机工地检查。没有有效绿卡的工人可能被立即遣离，导致您的项目停工。", ta:"CIDB செயல்படுத்தும் அதிகாரிகள் சீரற்ற தள ஆய்வுகளை நடத்துகிறார்கள். செல்லுபடியாகாத பச்சை அட்டைகள் இல்லாத தொழிலாளர்கள் உடனடியாக அகற்றப்படலாம், உங்கள் திட்டத்தை நிறுத்துகிறது." },
    cidbStakesH2: { en:"Project Suspension Risk", ms:"Risiko Penggantungan Projek", zh:"项目暂停风险", ta:"திட்டம் நிறுத்தும் அபாயம்" },
    cidbStakesP2: { en:"Main contractors risk project suspension, and repeated violations can affect CIDB contractor grades — impacting future tenders.", ms:"Kontraktor utama menghadapi risiko penggantungan projek, dan pelanggaran berulang boleh menjejaskan gred kontraktor CIDB — memberi kesan kepada tender masa depan.", zh:"主承包商面临项目暂停风险，重复违规可能影响CIDB承包商等级——从而影响未来投标。", ta:"முதன்மை ஒப்பந்ததாரர்கள் திட்டம் நிறுத்தும் அபாயத்தை எதிர்கொள்கிறார்கள், மற்றும் தொடர்ச்சியான மீறல்கள் CIDB ஒப்பந்ததாரர் தரங்களை பாதிக்கலாம் — எதிர்கால டெண்டர்களை பாதிக்கிறது." },
    cidbStakesH3: { en:"Counterfeit Card Exposure", ms:"Pendedahan Kad Palsu", zh:"伪卡暴露风险", ta:"போலி அட்டை புற்றுநோய்" },
    cidbStakesP3: { en:"CIDB now scans QR codes for real-time verification. Cut-price counterfeit certificates from uncertified providers are instantly flagged.", ms:"CIDB kini mengimbas kod QR untuk pengesahan masa nyata. Sijil harga potong dari pembekal tidak bertauliah ditandakan serta-merta.", zh:"CIDB现在扫描二维码进行实时验证。来自未经认证提供商的廉价伪造证书会被立即标记。", ta:"CIDB இப்போது உண்மை நேர சரிபார்ப்புக்கு QR குறியீடுகளைச் ச்கேன் செய்கிறது. சான்றளிக்கப்படாத வழங்குநர்களிடமிருந்து குறைந்த விலை போலி சான்றிதழ்கள் உடனடியாக குறிக்கப்படுகின்றன." },
    cidbHazardTitle: { en:"Hazard Profile", ms:"Profil Bahaya", zh:"危害概况", ta:"அபாய சுயவிவரம்" },
    cidbHazard1Name: { en:"Invalid or Expired Cards", ms:"Kad Tidak Sah atau Luput", zh:"无效或过期绿卡", ta:"செல்லாத அல்லது காலாவதியான அட்டைகள்" },
    cidbHazard1Desc: { en:"Cards obtained through uncertified providers or past expiry date. CIDB now scans QR codes for real-time verification.", ms:"Kad yang diperoleh melalui pembekal tidak bertauliah atau melepasi tarikh luput. CIDB kini mengimbas kod QR untuk pengesahan masa nyata.", zh:"通过未经认证提供商获得的卡或已过期的卡。CIDB现在扫描二维码进行实时验证。", ta:"சான்றளிக்கப்படாத வழங்குநர்கள் அல்லது காலாவதி தேதி கடந்த பெறப்பட்ட அட்டைகள். CIDB இப்போது உண்மை நேர சரிபார்ப்புக்கு QR குறியீடுகளைச் ச்கேன் செய்கிறது." },
    cidbHazard2Name: { en:"Untrained Subcontractors", ms:"Subkontraktor Tidak Dilatih", zh:"未经培训的分包商", ta:"பயிற்சி இல்லாத உட்கட்டுமான ஒப்பந்ததாரர்கள்" },
    cidbHazard2Desc: { en:"Subcontractor crews often arrive on site without SICW certification, halting work until compliant.", ms:"Krew subkontraktor sering tiba di tapak tanpa pensijilan SICW, menghentikan kerja sehingga patuh.", zh:"分包商团队经常在没有SICW认证的情况下到达工地，导致工作暂停直至合规。", ta:"உட்கட்டுமான பணியாளர் குழுக்கள் பெரும்பாலும் SICW சான்றிதழ் இல்லாமல் தளத்திற்கு வருகிறார்கள், இணக்கமான வரை வேலையை நிறுத்துகிறது." },
    cidbHazard3Name: { en:"Language Barriers", ms:"Halangan Bahasa", zh:"语言障碍", ta:"மொழி தடைகள்" },
    cidbHazard3Desc: { en:"Foreign workers may not understand Malay or English safety briefings. We deliver training in multiple languages.", ms:"Pekerja asing mungkin tidak memahami taklimat keselamatan Bahasa Melayu atau Inggeris. Kami menyampaikan latihan dalam pelbagai bahasa.", zh:"外籍工人可能不理解马来语或英语安全简报。我们提供多语言培训。", ta:"வெளிநாட்டு தொழிலாளர்கள் மலாய் அல்லது ஆங்கில பாதுகாப்பு விளக்கங்களைப் புரிந்துகொள்ள முடியாது. நாங்கள் பல மொழிகளில் பயிற்சியை வழங்குகிறோம்." },
    cidbHazard4Name: { en:"High Workforce Turnover", ms:"Pusingan Pekerja Tinggi", zh:"高员工流动率", ta:"அதிக பணிப்புற்று பரிமாற்றம்" },
    cidbHazard4Desc: { en:"Construction sites with high turnover require continuous batch training to maintain 100% compliance.", ms:"Tapak pembinaan dengan pusingan pekerja tinggi memerlukan latihan pukal berterusan untuk mengekalkan 100% pematuhan.", zh:"员工流动率高的建筑工地需要持续的批量培训，以维持100%合规。", ta:"அதிக பரிமாற்றம் கொண்ட கட்டுமான தளங்கள் தொடர்ச்சியான தொகுப்பு பயிற்சியை 100% இணக்கத்தை பேணுவதற்கு தேவைப்படுகின்றன." },
    cidbDetectionTitle: { en:"Warning Signs", ms:"Tanda Amaran", zh:"警告信号", ta:"எச்சரிக்கை அறிகுறிகள்" },
    cidbDetection1: { en:"Your project has been flagged in a CIDB site inspection", ms:"Projek anda telah ditandakan dalam pemeriksaan tapak CIDB", zh:"您的项目在CIDB工地检查中被标记", ta:"உங்கள் திட்டம் CIDB தள ஆய்வில் குறிக்கப்பட்டுள்ளது" },
    cidbDetection2: { en:"Subcontractor crews arrive without valid Green Cards", ms:"Krew subkontraktor tiba tanpa Kad Hijau yang sah", zh:"分包商团队没有有效绿卡就到达工地", ta:"உட்கட்டுமான பணியாளர் குழுக்கள் செல்லுபடியாகாத பச்சை அட்டைகளுடன் வருகிறார்கள்" },
    cidbDetection3: { en:"You are preparing tender documents that require CIDB safety compliance proof", ms:"Anda sedang menyediakan dokumen tender yang memerlukan bukti pematuhan keselamatan CIDB", zh:"您正在准备需要CIDB安全合规证明的投标文件", ta:"CIDB பாதுகாப்பு இணக்க சான்று தேவைப்படும் டெண்டர் ஆவணங்களை நீங்கள் தயாரிக்கிறீர்கள்" },
    cidbDetection4: { en:"Your site insurance policy mandates 100% SICW coverage", ms:"Polisi insurans tapak anda menetapkan liputan SICW 100%", zh:"您的工地保险单要求100% SICW覆盖", ta:"உங்கள் தள காப்பீட்டு கொள்கை 100% SICW பர coverage கோருகிறது" },
    cidbDetection5: { en:"Workers hold cards from unverified or overseas providers", ms:"Pekerja memegang kad dari pembekal tidak disahkan atau luar negara", zh:"工人持有来自未经验证或海外提供商的卡", ta:"தொழிலாளர்கள் சரிபார்க்கப்படாத அல்லது வெளிநாட்டு வழங்குநர்களிடமிருந்து அட்டைகளை வைத்திருக்கிறார்கள்" },
    cidbDetection6: { en:"You need to onboard 20+ workers before project commencement", ms:"Anda perlu menaikkan 20+ pekerja sebelum permulaan projek", zh:"您需要在项目开工前让20多名工人入职", ta:"திட்டம் தொடங்குவதற்கு முன் 20+ தொழிலாளர்களைச் சேர்க்க வேண்டும்" },
    cidbProcessTitle: { en:"Our Process", ms:"Proses Kami", zh:"我们的流程", ta:"எங்கள் செயல்முறை" },
    cidbProcess1Label: { en:"Batch Registration", ms:"Pendaftaran Pukal", zh:"批量注册", ta:"தொகுப்பு பதிவு" },
    cidbProcess1Desc: { en:"We collect worker details, passport/IC copies, and register the batch with CIDB e-Systems.", ms:"Kami mengumpulkan butiran pekerja, salinan pasport/IC, dan mendaftarkan pukal dengan Sistem e-CIDB.", zh:"我们收集工人资料、护照/身份证复印件，并向CIDB电子系统批量注册。", ta:"தொழிலாளர் விவரங்களை, பாஸ்போர்ட்/ஐசி நகல்களை சேகரித்து, CIDB மின்னணு அமைப்புகளுடன் தொகுப்பை பதிவு செய்கிறோம்." },
    cidbProcess2Label: { en:"Classroom or On-Site Induction", ms:"Induktor Bilik Darjah atau Di Tapak", zh:"课堂或现场入门培训", ta:"வகுப்பறை அல்லது தளத்தில் அறிமுகம்" },
    cidbProcess2Desc: { en:"Official SICW curriculum delivered by CIDB-certified instructors. One-day intensive covering site hazards, PPE, emergency response, and legal obligations.", ms:"Kurikulum SICW rasmi disampaikan oleh pengajar bertauliah CIDB. Kursus intensif satu hari merangkumi bahaya tapak, PPE, tindak balas kecemasan, dan obligasi undang-undang.", zh:"由CIDB认证讲师讲授官方SICW课程。为期一天强化培训，涵盖工地危害、PPE、应急响应和法律义务。", ta:"CIDB-சான்றளிக்கப்பட்ட பயிற்றுவிப்பாளர்களால் வழங்கப்படும் அதிகாரப்பூர்வ SICW பாடத்திட்டம். தள அபாயங்கள், PPE, அவசர பதில், மற்றும் சட்ட பொறுப்புகளை உள்ளடக்கிய ஒரு நாள் தீவிர பயிற்சி." },
    cidbProcess3Label: { en:"Assessment &amp; Certification", ms:"Penilaian &amp; Pensijilan", zh:"评估与认证", ta:"மதிப்பீடு மற்றும் சான்றிதல்" },
    cidbProcess3Desc: { en:"Workers sit the CIDB assessment. Successful candidates receive their Green Card with QR-verifiable serial number.", ms:"Pekerja menduduki penilaian CIDB. Calon yang berjaya menerima Kad Hijau mereka dengan nombor siri yang boleh disahkan QR.", zh:"工人参加CIDB评估。通过者将获得带有QR可验证序列号的绿卡。", ta:"தொழிலாளர்கள் CIDB மதிப்பீட்டை எழுதுகிறார்கள். வெற்றி பெற்றவர்கள் QR-சரிபார்க்கக்கூடிய வரிசை எண்ணுடன் தங்கள் பச்சை அட்டையைப் பெறுகிறார்கள்." },
    cidbProcess4Label: { en:"On-Site Compliance Check", ms:"Pemeriksaan Pematuhan Di Tapak", zh:"现场合规检查", ta:"தள இணக்க சரிபார்ப்பு" },
    cidbProcess4Desc: { en:"We verify card validity with your site safety officer and provide an audit-ready compliance attendance register for CIDB inspection.", ms:"Kami mengesahkan kesahihan kad dengan pegawai keselamatan tapak anda dan menyediakan daftar kehadiran pematuhan yang sedia untuk audit bagi pemeriksaan CIDB.", zh:"我们与您的工地安全官验证卡的有效性，并提供审计就绪的合规出勤登记表供CIDB检查。", ta:"உங்கள் தள பாதுகாப்பு அதிகாரியுடன் அட்டை செல்லுபடியை சரிபார்க்கிறோம் மற்றும் CIDB ஆய்வுக்கு தணிக்கை-தயார் இணக்க வருகை பதிவேட்டை வழங்குகிறோம்." },
    cidbProcess5Label: { en:"Renewal Tracking", ms:"Penjejakan Pembaharuan", zh:"续期跟踪", ta:"புதுப்பிப்பு கண்காணிப்பு" },
    cidbProcess5Desc: { en:"Green Cards expire. We maintain a renewal calendar and notify you 60 days before expiry to prevent lapses.", ms:"Kad Hijau luput. Kami mengekalkan kalendar pembaharuan dan memberitahu anda 60 hari sebelum luput untuk mengelakkan kelewatan.", zh:"绿卡会过期。我们维护续期日历，并在到期前60天通知您，防止失效。", ta:"பச்சை அட்டைகள் காலாவதியாகின்றன. நாங்கள் புதுப்பிப்பு காலண்டரை பேணுகிறோம் மற்றும் காலாவதிக்கு 60 நாட்களுக்கு முன் உங்களுக்கு அறிவிப்பு செய்கிறோம்." },
    cidbFailsTitle: { en:"Why Other Approaches Fail", ms:"Mengapa Pendekatan Lain Gagal", zh:"为什么其他方法会失败", ta:"மற்ற அணுகுமுறைகள் ஏன் தோல்வியடைகின்றன" },
    cidbFailsText: { en:"Classroom-based SICW costs you transport, downtime, and wages for workers travelling off-site. Generic providers hand out certificates but no attendance register — leaving you without proof during a CIDB audit. One-off training without renewal tracking creates compliance gaps within months. We price per group-day, deliver on-site, and provide an audit-ready register.", ms:"SICW berasaskan bilik darjah membebankan anda dengan kos pengangkutan, masa henti, dan gaji pekerja yang berulang alik. Pembekal generik memberikan sijil tetapi tiada daftar kehadiran — meninggalkan anda tanpa bukti semasa audit CIDB. Latihan sekali sahaja tanpa penjejakan pembaharuan mencipta jurang pematuhan dalam beberapa bulan. Kami menetapkan harga per-hari-perkumpulan, menghantar ke tapak, dan menyediakan daftar yang sedia untuk audit.", zh:"基于课堂的SICW让您承担工人往返的交通费用、停工时间和工资。通用提供商只发证书但没有出勤登记表——在CIDB审计期间让您缺乏证明。没有续期跟踪的一次性培训在几个月内就会产生合规缺口。我们按组日计价、现场授课，并提供审计就绪的登记表。", ta:"வகுப்பறை அடிப்படையிலான SICW உங்களுக்கு போக்குவரத்து செலவுகள், இயக்கத்தடை, மற்றும் வேலையிடத்திற்கு வெளியே செல்லும் தொழிலாளர்களின் சம்பளத்தை செலவாக்குகிறது. பொதுவான வழங்குநர்கள் சான்றிதழ்களை வழங்குகிறார்கள் ஆனால் வருகை பதிவேடு இல்லை — CIDB தணிக்கையின் போது உங்களுக்கு சான்றம் இல்லாமல் விடுகிறது. புதுப்பிப்பு கண்காணிப்பு இல்லாத ஒரு முறை பயிற்சி மாதங்களுக்குள் இணக்க இடைவெளிகளை உருவாக்குகிறது. நாங்கள் குழு-நாள் விலை நிர்ணயம் செய்கிறோம், தளத்தில் வழங்குகிறோம், மற்றும் தணிக்கை-தயார் பதிவேட்டை வழங்குகிறோம்." },
    cidbSchedulingTitle: { en:"Risk-Based Scheduling", ms:"Penjadualan Berdasarkan Risiko", zh:"基于风险的排程", ta:"அபாய அடிப்படையிலான திட்டமிடல்" },
    cidbSchedulingHighTitle: { en:"High-Risk Environments", ms:"Persekitaran Berisiko Tinggi", zh:"高风险环境", ta:"அதிக அபாய சூழல்கள்" },
    cidbSchedulingHighDesc: { en:"Large civil projects with 100+ workers — monthly batch training and renewal tracking required.", ms:"Projek awam besar dengan 100+ pekerja — latihan pukal bulanan dan penjejakan pembaharuan diperlukan.", zh:"拥有100多名工人的大型土木项目——需要每月批量培训和续期跟踪。", ta:"100+ தொழிலாளர்கள் கொண்ட பெரிய பொதுநல திட்டங்கள் — மாதாந்திர தொகுப்பு பயிற்சி மற்றும் புதுப்பிப்பு கண்காணிப்பு தேவை." },
    cidbSchedulingLowTitle: { en:"Low-Moderate Risk", ms:"Risiko Rendah-Sederhana", zh:"中低风险", ta:"குறைந்த-மிதமான அபாயம்" },
    cidbSchedulingLowDesc: { en:"Small residential builds with stable crews — annual renewal batch sufficient.", ms:"Binaan kediaman kecil dengan krew stabil — pembaharuan pukal tahunan mencukupi.", zh:"人员稳定的住宅小型建筑——每年续期批量即可。", ta:"நிலையான குழுக்கள் கொண்ட சிறிய வீட்டு கட்டுமானங்கள் — ஆண்டு புதுப்பிப்பு தொகுப்பு போதுமானது." },
    cidbPropertyTitle: { en:"Property Types We Serve", ms:"Jenis Kemudahan yang Kami Layani", zh:"我们服务的物业类型", ta:"நாங்கள் சேவை செய்யும் சொத்து வகைகள்" },
    cidbProperty1: { en:"High-rise residential and commercial builds", ms:"Binaan kediaman dan komersial bertingkat tinggi", zh:"高层住宅和商业建筑", ta:"உயரமான வீட்டு மற்றும் வணிக கட்டுமானங்கள்" },
    cidbProperty2: { en:"Infrastructure and civil engineering projects", ms:"Projek infrastruktur dan kejuruteraan awam", zh:"基础设施和土木工程项目", ta:"கட்டமைப்பு மற்றும் பொதுநல பொறியியல் திட்டங்கள்" },
    cidbProperty3: { en:"Factory and warehouse construction", ms:"Pembinaan kilang dan gudang", zh:"工厂和仓库建设", ta:"ஆலை மற்றும் கிடங்கு கட்டுமானம்" },
    cidbProperty4: { en:"Road and bridge works", ms:"Kerja jalan dan jambatan", zh:"道路和桥梁工程", ta:"சாலை மற்றும் பால பணிகள்" },
    cidbProperty5: { en:"Oil &amp; gas facility upgrades", ms:"Naik taraf kemudahan minyak &amp; gas", zh:"石油天然气设施升级", ta:"எண்ணெய் மற்றும் வாயு வசதி மேம்பாடுகள்" },
    cidbProperty6: { en:"Renovation and retrofit projects", ms:"Projek renovasi dan retrofit", zh:"翻新和改造项目", ta:"புதுப்பித்தல் மற்றும் மறுஅமைப்பு திட்டங்கள்" },
    cidbCoverageTitle: { en:"Coverage Areas", ms:"Kawasan Liputan", zh:"覆盖地区", ta:"பரவல் பகுதிகள்" },
    cidbCoverageText: { en:"On-site CIDB Green Card batch training across Johor and Peninsular Malaysia.", ms:"Latihan pukal Kad Hijau CIDB di tapak merentasi Johor dan Semenanjung Malaysia.", zh:"在柔佛和马来西亚半岛各地提供现场CIDB绿卡批量培训。", ta:"ஜொகூர் மற்றும் மலேசிய தீபகற்பம் முழுவதும் தள CIDB பச்சை அட்டை தொகுப்பு பயிற்சி." },
    cidbCoverage1: { en:"Johor Bahru", ms:"Johor Bahru", zh:"新山", ta:"ஜொகூர் பாரு" },
    cidbCoverage2: { en:"Pasir Gudang", ms:"Pasir Gudang", zh:"巴西古当", ta:"பாசிர் கூடாங்" },
    cidbCoverage3: { en:"Senai", ms:"Senai", zh:"士乃", ta:"செனாய்" },
    cidbCoverage4: { en:"Pengerang", ms:"Pengerang", zh:"边佳兰", ta:"பெங்கெராங்" },
    cidbCoverage5: { en:"Iskandar Puteri", ms:"Iskandar Puteri", zh:"依斯干达公主城", ta:"இஸ்கந்தார் புத்தேரி" },
    cidbCoverage6: { en:"Skudai", ms:"Skudai", zh:"士古来", ta:"சுகுதை" },
    cidbCoverage7: { en:"Kulai", ms:"Kulai", zh:"古来", ta:"குலாய்" },
    cidbCoverage8: { en:"Masai", ms:"Masai", zh:"马赛", ta:"மாசாய்" },
    cidbFaqTitle: { en:"Frequently Asked Questions", ms:"Soalan Lazim", zh:"常见问题", ta:"அடிக்கடி கேட்கப்படும் கேள்விகள்" },
    cidbFaq1Q: { en:"How long is the Green Card valid?", ms:"Berapa lamakah Kad Hijau sah?", zh:"绿卡有效期多久？", ta:"பச்சை அட்டை எவ்வளவு காலம் செல்லுபடியாகும்?" },
    cidbFaq1A: { en:"CIDB Green Cards are typically valid for 3 years. Renewal requires re-assessment. We track expiry dates and remind you 60 days in advance.", ms:"Kad Hijau CIDB biasanya sah untuk 3 tahun. Pembaharuan memerlukan penilaian semula. Kami menjejak tarikh luput dan mengingatkan anda 60 hari lebih awal.", zh:"CIDB绿卡通常有效期为3年。续期需要重新评估。我们跟踪到期日期并提前60天提醒。", ta:"CIDB பச்சை அட்டைகள் பொதுவாக 3 ஆண்டுகள் செல்லுபடியாகும். புதுப்பித்தல் மறுமதிப்பீட்டைக் கோருகிறது. காலாவதி தேதிகளைக் கண்காணித்து 60 நாட்களுக்கு முன் நினைவூட்டுகிறோம்." },
    cidbFaq2Q: { en:"Can foreign workers get a Green Card?", ms:"Bolehkah pekerja asing mendapat Kad Hijau?", zh:"外籍工人可以获得绿卡吗？", ta:"வெளிநாட்டு தொழிலாளர்களுக்கு பச்சை அட்டை கிடைக்குமா?" },
    cidbFaq2A: { en:"Yes. Foreign workers legally employed on Malaysian construction sites must hold a valid SICW. We process registration for both local and foreign workers.", ms:"Ya. Pekerja asing yang diambil bekerja secara sah di tapak pembinaan Malaysia mesti memegang SICW yang sah. Kami memproses pendaftaran untuk pekerja tempatan dan asing.", zh:"可以。在马来西亚建筑工地合法就业的外籍工人必须持有有效的SICW。我们为本地和外籍工人处理注册。", ta:"ஆம். மலேசிய கட்டுமான தளங்களில் சட்டப்பூர்வமாக வேலை செய்யும் வெளிநாட்டு தொழிலாளர்கள் செல்லுபடியாகும் SICW வைத்திருக்க வேண்டும். உள்ளூர் மற்றும் வெளிநாட்டு தொழிலாளர்களுக்கு பதிவு செயலாக்குகிறோம்." },
    cidbFaq3Q: { en:"Do supervisors and engineers need Green Cards too?", ms:"Adakah penyelia dan jurutera juga perlu Kad Hijau?", zh:"主管和工程师也需要绿卡吗？", ta:"மேற்பார்வையாளர்களுக்கும் பொறியாளர்களுக்கும் பச்சை அட்டைகள் தேவையா?" },
    cidbFaq3A: { en:"Yes. Every individual physically present on an active construction site must hold a valid SICW, including project managers, engineers, and visitors on extended stays.", ms:"Ya. Setiap individu yang berada secara fizikal di tapak pembinaan aktif mesti memegang SICW yang sah, termasuk pengurus projek, jurutera, dan pelawat yang menetap lama.", zh:"是的。每个在活跃建筑工地上实际在场的人员都必须持有有效的SICW，包括项目经理、工程师和长期访客。", ta:"ஆம். செயலில் உள்ள கட்டுமான தளத்தில் உடலளவில் இருக்கும் ஒவ்வொரு நபரும் செல்லுபடியாகும் SICW வைத்திருக்க வேண்டும், திட்ட மேலாளர்கள், பொறியாளர்கள், மற்றும் நீண்ட கால தங்கியிருப்பவர்கள் உட்பட." },
    cidbFaq4Q: { en:"What happens if CIDB inspects and finds uncertified workers?", ms:"Apakah yang berlaku jika CIDB memeriksa dan mendapati pekerja tidak bertauliah?", zh:"如果CIDB检查发现有未认证的工人会怎样？", ta:"CIDB ஆய்வு செய்து சான்றளிக்கப்படாத தொழிலாளர்களைக் கண்டால் என்ன நடக்கும்?" },
    cidbFaq4A: { en:"Workers may be barred from site. Repeated violations can lead to project suspension and downgrade of your CIDB contractor registration. We provide same-day emergency batch training for inspection-triggered compliance gaps.", ms:"Pekerja mungkin dihalang dari tapak. Pelanggaran berulang boleh membawa kepada penggantungan projek dan penurunan gred pendaftaran kontraktor CIDB anda. Kami menyediakan latihan pukal kecemasan untuk jurang pematuhan yang dicetuskan oleh pemeriksaan.", zh:"工人可能被禁止进入工地。重复违规可能导致项目暂停和CIDB承包商注册降级。我们为检查触发的合规缺口提供当天紧急批量培训。", ta:"தொழிலாளர்கள் தளத்திலிருந்து தடுக்கப்படலாம். தொடர்ச்சியான மீறல்கள் திட்டம் நிறுத்துதல் மற்றும் உங்கள் CIDB ஒப்பந்ததாரர் பதிவு குறைப்புக்கு வழிவகுக்கும். ஆய்வு தூண்டப்பட்ட இணக்க இடைவெளிகளுக்கு அன்றே அவசர தொகுப்பு பயிற்சியை வழங்குகிறோம்." },
    cidbFaq5Q: { en:"Is SICW training HRD Corp claimable?", ms:"Adakah latihan SICW boleh dituntut HRD Corp?", zh:"SICW培训可以申报HRD Corp吗？", ta:"SICW பயிற்சி HRD Corp உரிமை கோரக்கூடியதா?" },
    cidbFaq5A: { en:"Yes, when delivered by our HRD Corp-certified trainers. We assist with e-TRiS documentation for batch training claims.", ms:"Ya, apabila disampaikan oleh jurulatih bertauliah HRD Corp kami. Kami membantu dengan dokumentasi e-TRiS untuk tuntutan latihan pukal.", zh:"可以，当由我们的HRD Corp认证培训师授课时。我们协助办理批量培训e-TRiS文件。", ta:"ஆம், HRD Corp-சான்றளிக்கப்பட்ட பயிற்றுவிப்பாளர்களால் வழங்கப்படும்போது. தொகுப்பு பயிற்சி உரிமைகளுக்கு e-TRiS ஆவணமயமாக்கலை உதவுகிறோம்." },
    cidbFaq6Q: { en:"Can you train on our construction site?", ms:"Bolehkah anda melatih di tapak pembinaan kami?", zh:"你们可以在我们的建筑工地培训吗？", ta:"உங்கள் கட்டுமான தளத்தில் பயிற்சி அளிக்க முடியுமா?" },
    cidbFaq6A: { en:"Absolutely. We deliver SICW training directly on your site, minimising worker downtime and transport costs. All equipment and materials provided.", ms:"Semestinya. Kami menyampaikan latihan SICW terus di tapak anda, mengurangkan masa henti pekerja dan kos pengangkutan. Semua peralatan dan bahan disediakan.", zh:"当然。我们直接在您的工地提供SICW培训，最大限度地减少工人停工时间和交通费用。所有设备和材料由我们提供。", ta:"நிச்சயமாக. உங்கள் தளத்தில் நேரடியாக SICW பயிற்சியை வழங்குகிறோம், தொழிலாளர் இயக்கத்தடை மற்றும் போக்குவரத்து செலவுகளை குறைக்கிறோம். அனைத்து உபகரணங்களும் மற்றும் பொருட்களும் வழங்கப்படுகின்றன." },
    cidbCtaTitle: { en:"Get Your Crew Compliant Before the Next CIDB Inspection", ms:"Patuhkan Krew Anda Sebelum Pemeriksaan CIDB Seterusnya", zh:"在下次CIDB检查之前让您的团队合规", ta:"அடுத்த CIDB ஆய்வுக்கு முன் உங்கள் குழுவை இணக்கமாக்கவும்" },
    cidbCtaSubtitle: { en:"Batch registration with on-site SICW completion. Audit-ready attendance register included. Priced per group-day — quote within 24 hours.", ms:"Pendaftaran pukal dengan penyelesaian SICW di tapak. Daftar kehadiran yang sedia untuk audit disertakan. Harga per-hari-perkumpulan — sebut harga dalam 24 jam.", zh:"批量注册，现场完成SICW。包含审计就绪的出勤登记表。按组日计价——24小时内报价。", ta:"தளத்தில் SICW முடிப்புடன் தொகுப்பு பதிவு. தணிக்கை-தயார் வருகை பதிவேடு சேர்க்கப்பட்டுள்ளது. குழு-நாள் விலை — 24 மணி நேரத்திற்குள் மதிப்பீடு." },
    cidbCtaBtnWa: { en:"WhatsApp for Batch Registration", ms:"WhatsApp untuk Pendaftaran Pukal", zh:"WhatsApp批量报名", ta:"தொகுப்பு பதிவுக்கு WhatsApp" },
    cidbCtaBtnContact: { en:"Request Batch Schedule", ms:"Mohon Jadual Pukal", zh:"索取批量培训时间表", ta:"தொகுப்பு அட்டவணையைக் கோருக" },
    hirarcEyebrow: { en:"Universal Mandate", ms:"Wajib Universal", zh:"普遍强制要求", ta:"உலகளாவிய கட்டாயம்" },
    hirarcHeroTitle: { en:"HIRARC &amp; Risk Management — Statutory Workplace Assessment", ms:"HIRARC &amp; Pengurusan Risiko — Penilaian Tempat Kerja Statutori", zh:"HIRARC与风险管理 — 法定工作场所评估", ta:"HIRARC மற்றும் அபாய மேலாண்மை — சட்டப்பூர்வ பணியிட மதிப்பீடு" },
    hirarcHeroSubtitle: { en:"Hazard Identification, Risk Assessment and Risk Control. Required for every Malaysian workplace with 5 or more workers under the OSH Act 1994.", ms:"Pengenalpastian Bahaya, Penilaian Risiko dan Kawalan Risiko. Diwajibkan untuk setiap tempat kerja Malaysia dengan 5 atau lebih pekerja di bawah Akta OSH 1994.", zh:"危害识别、风险评估和风险控制。根据OSH Act 1994，马来西亚拥有5名或以上员工的每个工作场所都必须进行。", ta:"அபாய அடையாளம் காணுதல், அபாய மதிப்பீடு மற்றும் அபாய கட்டுப்பாடு. OSH சட்டம் 1994-ன் கீழ் 5 அல்லது அதற்கு மேற்பட்ட தொழிலாளர்களைக் கொண்ட ஒவ்வொரு மலேசிய பணியிடத்திற்கும் தேவை." },
    hirarcHeroBtnWa: { en:"WhatsApp for HIRARC Assessment", ms:"WhatsApp untuk Penilaian HIRARC", zh:"WhatsApp咨询HIRARC评估", ta:"HIRARC மதிப்பீட்டிற்கு WhatsApp" },
    hirarcHeroBtnContact: { en:"Request Assessment Proposal", ms:"Mohon Cadangan Penilaian", zh:"索取评估方案", ta:"மதிப்பீட்டு முன்மொழிவைக் கோருக" },
    hirarcProblemTitle: { en:"Do You Need a HIRARC?", ms:"Adakah Anda Memerlukan HIRARC?", zh:"您需要进行HIRARC吗？", ta:"உங்களுக்கு HIRARC தேவையா?" },
    hirarcProblemText: { en:"Under the OSH Act 1994, every employer must conduct a systematic Hazard Identification, Risk Assessment and Risk Control (HIRARC) for their workplace. Yet many Malaysian SMEs have either never completed one, or their HIRARC is a generic template downloaded from the internet that does not reflect actual site hazards.", ms:"Di bawah Akta OSH 1994, setiap majikan mesti menjalankan Pengenalpastian Bahaya, Penilaian Risiko dan Kawalan Risiko (HIRARC) yang sistematik untuk tempat kerja mereka. Namun ramai SME Malaysia sama ada belum pernah menyiapkannya, atau HIRARC mereka adalah templat generik yang dimuat turun dari internet yang tidak mencerminkan bahaya tapak sebenar.", zh:"根据OSH Act 1994，每位雇主必须为其工作场所进行系统的危害识别、风险评估和风险控制（HIRARC）。然而，许多马来西亚中小企业要么从未完成过一次，要么他们的HIRARC是从互联网下载的通用模板，无法反映实际现场危害。", ta:"OSH சட்டம் 1994-ன் கீழ், ஒவ்வொரு வேலையாளரும் அவர்களின் பணியிடத்திற்கு அமைப்புமுறை அபாய அடையாளம் காணுதல், அபாய மதிப்பீடு மற்றும் அபாய கட்டுப்பாடு (HIRARC) நடத்த வேண்டும். இருப்பினும் பல மலேசிய SMEs ஒருபோதும் முடிக்கவில்லை, அல்லது அவற்றின் HIRARC இணையத்திலிருந்து பதிவிறக்கம் செய்யப்பட்ட பொதுவான வார்ப்புரு ஆகும் அது உண்மையான தள அபாயங்களை பிரதிபலிக்காது." },
    hirarcStakesTitle: { en:"The Stakes", ms:"Risiko Yang Dihadapi", zh:"风险所在", ta:"ஆபத்துகள்" },
    hirarcStakesH1: { en:"DOSH Audit Failure", ms:"Kegagalan Audit DOSH", zh:"DOSH审计失败", ta:"DOSH தணிக்கை தோல்வி" },
    hirarcStakesP1: { en:"DOSH inspectors specifically request the HIRARC register during compliance audits. An outdated or generic HIRARC is treated as non-compliance. Employers face fines and stop-work orders.", ms:"Pemeriksa DOSH secara khusus meminta daftar HIRARC semasa audit pematuhan. HIRARC yang lapuk atau generik dianggap sebagai ketidakpatuhan. Majikan menghadapi denda dan perintah henti kerja.", zh:"DOSH检查员在合规审计中专门要求提供HIRARC登记表。过时或通用的HIRARC被视为不合规。雇主面临罚款和停工令。", ta:"DOSH ஆய்வாளர்கள் இணக்க தணிக்கைகளின் போது HIRARC பதிவேட்டை குறிப்பிட்டுக் கோருகிறார்கள். காலாவதியான அல்லது பொதுவான HIRARC இணக்கமின்மையாக கருதப்படுகிறது. வேலையாளர்கள் அபராதங்கள் மற்றும் வேலை-நிறுத்த ஆணைகளை எதிர்கொள்கிறார்கள்." },
    hirarcStakesH2: { en:"Civil Litigation Evidence", ms:"Bukti Litigasi Sivil", zh:"民事诉讼证据", ta:"சிவில் வழக்கு சான்றம்" },
    hirarcStakesP2: { en:"In the event of an accident, an inadequate HIRARC can be used as evidence of negligence in civil litigation. A robust, site-specific register is your best defence.", ms:"Jika berlaku kemalangan, HIRARC yang tidak mencukupi boleh digunakan sebagai bukti kecuaian dalam litigasi sivil. Daftar yang kukuh dan khusus tapak adalah pertahanan terbaik anda.", zh:"如果发生事故，不充分的HIRARC可能被用作民事诉讼中疏忽的证据。一个健全的、针对现场的登记表是您最好的辩护。", ta:"விபத்து ஏற்பட்டால், போதுமான HIRARC சிவில் வழக்கில் கவனக்குறைவின் சான்றமாக பயன்படுத்தப்படலாம். வலுவான, தள-குறிப்பிட்ட பதிவேடு உங்கள் சிறந்த பாதுகாப்பு." },
    hirarcStakesH3: { en:"Insurance Premium Impact", ms:"Kesan Premium Insurans", zh:"保险费影响", ta:"காப்பீட்டு பிரீமியம் தாக்கம்" },
    hirarcStakesP3: { en:"Insurance underwriters increasingly review HIRARC documentation when setting premiums. A current, well-maintained register signals proactive risk management and can reduce rates.", ms:"Penunderwriters insurans semakin menyemak dokumentasi HIRARC semasa menetapkan premium. Daftar semasa yang diselenggara dengan baik memberi isyarat pengurusan risiko proaktif dan boleh mengurangkan kadar.", zh:"保险公司在设定保费时越来越多地审查HIRARC文件。当前、维护良好的登记表表明积极的风险管理，可以降低费率。", ta:"காப்பீட்டு எழுத்தாளர்கள் பிரீமியங்களை நிர்ணயிக்கும்போது அதிகமாக HIRARC ஆவணங்களை மதிப்பாய்வு செய்கிறார்கள். தற்போதைய, நன்கு பேணப்பட்ட பதிவேடு முன்னெச்சரிக்கை அபாய மேலாண்மையைக் குறிக்கிறது மற்றும் விகிதங்களை குறைக்கலாம்." },
    hirarcHazardTitle: { en:"Hazard Profile", ms:"Profil Bahaya", zh:"危害概况", ta:"அபாய சுயவிவரம்" },
    hirarcHazard1Name: { en:"Generic Template HIRARC", ms:"HIRARC Templat Generik", zh:"通用模板HIRARC", ta:"பொதுவான வார்ப்புரு HIRARC" },
    hirarcHazard1Desc: { en:"Downloaded templates with hazards that do not exist on your site and missing hazards that do. Useless in court or inspection.", ms:"Templat yang dimuat turun dengan bahaya yang tidak wujud di tapak anda dan bahaya yang wujud tiada. Tidak berguna di mahkamah atau pemeriksaan.", zh:"下载的模板包含您现场不存在的危害，并遗漏了实际存在的危害。在法庭或检查中毫无用处。", ta:"உங்கள் தளத்தில் இல்லாத அபாயங்களையும் உள்ள அபாயங்களைக் காணாமல் போகவும் கொண்ட பதிவிறக்கப்பட்ட வார்ப்புருக்கள். நீதிமன்றம் அல்லது ஆய்வில் பயனற்றது." },
    hirarcHazard2Name: { en:"No Risk Quantification", ms:"Tiada Kuantifikasi Risiko", zh:"缺乏风险量化", ta:"அபாய அளவீடு இல்லை" },
    hirarcHazard2Desc: { en:"HIRARC entries that describe hazards but do not calculate risk levels or assign control priorities.", ms:"Entri HIRARC yang menerangkan bahaya tetapi tidak mengira tahap risiko atau memberi keutamaan kawalan.", zh:"HIRARC条目描述了危害，但没有计算风险等级或分配控制优先级。", ta:"அபாயங்களை விவரிக்கும் ஆனால் அபாய மட்டங்களை கணக்கிடாத அல்லது கட்டுப்பாடு முன்னுரிமைகளை ஒதுக்காத HIRARC பதிவுகள்." },
    hirarcHazard3Name: { en:"Missing Control Verification", ms:"Tiada Pengesahan Kawalan", zh:"缺乏控制验证", ta:"கட்டுப்பாடு சரிபார்ப்பு இல்லை" },
    hirarcHazard3Desc: { en:"Controls listed in the HIRARC that were never implemented or tested for effectiveness.", ms:"Kawalan yang disenaraikan dalam HIRARC yang tidak pernah dilaksanakan atau diuji keberkesanannya.", zh:"HIRARC中列出的控制措施从未实施或测试其有效性。", ta:"HIRARC-இல் பட்டியலிடப்பட்ட கட்டுப்பாடுகள் ஒருபோதும் செயல்படுத்தப்படாதவை அல்லது திறனுக்கு சோதனை செய்யப்படாதவை." },
    hirarcHazard4Name: { en:"Outdated Registers", ms:"Daftar Luput", zh:"过时的登记表", ta:"காலாவதியான பதிவேடுகள்" },
    hirarcHazard4Desc: { en:"HIRARC documents from 3+ years ago that do not reflect new machinery, processes, or chemicals introduced since.", ms:"Dokumen HIRARC dari 3+ tahun lalu yang tidak mencerminkan jentera, proses, atau bahan kimia baharu yang diperkenalkan sejak itu.", zh:"三年以上的HIRARC文件无法反映自那时以来引入的新机器、工艺或化学品。", ta:"3+ ஆண்டுகளுக்கு முன்பு HIRARC ஆவணங்கள் அதன் பின்னர் அறிமுகப்படுத்தப்பட்ட புதிய இயந்திரங்கள், செயல்முறைகள், அல்லது வேதிப்பொருட்களை பிரதிபலிக்காது." },
    hirarcDetectionTitle: { en:"Warning Signs", ms:"Tanda Amaran", zh:"警告信号", ta:"எச்சரிக்கை அறிகுறிகள்" },
    hirarcDetection1: { en:"You employ 5 or more workers and have never conducted a formal HIRARC", ms:"Anda menggaji 5 atau lebih pekerja dan belum pernah menjalankan HIRARC formal", zh:"您雇用5名或以上员工，但从未进行过正式的HIRARC", ta:"5 அல்லது அதற்கு மேற்பட்ட தொழிலாளர்களை நீங்கள் வேலைக்கு அமர்த்தி ஒருபோதும் சரியான HIRARC நடத்தவில்லை" },
    hirarcDetection2: { en:"Your existing HIRARC is a generic template with hazards that do not match your site", ms:"HIRARC sedia ada anda adalah templat generik dengan bahaya yang tidak sepadan dengan tapak anda", zh:"您现有的HIRARC是一个通用模板，危害与您的现场不匹配", ta:"உங்கள் உள்ள HIRARC உங்கள் தளத்திற்கு பொருந்தாத அபாயங்களைக் கொண்ட பொதுவான வார்ப்புரு" },
    hirarcDetection3: { en:"You have introduced new machinery, chemicals, or processes since your last HIRARC review", ms:"Anda telah memperkenalkan jentera, bahan kimia, atau proses baharu sejak semakan HIRARC terakhir", zh:"自上次HIRARC审查以来，您引入了新的机器、化学品或工艺", ta:"உங்கள் கடைசி HIRARC மதிப்பாய்வுக்கு பின்னர் புதிய இயந்திரங்கள், வேதிப்பொருட்கள், அல்லது செயல்முறைகளை அறிமுகப்படுத்தியுள்ளீர்கள்" },
    hirarcDetection4: { en:"DOSH has requested your HIRARC register during an inspection", ms:"DOSH telah meminta daftar HIRARC anda semasa pemeriksaan", zh:"DOSH在检查中要求您提供HIRARC登记表", ta:"DOSH ஆய்வின் போது உங்கள் HIRARC பதிவேட்டைக் கோரியுள்ளது" },
    hirarcDetection5: { en:"You need HIRARC documentation for tender submission or insurance renewal", ms:"Anda memerlukan dokumentasi HIRARC untuk penyerahan tender atau pembaharuan insurans", zh:"您需要HIRARC文件用于投标提交或保险续期", ta:"டெண்டர் சமர்ப்பிப்பு அல்லது காப்பீட்டு புதுப்பிப்புக்கு HIRARC ஆவணங்கள் தேவை" },
    hirarcDetection6: { en:"A recent near-miss revealed a hazard not listed in your current register", ms:"Kemalangan nyaris terbaru mendedahkan bahaya yang tidak disenaraikan dalam daftar semasa anda", zh:"最近的侥幸事故揭示了您当前登记表中未列出的危害", ta:"சமீபத்திய தவறவிட்ட விபத்து உங்கள் தற்போதைய பதிவேட்டில் பட்டியலிடப்படாத அபாயத்தை வெளிப்படுத்தியது" },
    hirarcProcessTitle: { en:"Our Process", ms:"Proses Kami", zh:"我们的流程", ta:"எங்கள் செயல்முறை" },
    hirarcProcess1Label: { en:"Site Walkthrough &amp; Hazard ID", ms:"Lawatan Tapak &amp; Pengenalan Bahaya", zh:"现场巡查与危害识别", ta:"தள சுற்றுப்பயணம் மற்றும் அபாய ID" },
    hirarcProcess1Desc: { en:"We walk every zone of your facility with your operations team to identify physical, chemical, ergonomic, and biological hazards specific to your processes.", ms:"Kami berjalan setiap zon kemudahan anda dengan pasukan operasi anda untuk mengenal pasti bahaya fizikal, kimia, ergonomik, dan biologi yang khusus untuk proses anda.", zh:"我们与您的运营团队一起巡视您设施的每个区域，识别针对您工艺的物理、化学、人体工程学和生物危害。", ta:"உங்கள் செயல்பாட்டுக் குழுவுடன் உங்கள் வசதியின் ஒவ்வொரு மண்டலத்திலும் நடந்து, உங்கள் செயல்முறைகளுக்குக் குறிப்பிட்ட உடல், வேதி, மனிதப் பொறியியல், மற்றும் உயிரியல் அபாயங்களை அடையாளம் காண்கிறோம்." },
    hirarcProcess2Label: { en:"Risk Quantification", ms:"Kuantifikasi Risiko", zh:"风险量化", ta:"அபாய அளவீடு" },
    hirarcProcess2Desc: { en:"Each hazard is scored using a standardised risk matrix (Likelihood x Severity). This produces a ranked priority list for control implementation.", ms:"Setiap bahaya diberi skor menggunakan matriks risiko standard (Kemungkinan x Keparahan). Ini menghasilkan senarai keutamaan berperingkat untuk pelaksanaan kawalan.", zh:"使用标准化风险矩阵（可能性x严重性）对每个危害进行评分。这产生了一个用于控制实施的排名优先级列表。", ta:"ஒவ்வொரு அபாயமும் தரப்படுத்தப்பட்ட அபாய அணி (நிகழ்தகவு x கடுமை) பயன்படுத்தி மதிப்பிடப்படுகிறது. இது கட்டுப்பாடு செயல்படுத்தலுக்கான தரவரிசை முன்னுரிமை பட்டியலை உருவாக்குகிறது." },
    hirarcProcess3Label: { en:"Control Selection", ms:"Pemilihan Kawalan", zh:"控制选择", ta:"கட்டுப்பாடு தேர்வு" },
    hirarcProcess3Desc: { en:"We apply the hierarchy of controls — elimination, substitution, engineering, administration, PPE — to each ranked hazard.", ms:"Kami menggunakan hierarki kawalan — penghapusan, penggantian, kejuruteraan, pentadbiran, PPE — untuk setiap bahaya berperingkat.", zh:"我们对每个排名危害应用控制层级——消除、替代、工程、行政、PPE。", ta:"ஒவ்வொரு தரவரிசை அபாயத்திற்கும் கட்டுப்பாடுகளின் வரிசைமுறையை — அகற்றுதல், மாற்றுதல், பொறியியல், நிர்வாகம், PPE — பயன்படுத்துகிறோம்." },
    hirarcProcess4Label: { en:"Documentation &amp; Register", ms:"Dokumentasi &amp; Daftar", zh:"文件与登记表", ta:"ஆவணமாக்கல் மற்றும் பதிவேடு" },
    hirarcProcess4Desc: { en:"A complete HIRARC register formatted for DOSH inspection, including hazard descriptions, risk scores, control measures, responsible persons, and review dates.", ms:"Daftar HIRARC lengkap yang diformat untuk pemeriksaan DOSH, termasuk penerangan bahaya, skor risiko, langkah kawalan, orang bertanggungjawab, dan tarikh semakan.", zh:"完整的HIRARC登记表，格式适合DOSH检查，包括危害描述、风险评分、控制措施、责任人和审查日期。", ta:"DOSH ஆய்வுக்காக வடிவமைக்கப்பட்ட முழு HIRARC பதிவேடு, அபாய விவரங்கள், அபாய மதிப்பெண்கள், கட்டுப்பாடு நடவடிக்கைகள், பொறுப்பானவர்கள், மற்றும் மதிப்பாய்வு தேதிகள் உட்பட." },
    hirarcProcess5Label: { en:"Implementation Advisory", ms:"Nasihat Pelaksanaan", zh:"实施咨询", ta:"செயல்படுத்தல் ஆலோசனை" },
    hirarcProcess5Desc: { en:"90-day follow-up to verify controls are implemented, effective, and documented. We update the register as hazards change.", ms:"Susulan 90-hari untuk mengesahkan kawalan dilaksanakan, berkesan, dan didokumenkan. Kami mengemas kini daftar apabila bahaya berubah.", zh:"90天跟进，验证控制措施是否已实施、有效并记录在案。我们在危害变化时更新登记表。", ta:"கட்டுப்பாடுகள் செயல்படுத்தப்பட்டு, பயனுள்ளதாகவும் ஆவணப்படுத்தப்பட்டதாகவும் இருக்க சரிபார்க்க 90-நாள் தொடர்வு. அபாயங்கள் மாறும்போது பதிவேட்டை புதுப்பிக்கிறோம்." },
    hirarcFailsTitle: { en:"Why Other Approaches Fail", ms:"Mengapa Pendekatan Lain Gagal", zh:"为什么其他方法会失败", ta:"மற்ற அணுகுமுறைகள் ஏன் தோல்வியடைகின்றன" },
    hirarcFailsText: { en:"Generic consultants hand over a PDF and disappear. Without implementation support, the controls in your HIRARC remain theoretical. Workers are not trained on new procedures. Engineering controls are never installed. Six months later, the register is already obsolete and your site is exposed again.", ms:"Perunding generik serahkan PDF dan hilang. Tanpa sokongan pelaksanaan, kawalan dalam HIRARC anda kekal teoritis. Pekerja tidak dilatih tentang prosedur baharu. Kawalan kejuruteraan tidak pernah dipasang. Enam bulan kemudian, daftar sudah lapuk dan tapak anda terdedah semula.", zh:"普通咨询公司交付一份PDF就消失了。没有实施支持，HIRARC中的控制措施仍停留在理论层面。工人没有接受新程序的培训。工程控制从未安装。六个月后，登记表已经过时，您的现场再次暴露于风险中。", ta:"பொதுவான ஆலோசகர்கள் ஒரு PDF-ஐ கைமாற்றி மறைகிறார்கள். செயல்படுத்தல் ஆதரவு இல்லாமல், உங்கள் HIRARC-இல் உள்ள கட்டுப்பாடுகள் கோட்பாரமாகவே உள்ளன. தொழிலாளர்கள் புதிய நடைமுறைகளில் பயிற்சி பெறுவதில்லை. பொறியியல் கட்டுப்பாடுகள் ஒருபோதும் நிறுவப்படுவதில்லை. ஆறு மாதங்களுக்குப் பிறகு, பதிவேடு ஏற்கனவே காலாவதியாகிறது மற்றும் உங்கள் தளம் மீண்டும் புற்றுநோயாகிறது." },
    hirarcSchedulingTitle: { en:"Risk-Based Scheduling", ms:"Penjadualan Berdasarkan Risiko", zh:"基于风险的排程", ta:"அபாய அடிப்படையிலான திட்டமிடல்" },
    hirarcSchedulingHighTitle: { en:"High-Risk Environments", ms:"Persekitaran Berisiko Tinggi", zh:"高风险环境", ta:"அதிக அபாய சூழல்கள்" },
    hirarcSchedulingHighDesc: { en:"Manufacturing, construction, and chemical facilities — annual HIRARC review plus quarterly spot-checks recommended.", ms:"Pengilangan, pembinaan, dan kemudahan kimia — semakan HIRARC tahunan ditambah pemeriksaan spot suku tahunan disyorkan.", zh:"制造、建筑和化学品设施——建议每年进行HIRARC审查，加上每季度抽查。", ta:"உற்பத்தி, கட்டுமான, மற்றும் வேதிப்பொருள் வசதிகள் — ஆண்டு HIRARC மதிப்பீடு கூடுதல் காலாண்டு திடீர் சோதனைகள் பரிந்துரைக்கப்படுகின்றன." },
    hirarcSchedulingLowTitle: { en:"Low-Moderate Risk", ms:"Risiko Rendah-Sederhana", zh:"中低风险", ta:"குறைந்த-மிதமான அபாயம்" },
    hirarcSchedulingLowDesc: { en:"Low-risk offices and retail — bi-ennial review sufficient if no operational changes.", ms:"Pejabat dan runcit berisiko rendah — semakan dwi-tahun mencukupi jika tiada perubahan operasi.", zh:"低风险的办公室和零售——如果没有运营变化，每两年审查一次即可。", ta:"குறைந்த அபாய அலுவலகங்கள் மற்றும் சில்லறை விற்பனை — செயல்பாட்டு மாற்றங்கள் இல்லையென்றால் இரண்டாண்டுக்கு ஒருமுறை மதிப்பீடு போதுமானது." },
    hirarcPropertyTitle: { en:"Property Types We Serve", ms:"Jenis Kemudahan yang Kami Layani", zh:"我们服务的物业类型", ta:"நாங்கள் சேவை செய்யும் சொத்து வகைகள்" },
    hirarcProperty1: { en:"Manufacturing and assembly plants", ms:"Kilang pengilangan dan pemasangan", zh:"制造和装配厂", ta:"உற்பத்தி மற்றும் பொருத்து ஆலைகள்" },
    hirarcProperty2: { en:"Construction and civil engineering sites", ms:"Tapak pembinaan dan kejuruteraan awam", zh:"建筑和土木工程工地", ta:"கட்டுமான மற்றும் பொதுநல பொறியியல் தளங்கள்" },
    hirarcProperty3: { en:"Warehouses and logistics hubs", ms:"Gudang dan hab logistik", zh:"仓库和物流中心", ta:"கிடங்குகள் மற்றும் போக்குவரத்து மையங்கள்" },
    hirarcProperty4: { en:"Chemical processing and laboratories", ms:"Pemprosesan kimia dan makmal", zh:"化学品加工和实验室", ta:"வேதிப்பொருள் செயலாக்கம் மற்றும் ஆய்வகங்கள்" },
    hirarcProperty5: { en:"Food and beverage production", ms:"Pengeluaran makanan dan minuman", zh:"食品和饮料生产", ta:"உணவு மற்றும் பானை உற்பத்தி" },
    hirarcProperty6: { en:"Healthcare and pharmaceutical facilities", ms:"Kemudahan kesihatan dan farmaseutikal", zh:"医疗和制药设施", ta:"சுகாதாரம் மற்றும் மருந்து வசதிகள்" },
    hirarcCoverageTitle: { en:"Coverage Areas", ms:"Kawasan Liputan", zh:"覆盖地区", ta:"பரவல் பகுதிகள்" },
    hirarcCoverageText: { en:"On-site HIRARC assessment and risk management advisory across Johor and Peninsular Malaysia.", ms:"Penilaian HIRARC di tapak dan nasihat pengurusan risiko merentasi Johor dan Semenanjung Malaysia.", zh:"在柔佛和马来西亚半岛各地提供现场HIRARC评估和风险管理咨询。", ta:"ஜொகூர் மற்றும் மலேசிய தீபகற்பம் முழுவதும் தள HIRARC மதிப்பீடு மற்றும் அபாய மேலாண்மை ஆலோசனை." },
    hirarcCoverage1: { en:"Johor Bahru", ms:"Johor Bahru", zh:"新山", ta:"ஜொகூர் பாரு" },
    hirarcCoverage2: { en:"Pasir Gudang", ms:"Pasir Gudang", zh:"巴西古当", ta:"பாசிர் கூடாங்" },
    hirarcCoverage3: { en:"Senai", ms:"Senai", zh:"士乃", ta:"செனாய்" },
    hirarcCoverage4: { en:"Pengerang", ms:"Pengerang", zh:"边佳兰", ta:"பெங்கெராங்" },
    hirarcCoverage5: { en:"Iskandar Puteri", ms:"Iskandar Puteri", zh:"依斯干达公主城", ta:"இஸ்கந்தார் புத்தேரி" },
    hirarcCoverage6: { en:"Skudai", ms:"Skudai", zh:"士古来", ta:"சுகுதை" },
    hirarcCoverage7: { en:"Kulai", ms:"Kulai", zh:"古来", ta:"குலாய்" },
    hirarcCoverage8: { en:"Ulu Tiram", ms:"Ulu Tiram", zh:"乌鲁地南", ta:"உலு திராம்" },
    hirarcFaqTitle: { en:"Frequently Asked Questions", ms:"Soalan Lazim", zh:"常见问题", ta:"அடிக்கடி கேட்கப்படும் கேள்விகள்" },
    hirarcFaq1Q: { en:"What is the difference between HIRARC and CHRA?", ms:"Apakah beza antara HIRARC dan CHRA?", zh:"HIRARC和CHRA有什么区别？", ta:"HIRARC மற்றும் CHRA-க்கு என்ன வித்தியாசம்?" },
    hirarcFaq1A: { en:"HIRARC is a broad hazard assessment covering all workplace risks. CHRA is specific to chemical health risks under USECHH 2000. Most industrial workplaces need both.", ms:"HIRARC adalah penilaian bahaya umum yang merangkumi semua risiko tempat kerja. CHRA khusus untuk risiko kesihatan kimia di bawah USECHH 2000. Kebanyakan tempat kerja industri memerlukan kedua-duanya.", zh:"HIRARC是广泛的危害评估，涵盖所有工作场所风险。CHRA专门处理USECHH 2000下的化学品健康风险。大多数工业工作场所两者都需要。", ta:"HIRARC அனைத்து பணியிட அபாயங்களையும் உள்ளடக்கிய பரந்த அபாய மதிப்பீடு. CHRA USECHH 2000-க்குட்பட்ட வேதிப்பொருள் சுகாதார அபாயங்களுக்குக் குறிப்பிட்டது. பெரும்பாலான தொழிற்துறை பணியிடங்களுக்கு இரண்டும் தேவை." },
    hirarcFaq2Q: { en:"How often must HIRARC be updated?", ms:"Berapa kerap HIRARC mesti dikemas kini?", zh:"HIRARC必须多久更新一次？", ta:"HIRARC எவ்வளவு அடிக்கடி புதுப்பிக்கப்பட வேண்டும்?" },
    hirarcFaq2A: { en:"DOSH recommends reviewing your HIRARC at least annually, and immediately after any significant change in processes, machinery, or chemicals. We schedule automatic annual reviews for our clients.", ms:"DOSH mengesyorkan menyemak semula HIRARC anda sekurang-kurangnya tahunan, dan serta-merta selepas sebarang perubahan ketara dalam proses, jentera, atau bahan kimia. Kami menjadualkan semakan tahunan automatik untuk pelanggan kami.", zh:"DOSH建议至少每年审查一次HIRARC，并且在工艺、机械或化学品发生重大变化后立即更新。我们为客户安排自动年度审查。", ta:"DOSH குறைந்தது ஆண்டுதோறும் HIRARC-ஐ மதிப்பாய்வு செய்ய பரிந்துரைக்கிறது, மற்றும் செயல்முறைகள், இயந்திரங்கள், அல்லது வேதிப்பொருட்களில் ஏதேனும் குறிப்பிடத்தக்க மாற்றத்திற்கு உடனடியாக. எங்கள் வாடிக்கையாளர்களுக்கு தானாக ஆண்டு மதிப்பீடுகளை திட்டமிடுகிறோம்." },
    hirarcFaq3Q: { en:"Can we use software to manage HIRARC?", ms:"Bolehkah kami menggunakan perisian untuk mengurus HIRARC?", zh:"我们可以使用软件来管理HIRARC吗？", ta:"HIRARC-ஐ நிர்வகிக்க மென்பொருளைப் பயன்படுத்தலாமா?" },
    hirarcFaq3A: { en:"Yes. We provide digital HIRARC registers with automatic reminder triggers, photo evidence uploads, and real-time risk score updates. Compatible with most EHS management platforms.", ms:"Ya. Kami menyediakan daftar HIRARC digital dengan pencetus peringatan automatik, muat naik bukti foto, dan kemas kini skor risiko masa nyata. Serasi dengan kebanyakan platform pengurusan EHS.", zh:"可以。我们提供数字HIRARC登记表，带有自动提醒触发器、照片证据上传和实时风险评分更新。兼容大多数EHS管理平台。", ta:"ஆம். தானியங்கி நினைவூட்டும் தூண்டிகள், புகைப்பட சான்றங்கள் பதிவேற்றம், மற்றும் நிகழ்நேர அபாய மதிப்பெண் புதுப்பிப்புகளுடன் டிஜிட்டல் HIRARC பதிவேடுகளை வழங்குகிறோம். பெரும்பாலான EHS மேலாண்மை தளங்களுடன் பொருந்தக்கூடியது." },
    hirarcFaq4Q: { en:"How long does a HIRARC assessment take?", ms:"Berapa lamakah penilaian HIRARC?", zh:"HIRARC评估需要多长时间？", ta:"HIRARC மதிப்பீடு எவ்வளவு நேரம் எடுக்கும்?" },
    hirarcFaq4A: { en:"A typical SME facility requires 1–2 days on site for walkthrough and data collection, plus 5–7 working days for report preparation. Large industrial complexes may require 3–5 days.", ms:"Kemudahan SME biasa memerlukan 1–2 hari di tapak untuk lawatan dan pengumpulan data, ditambah 5–7 hari bekerja untuk penyediaan laporan. Kompleks industri besar mungkin memerlukan 3–5 hari.", zh:"典型的中小企业设施需要1-2天现场巡查和数据收集，加上5-7个工作日准备报告。大型工业综合体可能需要3-5天。", ta:"ஒரு பொதுவான SME வசதி தள சுற்றுப்பயணம் மற்றும் தரவு சேகரிப்புக்கு 1–2 நாட்கள், அறிக்கை தயாரிப்புக்கு கூடுதல் 5–7 பணி நாட்கள் தேவை. பெரிய தொழிற்துறை வளாகங்கள் 3–5 நாட்கள் தேவைப்படலாம்." },
    hirarcFaq5Q: { en:"Do you train our staff to maintain the HIRARC?", ms:"Adakah anda melatih kakitangan kami untuk menyelenggara HIRARC?", zh:"你们会培训我们的员工维护HIRARC吗？", ta:"எங்கள் ஊழியர்களை HIRARC-ஐ பேணுவதற்கு பயிற்சி அளிக்கிறீர்களா?" },
    hirarcFaq5A: { en:"Yes. We conduct HIRARC methodology workshops for your safety committee so they can update the register as conditions change between our formal reviews.", ms:"Ya. Kami menjalankan bengkel metodologi HIRARC untuk jawatankuasa keselamatan anda supaya mereka boleh mengemas kini daftar apabila keadaan berubah antara semakan formal kami.", zh:"是的。我们为您的安全委员会举办HIRARC方法研讨会，以便他们在我们的正式审查之间随着条件变化更新登记表。", ta:"ஆம். எங்கள் சரியான மதிப்பீடுகளுக்கு இடையில் நிபந்தனைகள் மாறும்போது பதிவேட்டை புதுப்பிக்க உங்கள் பாதுகாப்பு குழுவிற்கு HIRARC முறைமை பயிற்ச�ி வகுப்புகளை நடத்துகிறோம்." },
    hirarcFaq6Q: { en:"Is HIRARC required for small offices?", ms:"Adakah HIRARC diwajibkan untuk pejabat kecil?", zh:"小型办公室需要HIRARC吗？", ta:"சிறிய அலுவலகங்களுக்கு HIRARC தேவையா?" },
    hirarcFaq6A: { en:"If you employ fewer than 5 workers, a full HIRARC is not legally required. However, we recommend a simplified hazard checklist for your own protection.", ms:"Jika anda menggaji kurang dari 5 pekerja, HIRARC penuh tidak diwajibkan secara undang-undang. Walau bagaimanapun, kami mengesyorkan senarai semak bahaya ringkas untuk perlindungan anda sendiri.", zh:"如果您雇用少于5名员工，法律上不需要完整的HIRARC。但是，我们建议您进行简化的危害清单以保护自己的利益。", ta:"5 தொழிலாளர்களுக்கும் குறைவாக வேலைக்கு அமர்த்தினால், முழு HIRARC சட்டப்பூர்வமாக தேவையில்லை. இருப்பினும், உங்கள் சொந்த பாதுகாப்புக்கு எளிமைப்படுத்தப்பட்ட அபாய குறிப்பேடு பரிந்துரைக்கிறோம்." },
    hirarcCtaTitle: { en:"Get Your HIRARC Right Before DOSH Asks for It", ms:"Lakukan HIRARC Anda dengan Betul Sebelum DOSH Memintanya", zh:"在DOSH要求之前做好您的HIRARC", ta:"DOSH கேட்கும் முன் உங்கள் HIRARC-ஐ சரியாக்கவும்" },
    hirarcCtaSubtitle: { en:"Site-specific hazard identification, quantified risk scoring, and implementation support that keeps your register current and your facility protected.", ms:"Pengenalpastian bahaya khusus tapak, penskoran risiko kuantitatif, dan sokongan pelaksanaan yang mengekalkan daftar anda semasa dan kemudahan anda dilindungi.", zh:"针对现场的危害识别、量化风险评分和实施支持，使您的登记表保持最新，您的设施得到保护。", ta:"தள-குறிப்பிட்ட அபாய அடையாளம் காணுதல், அளவிடப்பட்ட அபாய மதிப்பெண், மற்றும் உங்கள் பதிவேட்டை தற்போதையதாகவும் உங்கள் வசதியை பாதுகாக்கவும் செயல்படுத்தல் ஆதரவு." },
    hirarcCtaBtnWa: { en:"WhatsApp for HIRARC Assessment", ms:"WhatsApp untuk Penilaian HIRARC", zh:"WhatsApp咨询HIRARC评估", ta:"HIRARC மதிப்பீட்டிற்கு WhatsApp" },
    hirarcCtaBtnContact: { en:"Request Assessment Proposal", ms:"Mohon Cadangan Penilaian", zh:"索取评估方案", ta:"மதிப்பீட்டு முன்மொழிவைக் கோருக" },
    oshCoordEyebrow: { en:"Statutory Mandate", ms:"Wajib Statutori", zh:"法定强制要求", ta:"சட்டப்பூர்வ கட்டாயம்" },
    oshCoordHeroTitle: { en:"OSH Coordinator (OSH-C) Appointment — Section 29A OSH Act 2022", ms:"Pelantikan OSH Coordinator (OSH-C) — Seksyen 29A Akta OSH 2022", zh:"OSH协调员（OSH-C）委任 — OSH Act 2022第29A条", ta:"OSH ஒருங்கிணைப்பாளர் (OSH-C) நியமனம் — பிரிவு 29A OSH சட்டம் 2022" },
    oshCoordHeroSubtitle: { en:"Mandatory for every employer with 5 or more workers. Non-compliance exposes directors to criminal liability under Section 29A of the OSH (Amendment) Act 2022.", ms:"Wajib untuk setiap majikan dengan 5 atau lebih pekerja. Ketidakpatuhan mendedahkan pengarah kepada liability jenayah di bawah Seksyen 29A Akta OSH (Pindaan) 2022.", zh:"每位雇用5名或以上员工的雇主都必须委任。不合规将使董事根据OSH（修订）Act 2022第29A条承担刑事责任。", ta:"5 அல்லது அதற்கு மேற்பட்ட தொழிலாளர்களைக் கொண்ட ஒவ்வொரு வேலையாளருக்கும் கட்டாயம். இணக்கமின்மை OSH (திருத்தம்) சட்டம் 2022-ன் பிரிவு 29A-ன் கீழ் இயக்குநர்களை குற்றவியல் பொறுப்பிற்கு ஆளாக்குகிறது." },
    oshCoordHeroBtnWa: { en:"WhatsApp for Immediate Compliance", ms:"WhatsApp untuk Pematuhan Segera", zh:"WhatsApp立即合规", ta:"உடனடி இணக்கத்திற்கு WhatsApp" },
    oshCoordHeroBtnContact: { en:"Request Appointment Schedule", ms:"Mohon Jadual Pelantikan", zh:"索取委任时间表", ta:"நியமன அட்டவணையைக் கோருக" },
    oshCoordProblemTitle: { en:"Do You Need an OSH Coordinator?", ms:"Adakah Anda Memerlukan OSH Coordinator?", zh:"您需要OSH协调员吗？", ta:"உங்களுக்கு OSH ஒருங்கிணைப்பாளர் தேவையா?" },
    oshCoordProblemText: { en:"Since 2022, Malaysian employers must appoint an OSH Coordinator if they employ 5 or more people. The coordinator must possess competency certificates recognised by DOSH. Many SMEs appoint an internal staff member without proper training, exposing the company and its directors to prosecution.", ms:"Sejak 2022, majikan Malaysia mesti melantik OSH Coordinator jika mereka menggaji 5 atau lebih orang. Koordinator mesti memiliki sijil kompetensi yang diiktiraf DOSH. Ramai SME melantik kakitangan dalaman tanpa latihan yang sewajarnya, mendedahkan syarikat dan pengarah kepada pendakwaan.", zh:"自2022年起，马来西亚雇主如果雇用5人或以上，必须委任一名OSH协调员。协调员必须持有DOSH认可的胜任能力证书。许多中小企业委任未经适当培训的在职员工，使公司及其董事面临起诉风险。", ta:"2022 முதல், மலேசிய வேலையாளர்கள் 5 அல்லது அதற்கு மேற்பட்டவர்களை வேலைக்கு அமர்த்தினால் OSH ஒருங்கிணைப்பாளரை நியமிக்க வேண்டும். ஒருங்கிணைப்பாளர் DOSH-அங்கீகரிக்கப்பட்ட திறன் சான்றிதழ்களை வைத்திருக்க வேண்டும். பல SMEs சரியான பயிற்சி இல்லாமல் ஒரு உள்ளூர் ஊழியரை நியமிக்கிறார்கள், நிறுவனத்தையும் அதன் இயக்குநர்களையும் வழக்குக்கு ஆளாக்குகிறார்கள்." },
    oshCoordStakesTitle: { en:"The Stakes", ms:"Risiko Yang Dihadapi", zh:"风险所在", ta:"ஆபத்துகள்" },
    oshCoordStakesH1: { en:"Criminal Liability", ms:"Liability Jenayah", zh:"刑事责任", ta:"குற்றவியல் பொறுப்பு" },
    oshCoordStakesP1: { en:"Failure to appoint an OSH Coordinator is a criminal offence. Directors and employers can face corporate fines up to RM500,000 and/or imprisonment under Section 29A of the OSH (Amendment) Act 2022.", ms:"Gagal melantik OSH Coordinator adalah kesalahan jenayah. Pengarah dan majikan boleh menghadapi denda korporat sehingga RM500,000 dan/atau penjara di bawah Seksyen 29A Akta AKKP (Pindaan) 2022.", zh:"未能委任OSH协调员是刑事犯罪。根据2022年OSH（修正）法第29A条，董事和雇主可能面临最高50万令吉的公司罚款和/或监禁。", ta:"OSH ஒருங்கிணைப்பாளரை நியமிக்கத் தவறுவது ஒரு குற்றவியல் குற்றம். OSH (திருத்த) சட்டம் 2022 இன் பிரிவு 29A-ன் கீழ் இயக்குநர்கள் மற்றும் வேலையாளர்கள் RM500,000 வரை கார்ப்பரேட் அபராதம் மற்றும்/அல்லது சிறைத்தண்டனை எதிர்கொள்ளலாம்." },
    oshCoordStakesH2: { en:"Enforcement Intensification", ms:"Intensifikasi Penguatkuasaan", zh:"执法加强", ta:"செயல்படுத்தல் தீவிரமாக்கம்" },
    oshCoordStakesP2: { en:"Enforcement inspections have intensified since 2024. DOSH officers now specifically verify OSH-C appointment letters and competency certificates during site visits.", ms:"Pemeriksaan penguatkuasaan telah dipertingkatkan sejak 2024. Pegawai DOSH kini secara khusus mengesahkan surat pelantikan OSH-C dan sijil kompetensi semasa lawatan tapak.", zh:"自2024年以来，执法检查已加强。DOSH官员现在在现场访问中专门核实OSH-C委任信和胜任能力证书。", ta:"2024 முதல் செயல்படுத்தும் ஆய்வுகள் தீவிரமடைந்துள்ளன. DOSH அதிகாரிகள் இப்போது தள வருகைகளின் போது OSH-C நியமன கடிதங்கள் மற்றும் திறன் சான்றிதழ்களை குறிப்பிட்டு சரிபார்க்கிறார்கள்." },
    oshCoordStakesH3: { en:"Contract Disqualification", ms:"Disqualification Kontrak", zh:"合同资格取消", ta:"ஒப்பந்த தகுதியின்மை" },
    oshCoordStakesP3: { en:"Government and GLC contracts increasingly require proof of OSH-C appointment as a pre-qualification criterion. No appointment, no tender.", ms:"Kontrak kerajaan dan GLC semakin memerlukan bukti pelantikan OSH-C sebagai kriteria pra-kelayakan. Tiada pelantikan, tiada tender.", zh:"政府和GLC合同越来越多地要求提供OSH-C委任证明作为资格预审标准。没有委任，就没有投标资格。", ta:"அரசாங்கம் மற்றும் GLC ஒப்பந்தங்கள் முன் தகுதி அளவுகோலாக OSH-C நியமன சான்று தேவைப்படுவதை அதிகரித்துள்ளனர். நியமனம் இல்லை, டெண்டர் இல்லை." },
    oshCoordHazardTitle: { en:"Hazard Profile", ms:"Profil Bahaya", zh:"危害概况", ta:"அபாய சுயவிவரம்" },
    oshCoordHazard1Name: { en:"Untrained Internal Appointee", ms:"Pelantik Dalaman Tidak Dilatih", zh:"未经培训的内部委任人", ta:"பயிற்சி இல்லாத உள்ளூர் நியமனம்" },
    oshCoordHazard1Desc: { en:"An employee designated as OSH Coordinator without DOSH-recognised competency certificates. Cannot legally fulfil the role.", ms:"Pekerja yang dilantik sebagai OSH Coordinator tanpa sijil kompetensi yang diiktiraf DOSH. Tidak boleh memenuhi peranan secara sah.", zh:"被指定为OSH协调员但没有DOSH认可胜任能力证书的员工。无法合法履行该职责。", ta:"DOSH-அங்கீகரிக்கப்பட்ட திறன் சான்றிதழ்கள் இல்லாமல் OSH ஒருங்கிணைப்பாளராக நியமிக்கப்பட்ட ஊழியர். சட்டப்பூர்வமாக பாத்திரத்தை நிறைவேற்ற முடியாது." },
    oshCoordHazard2Name: { en:"Expired Certificates", ms:"Sijil Luput", zh:"过期证书", ta:"காலாவதியான சான்றிதழ்கள்" },
    oshCoordHazard2Desc: { en:"Competency certificates that have lapsed. DOSH inspections now verify certificate validity in real-time.", ms:"Sijil kompetensi yang telah tamat tempoh. Pemeriksaan DOSH kini mengesahkan kesahihan sijil dalam masa nyata.", zh:"已过期的胜任能力证书。DOSH检查现在实时验证证书有效性。", ta:"காலாவதியான திறன் சான்றிதழ்கள். DOSH ஆய்வுகள் இப்போது சான்றிதழ் செல்லுபடியை நிகழ்நேரத்தில் சரிபார்க்கின்றன." },
    oshCoordHazard3Name: { en:"No Safety Committee", ms:"Tiada Jawatankuasa Keselamatan", zh:"没有安全委员会", ta:"பாதுகாப்பு குழு இல்லை" },
    oshCoordHazard3Desc: { en:"Workplaces with 40+ workers must also establish a Safety and Health Committee under Regulations 1996 — separate from the OSH-C mandate.", ms:"Tempat kerja dengan 40+ pekerja mesti juga menubuhkan Jawatankuasa Keselamatan dan Kesihatan di bawah Peraturan 1996 — berasingan daripada mandat OSH-C.", zh:"拥有40名以上工人的工作场所还必须根据1996年法规建立安全与健康委员会——这与OSH-C的要求是分开的。", ta:"40+ தொழிலாளர்கள் உள்ள பணியிடங்கள் விதிமுறைகள் 1996-ன் கீழ் OSH-C கட்டாயத்திற்கு தனியாக பாதுகாப்பு மற்றும் சுகாதார குழுவையும் நிறுவ வேண்டும்." },
    oshCoordHazard4Name: { en:"Missing HIRARC Register", ms:"Tiada Daftar HIRARC", zh:"缺少HIRARC登记表", ta:"காணாமல் போன HIRARC பதிவேடு" },
    oshCoordHazard4Desc: { en:"Every workplace must maintain a current Hazard Identification, Risk Assessment and Risk Control register.", ms:"Setiap tempat kerja mesti menyelenggara daftar Pengenalpastian Bahaya, Penilaian Risiko dan Kawalan Risiko yang semasa.", zh:"每个工作场所都必须维护最新的危害识别、风险评估和风险控制登记表。", ta:"ஒவ்வொரு பணியிடமும் தற்போதைய அபாய அடையாளம் காணுதல், அபாய மதிப்பீடு மற்றும் அபாய கட்டுப்பாடு பதிவேட்டை பேண வேண்டும்." },
    oshCoordDetectionTitle: { en:"Warning Signs", ms:"Tanda Amaran", zh:"警告信号", ta:"எச்சரிக்கை அறிகுறிகள்" },
    oshCoordDetection1: { en:"You employ 5 or more workers (full-time, part-time, or contract)", ms:"Anda menggaji 5 atau lebih pekerja (sepenuh masa, sambilan, atau kontrak)", zh:"您雇用5名或以上员工（全职、兼职或合同）", ta:"5 அல்லது அதற்கு மேற்பட்ட தொழிலாளர்களை நீங்கள் வேலைக்கு அமர்த்துகிறீர்கள் (முழுநேர, பகுதிநேர, அல்லது ஒப்பந்த)" },
    oshCoordDetection2: { en:"You have received a DOSH inspection notice or compliance letter", ms:"Anda telah menerima notis pemeriksaan DOSH atau surat pematuhan", zh:"您收到DOSH检查通知或合规信函", ta:"DOSH ஆய்வு அறிவிப்பு அல்லது இணக்க கடிதத்தை நீங்கள் பெற்றுள்ளீர்கள்" },
    oshCoordDetection3: { en:"You are bidding for government or GLC contracts requiring safety documentation", ms:"Anda membida untuk kontrak kerajaan atau GLC yang memerlukan dokumentasi keselamatan", zh:"您正在竞标需要安全文件的政府或GLC合同", ta:"பாதுகாப்பு ஆவணங்களைக் கோரும் அரசாங்கம் அல்லது GLC ஒப்பந்தங்களுக்கு நீங்கள் ஏலம் விடுகிறீர்கள்" },
    oshCoordDetection4: { en:"Your insurance broker has flagged inadequate safety officer coverage", ms:"Broker insurans anda telah menandakan liputan pegawai keselamatan yang tidak mencukupi", zh:"您的保险经纪人已标记安全官覆盖不足", ta:"உங்கள் காப்பீட்டு தரகர் போதுமான பாதுகாப்பு அதிகாரி பர coverage குறிப்பிட்டுள்ளார்" },
    oshCoordDetection5: { en:"A near-miss or accident has triggered an internal review", ms:"Kemalangan nyaris atau kemalangan telah mencetuskan semakan dalaman", zh:"侥幸事故或实际事故触发了内部审查", ta:"ஒரு தவறவிட்ட விபத்து அல்லது விபத்து உள்ள மதிப்பாய்வைத் தூண்டியுள்ளது" },
    oshCoordDetection6: { en:"You have never formally appointed an OSH Coordinator in writing", ms:"Anda belum pernah melantik OSH Coordinator secara formal secara bertulis", zh:"您从未以书面形式正式委任OSH协调员", ta:"ஒருபோதும் OSH ஒருங்கிணைப்பாளரை எழுத்துப்பூர்வமாக நியமிக்கவில்லை" },
    oshCoordProcessTitle: { en:"Our Process", ms:"Proses Kami", zh:"我们的流程", ta:"எங்கள் செயல்முறை" },
    oshCoordProcess1Label: { en:"Competency Gap Audit", ms:"Audit Jurang Kompetensi", zh:"胜任能力差距审计", ta:"திறன் இடைவெளி தணிக்கை" },
    oshCoordProcess1Desc: { en:"We assess your current safety documentation, workforce size, and hazard profile against Section 29A requirements.", ms:"Kami menilai dokumentasi keselamatan semasa anda, saiz tenaga kerja, dan profil bahaya terhadap keperluan Seksyen 29A.", zh:"我们根据第29A条要求评估您当前的安全文件、员工规模和危害概况。", ta:"உங்கள் தற்போதைய பாதுகாப்பு ஆவணங்கள், பணிப்புற்று அளவு, மற்றும் அபாய சுயவிவரத்தை பிரிவு 29A தேவைகளுக்கு எதிராக மதிப்பிடுகிறோம்." },
    oshCoordProcess2Label: { en:"OSH-C Training", ms:"Latihan OSH-C", zh:"OSH-C培训", ta:"OSH-C பயிற்சி" },
    oshCoordProcess2Desc: { en:"Your designated employee completes the official OSH Coordinator competency programme — classroom or on-site, claimable under HRD Corp.", ms:"Pekerja yang dilantik anda menyelesaikan program kompetensi OSH Coordinator rasmi — bilik darjah atau di tapak, boleh dituntut di bawah HRD Corp.", zh:"您指定的员工完成官方OSH协调员胜任能力课程——课堂或现场授课，可在HRD Corp下申报。", ta:"உங்கள் நியமிக்கப்பட்ட ஊழியர் HRD Corp-ன் கீழ் உரிமை கோரக்கூடிய வகுப்பறை அல்லது தளத்தில் அதிகாரப்பூர்வ OSH ஒருங்கிணைப்பாளர் திறன் திட்டத்தை முடிக்கிறார்." },
    oshCoordProcess3Label: { en:"Committee Formation", ms:"Penubuhan Jawatankuasa", zh:"委员会组建", ta:"குழு உருவாக்கம்" },
    oshCoordProcess3Desc: { en:"If you have 40+ workers, we establish and train your Safety and Health Committee under the 1996 Regulations.", ms:"Jika anda mempunyai 40+ pekerja, kami menubuhkan dan melatih Jawatankuasa Keselamatan dan Kesihatan anda di bawah Peraturan 1996.", zh:"如果您有40名以上工人，我们根据1996年法规建立并培训您的安全与健康委员会。", ta:"40+ தொழிலாளர்கள் இருந்தால், 1996 விதிமுறைகளின் கீழ் உங்கள் பாதுகாப்பு மற்றும் சுகாதார குழுவை நிறுவி பயிற்சி அளிக்கிறோம்." },
    oshCoordProcess4Label: { en:"Documentation Package", ms:"Pakej Dokumentasi", zh:"文件包", ta:"ஆவண பொதி" },
    oshCoordProcess4Desc: { en:"We prepare the appointment letter, competency certificates, HIRARC register, and SOP books for DOSH presentation.", ms:"Kami menyediakan surat pelantikan, sijil kompetensi, daftar HIRARC, dan buku SOP untuk pembentangan DOSH.", zh:"我们准备委任信、胜任能力证书、HIRARC登记表和SOP手册供DOSH展示。", ta:"DOSH வழங்கலுக்கு நியமன கடிதம், திறன் சான்றிதழ்கள், HIRARC பதிவேடு, மற்றும் SOP புத்தகங்களைத் தயாரிக்கிறோம்." },
    oshCoordProcess5Label: { en:"Compliance Verification", ms:"Pengesahan Pematuhan", zh:"合规验证", ta:"இணக்க சரிபார்ப்பு" },
    oshCoordProcess5Desc: { en:"90-day post-appointment advisory to ensure your OSH Coordinator is functioning effectively and records are audit-ready.", ms:"Nasihat 90-hari pasca-pelantikan untuk memastikan OSH Coordinator anda berfungsi dengan berkesan dan rekod adalah sedia untuk audit.", zh:"委任后90天咨询，确保您的OSH协调员有效运作，记录可随时审计。", ta:"உங்கள் OSH ஒருங்கிணைப்பாளர் திறமையாக செயல்படுகிறார் மற்றும் பதிவுகள் தணிக்கை-தயாராக உள்ளன என்பதை உறுதி செய்ய நியமனத்திற்கு பிறகு 90-நாள் ஆலோசனை." },
    oshCoordFailsTitle: { en:"Why Other Approaches Fail", ms:"Mengapa Pendekatan Lain Gagal", zh:"为什么其他方法会失败", ta:"மற்ற அணுகுமுறைகள் ஏன் தோல்வியடைகின்றன" },
    oshCoordFailsText: { en:"Generic public seminars teach theory in isolation. They do not prepare your internal appointee for the specific hazards of YOUR facility, the documentation DOSH expects, or the ongoing committee management required by law. One-off training without implementation support leaves you exposed.", ms:"Seminar awam generik mengajar teori secara berasingan. Ia tidak menyediakan pelantik dalaman anda untuk bahaya khusus KEMUDAHAN anda, dokumentasi yang DOSH jangkakan, atau pengurusan jawatankuasa berterusan yang diwajibkan oleh undang-undang. Latihan sekali tanpa sokongan pelaksanaan mendedahkan anda.", zh:"普通的公开研讨会孤立地教授理论。它们无法让您内部委任人为您设施的具体危害、DOSH期望的文件或法律要求的持续委员会管理做好准备。没有实施支持的一次性培训会让您暴露于风险中。", ta:"பொதுவான பொது கருத்தரங்குகள் தனிமையில் கோட்பாட்டை கற்பிக்கின்றன. அவை உங்கள் வசதியின் குறிப்பிட்ட அபாயங்களுக்கு, DOSH எதிர்பார்க்கும் ஆவணங்களுக்கு, அல்லது சட்டத்தால் தேவைப்படும் தொடர் குழு மேலாண்மைக்கு உங்கள் உள்ளூர் நியமனத்தை தயார்படுத்துவதில்லை. செயல்படுத்தல் ஆதரவு இல்லாத ஒருமுறை பயிற்சி உங்களை புற்றுநோயாக விடுகிறது." },
    oshCoordSchedulingTitle: { en:"Risk-Based Scheduling", ms:"Penjadualan Berdasarkan Risiko", zh:"基于风险的排程", ta:"அபாய அடிப்படையிலான திட்டமிடல்" },
    oshCoordSchedulingHighTitle: { en:"High-Risk Environments", ms:"Persekitaran Berisiko Tinggi", zh:"高风险环境", ta:"அதிக அபாய சூழல்கள்" },
    oshCoordSchedulingHighDesc: { en:"Manufacturing plants, construction sites, chemical facilities — quarterly compliance reviews recommended.", ms:"Kilang pengilangan, tapak pembinaan, kemudahan kimia — semakan pematuhan suku tahunan disyorkan.", zh:"制造厂、建筑工地、化学品设施——建议每季度进行合规审查。", ta:"உற்பத்தி ஆலைகள், கட்டுமான தளங்கள், வேதிப்பொருள் வசதிகள் — காலாண்டு இணக்க மதிப்பீடுகள் பரிந்துரைக்கப்படுகின்றன." },
    oshCoordSchedulingLowTitle: { en:"Low-Moderate Risk", ms:"Risiko Rendah-Sederhana", zh:"中低风险", ta:"குறைந்த-மிதமான அபாயம்" },
    oshCoordSchedulingLowDesc: { en:"Small offices and retail with minimal hazard exposure — bi-annual review sufficient.", ms:"Pejabat kecil dan runcit dengan pendedahan bahaya minimum — semakan setengah tahunan mencukupi.", zh:"危害暴露最小的小型办公室和零售店——每半年审查一次即可。", ta:"குறைந்த அபாய புற்றுநோயைக் கொண்ட சிறிய அலுவலகங்கள் மற்றும் சில்லறை விற்பனை — இரண்டாண்டுக்கு ஒருமுறை மதிப்பீடு போதுமானது." },
    oshCoordPropertyTitle: { en:"Property Types We Serve", ms:"Jenis Kemudahan yang Kami Layani", zh:"我们服务的物业类型", ta:"நாங்கள் சேவை செய்யும் சொத்து வகைகள்" },
    oshCoordProperty1: { en:"Manufacturing plants", ms:"Kilang pengilangan", zh:"制造厂", ta:"உற்பத்தி ஆலைகள்" },
    oshCoordProperty2: { en:"Construction sites (CIDB-registered)", ms:"Tapak pembinaan (berdaftar CIDB)", zh:"建筑工地（CIDB注册）", ta:"கட்டுமான தளங்கள் (CIDB-பதிவு)" },
    oshCoordProperty3: { en:"Warehouses and logistics hubs", ms:"Gudang dan hab logistik", zh:"仓库和物流中心", ta:"கிடங்குகள் மற்றும் போக்குவரத்து மையங்கள்" },
    oshCoordProperty4: { en:"Chemical processing facilities", ms:"Kemudahan pemprosesan kimia", zh:"化学品加工设施", ta:"வேதிப்பொருள் செயலாக்க வசதிகள்" },
    oshCoordProperty5: { en:"Food and beverage production", ms:"Pengeluaran makanan dan minuman", zh:"食品和饮料生产", ta:"உணவு மற்றும் பானை உற்பத்தி" },
    oshCoordProperty6: { en:"Commercial offices with 5+ staff", ms:"Pejabat komersial dengan 5+ kakitangan", zh:"拥有5名以上员工的商业办公室", ta:"5+ ஊழியர்கள் கொண்ட வணிக அலுவலகங்கள்" },
    oshCoordCoverageTitle: { en:"Coverage Areas", ms:"Kawasan Liputan", zh:"覆盖地区", ta:"பரவல் பகுதிகள்" },
    oshCoordCoverageText: { en:"On-site OSH Coordinator advisory and training across Johor and Peninsular Malaysia.", ms:"Nasihat dan latihan OSH Coordinator di tapak merentasi Johor dan Semenanjung Malaysia.", zh:"在柔佛和马来西亚半岛各地提供现场OSH协调员咨询和培训。", ta:"ஜொகூர் மற்றும் மலேசிய தீபகற்பம் முழுவதும் தள OSH ஒருங்கிணைப்பாளர் ஆலோசனை மற்றும் பயிற்சி." },
    oshCoordCoverage1: { en:"Johor Bahru", ms:"Johor Bahru", zh:"新山", ta:"ஜொகூர் பாரு" },
    oshCoordCoverage2: { en:"Pasir Gudang", ms:"Pasir Gudang", zh:"巴西古当", ta:"பாசிர் கூடாங்" },
    oshCoordCoverage3: { en:"Senai", ms:"Senai", zh:"士乃", ta:"செனாய்" },
    oshCoordCoverage4: { en:"Pengerang", ms:"Pengerang", zh:"边佳兰", ta:"பெங்கெராங்" },
    oshCoordCoverage5: { en:"Iskandar Puteri", ms:"Iskandar Puteri", zh:"依斯干达公主城", ta:"இஸ்கந்தார் புத்தேரி" },
    oshCoordCoverage6: { en:"Skudai", ms:"Skudai", zh:"士古来", ta:"சுகுதை" },
    oshCoordCoverage7: { en:"Kulai", ms:"Kulai", zh:"古来", ta:"குலாய்" },
    oshCoordCoverage8: { en:"Ulu Tiram", ms:"Ulu Tiram", zh:"乌鲁地南", ta:"உலு திராம்" },
    oshCoordFaqTitle: { en:"Frequently Asked Questions", ms:"Soalan Lazim", zh:"常见问题", ta:"அடிக்கடி கேட்கப்படும் கேள்விகள்" },
    oshCoordFaq1Q: { en:"How long does OSH-C training take?", ms:"Berapa lamakah latihan OSH-C?", zh:"OSH-C培训需要多长时间？", ta:"OSH-C பயிற்சி எவ்வளவு நேரம் எடுக்கும்?" },
    oshCoordFaq1A: { en:"The standard OSH Coordinator competency programme is 2–3 days. On-site delivery is available for teams of 5 or more.", ms:"Program kompetensi OSH Coordinator standard adalah 2–3 hari. Penghantaran di tapak tersedia untuk pasukan 5 atau lebih.", zh:"标准OSH协调员胜任能力课程为2-3天。5人或以上的团队可提供现场授课。", ta:"நிலையான OSH ஒருங்கிணைப்பாளர் திறன் திட்டம் 2–3 நாட்கள். 5 அல்லது அதற்கு மேற்பட்ட குழுக்களுக்கு தள வழங்கல் கிடைக்கிறது." },
    oshCoordFaq2Q: { en:"Can any employee be appointed OSH Coordinator?", ms:"Bolehkah sebarang pekerja dilantik sebagai OSH Coordinator?", zh:"任何员工都可以被委任为OSH协调员吗？", ta:"எந்தவொரு ஊழியரையும் OSH ஒருங்கிணைப்பாளராக நியமிக்கலாமா?" },
    oshCoordFaq2A: { en:"No. The appointee must hold DOSH-recognised competency certificates. We fast-track your designated employee through the required training and certification.", ms:"Tidak. Pelantik mesti memegang sijil kompetensi yang diiktiraf DOSH. Kami mempercepatkan pekerja yang dilantik anda melalui latihan dan pensijilan yang diperlukan.", zh:"不可以。被委任人必须持有DOSH认可的胜任能力证书。我们会快速跟踪您指定员工完成所需的培训和认证。", ta:"இல்லை. நியமிக்கப்பட்டவர் DOSH-அங்கீகரிக்கப்பட்ட திறன் சான்றிதழ்களை வைத்திருக்க வேண்டும். தேவையான பயிற்சி மற்றும் சான்றிதல் வழியாக உங்கள் நியமிக்கப்பட்ட ஊழியரை விரைவு பாதையில் அனுப்புகிறோம்." },
    oshCoordFaq3Q: { en:"What is the difference between OSH Coordinator and Safety Officer?", ms:"Apakah beza antara OSH Coordinator dan Safety Officer?", zh:"OSH协调员和安全官有什么区别？", ta:"OSH ஒருங்கிணைப்பாளருக்கும் பாதுகாப்பு அதிகாரிக்கும் என்ன வித்தியாசம்?" },
    oshCoordFaq3A: { en:"The OSH Coordinator is an internally appointed employee responsible for day-to-day safety coordination. A Safety Officer is a registered practitioner under DOSH with broader statutory powers. Some workplaces need both.", ms:"OSH Coordinator adalah pekerja dalaman yang bertanggungjawab untuk koordinasi keselamatan harian. Safety Officer adalah pengamal berdaftar di bawah DOSH dengan kuasa statutori yang lebih luas. Sesetengah tempat kerja memerlukan kedua-duanya.", zh:"OSH协调员是内部委任的员工，负责日常安全协调。安全官是在DOSH下注册的从业者，拥有更广泛的法定权力。有些工作场所两者都需要。", ta:"OSH ஒருங்கிணைப்பாளர் தினசரி பாதுகாப்பு ஒருங்கிணைப்பிற்கு பொறுப்பான உள்ளார்ந்த நியமிக்கப்பட்ட ஊழியர். பாதுகாப்பு அதிகாரி DOSH-இன் கீழ் பதிவு செய்யப்பட்ட பயிற்சியாளர், பரந்த சட்ட அதிகாரங்களுடன். சில பணியிடங்களுக்கு இரண்டும் தேவை." },
    oshCoordFaq4Q: { en:"Is OSH-C training HRD Corp claimable?", ms:"Adakah latihan OSH-C boleh dituntut HRD Corp?", zh:"OSH-C培训可以申报HRD Corp吗？", ta:"OSH-C பயிற்சி HRD Corp உரிமை கோரக்கூடியதா?" },
    oshCoordFaq4A: { en:"Yes. James Issachar (Trainer ID: 62976) is HRD Corp-certified. We guide you through e-TRiS grant application so your compliance investment is recoverable.", ms:"Ya. James Issachar (ID Jurulatih: 62976) adalah bertauliah HRD Corp. Kami membimbing anda melalui permohonan geran e-TRiS supaya pelaburan pematuhan anda boleh dipulihkan.", zh:"可以。James Issachar（培训师ID：62976）是HRD Corp认证的。我们指导您完成e-TRiS拨款申请，使您的合规投资可回收。", ta:"ஆம். James Issachar (பயிற்றுவிப்பாளர் ID: 62976) HRD Corp-சான்றளிக்கப்பட்டவர். உங்கள் இணக்க முதலீடு மீட்கக்கூடியது என்பதற்காக e-TRiS மானிய விண்ணப்பத்தின் வழியாக வழிகாட்டுகிறோம்." },
    oshCoordFaq5Q: { en:"What documents must we maintain?", ms:"Dokumen apakah yang mesti kami simpan?", zh:"我们必须维护哪些文件？", ta:"எந்த ஆவணங்களை நாங்கள் பேண வேண்டும்?" },
    oshCoordFaq5A: { en:"Appointment letter, competency certificates, HIRARC register, safety inspection records, incident investigation reports, and training attendance logs. We supply templates for all.", ms:"Surat pelantikan, sijil kompetensi, daftar HIRARC, rekod pemeriksaan keselamatan, laporan siasatan kejadian, dan log kehadiran latihan. Kami membekalkan templat untuk semua.", zh:"委任信、胜任能力证书、HIRARC登记表、安全检查记录、事故调查报告和培训出勤日志。我们为所有文件提供模板。", ta:"நியமன கடிதம், திறன் சான்றிதழ்கள், HIRARC பதிவேடு, பாதுகாப்பு தணிக்கை பதிவுகள், விபத்து விசாரணை அறிக்கைகள், மற்றும் பயிற்சி வருகை பதிவுகள். அனைத்திற்கும் வார்ப்புருக்களை வழங்குகிறோம்." },
    oshCoordFaq6Q: { en:"How quickly can we become compliant?", ms:"Berapa cepat kami boleh menjadi patuh?", zh:"我们可以多快变得合规？", ta:"எவ்வளவு விரைவில் நாங்கள் இணக்கமாக முடியும்?" },
    oshCoordFaq6A: { en:"From first contact to compliant appointment: typically 7–14 days if your designated employee already holds partial competencies; 14–21 days if full training is required.", ms:"Dari hubungan pertama kepada pelantikan patuh: biasanya 7–14 hari jika pekerja yang dilantik anda sudah memiliki kompetensi separa; 14–21 hari jika latihan penuh diperlukan.", zh:"从首次接触到合规委任：通常如果您的指定员工已持有部分胜任能力，需要7-14天；如果需要完整培训，则需要14-21天。", ta:"முதல் தொடர்பிலிருந்து இணக்கமான நியமனம் வரை: உங்கள் நியமிக்கப்பட்ட ஊழியர் ஏற்கனவே பகுதி திறன்களை வைத்திருந்தால் பொதுவாக 7–14 நாட்கள்; முழு பயிற்சி தேவைப்பட்டால் 14–21 நாட்கள்." },
    oshCoordCtaTitle: { en:"Secure Your OSH-C Appointment Before Enforcement Intensifies", ms:"Pastikan Pelantikan OSH-C Anda Sebelum Penguatkuasaan Dipertingkatkan", zh:"在执法加强之前确保您的OSH-C委任", ta:"செயல்படுத்தல் தீவிரமடையும் முன் உங்கள் OSH-C நியமனத்தை பாதுகாக்கவும்" },
    oshCoordCtaSubtitle: { en:"James Issachar and the Naja Safety team are ready to fast-track your OSH Coordinator compliance. On-site training available across Malaysia.", ms:"James Issachar dan pasukan Naja Safety sedia mempercepatkan pematuhan OSH Coordinator anda. Latihan di tapak tersedia merentasi Malaysia.", zh:"James Issachar和Naja Safety团队随时准备快速推进您的OSH协调员合规。在马来西亚各地提供现场培训。", ta:"James Issachar மற்றும் Naja Safety குழு உங்கள் OSH ஒருங்கிணைப்பாளர் இணக்கத்தை விரைவு பாதையில் தயாராக உள்ளனர். மலேசியா முழுவதும் தள பயிற்சி கிடைக்கிறது." },
    oshCoordCtaBtnWa: { en:"WhatsApp for Immediate Compliance", ms:"WhatsApp untuk Pematuhan Segera", zh:"WhatsApp立即合规", ta:"உடனடி இணக்கத்திற்கு WhatsApp" },
    oshCoordCtaBtnContact: { en:"Request Appointment Schedule", ms:"Mohon Jadual Pelantikan", zh:"索取委任时间表", ta:"நியமன அட்டவணையைக் கோருக" },
    auditEyebrow: { en:"Audit-Ready", ms:"Sedia untuk Audit", zh:"审计就绪", ta:"தணிக்கை-தயார்" },
    auditHeroTitle: { en:"Safety Audit &amp; Inspection — Pre-DOSH Compliance Verification", ms:"Audit &amp; Pemeriksaan Keselamatan — Pengesahan Pra-Pematuhan DOSH", zh:"安全审计与检查 — DOSH前合规验证", ta:"பாதுகாப்பு தணிக்கை மற்றும் ஆய்வு — Pre-DOSH இணக்க சரிபார்ப்பு" },
    auditHeroSubtitle: { en:"Internal audits, gap identification, and corrective action documentation. Be audit-ready before DOSH arrives.", ms:"Audit dalaman, pengenalpastian jurang, dan dokumentasi tindakan pembetulan. Bersedia untuk audit sebelum DOSH tiba.", zh:"内部审计、差距识别和纠正措施文件。在DOSH到来之前做好审计准备。", ta:"உள் தணிக்கைகள், இடைவெளி அடையாளம் காணுதல், மற்றும் திருத்த நடவடிக்கை ஆவணப்படுத்தல். DOSH வருவதற்கு முன் தணிக்கை-தயாராக இருங்கள்." },
    auditHeroBtnWa: { en:"WhatsApp for Audit Booking", ms:"WhatsApp untuk Tempahan Audit", zh:"WhatsApp预约审计", ta:"தணிக்கை முன்பதிவுக்கு WhatsApp" },
    auditHeroBtnContact: { en:"Request Audit Proposal", ms:"Mohon Cadangan Audit", zh:"索取审计方案", ta:"தணிக்கை முன்மொழிவைக் கோருக" },
    auditProblemTitle: { en:"Do You Need a Safety Audit?", ms:"Adakah Anda Memerlukan Audit Keselamatan?", zh:"您需要进行安全审计吗？", ta:"உங்களுக்கு பாதுகாப்பு தணிக்கை தேவையா?" },
    auditProblemText: { en:"DOSH inspections can be announced or unannounced. When they arrive, employers have hours — not weeks — to produce machinery registers, HIRARC documents, training records, and incident investigation files. Facilities that scramble to prepare during the inspection rarely pass cleanly.", ms:"Pemeriksaan DOSH boleh diumumkan atau tidak diumumkan. Apabila mereka tiba, majikan mempunyai jam — bukan minggu — untuk menghasilkan daftar jentera, dokumen HIRARC, rekod latihan, dan fail siasatan kejadian. Kemudahan yang bersiap sedia semasa pemeriksaan jarang lulus dengan bersih.", zh:"DOSH检查可能是事先通知的或突击的。当他们到达时，雇主只有几小时——而不是几周——来提供机械登记表、HIRARC文件、培训记录和事故调查档案。在检查期间仓促准备的设施很少能顺利通过。", ta:"DOSH ஆய்வுகள் அறிவிக்கப்பட்ட அல்லது அறிவிக்கப்படாதவையாக இருக்கலாம். அவர்கள் வரும்போது, வேலையாளர்களுக்கு இயந்திர பதிவேடுகள், HIRARC ஆவணங்கள், பயிற்சி பதிவுகள், மற்றும் விபத்து விசாரணை கோப்புகளை உற்பத்தி செய்ய மணிகள் — வாரங்கள் இல்லை. தணிக்கையின் போது தயாரிக்க திணறும் வசதிகள் அரிதாகவே சுத்தமாக தேர்ச்சி பெறுகின்றன." },
    auditStakesTitle: { en:"The Stakes", ms:"Risiko Yang Dihadapi", zh:"风险所在", ta:"ஆபத்துகள்" },
    auditStakesH1: { en:"Stop-Work Orders", ms:"Perintah Henti Kerja", zh:"停工令", ta:"வேலை-நிறுத்த ஆணைகள்" },
    auditStakesP1: { en:"A failed DOSH audit results in fines, improvement notices, and potentially stop-work orders that halt production. Each day of stopped production costs thousands.", ms:"Audit DOSH yang gagal menyebabkan denda, notis penambahbaikan, dan berpotensi perintah henti kerja yang menghentikan pengeluaran. Setiap hari pengeluaran dihentikan menelan kos beribu-ribu.", zh:"失败的DOSH审计会导致罚款、改进通知和潜在的停工令，使生产停止。每停工一天都要花费数千令吉。", ta:"தோல்வியடைந்த DOSH தணிக்கை அபராதங்கள், மேம்பாட்டு அறிவிப்புகள், மற்றும் சாத்தியமாக வேலை-நிறுத்த ஆணைகளை ஏற்படுத்துகிறது ஒவ்வொரு நிறுத்தப்பட்ட உற்பத்தி நாளும் ஆயிரக்கணக்கான செலவாகிறது." },
    auditStakesH2: { en:"Criminal Prosecution", ms:"Penghakiman Jenayah", zh:"刑事起诉", ta:"குற்றவியல் வழக்கு" },
    auditStakesP2: { en:"Repeat failures can lead to prosecution under the OSH Act. Directors face personal liability when systematic safety failures are identified.", ms:"Kegagalan berulang boleh membawa kepada pendakwaan di bawah Akta OSH. Pengarah menghadapi liability peribadi apabila kegagalan keselamatan sistematik dikenal pasti.", zh:"重复失败可能导致根据OSH Act的起诉。当发现系统性安全失败时，董事面临个人责任。", ta:"தொடர்ச்சியான தோல்விகள் OSH சட்டத்தின் கீழ் வழக்கு தொடருவதற்கு வழிவகுக்கும். கணிசமான பாதுகாப்பு தோல்விகள் அடையாளம் காணப்படும்போது இயக்குநர்கள் தனிப்பட்ட பொறுப்பை எதிர்கொள்கிறார்கள்." },
    auditStakesH3: { en:"Reputational Damage", ms:"Kerosakan Reputasi", zh:"声誉损害", ta:"புகழ் சேதம்" },
    auditStakesP3: { en:"Failed audits damage your reputation with insurers, clients, and regulators. Some contracts require clean audit history as a pre-qualification criterion.", ms:"Audit gagal merosakkan reputasi anda dengan pihak insurans, pelanggan, dan pengawal selia. Sesetengah kontrak memerlukan sejarah audit bersih sebagai kriteria pra-kelayakan.", zh:"失败的审计会损害您在保险公司、客户和监管机构中的声誉。某些合同要求清洁的审计历史作为资格预审标准。", ta:"தோல்வியடைந்த தணிக்கைகள் காப்பீட்டாளர்கள், வாடிக்கையாளர்கள், மற்றும் ஒழுங்குமுறையாளர்களிடம் உங்கள் புகழை சேதப்படுத்துகின்றன. சில ஒப்பந்தங்கள் முன் தகுதி அளவுகோலாக சுத்தமான தணிக்கை வரலாற்றைக் கோருகின்றன." },
    auditHazardTitle: { en:"Hazard Profile", ms:"Profil Bahaya", zh:"危害概况", ta:"அபாய சுயவிவரம்" },
    auditHazard1Name: { en:"Incomplete Machinery Registers", ms:"Daftar Jentera Tidak Lengkap", zh:"不完整的机械登记表", ta:"முழுமையற்ற இயந்திர பதிவேடுகள்" },
    auditHazard1Desc: { en:"Missing PMA/PMT registrations, expired inspection certificates for boilers, lifts, or air receivers.", ms:"Pendaftaran PMA/PMT yang tiada, sijil pemeriksaan luput untuk dandang, lif, atau bekas udara.", zh:"缺少PMA/PMT注册、锅炉、电梯或空气接收器的过期检查证书。", ta:"காணாமல் போன PMA/PMT பதிவுகள், பாயிலர்கள், தூக்கிகள், அல்லது காற்று பெறுநர்களுக்கு காலாவதியான தணிக்கை சான்றிதழ்கள்." },
    auditHazard2Name: { en:"Untrained First-Aiders", ms:"Pembantu Pertama Tidak Dilatih", zh:"未经培训的急救员", ta:"பயிற்சி இல்லாத முதலுதவியாளர்கள்" },
    auditHazard2Desc: { en:"Designated first-aiders whose certificates have lapsed. DOSH checks expiry dates.", ms:"Pembantu pertama yang dilantik dengan sijil yang telah tamat tempoh. DOSH menyemak tarikh luput.", zh:"指定急救员的证书已过期。DOSH检查有效期。", ta:"அவர்களின் சான்றிதழ்கள் காலாவதியாகியுள்ள நியமிக்கப்பட்ட முதலுதவியாளர்கள். DOSH காலாவதி தேதிகளை சரிபார்க்கிறது." },
    auditHazard3Name: { en:"Uncontrolled Chemical Storage", ms:"Penyimpanan Kimia Tidak Terkawal", zh:"化学品存储失控", ta:"கட்டுப்படுத்தப்படாத வேதிப்பொருள் சேமிப்பு" },
    auditHazard3Desc: { en:"Scheduled chemicals without SDS sheets, improper labelling, or incompatible storage.", ms:"Bahan kimia berjadual tanpa lembaran data keselamatan (SDS), pelabelan tidak sesuai, atau penyimpanan tidak serasi.", zh:"附表化学品没有SDS表、标签不当或存储不兼容。", ta:"SDS தாள்கள் இல்லாத திட்டமிடப்பட்ட வேதிப்பொருட்கள், தவறான லேபிளிங், அல்லது பொருத்தமற்ற சேமிப்பு." },
    auditHazard4Name: { en:"Missing Incident Records", ms:"Rekod Kejadian Tiada", zh:"缺少事故记录", ta:"காணாமல் போன விபத்து பதிவுகள்" },
    auditHazard4Desc: { en:"Accidents and near-misses that were never formally investigated or documented. DOSH treats this as a serious compliance gap.", ms:"Kemalangan dan kemalangan nyaris yang tidak pernah disiasat atau didokumenkan secara formal. DOSH menganggap ini sebagai jurang pematuhan yang serius.", zh:"从未经过正式调查或记录的事故和侥幸事故。DOSH将其视为严重的合规缺口。", ta:"ஒருபோதும் சரியாக விசாரிக்கப்படாத அல்லது ஆவணப்படுத்தப்படாத விபத்துகள் மற்றும் தவறவிட்டவை. DOSH இதை கடுமையான இணக்க இடைவெளியாக கருதுகிறது." },
    auditDetectionTitle: { en:"Warning Signs", ms:"Tanda Amaran", zh:"警告信号", ta:"எச்சரிக்கை அறிகுறிகள்" },
    auditDetection1: { en:"You have received a DOSH inspection notification letter", ms:"Anda telah menerima surat notifikasi pemeriksaan DOSH", zh:"您收到DOSH检查通知信", ta:"DOSH தணிக்கை அறிவிப்பு கடிதத்தை நீங்கள் பெற்றுள்ளீர்கள்" },
    auditDetection2: { en:"Your last DOSH audit identified non-compliance items that remain unresolved", ms:"Audit DOSH terakhir anda mengenal pasti item ketidakpatuhan yang belum diselesaikan", zh:"您上次DOSH审计发现的不合规项目仍未解决", ta:"உங்கள் கடைசி DOSH தணிக்கை தீர்க்கப்படாத இணக்கமற்ற பொருட்களை அடையாளம் கண்டுள்ளது" },
    auditDetection3: { en:"You are preparing for ISO 45001 certification and need a pre-certification gap check", ms:"Anda sedang bersedia untuk pensijilan ISO 45001 dan memerlukan pemeriksaan jurang pra-pensijilan", zh:"您正在准备ISO 45001认证，需要认证前差距检查", ta:"ISO 45001 சான்றிதலுக்கு தயாராகிறீர்கள் மற்றும் முன்-சான்றிதல் இடைவெளி சோதனை தேவை" },
    auditDetection4: { en:"Your insurance renewal requires a third-party safety audit report", ms:"Pembaharuan insurans anda memerlukan laporan audit keselamatan pihak ketiga", zh:"您的保险续期要求第三方安全审计报告", ta:"உங்கள் காப்பீட்டு புதுப்பிப்பு மூன்றாம் தரப்பு பாதுகாப்பு தணிக்கை அறிக்கையைக் கோருகிறது" },
    auditDetection5: { en:"A new client contract mandates supplier safety audit certification", ms:"Kontrak pelanggan baharu memerlukan pensijilan audit keselamatan pembekal", zh:"新客户合同要求供应商安全审计认证", ta:"புதிய வாடிக்கையாளர் ஒப்பந்தம் வழங்குநர் பாதுகாப்பு தணிக்கை சான்றிதழை கட்டாயமாக்குகிறது" },
    auditDetection6: { en:"You have never conducted a formal internal safety audit", ms:"Anda belum pernah menjalankan audit keselamatan dalaman formal", zh:"您从未进行过正式内部安全审计", ta:"ஒருபோதும் சரியான உள் பாதுகாப்பு தணிக்கை நடத்தவில்லை" },
    auditProcessTitle: { en:"Our Process", ms:"Proses Kami", zh:"我们的流程", ta:"எங்கள் செயல்முறை" },
    auditProcess1Label: { en:"Pre-Audit Document Review", ms:"Semakan Dokumen Pra-Audit", zh:"审计前文件审查", ta:"முன்-தணிக்கை ஆவண மதிப்பாய்வு" },
    auditProcess1Desc: { en:"We review your existing HIRARC, machinery registers, training records, and incident files before setting foot on site.", ms:"Kami menyemak HIRARC, daftar jentera, rekod latihan, dan fail kejadian sedia ada anda sebelum melangkah ke tapak.", zh:"在踏入现场之前，我们审查您现有的HIRARC、机械登记表、培训记录和事故档案。", ta:"தளத்தில் நுழைவதற்கு முன் உங்கள் உள்ள HIRARC, இயந்திர பதிவேடுகள், பயிற்சி பதிவுகள், மற்றும் விபத்து கோப்புகளை மதிப்பாய்வு செய்கிறோம்." },
    auditProcess2Label: { en:"On-Site Physical Audit", ms:"Audit Fizikal Di Tapak", zh:"现场实物审计", ta:"தளத்தில் உடல் தணிக்கை" },
    auditProcess2Desc: { en:"Systematic inspection of every work zone against OSH Act, Factories and Machinery Act, and relevant regulations. Photographic evidence for every finding.", ms:"Pemeriksaan sistematik setiap zon kerja terhadap Akta OSH, Akta Kilang dan Jentera, dan peraturan berkaitan. Bukti fotografi untuk setiap penemuan.", zh:"根据OSH Act、工厂和机械Act以及相关法规，对每个工作区进行系统检查。每个发现都有照片证据。", ta:"OSH சட்டம், தொழிற்சாலைகள் மற்றும் இயந்திர சட்டம், மற்றும் சம்பந்தப்பட்ட விதிமுறைகளுக்கு எதிராக ஒவ்வொரு பணி மண்டலத்தையும் அமைப்புமுறை தணிக்கை. ஒவ்வொரு கண்டுபிடிப்புக்கும் புகைப்பட சான்றம்." },
    auditProcess3Label: { en:"Gap Analysis Report", ms:"Laporan Analisis Jurang", zh:"差距分析报告", ta:"இடைவெளி பகுப்பாய்வு அறிக்கை" },
    auditProcess3Desc: { en:"A ranked list of compliance gaps — critical, major, minor — with specific regulatory citations and recommended corrective actions.", ms:"Senarai jurang pematuhan berperingkat — kritikal, major, minor — dengan petikan peraturan khusus dan tindakan pembetulan yang disyorkan.", zh:"按关键、重大、次要排序的合规缺口列表，带有具体的法规引用和推荐的纠正措施。", ta:"குறிப்பிட்ட சட்ட மேற்கோள்களுடனும் பரிந்துரைக்கப்பட்ட திருத்த நடவடிக்கைகளுடனும் இணக்க இடைவெளிகளின் தரவரிசை பட்டியல் — கடுமையான, முக்கிய, சிறிய." },
    auditProcess4Label: { en:"Corrective Action Support", ms:"Sokongan Tindakan Pembetulan", zh:"纠正措施支持", ta:"திருத்த நடவடிக்கை ஆதரவு" },
    auditProcess4Desc: { en:"We help you implement fixes: training gaps closed, documentation prepared, engineering controls installed, SOPs written.", ms:"Kami membantu anda melaksanakan pembetulan: jurang latihan ditutup, dokumentasi disediakan, kawalan kejuruteraan dipasang, SOP ditulis.", zh:"我们帮助您实施整改：关闭培训缺口、准备文件、安装工程控制、编写SOP。", ta:"திருத்தங்களை செயல்படுத்த உதவுகிறோம்: பயிற்சி இடைவெளிகள் மூடப்பட்டன, ஆவணங்கள் தயாரிக்கப்பட்டன, பொறியியல் கட்டுப்பாடுகள் நிறுவப்பட்டன, SOP-கள் எழுதப்பட்டன." },
    auditProcess5Label: { en:"Verification &amp; Closure", ms:"Pengesahan &amp; Penutupan", zh:"验证与关闭", ta:"சரிபார்ப்பு மற்றும் மூடல்" },
    auditProcess5Desc: { en:"Re-inspection to verify all critical and major gaps are closed. We issue a compliance readiness certificate for your records.", ms:"Pemeriksaan semula untuk mengesahkan semua jurang kritikal dan major telah ditutup. Kami mengeluarkan sijil kesiapsiagaan pematuhan untuk rekod anda.", zh:"重新检查以验证所有关键和重大缺口已关闭。我们为您出具合规准备证书。", ta:"அனைத்து கடுமையான மற்றும் முக்கிய இடைவெளிகளும் மூடப்பட்டுள்ளதா என்பதை சரிபார்க்க மீண்டும் ஆய்வு. உங்கள் பதிவுகளுக்காக இணக்க தயார்நிலை சான்றிதழை வழங்குகிறோம்." },
    auditFailsTitle: { en:"Why Other Approaches Fail", ms:"Mengapa Pendekatan Lain Gagal", zh:"为什么其他方法会失败", ta:"மற்ற அணுகுமுறைகள் ஏன் தோல்வியடைகின்றன" },
    auditFailsText: { en:"Generic audit checklists miss industry-specific hazards. An auditor who has never visited a chemical plant will not spot the LEV deficiency that a DOSH inspector will. One-off audits without follow-through leave gaps unclosed — and your facility exposed.", ms:"Senarai semak audit generik terlepas bahaya khusus industri. Juruaudit yang belum pernah melawat kilang kimia tidak akan perasan kekurangan LEV yang pemeriksa DOSH akan perhatikan. Audit sekali tanpa susulan meninggalkan jurang terbuka — dan kemudahan anda terdedah.", zh:"通用审计清单会遗漏行业特定的危害。从未访问过化工厂的审计员不会发现DOSH检查员会发现的LEV缺陷。没有后续跟进的一次性审计会让缺口未关闭——您的设施仍然暴露于风险中。", ta:"பொதுவான தணிக்கை குறிப்பேடுகள் தொழிற்துறை-குறிப்பிட்ட அபாயங்களை தவறவிடுகின்றன. ஒருபோதும் வேதிப்பொருள் ஆலைக்கு வராத ஒரு தணிக்கையாளர் DOSH ஆய்வாளர் காணும் LEV குறைபாட்டை காணமாட்டார். தொடர்ச்சி இல்லாத ஒருமுறை தணிக்கைகள் இடைவெளிகளை மூடாமல் விடுகின்றன — மற்றும் உங்கள் வசதியை புற்றுநோயாக்குகின்றன." },
    auditSchedulingTitle: { en:"Risk-Based Scheduling", ms:"Penjadualan Berdasarkan Risiko", zh:"基于风险的排程", ta:"அபாய அடிப்படையிலான திட்டமிடல்" },
    auditSchedulingHighTitle: { en:"High-Risk Environments", ms:"Persekitaran Berisiko Tinggi", zh:"高风险环境", ta:"அதிக அபாய சூழல்கள்" },
    auditSchedulingHighDesc: { en:"High-risk manufacturing and chemical facilities — quarterly internal audits plus annual third-party verification.", ms:"Kemudahan pengilangan dan kimia berisiko tinggi — audit dalaman suku tahunan ditambah pengesahan pihak ketiga tahunan.", zh:"高风险制造和化学品设施——每季度内部审计加上每年第三方验证。", ta:"அதிக அபாய உற்பத்தி மற்றும் வேதிப்பொருள் வசதிகள் — காலாண்டு உள் தணிக்கைகள் கூடுதல் ஆண்டு மூன்றாம் தரப்பு சரிபார்ப்பு." },
    auditSchedulingLowTitle: { en:"Low-Moderate Risk", ms:"Risiko Rendah-Sederhana", zh:"中低风险", ta:"குறைந்த-மிதமான அபாயம்" },
    auditSchedulingLowDesc: { en:"Low-risk commercial offices — annual internal audit sufficient.", ms:"Pejabat komersial berisiko rendah — audit dalaman tahunan mencukupi.", zh:"低风险的商业办公室——每年内部审计即可。", ta:"குறைந்த அபாய வணிக அலுவலகங்கள் — ஆண்டு உள் தணிக்கை போதுமானது." },
    auditPropertyTitle: { en:"Property Types We Serve", ms:"Jenis Kemudahan yang Kami Layani", zh:"我们服务的物业类型", ta:"நாங்கள் சேவை செய்யும் சொத்து வகைகள்" },
    auditProperty1: { en:"Manufacturing and assembly plants", ms:"Kilang pengilangan dan pemasangan", zh:"制造和装配厂", ta:"உற்பத்தி மற்றும் பொருத்து ஆலைகள்" },
    auditProperty2: { en:"Chemical processing and blending facilities", ms:"Kemudahan pemprosesan dan pencampuran kimia", zh:"化学品加工和调配设施", ta:"வேதிப்பொருள் செயலாக்கம் மற்றும் கலப்பு வசதிகள்" },
    auditProperty3: { en:"Construction sites preparing for CIDB audit", ms:"Tapak pembinaan yang bersedia untuk audit CIDB", zh:"准备CIDB审计的建筑工地", ta:"CIDB தணிக்கைக்கு தயாராகும் கட்டுமான தளங்கள்" },
    auditProperty4: { en:"Warehouses with heavy machinery", ms:"Gudang dengan jentera berat", zh:"拥有重型机械的仓库", ta:"கனரக இயந்திரங்கள் கொண்ட கிடங்குகள்" },
    auditProperty5: { en:"Food and beverage production", ms:"Pengeluaran makanan dan minuman", zh:"食品和饮料生产", ta:"உணவு மற்றும் பானை உற்பத்தி" },
    auditProperty6: { en:"Healthcare and pharmaceutical operations", ms:"Operasi kesihatan dan farmaseutikal", zh:"医疗和制药运营", ta:"சுகாதாரம் மற்றும் மருந்து செயல்பாடுகள்" },
    auditCoverageTitle: { en:"Coverage Areas", ms:"Kawasan Liputan", zh:"覆盖地区", ta:"பரவல் பகுதிகள்" },
    auditCoverageText: { en:"On-site safety audit and inspection services across Johor and Peninsular Malaysia.", ms:"Perkhidmatan audit keselamatan dan pemeriksaan di tapak merentasi Johor dan Semenanjung Malaysia.", zh:"在柔佛和马来西亚半岛各地提供现场安全审计和检查服务。", ta:"ஜொகூர் மற்றும் மலேசிய தீபகற்பம் முழுவதும் தள பாதுகாப்பு தணிக்கை மற்றும் ஆய்வு சேவைகள்." },
    auditCoverage1: { en:"Johor Bahru", ms:"Johor Bahru", zh:"新山", ta:"ஜொகூர் பாரு" },
    auditCoverage2: { en:"Pasir Gudang", ms:"Pasir Gudang", zh:"巴西古当", ta:"பாசிர் கூடாங்" },
    auditCoverage3: { en:"Senai", ms:"Senai", zh:"士乃", ta:"செனாய்" },
    auditCoverage4: { en:"Pengerang", ms:"Pengerang", zh:"边佳兰", ta:"பெங்கெராங்" },
    auditCoverage5: { en:"Iskandar Puteri", ms:"Iskandar Puteri", zh:"依斯干达公主城", ta:"இஸ்கந்தார் புத்தேரி" },
    auditCoverage6: { en:"Skudai", ms:"Skudai", zh:"士古来", ta:"சுகுதை" },
    auditCoverage7: { en:"Kulai", ms:"Kulai", zh:"古来", ta:"குலாய்" },
    auditCoverage8: { en:"Ulu Tiram", ms:"Ulu Tiram", zh:"乌鲁地南", ta:"உலு திராம்" },
    auditFaqTitle: { en:"Frequently Asked Questions", ms:"Soalan Lazim", zh:"常见问题", ta:"அடிக்கடி கேட்கப்படும் கேள்விகள்" },
    auditFaq1Q: { en:"How long does a safety audit take?", ms:"Berapa lamakah audit keselamatan?", zh:"安全审计需要多长时间？", ta:"பாதுகாப்பு தணிக்கை எவ்வளவு நேரம் எடுக்கும்?" },
    auditFaq1A: { en:"A typical SME facility requires 1 day on site. Large industrial complexes with multiple buildings may require 2–3 days. The report is delivered within 5–7 working days.", ms:"Kemudahan SME biasa memerlukan 1 hari di tapak. Kompleks industri besar dengan banyak bangunan mungkin memerlukan 2–3 hari. Laporan dihantar dalam masa 5–7 hari bekerja.", zh:"典型的中小企业设施需要1天现场。拥有多栋建筑的大型工业综合体可能需要2-3天。报告在5-7个工作日内交付。", ta:"ஒரு பொதுவான SME வசதி தளத்தில் 1 நாள் தேவைப்படுகிறது. பல கட்டிடங்கள் கொண்ட பெரிய தொழிற்துறை வளாகங்களுக்கு 2–3 நாட்கள் தேவைப்படலாம். அறிக்கை 5–7 பணி நாட்களுக்குள் வழங்கப்படுகிறது." },
    auditFaq2Q: { en:"What standards do you audit against?", ms:"Piawaian apakah yang anda audit terhadapnya?", zh:"你们根据什么标准进行审计？", ta:"எந்த தரங்களுக்கு எதிராக நீங்கள் தணிக்கை செய்கிறீர்கள்?" },
    auditFaq2A: { en:"We audit against the OSH Act 1994, Occupational Safety and Health (Noise Exposure) Regulations 2019, USECHH Regulations 2000, and relevant DOSH industry codes of practice.", ms:"Kami mengaudit terhadap Akta OSH 1994, Peraturan Keselamatan dan Kesihatan Pekerjaan (Pendedahan Bising) 2019, Peraturan USECHH 2000, dan kod amalan industri DOSH yang berkaitan.", zh:"我们根据OSH Act 1994、职业安全与健康（噪音暴露）法规2019、USECHH Regulations 2000以及相关DOSH行业实践守则进行审计。", ta:"OSH சட்டம் 1994, தொழில் பாதுகாப்பு மற்றும் சுகாதார (சத்தம் வெளிப்பாடு) விதிமுறைகள் 2019, USECHH விதிமுறைகள் 2000, மற்றும் சம்பந்தப்பட்ட DOSH தொழிற்துறை நடைமுறை குறியீடுகளுக்கு எதிராக தணிக்கை செய்கிறோம்." },
    auditFaq3Q: { en:"Will you share the audit report with DOSH?", ms:"Adakah anda akan berkongsi laporan audit dengan DOSH?", zh:"你们会与DOSH分享审计报告吗？", ta:"தணிக்கை அறிக்கையை DOSH-உடன் பகிர்வீர்களா?" },
    auditFaq3A: { en:"No. The audit report is confidential to you. We prepare it in a format that YOU can present to DOSH if you choose, but we do not submit it on your behalf.", ms:"Tidak. Laporan audit adalah sulit untuk anda. Kami menyediakannya dalam format yang BOLEH anda bentangkan kepada DOSH jika anda memilih, tetapi kami tidak menghantarnya atas nama anda.", zh:"不会。审计报告对您保密。我们以您可以向DOSH展示的格式准备，但我们不会代表您提交。", ta:"இல்லை. தணிக்கை அறிக்கை உங்களுக்கு மட்டுமே நம்பகமானது. நீங்கள் தேர்வு செய்தால் DOSH-இடம் வழங்குவதற்கான வடிவத்தில் தயாரிக்கிறோம், ஆனால் உங்கள் சார்பாக சமர்ப்பிக்கவில்லை." },
    auditFaq4Q: { en:"Can you accompany us during a DOSH inspection?", ms:"Bolehkah anda menyertai kami semasa pemeriksaan DOSH?", zh:"你们可以在DOSH检查期间陪同我们吗？", ta:"DOSH ஆய்வின் போது எங்களுடன் வருவீர்களா?" },
    auditFaq4A: { en:"Yes. We provide on-site advisory during DOSH inspections to help answer technical questions and present documentation in the format inspectors expect.", ms:"Ya. Kami menyediakan nasihat di tapak semasa pemeriksaan DOSH untuk membantu menjawab soalan teknikal dan membentangkan dokumentasi dalam format yang dijangkakan oleh pemeriksa.", zh:"可以。我们在DOSH检查期间提供现场咨询，帮助回答技术问题，并以检查员期望的格式展示文件。", ta:"ஆம். DOSH ஆய்வுகளின் போது தளத்தில் ஆலோசனை வழங்குகிறோம், தொழில்நுட்ப கேள்விகளுக்கு பதிலளிக்கவும் ஆய்வாளர்கள் எதிர்பார்க்கும் வடிவத்தில் ஆவணங்களை வழங்கவும் உதவுகிறோம்." },
    auditFaq5Q: { en:"What if we fail the audit?", ms:"Bagaimana jika kami gagal audit?", zh:"如果我们审计失败会怎样？", ta:"தணிக்கையில் தோல்வியடைந்தால் என்ன?" },
    auditFaq5A: { en:"There is no \"pass\" or \"fail\" in an internal audit — only gaps identified and prioritised. Our goal is to find and close gaps BEFORE DOSH does. We provide a remediation timeline for every finding.", ms:"There is no \"pass\" or \"fail\" in an internal audit — only gaps identified and prioritised. Our goal is to find and close gaps BEFORE DOSH does. We provide a remediation timeline for every finding.", zh:"There is no \"pass\" or \"fail\" in an internal audit — only gaps identified and prioritised. Our goal is to find and close gaps BEFORE DOSH does. We provide a remediation timeline for every finding.", ta:"There is no \"pass\" or \"fail\" in an internal audit — only gaps identified and prioritised. Our goal is to find and close gaps BEFORE DOSH does. We provide a remediation timeline for every finding." },
    auditFaq6Q: { en:"Is audit support HRD Corp claimable?", ms:"Adakah sokongan audit boleh dituntut HRD Corp?", zh:"审计支持可以申报HRD Corp吗？", ta:"தணிக்கை ஆதரவு HRD Corp உரிமை கோரக்கூடியதா?" },
    auditFaq6A: { en:"Safety audit and inspection training is HRD Corp claimable when structured as a formal competency programme. We can advise on claim eligibility for your specific audit scope.", ms:"Latihan audit dan pemeriksaan keselamatan adalah boleh dituntut HRD Corp apabila distrukturkan sebagai program kompetensi formal. Kami boleh menasihati tentang kelayakan tuntutan untuk skop audit khusus anda.", zh:"当结构化为正式的胜任能力课程时，安全审计和检查培训可以申报HRD Corp。我们可以就您的特定审计范围的建议资格提供建议。", ta:"பாதுகாப்பு தணிக்கை மற்றும் ஆய்வு பயிற்சி முறையான திறன் திட்டமாக அமைக்கப்படும்போது HRD Corp உரிமை கோரக்கூடியது. உங்கள் குறிப்பிட்ட தணிக்கை வரம்புக்கான உரிமை தகுதியை பற்றி ஆலோசனை வழங்க முடியும்." },
    auditCtaTitle: { en:"Be Audit-Ready Before DOSH Arrives", ms:"Bersedia untuk Audit Sebelum DOSH Tiba", zh:"在DOSH到来之前做好审计准备", ta:"DOSH வருவதற்கு முன் தணிக்கை-தயாராக இருங்கள்" },
    auditCtaSubtitle: { en:"Systematic gap identification, ranked corrective actions, and verification closure — so you pass DOSH inspections with confidence.", ms:"Pengenalpastian jurang sistematik, tindakan pembetulan berperingkat, dan penutupan pengesahan — supaya anda lulus pemeriksaan DOSH dengan yakin.", zh:"系统性差距识别、排名纠正措施和验证关闭——让您自信地通过DOSH检查。", ta:"அமைப்புமுறை இடைவெளி அடையாளம் காணுதல், தரவரிசை திருத்த நடவடிக்கைகள், மற்றும் சரிபார்ப்பு மூடல் — உங்களை நம்பிக்கையுடன் DOSH ஆய்வுகளில் தேர்ச்சி பெற வைக்க." },
    auditCtaBtnWa: { en:"WhatsApp for Audit Booking", ms:"WhatsApp untuk Tempahan Audit", zh:"WhatsApp预约审计", ta:"தணிக்கை முன்பதிவுக்கு WhatsApp" },
    auditCtaBtnContact: { en:"Request Audit Proposal", ms:"Mohon Cadangan Audit", zh:"索取审计方案", ta:"தணிக்கை முன்மொழிவைக் கோருக" },
    wahEyebrow: { en:"CIDB + DOSH Critical", ms:"Kritikal CIDB + DOSH", zh:"CIDB + DOSH关键", ta:"CIDB + DOSH முக்கியம்" },
    wahHeroTitle: { en:"Working at Height (WAH) Safety Training — Fall Prevention", ms:"Latihan Keselamatan Bekerja di Ketinggian (WAH) — Pencegahan Jatuh", zh:"高处作业（WAH）安全培训 — 坠落预防", ta:"உயரத்தில் பணி (WAH) பாதுகாப்பு பயிற்சி — விழுதல் தடுப்பு" },
    wahHeroSubtitle: { en:"Fall arrest, full-body harness competency, and MEWP safety. The leading cause of construction fatalities in Malaysia. On-site delivery with real equipment.", ms:"Penahan jatuh, kompetensi tali badan penuh, dan keselamatan MEWP. Punca utama kematian pembinaan di Malaysia. Penghantaran di tapak dengan peralatan sebenar.", zh:"防坠落、全身式安全带胜任能力和MEWP安全。马来西亚建筑工地死亡的首要原因。使用真实设备现场授课。", ta:"விழுதல் தடுப்பு, முழு உடல் கவச திறன், மற்றும் MEWP பாதுகாப்பு. மலேசியாவில் கட்டுமான இறப்புகளுக்கான முக்கிய காரணம். உண்மையான உபகரணங்களுடன் தள வழங்கல்." },
    wahHeroBtnWa: { en:"WhatsApp for WAH Training", ms:"WhatsApp untuk Latihan WAH", zh:"WhatsApp咨询WAH培训", ta:"WAH பயிற்சிக்கு WhatsApp" },
    wahHeroBtnContact: { en:"Request Training Schedule", ms:"Mohon Jadual Latihan", zh:"索取培训时间表", ta:"பயிற்சி அட்டவணையைக் கோருக" },
    wahProblemTitle: { en:"Do You Need WAH Training?", ms:"Adakah Anda Memerlukan Latihan WAH?", zh:"您需要WAH培训吗？", ta:"உங்களுக்கு WAH பயிற்சி தேவையா?" },
    wahProblemText: { en:"Falls from height remain the leading cause of death and serious injury on Malaysian construction sites. The CIDB and DOSH require specific WAH competency for workers operating above 2 metres. Many sites rely on generic inductions that do not address the actual fall hazards of the specific structure being built.", ms:"Jatuh dari ketinggian kekal sebagai punca utama kematian dan kecederaan serius di tapak pembinaan Malaysia. CIDB dan DOSH memerlukan kompetensi WAH khusus untuk pekerja yang beroperasi di atas 2 meter. Ramai tapak bergantung pada induksi generik yang tidak menangani bahaya jatuh sebenar struktur khusus yang sedang dibina.", zh:"高处坠落仍然是马来西亚建筑工地死亡和重伤的首要原因。CIDB和DOSH要求对2米以上作业的工人进行特定的WAH胜任能力培训。许多工地依靠通用入门培训，无法解决所建结构的具体坠落危害。", ta:"உயரத்திலிருந்து விழுதல்கள் மலேசிய கட்டுமான தளங்களில் மரணம் மற்றும் கடுமையான காயங்களுக்கான முக்கிய காரணமாக உள்ளன. 2 மீட்டருக்கு மேல் பணி செய்யும் தொழிலாளர்களுக்கு CIDB மற்றும் DOSH குறிப்பிட்ட WAH திறனை கோருகின்றன. பல தளங்கள் கட்டப்படும் குறிப்பிட்ட அமைப்பின் உண்மையான விழுதல் அபாயங்களை கவனிக்காத பொதுவான அறிமுகங்களை நம்பியுள்ளன." },
    wahStakesTitle: { en:"The Stakes", ms:"Risiko Yang Dihadapi", zh:"风险所在", ta:"ஆபத்துகள்" },
    wahStakesH1: { en:"Fatality &amp; Prosecution Risk", ms:"Risiko Kematian &amp; Pendakwaan", zh:"死亡与起诉风险", ta:"இறப்பு மற்றும் வழக்கு அபாயம்" },
    wahStakesP1: { en:"A single fatal fall triggers immediate CIDB and DOSH investigations, potential project suspension, criminal charges under the Factories and Machinery Act, and massive insurance premium increases.", ms:"Satu kejadian jatuh yang membawa maut mencetuskan siasatan CIDB dan DOSH serta-merta, penggantungan projek berpotensi, tuduhan jenayah di bawah Akta Kilang dan Jentera, dan peningkatan premium insurans yang besar.", zh:"单次致命坠落会立即触发CIDB和DOSH调查、潜在的项目暂停、根据工厂和机械Act的刑事指控以及巨额保险费上涨。", ta:"ஒரு நபர் இறந்த விழுதல் உடனடி CIDB மற்றும் DOSH விசாரணைகளை, சாத்தியமான திட்ட நிறுத்தம், தொழிற்சாலைகள் மற்றும் இயந்திர சட்டத்தின் கீழ் குற்றவியல் குற்றச்சாட்டுகளை, மற்றும் பெரும் காப்பீட்டு பிரீமியம் அதிகரிப்புகளைத் தூண்டுகிறது." },
    wahStakesH2: { en:"Permanent Disability", ms:"Kecacatan Kekal", zh:"永久性残疾", ta:"நிரந்தர முடக்குவாதம்" },
    wahStakesP2: { en:"Survivors of falls from height often face permanent disability. The human and financial cost to workers and their families is devastating and entirely preventable with proper training and equipment.", ms:"Mangsa jatuh dari ketinggian sering menghadapi kecacatan kekal. Kos manusia dan kewangan kepada pekerja dan keluarga mereka adalah dahsyat dan boleh dicegah sepenuhnya dengan latihan dan peralatan yang sewajarnya.", zh:"高处坠落的幸存者经常面临永久性残疾。对工人及其家庭的人力和财力成本是毁灭性的，但通过适当的培训和设备完全可以预防。", ta:"உயரத்திலிருந்து விழுந்து உயிர் பிழைப்பவர்கள் பெரும்பாலும் நிரந்தர முடக்குவாதத்தை எதிர்கொள்கிறார்கள். தொழிலாளர்களுக்கும் அவர்களின் குடும்பங்களுக்கும் மனித மற்றும் நிதி செலவு பயங்கரமானது, சரியான பயிற்சி மற்றும் உபகரணங்களுடன் முற்றிலும் தடுக்கக்கூடியது." },
    wahStakesH3: { en:"Suspension Trauma", ms:"Trauma Penggantungan", zh:"悬吊创伤", ta:"தூக்கல் அதிர்ச்சி" },
    wahStakesP3: { en:"A worker caught by their harness can suffer suspension trauma within 15 minutes. Without a rescue plan, a survivable fall becomes a fatal event. Every WAH programme must include rescue planning.", ms:"Pekerja yang ditangkap oleh tali badan mereka boleh mengalami trauma penggantungan dalam masa 15 minit. Tanpa rancangan penyelamatkan, jatuh yang boleh ditahan menjadi peristiwa maut. Setiap program WAH mesti merangkumi perancangan penyelamatkan.", zh:"被安全带吊住的工人可能在15分钟内遭受悬吊创伤。如果没有救援计划，可幸存的坠落会变成致命事件。每个WAH课程都必须包括救援计划。", ta:"கவசத்தால் பிடிக்கப்பட்ட தொழிலாளர் 15 நிமிடங்களுக்குள் தூக்கல் அதிர்ச்சியால் பாதிக்கப்படலாம். மீட்பு திட்டம் இல்லாமல், உயிர் பிழைக்கக்கூடிய விழுதல் ஒரு மரண நிகழ்வாக மாறுகிறது. ஒவ்வொரு WAH திட்டமும் மீட்பு திட்டமிடலை உள்ளடக்கியிருக்க வேண்டும்." },
    wahHazardTitle: { en:"Hazard Profile", ms:"Profil Bahaya", zh:"危害概况", ta:"அபாய சுயவிவரம்" },
    wahHazard1Name: { en:"Unprotected Edges", ms:"Tepi Tanpa Perlindungan", zh:"无保护的边缘", ta:"காப்பற்ற விளிம்புகள்" },
    wahHazard1Desc: { en:"Open floor edges, roof perimeters, and shafts without guardrails or toe boards.", ms:"Tepi lantai terbuka, perimeter bumbung, dan lubang tanpa pagar pelindung atau papan tumit.", zh:"开放式地板边缘、屋顶周边和没有护栏或踢脚板的竖井。", ta:"திறந்த தள விளிம்புகள், கூரை சுற்றுப்புறங்கள், மற்றும் தடைகள் அல்லது கால் பலகைகள் இல்லாத குழாய்கள்." },
    wahHazard2Name: { en:"Improper Harness Use", ms:"Penggunaan Tali Badan Tidak Sesuai", zh:"安全带使用不当", ta:"தவறான கவச பயன்பாடு" },
    wahHazard2Desc: { en:"Workers wearing harnesses incorrectly — not attached to an anchor point, or using damaged/webbing-compromised equipment.", ms:"Pekerja memakai tali badan secara tidak betul — tidak disambung kepada titik sauh, atau menggunakan peralatan rosak/terjejas.", zh:"工人不正确地佩戴安全带——未连接到锚点，或使用损坏/织带受损的设备。", ta:"தொழிலாளர்கள் தவறாக கவசங்களை அணிகிறார்கள் — நங்கூர புள்ளியுடன் இணைக்கப்படவில்லை, அல்லது சேதமடைந்த/நெசவு-சமரசம் செய்யப்பட்ட உபகரணங்களைப் பயன்படுத்துகிறார்கள்." },
    wahHazard3Name: { en:"Defective MEWP Operations", ms:"Operasi MEWP Rosak", zh:"MEWP操作缺陷", ta:"சேதமடைந்த MEWP செயல்பாடுகள்" },
    wahHazard3Desc: { en:"Mobile Elevated Work Platforms operated by untrained personnel, or used on unstable ground without outriggers.", ms:"Platform Kerja Angkat Bergerak (MEWP) yang dikendalikan oleh kakitangan tidak dilatih, atau digunakan pada tanah tidak stabil tanpa outrigger.", zh:"由未经培训的人员操作移动式高空作业平台，或在没有支腿的不稳定地面上使用。", ta:"பயிற்சி பெறாத நபர்களால் இயக்கப்படும் மொபைல் உயர்த்தப்பட்ட பணி தளங்கள், அல்லது வெளியேற்றிகள் இல்லாத நிலையற்ற நிலத்தில் பயன்படுத்தப்படுகின்றன." },
    wahHazard4Name: { en:"Inadequate Rescue Plans", ms:"Rancangan Penyelamatkan Tidak Mencukupi", zh:"救援计划不足", ta:"போதுமான மீட்பு திட்டங்கள் இல்லை" },
    wahHazard4Desc: { en:"Fall arrest systems deployed without a rescue plan. A suspended worker can suffer suspension trauma within 15 minutes.", ms:"Sistem penahan jatuh yang digunakan tanpa rancangan penyelamatkan. Pekerja yang tergantung boleh mengalami trauma penggantungan dalam masa 15 minit.", zh:"在没有救援计划的情况下部署防坠落系统。被吊住的工人可能在15分钟内遭受悬吊创伤。", ta:"மீட்பு திட்டம் இல்லாமல் விழுதல் தடுப்பு அமைப்புகள் பயன்படுத்தப்படுகின்றன. தூக்கப்பட்ட தொழிலாளர் 15 நிமிடங்களுக்குள் தூக்கல் அதிர்ச்சியால் பாதிக்கப்படலாம்." },
    wahDetectionTitle: { en:"Warning Signs", ms:"Tanda Amaran", zh:"警告信号", ta:"எச்சரிக்கை அறிகுறிகள்" },
    wahDetection1: { en:"Your project involves work above 2 metres — scaffolding, roofing, or facade installation", ms:"Projek anda melibatkan kerja di atas 2 meter — perancah, bumbung, atau pemasangan fasad", zh:"您的项目涉及2米以上的作业——脚手架、屋顶或外墙安装", ta:"உங்கள் திட்டம் 2 மீட்டருக்கு மேல் பணியை உள்ளடக்குகிறது — கால்வாடம், கூரை, அல்லது முகப்பு நிறுவுதல்" },
    wahDetection2: { en:"You have experienced a near-miss or actual fall incident on site", ms:"Anda telah mengalami kemalangan nyaris atau kejadian jatuh sebenar di tapak", zh:"您在工地上经历过侥幸事故或实际坠落事件", ta:"உங்கள் தளத்தில் தவறவிட்ட விபத்து அல்லது உண்மையான விழுதல் நிகழ்வு ஏற்பட்டுள்ளது" },
    wahDetection3: { en:"Your site safety officer has identified unprotected edges during daily hazard walks", ms:"Pegawai keselamatan tapak anda telah mengenal pasti tepi tanpa perlindungan semasa lawatan bahaya harian", zh:"您的工地安全官在日常危害巡查中发现了无保护的边缘", ta:"உங்கள் தள பாதுகாப்பு அதிகாரி தினசரி அபாய நடைகளின் போது காப்பற்ற விளிம்புகளை அடையாளம் கண்டுள்ளார்" },
    wahDetection4: { en:"Subcontractor crews arrive without WAH competency certificates", ms:"Krew subkontraktor tiba tanpa sijil kompetensi WAH", zh:"分包商团队没有WAH胜任能力证书就到达工地", ta:"உட்கட்டுமான பணியாளர் குழுக்கள் WAH திறன் சான்றிதழ்கள் இல்லாமல் வருகின்றன" },
    wahDetection5: { en:"You are bidding for a project that requires WAH-specific safety documentation", ms:"Anda membida untuk projek yang memerlukan dokumentasi keselamatan WAH khusus", zh:"您正在投标需要WAH特定安全文件的项目", ta:"WAH-குறிப்பிட்ட பாதுகாப்பு ஆவணங்களைக் கோரும் ஒரு திட்டத்திற்கு நீங்கள் ஏலம் விடுகிறீர்கள்" },
    wahDetection6: { en:"Your insurance underwriter has requested proof of WAH training for renewal", ms:"Pihak insurans anda telah meminta bukti latihan WAH untuk pembaharuan", zh:"您的保险承保人要求续期时提供WAH培训证明", ta:"உங்கள் காப்பீட்டு எழுத்தாளர் புதுப்பிப்புக்கு WAH பயிற்சி சான்று கோரியுள்ளார்" },
    wahProcessTitle: { en:"Our Process", ms:"Proses Kami", zh:"我们的流程", ta:"எங்கள் செயல்முறை" },
    wahProcess1Label: { en:"Site Hazard Walk", ms:"Lawatan Bahaya Tapak", zh:"现场危害巡查", ta:"தள அபாய நடை" },
    wahProcess1Desc: { en:"We identify all fall hazards specific to your structure — edges, openings, ladder access points, and scaffold tie-back requirements.", ms:"Kami mengenal pasti semua bahaya jatuh khusus untuk struktur anda — tepi, bukaan, titik akses tangga, dan keperluan ikat balik perancah.", zh:"我们识别针对您结构的所有坠落危害——边缘、开口、梯子通道点和脚手架系回要求。", ta:"உங்கள் அமைப்புக்குக் குறிப்பிட்ட அனைத்து விழுதல் அபாயங்களையும் அடையாளம் காண்கிறோம் — விளிம்புகள், திறப்புகள், நீள்வட்ட அணுகல் புள்ளிகள், மற்றும் கால்வாடம் கட்டுப்பாட்டு தேவைகள்." },
    wahProcess2Label: { en:"Competency Training", ms:"Latihan Kompetensi", zh:"胜任能力培训", ta:"திறன் பயிற்சி" },
    wahProcess2Desc: { en:"Classroom theory covering fall physics, harness anatomy, anchor point selection, and MEWP safe operation — followed by hands-on practical assessment.", ms:"Teori bilik darjah merangkumi fizik jatuh, anatomi tali badan, pemilihan titik sauh, dan operasi selamat MEWP — diikuti dengan penilaian praktikal hands-on.", zh:"课堂理论涵盖坠落物理、安全带结构、锚点选择和MEWP安全操作——随后进行动手实操评估。", ta:"விழுதல் இயற்பியல், கவச உடற்கூறியல், நங்கூர புள்ளி தேர்வு, மற்றும் MEWP பாதுகாப்பான செயல்பாட்டை உள்ளடக்கிய வகுப்பறை கோட்பாடு — கைகளில்-பயிற்சி நடைமுறை மதிப்பீட்டைத் தொடர்ந்து." },
    wahProcess3Label: { en:"Equipment Inspection", ms:"Pemeriksaan Peralatan", zh:"设备检查", ta:"உபகரண ஆய்வு" },
    wahProcess3Desc: { en:"We inspect your existing fall arrest equipment for defects, expiry dates, and compliance with MS standards. Damaged equipment is tagged and removed.", ms:"Kami memeriksa peralatan penahan jatuh sedia ada anda untuk kerosakan, tarikh luput, dan pematuhan piawaian MS. Peralatan rosak ditanda dan dikeluarkan.", zh:"我们检查您现有的防坠落设备是否有缺陷、过期日期，并符合MS标准。损坏的设备被标记并移除。", ta:"சேதங்கள், காலாவதி தேதிகள், மற்றும் MS தரங்களுக்கான இணக்கத்திற்காக உங்கள் உள்ள விழுதல் தடுப்பு உபகரணங்களை ஆய்வு செய்கிறோம். சேதமடைந்த உபகரணங்கள் குறிக்கப்பட்டு அகற்றப்படுகின்றன." },
    wahProcess4Label: { en:"Rescue Plan Drafting", ms:"Pembuatan Rancangan Penyelamatkan", zh:"救援计划起草", ta:"மீட்பு திட்ட வரைதல்" },
    wahProcess4Desc: { en:"A written rescue plan specific to your site — who responds, what equipment is used, and how a suspended worker is recovered within 15 minutes.", ms:"Rancangan penyelamatkan bertulis khusus untuk tapak anda — siapa yang bertindak balas, peralatan apa yang digunakan, dan bagaimana pekerja yang tergantung diselamatkan dalam masa 15 minit.", zh:"针对您工地的书面救援计划——谁响应、使用什么设备，以及如何在15分钟内救出被吊住的工人。", ta:"உங்கள் தளத்திற்குக் குறிப்பிட்ட எழுத்துப்பூர்வ மீட்பு திட்டம் — யார் பதிலளிக்கிறார், எந்த உபகரணம் பயன்படுத்தப்படுகிறது, மற்றும் எப்படி ஒரு தூக்கப்பட்ட தொழிலாளர் 15 நிமிடங்களுக்குள் மீட்கப்படுகிறார்." },
    wahProcess5Label: { en:"Competency Certification", ms:"Pensijilan Kompetensi", zh:"胜任能力认证", ta:"திறன் சான்றிதல்" },
    wahProcess5Desc: { en:"Successful candidates receive WAH competency certificates recognised by CIDB and DOSH. We maintain a training register for inspection.", ms:"Calon yang berjaya menerima sijil kompetensi WAH yang diiktiraf oleh CIDB dan DOSH. Kami mengekalkan daftar latihan untuk pemeriksaan.", zh:"通过者获得CIDB和DOSH认可的WAH胜任能力证书。我们维护培训登记表供检查。", ta:"வெற்றி பெற்றவர்கள் CIDB மற்றும் DOSH-ஆல் அங்கீகரிக்கப்பட்ட WAH திறன் சான்றிதழ்களைப் பெறுகிறார்கள். ஆய்வுக்காக பயிற்சி பதிவேட்டை பேணுகிறோம்." },
    wahFailsTitle: { en:"Why Other Approaches Fail", ms:"Mengapa Pendekatan Lain Gagal", zh:"为什么其他方法会失败", ta:"மற்ற அணுகுமுறைகள் ஏன் தோல்வியடைகின்றன" },
    wahFailsText: { en:"Generic \"Working at Height\" videos shown in a hotel conference room do not prepare workers for the specific edges, anchors, and rescue challenges of YOUR site. Theory without hands-on practice with real harnesses and real anchor points creates false confidence — and real fatalities.", ms:"Generic \"Working at Height\" videos shown in a hotel conference room do not prepare workers for the specific edges, anchors, and rescue challenges of YOUR site. Theory without hands-on practice with real harnesses and real anchor points creates false confidence — and real fatalities.", zh:"Generic \"Working at Height\" videos shown in a hotel conference room do not prepare workers for the specific edges, anchors, and rescue challenges of YOUR site. Theory without hands-on practice with real harnesses and real anchor points creates false confidence — and real fatalities.", ta:"Generic \"Working at Height\" videos shown in a hotel conference room do not prepare workers for the specific edges, anchors, and rescue challenges of YOUR site. Theory without hands-on practice with real harnesses and real anchor points creates false confidence — and real fatalities." },
    wahSchedulingTitle: { en:"Risk-Based Scheduling", ms:"Penjadualan Berdasarkan Risiko", zh:"基于风险的排程", ta:"அபாய அடிப்படையிலான திட்டமிடல்" },
    wahSchedulingHighTitle: { en:"High-Risk Environments", ms:"Persekitaran Berisiko Tinggi", zh:"高风险环境", ta:"அதிக அபாய சூழல்கள்" },
    wahSchedulingHighDesc: { en:"High-rise and structural steel projects — refresher training every 6 months; new worker induction before every phase.", ms:"Projek bertingkat tinggi dan keluli struktur — latihan pembaharuan setiap 6 bulan; induksi pekerja baharu sebelum setiap fasa.", zh:"高层和钢结构项目——每6个月进行一次复训；每个阶段前对新工人进行入门培训。", ta:"உயரமான மற்றும் கட்டமைப்பு எஃகு திட்டங்கள் — ஒவ்வொரு 6 மாதத்திற்கும் புதுப்பிப்பு பயிற்சி; ஒவ்வொரு கட்டத்திற்கும் முன் புதிய தொழிலாளர் அறிமுகம்." },
    wahSchedulingLowTitle: { en:"Low-Moderate Risk", ms:"Risiko Rendah-Sederhana", zh:"中低风险", ta:"குறைந்த-மிதமான அபாயம்" },
    wahSchedulingLowDesc: { en:"Low-rise residential with stable crews — annual refresher sufficient if no incidents or equipment changes.", ms:"Kediaman rendah dengan krew stabil — pembaharuan tahunan mencukupi jika tiada kejadian atau perubahan peralatan.", zh:"人员稳定的低层住宅——如果没有事故或设备变化，每年复训即可。", ta:"குறைந்த உயரம் வீட்டு கட்டுமானம் நிலையான குழுக்களுடன் — விபத்துகள் அல்லது உபகரண மாற்றங்கள் இல்லையென்றால் ஆண்டு புதுப்பிப்பு போதுமானது." },
    wahPropertyTitle: { en:"Property Types We Serve", ms:"Jenis Kemudahan yang Kami Layani", zh:"我们服务的物业类型", ta:"நாங்கள் சேவை செய்யும் சொத்து வகைகள்" },
    wahProperty1: { en:"High-rise building construction", ms:"Pembinaan bangunan bertingkat tinggi", zh:"高层建筑建造", ta:"உயரமான கட்டிட கட்டுமானம்" },
    wahProperty2: { en:"Structural steel erection", ms:"Pemasangan keluli struktur", zh:"钢结构安装", ta:"கட்டமைப்பு எஃகு நிறுவுதல்" },
    wahProperty3: { en:"Roofing and cladding works", ms:"Kerja bumbung dan cladding", zh:"屋顶和覆层工程", ta:"கூரை மற்றும் கிளாடிங் பணிகள்" },
    wahProperty4: { en:"Facade cleaning and maintenance", ms:"Pembersihan dan penyelenggaraan fasad", zh:"外墙清洁和维护", ta:"முகப்பு சுத்திகரிப்பு மற்றும் பராமரிப்பு" },
    wahProperty5: { en:"Bridge and infrastructure projects", ms:"Projek jambatan dan infrastruktur", zh:"桥梁和基础设施项目", ta:"பாலம் மற்றும் கட்டமைப்பு திட்டங்கள்" },
    wahProperty6: { en:"Industrial tank and silo access", ms:"Akses tangki dan silo industri", zh:"工业储罐和筒仓通道", ta:"தொழிற்துறை தேக்கம் மற்றும் சைலோ அணுகல்" },
    wahCoverageTitle: { en:"Coverage Areas", ms:"Kawasan Liputan", zh:"覆盖地区", ta:"பரவல் பகுதிகள்" },
    wahCoverageText: { en:"On-site WAH training and rescue planning across Johor and Peninsular Malaysia.", ms:"Latihan WAH di tapak dan perancangan penyelamatkan merentasi Johor dan Semenanjung Malaysia.", zh:"在柔佛和马来西亚半岛各地提供现场WAH培训和救援计划。", ta:"ஜொகூர் மற்றும் மலேசிய தீபகற்பம் முழுவதும் தள WAH பயிற்சி மற்றும் மீட்பு திட்டமிடல்." },
    wahCoverage1: { en:"Johor Bahru", ms:"Johor Bahru", zh:"新山", ta:"ஜொகூர் பாரு" },
    wahCoverage2: { en:"Pasir Gudang", ms:"Pasir Gudang", zh:"巴西古当", ta:"பாசிர் கூடாங்" },
    wahCoverage3: { en:"Senai", ms:"Senai", zh:"士乃", ta:"செனாய்" },
    wahCoverage4: { en:"Pengerang", ms:"Pengerang", zh:"边佳兰", ta:"பெங்கெராங்" },
    wahCoverage5: { en:"Iskandar Puteri", ms:"Iskandar Puteri", zh:"依斯干达公主城", ta:"இஸ்கந்தார் புத்தேரி" },
    wahCoverage6: { en:"Skudai", ms:"Skudai", zh:"士古来", ta:"சுகுதை" },
    wahCoverage7: { en:"Kulai", ms:"Kulai", zh:"古来", ta:"குலாய்" },
    wahCoverage8: { en:"Ulu Tiram", ms:"Ulu Tiram", zh:"乌鲁地南", ta:"உலு திராம்" },
    wahFaqTitle: { en:"Frequently Asked Questions", ms:"Soalan Lazim", zh:"常见问题", ta:"அடிக்கடி கேட்கப்படும் கேள்விகள்" },
    wahFaq1Q: { en:"How long does WAH training take?", ms:"Berapa lamakah latihan WAH?", zh:"WAH培训需要多长时间？", ta:"WAH பயிற்சி எவ்வளவு நேரம் எடுக்கும்?" },
    wahFaq1A: { en:"The standard programme is 2 days — Day 1 theory, Day 2 hands-on practical with harnesses, anchors, and MEWP operation. On-site delivery minimises downtime.", ms:"Program standard adalah 2 hari — Hari 1 teori, Hari 2 praktikal hands-on dengan tali badan, sauh, dan operasi MEWP. Penghantaran di tapak mengurangkan masa henti.", zh:"标准课程为2天——第一天理论，第二天使用安全带、锚点和MEWP操作进行动手实操。现场授课最大限度地减少停工时间。", ta:"நிலையான திட்டம் 2 நாட்கள் — நாள் 1 கோட்பாடு, நாள் 2 கவசங்கள், நங்கூர்கள், மற்றும் MEWP செயல்பாட்டுடன் கைகளில்-பயிற்சி நடைமுறை. தள வழங்கல் இயக்க நேரத்தை குறைக்கிறது." },
    wahFaq2Q: { en:"Do workers need a medical check before WAH training?", ms:"Adakah pekerja perlu pemeriksaan kesihatan sebelum latihan WAH?", zh:"工人在WAH培训前需要体检吗？", ta:"WAH பயிற்சிக்கு முன் தொழிலாளர்களுக்கு மருத்துவ பரிசோதனை தேவையா?" },
    wahFaq2A: { en:"While not mandatory for training, workers with heart conditions, epilepsy, or severe vertigo should not perform WAH duties. We recommend a basic fitness assessment.", ms:"Walaupun tidak wajib untuk latihan, pekerja dengan masalah jantung, epilepsi, atau vertigo teruk tidak harus menjalankan tugas WAH. Kami mengesyorkan penilaian kecergasan asas.", zh:"虽然培训不强制要求，但有心脏病、癫痫或严重眩晕的工人不应执行WAH任务。我们建议进行基本体能评估。", ta:"பயிற்சிக்கு கட்டாயமாக இல்லை, இதய நிலைகள், வலிப்பு, அல்லது கடுமையான மயக்கம் உள்ள தொழிலாளர்கள் WAH கடமைகளை செய்யக்கூடாது. அடிப்படை உடற்தகுதி மதிப்பீட்டை பரிந்துரைக்கிறோம்." },
    wahFaq3Q: { en:"Can you train on our active construction site?", ms:"Bolehkah anda melatih di tapak pembinaan aktif kami?", zh:"你们可以在我们的建筑工地培训吗？", ta:"உங்கள் செயலில் உள்ள கட்டுமான தளத்தில் பயிற்சி அளிக்க முடியுமா?" },
    wahFaq3A: { en:"Yes. We prefer on-site delivery using your actual structures, anchors, and equipment. This makes the training immediately applicable and more memorable.", ms:"Ya. Kami mengutamakan penghantaran di tapak menggunakan struktur, sauh, dan peralatan sebenar anda. Ini menjadikan latihan terus boleh digunapakai dan lebih mudah diingat.", zh:"可以。我们优先使用您实际的结构、锚点和设备进行现场授课。这使培训立即可应用且更令人难忘。", ta:"ஆம். உங்கள் உண்மையான அமைப்புகள், நங்கூர்கள், மற்றும் உபகரணங்களைப் பயன்படுத்தி தள வழங்கலை விரும்புகிறோம். இது பயிற்சியை உடனடியாக பயன்படுத்தக்கூடியதாகவும் மறக்கமுடியாததாகவும் ஆக்குகிறது." },
    wahFaq4Q: { en:"What happens if a worker fails the practical assessment?", ms:"Apakah yang berlaku jika pekerja gagal penilaian praktikal?", zh:"如果工人未能通过实操评估会怎样？", ta:"ஒரு தொழிலாளர் நடைமுறை மதிப்பீட்டில் தோல்வியடைந்தால் என்ன?" },
    wahFaq4A: { en:"We provide additional supervised practice and re-assessment at no extra charge. Workers who cannot safely perform the required tasks will not be certified.", ms:"Kami menyediakan latihan praktikal berpenyelia tambahan dan penilaian semula tanpa caj tambahan. Pekerja yang tidak boleh menjalankan tugas dengan selamat tidak akan disijilkan.", zh:"我们提供额外的监督练习和免费重新评估。无法安全执行所需任务的工人将不会获得认证。", ta:"கூடுதல் கண்காணிக்கப்பட்ட பயிற்சி மற்றும் கூடுதல் கட்டணம் இல்லாமல் மீண்டும் மதிப்பீடு வழங்குகிறோம். தேவையான பணிகளை பாதுகாப்பாக செய்ய முடியாத தொழிலாளர்கள் சான்றிதல் பெறமாட்டார்கள்." },
    wahFaq5Q: { en:"Is WAH training HRD Corp claimable?", ms:"Adakah latihan WAH boleh dituntut HRD Corp?", zh:"WAH培训可以申报HRD Corp吗？", ta:"WAH பயிற்சி HRD Corp உரிமை கோரக்கூடியதா?" },
    wahFaq5A: { en:"Yes. James Issachar (Trainer ID: 62976) is HRD Corp-certified. We assist with e-TRiS grant applications for batch training.", ms:"Ya. James Issachar (ID Jurulatih: 62976) adalah bertauliah HRD Corp. Kami membantu dengan permohonan geran e-TRiS untuk latihan pukal.", zh:"可以。James Issachar（培训师ID：62976）是HRD Corp认证的。我们协助批量培训的e-TRiS拨款申请。", ta:"ஆம். James Issachar (பயிற்றுவிப்பாளர் ID: 62976) HRD Corp-சான்றளிக்கப்பட்டவர். தொகுப்பு பயிற்சிக்கு e-TRiS மானிய விண்ணப்பங்களில் உதவுகிறோம்." },
    wahFaq6Q: { en:"What is suspension trauma?", ms:"Apakah itu trauma penggantungan?", zh:"什么是悬吊创伤？", ta:"தூக்கல் அதிர்ச்சி என்றால் என்ன?" },
    wahFaq6A: { en:"When a worker falls and is caught by their harness, blood pools in the legs. Without rescue within 15 minutes, the worker can lose consciousness or suffer kidney damage. Every WAH programme includes rescue planning.", ms:"Apabila pekerja jatuh dan ditangkap oleh tali badan mereka, darah terkumpul di kaki. Tanpa penyelamatkan dalam masa 15 minit, pekerja boleh pengsan atau mengalami kerosakan buah pinggang. Setiap program WAH merangkumi perancangan penyelamatkan.", zh:"当工人坠落并被安全带吊住时，血液会聚集在腿部。如果15分钟内没有获救，工人可能失去意识或遭受肾脏损伤。每个WAH课程都包括救援计划。", ta:"ஒரு தொழிலாளர் விழுந்து அவரது கவசத்தால் பிடிக்கப்படும்போது, இரத்தம் கால்களில் தேங்குகிறது. 15 நிமிடங்களுக்குள் மீட்பு இல்லாமல், தொழிலாளர் உணர்விழப்பை அடையலாம் அல்லது சிறுநீரக சேதத்தை அடையலாம். ஒவ்வொரு WAH திட்டமும் மீட்பு திட்டமிடலை உள்ளடக்கியுள்ளது." },
    wahCtaTitle: { en:"Prevent Falls Before They Happen", ms:"Cegah Jatuh Sebelum Ia Berlaku", zh:"在事故发生前预防坠落", ta:"நிகழ்வுகளுக்கு முன் விழுதல்களைத் தடுக்கவும்" },
    wahCtaSubtitle: { en:"Hands-on WAH competency training with real equipment, real anchors, and site-specific rescue plans across Johor and Malaysia.", ms:"Latihan kompetensi WAH hands-on dengan peralatan sebenar, sauh sebenar, dan rancangan penyelamatkan khusus tapak merentasi Johor dan Malaysia.", zh:"在柔佛和马来西亚各地，使用真实设备、真实锚点和针对工地的救援计划进行动手WAH胜任能力培训。", ta:"உண்மையான உபகரணங்கள், உண்மையான நங்கூர்கள், மற்றும் தள-குறிப்பிட்ட மீட்பு திட்டங்களுடன் கைகளில்-பயிற்சி WAH திறன் பயிற்சி ஜொகூர் மற்றும் மலேசியா முழுவதும்." },
    wahCtaBtnWa: { en:"WhatsApp for WAH Training", ms:"WhatsApp untuk Latihan WAH", zh:"WhatsApp咨询WAH培训", ta:"WAH பயிற்சிக்கு WhatsApp" },
    wahCtaBtnContact: { en:"Request Training Schedule", ms:"Mohon Jadual Latihan", zh:"索取培训时间表", ta:"Request Training Schedule" },  };

  function applyLanguage(lang) {
    if (!lang || typeof fullSiteDictionary !== 'object') return;
    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.getAttribute('data-translate');
      if (fullSiteDictionary[key] && fullSiteDictionary[key][lang]) {
        el.innerText = fullSiteDictionary[key][lang];
      }
    });
    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
      const key = el.getAttribute('data-translate-placeholder');
      if (fullSiteDictionary[key] && fullSiteDictionary[key][lang]) {
        el.placeholder = fullSiteDictionary[key][lang];
      }
    });
    localStorage.setItem('najaLang', lang);
    document.documentElement.lang = lang === 'ms' ? 'ms-MY' : lang === 'zh' ? 'zh-CN' : lang === 'ta' ? 'ta-MY' : 'en-MY';
  }

  function initLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const saved = urlLang || localStorage.getItem('najaLang') || 'en';
    const toggles = document.querySelectorAll('.lang-btn');
    if (!toggles.length) return;
    applyLanguage(saved);
    toggles.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === saved);
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        toggles.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyLanguage(lang);
        localStorage.setItem('najaLang', lang);
      });
    });
  }
  initLanguage();

});
