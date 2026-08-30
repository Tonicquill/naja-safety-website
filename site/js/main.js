/* ============================================
   Naja Safety Sdn Bhd — Main JavaScript
   Taste-Skill Edition: scroll reveals, liquid nav,
   clean accordion, zero emoji policy.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

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

    // Homepage Hero
    heroTitle: {
      en: "20+ Years Keeping Malaysian Workplaces Safe",
      ms: "Pengalaman 20+ Tahun Memastikan Keselamatan Tempat Kerja Malaysia",
      zh: "20余年守护马来西亚职场安全",
      ta: "20+ ஆண்டுகள் மலேசியா பணியிடங்களை பாதுகாத்தல்"
    },
    heroSubtitle: {
      en: "We train and equip your internally appointed OSH Coordinator (OSH-C) to clear Malaysian regulatory benchmarks smoothly. Under Section 29A of the OSH (Amendment) Act 2022, any enterprise with 5 or more employees must appoint a certified coordinator. We prepare your designated employee to meet this mandate.",
      ms: "Kami melatih dan menyediakan Penyelaras OSH (OSH-C) yang dilantik secara dalaman untuk anda memenuhi piawaian kawal selia Malaysia dengan lancar. Di bawah Seksyen 29A Akta OSHA (Pindaan) 2022, mana-mana syarikat dengan 5 atau lebih pekerja mesti melantik penyelaras bertauliah. Kami menyediakan pekerja yang dilantik untuk memenuhi mandat ini.",
      zh: "我们培训并装备贵公司内部指定的职业安全卫生协调员（OSH-C），使其顺利通过马来西亚监管基准。根据2022年《职业安全卫生法（修正）法》第29A条，任何雇用5名或以上员工的企业必须任命持证协调员。我们为贵公司指定的员工做好合规准备。",
      ta: "உங்கள் உள்ளக நியமிக்கப்பட்ட OSH ஒருங்கிணைப்பாளரை (OSH-C) மலேசியா கட்டுப்பாட்டு தரங்களை சீராக கடக்க தயார்படுத்துகிறோம். 2022 OSH சட்டத்தின் பிரிவு 29A-ன் கீழ், 5 அல்லது அதற்கு மேற்பட்ட ஊழியர்களைக் கொண்ட நிறுவனம் ஒரு சான்றளிக்கப்பட்ட ஒருங்கிணைப்பாளரை நியமிக்க வேண்டும். நாங்கள் உங்கள் நியமிக்கப்பட்ட ஊழியரை இந்த கட்டளைக்கு தயார் செய்கிறோம்."
    },
    heroLead: {
      en: "Your trusted safety partner for training, consultancy & compliance. HRD Corp claimable courses. CIDB-certified instruction. Nationwide deployment from Johor Bahru.",
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
    clientStatReach:     { en:"Deployment Reach", ms:"Jangkauan Penempatan", zh:"部署范围", ta:"விநியோக எல்லை" },
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
    ctaBtnWhatsApp: { en:"WhatsApp Sujen", ms:"WhatsApp Sujen", zh:"WhatsApp Sujen", ta:"வாட்ஸ்அப் சுஜென்" },

    // Footer (shared)
    footerCol1Title: { en:"Naja Safety", ms:"Naja Safety", zh:"Naja Safety", ta:"Naja Safety" },
    footerCol1Desc: { en:"Your trusted safety partner for training, consultancy & compliance across Malaysia.", ms:"Rakan keselamatan dipercayai anda untuk latihan, perundingan & pematuhan di seluruh Malaysia.", zh:"您在马来西亚培训、咨询与合规方面值得信赖的安全合作伙伴。", ta:"மலேசியா முழுவதும் பயிற்சி, ஆலோசனை & இணக்கத்திற்கான உங்கள் நம்பகமான பாதுகாப்பு கூட்டாளி." },
    footerCol1Sister: { en:"Sister company: Naja Scaffolding Sdn Bhd", ms:"Syarikat bersekutu: Naja Scaffolding Sdn Bhd", zh:"姊妹公司：Naja Scaffolding Sdn Bhd", ta:"சகோதரி நிறுவனம்: Naja Scaffolding Sdn Bhd" },
    footerCol2Title: { en:"Quick Links", ms:"Pautan Pantas", zh:"快速链接", ta:"விரைவு இணைப்புகள்" },
    footerCol3Title: { en:"Services", ms:"Perkhidmatan", zh:"服务", ta:"சேவைகள்" },
    footerCol4Title: { en:"Contact", ms:"Hubungi", zh:"联系", ta:"தொடர்பு" },
    footerOffice: { en:"Office: 07-3612506", ms:"Pejabat: 07-3612506", zh:"办公室：07-3612506", ta:"அலுவலகம்: 07-3612506" },
    footerJames: { en:"James: 016-7160462", ms:"James: 016-7160462", zh:"James：016-7160462", ta:"James: 016-7160462" },
    footerWhatsApp: { en:"WhatsApp: 011-55890005", ms:"WhatsApp: 011-55890005", zh:"WhatsApp：011-55890005", ta:"வாட்ஸ்அப்: 011-55890005" },
    footerEmail: { en:"info@safetyconsultants.com.my", ms:"info@safetyconsultants.com.my", zh:"info@safetyconsultants.com.my", ta:"info@safetyconsultants.com.my" },
    footerAddr: { en:"No 09-03, Block C, Kompleks Austin Perdana, Taman Austin Perdana, 81100 Johor Bahru", ms:"No 09-03, Block C, Kompleks Austin Perdana, Taman Austin Perdana, 81100 Johor Bahru", zh:"No 09-03, Block C, Kompleks Austin Perdana, Taman Austin Perdana, 81100 Johor Bahru", ta:"No 09-03, Block C, Kompleks Austin Perdana, Taman Austin Perdana, 81100 Johor Bahru" },
    footerRights: { en:"All rights reserved.", ms:"Hak cipta terpelihara.", zh:"版权所有。", ta:"அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை." },

    // Course Landing Page Heroes
    oshcHeroTitle: { en:"OSH Coordinator (OSH-C) Training & Appointment", ms:"Latihan & Pelantikan Penyelaras OSH (OSH-C)", zh:"OSH协调员（OSH-C）培训与任命", ta:"OSH ஒருங்கிணைப்பாளர் (OSH-C) பயிற்சி & நியமனம்" },
    oshcHeroSubtitle: { en:"Statutory compliance under Section 29A of the OSH (Amendment) Act 2022. Protect your organisation, directors, and board from criminal liability.", ms:"Pematuhan undang-undang di bawah Seksyen 29A Akta OSHA (Pindaan) 2022. Lindungi organisasi, pengarah, dan lembaga anda dari liabiliti jenayah.", zh:"根据2022年《职业安全卫生法（修正）法》第29A条的法定合规。保护您的组织、董事及董事会免于刑事责任。", ta:"2022 OSH சட்டத்தின் பிரிவு 29A இன் கீழ் சட்டபூர்வ இணக்கம். உங்கள் நிறுவனத்தை, இயக்குநர்களை மற்றும் வாரியத்தை குற்றவியல் பொறுப்பிலிருந்து பாதுகாக்கவும்." },
    oshcHeroBtnBook: { en:"Book OSH-C Training", ms:"Tempah Latihan OSH-C", zh:"预约OSH-C培训", ta:"OSH-C பயிற்சியை முன்பதிவு செய்யுங்கள்" },
    oshcHeroBtnCall: { en:"Speak to James", ms:"Bercakap dengan James", zh:"与James交谈", ta:"James உடன் பேசுங்கள்" },

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
    ctaWhatsAppSujen: { en:"WhatsApp Sujen", ms:"WhatsApp Sujen", zh:"WhatsApp Sujen", ta:"வாட்ஸ்அப் சுஜென்" },

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
    contactFormPDPA: { en:"I consent to Naja Safety Sdn Bhd processing my personal data in accordance with the Malaysian Personal Data Protection Act 2010. I understand my data will be used solely to respond to this enquiry.", ms:"Saya bersetuju Naja Safety Sdn Bhd memproses data peribadi saya mengikut Akta Perlindungan Data Peribadi Malaysia 2010. Saya faham data saya akan digunakan semata-mata untuk menjawab pertanyaan ini.", zh:"本人同意Naja Safety Sdn Bhd根据2010年马来西亚个人数据保护法处理本人的个人数据。本人明白本人的数据将仅用于回复此咨询。", ta:"2010 மலேசியா தனிநபர் தரவு பாதுகாப்பு சட்டத்தின்படி Naja Safety Sdn Bhd எனது தனிப்பட்ட தரவை செயலாக்க நான் சம்மதிக்கிறேன். இந்த விசாரணைக்கு பதிலளிக்க மட்டுமே எனது தரவு பயன்படுத்தப்படும் என்பதை நான் புரிந்துகொள்கிறேன்." },
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
    btnWhatsAppSujen: { en:"WhatsApp Sujen", ms:"WhatsApp Sujen", zh:"WhatsApp Sujen", ta:"வாட்ஸ்அப் சுஜென்" },
    btnReqTraining: { en:"Request Training Schedule", ms:"Minta Jadual Latihan", zh:"请求培训时间表", ta:"பயிற்சி அட்டவணையை கோருங்கள்" },

    // Course landing CTAs
    oschCtaTitle: { en:"Secure Your OSH-C Appointment Before Enforcement Intensifies", ms:"Lindungi Pelantikan OSH-C Anda Sebelum Penguatkuasaan Diperketat", zh:"在执法加强之前确保您的OSH-C任命", ta:"சட்டமுறை கடுமையாவதற்கு முன் உங்கள் OSH-C நியமனத்தை பாதுகாக்கவும்" },
    oschCtaSubtitle: { en:"James Issachar and the Naja Safety team are ready to fast-track your OSH Coordinator compliance. On-site training available across Malaysia.", ms:"James Issachar dan pasukan Naja Safety sedia mempercepat pematuhan Penyelaras OSH anda. Latihan di tapak tersedia di seluruh Malaysia.", zh:"James Issachar和Naja Safety团队随时准备加速您的OSH协调员合规。马来西亚全国可提供现场培训。", ta:"James Issachar மற்றும் Naja Safety குழு உங்கள் OSH ஒருங்கிணைப்பாளர் இணக்கத்தை விரைவுபடுத்த தயாராக உள்ளனர். மலேசியா முழுவதும் தள பயிற்சி கிடைக்கிறது." },
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
    flowStep4Desc: { en:"e-TRiS documentation support", ms:"Sokongan dokumentasi e-TRiS", zh:"e-TRiS文件支持", ta:"e-TRiS ஆவண ஆதரவு" }
  };

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
    const saved = localStorage.getItem('najaLang') || 'en';
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
      });
    });
  }
  initLanguage();

});
