import { PageHero } from '../components/blocks'
import { SITE } from '../data/site'

function LegalLayout({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div>
      <PageHero crumb="Legal" badge={`Last updated: ${updated}`} title={title} />
      <div className="max-w-[900px] mx-auto px-5 md:px-8 py-16 legal-body">
        {children}
      </div>
      <style>{`
        .legal-body h2 { font-family: 'Roboto Condensed', sans-serif; font-weight: 800; text-transform: uppercase; font-size: 1.4rem; margin: 2.5rem 0 1rem; color: var(--hazard); }
        .legal-body p, .legal-body li { color: var(--paper-dim); line-height: 1.75; font-size: 0.925rem; margin-bottom: 0.75rem; }
        .legal-body ul { list-style: none; padding-left: 0; }
        .legal-body li::before { content: '■ '; color: var(--hazard); font-family: 'IBM Plex Mono', monospace; font-size: 0.7rem; margin-right: 0.5rem; }
        .legal-body strong { color: var(--paper); }
        .legal-body a { color: var(--hazard); }
        .legal-body table { width: 100%; border: 1px solid var(--line); font-size: 0.875rem; margin: 1rem 0; }
        .legal-body th { font-family: 'IBM Plex Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; text-align: left; padding: 0.6rem 1rem; border-bottom: 1px solid var(--line); color: var(--paper-faint); }
        .legal-body td { padding: 0.6rem 1rem; border-bottom: 1px solid var(--line); color: var(--paper-dim); }
      `}</style>
    </div>
  )
}

export function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" updated="30 August 2026">
      <h2>1. Introduction</h2>
      <p>Naja Safety ("we", "us", or "our") respects your privacy and is committed to protecting your personal data in accordance with the Malaysian Personal Data Protection Act 2010 ("PDPA"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
      <h2>2. Information We Collect</h2>
      <p>We may collect the following categories of personal data:</p>
      <ul>
        <li><strong>Contact Information:</strong> Name, email address, phone number, and company name.</li>
        <li><strong>Enquiry Details:</strong> Service interests, training requirements, and site information.</li>
        <li><strong>Technical Data:</strong> IP address, browser type, and device information via standard server logs.</li>
      </ul>
      <h2>3. How We Use Your Information</h2>
      <p>Your personal data is used solely for the following purposes:</p>
      <ul>
        <li>Responding to enquiries and providing quotations.</li>
        <li>Scheduling and delivering training programmes.</li>
        <li>Processing HRD Corp grant applications and claims.</li>
        <li>Maintaining statutory compliance records as required by DOSH and CIDB.</li>
        <li>Sending service updates and compliance reminders (with your consent).</li>
      </ul>
      <h2>4. Data Sharing and Disclosure</h2>
      <p>We do not sell or rent your personal data. We may share your information with:</p>
      <ul>
        <li><strong>Regulatory Bodies:</strong> DOSH, CIDB, and HRD Corp as required for certification and compliance.</li>
        <li><strong>Service Providers:</strong> Payment processors and IT support vendors bound by confidentiality obligations.</li>
      </ul>
      <h2>5. Data Security</h2>
      <p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction.</p>
      <h2>6. Your Rights</h2>
      <p>Under the PDPA, you have the right to:</p>
      <ul>
        <li>Access and correct your personal data.</li>
        <li>Withdraw consent for processing (subject to legal obligations).</li>
        <li>Request deletion of your data where retention is no longer necessary.</li>
      </ul>
      <p>To exercise these rights, contact us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      <h2>7. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us:</p>
      <p>Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />WhatsApp: {SITE.phone}<br />Address: {SITE.address}</p>
    </LegalLayout>
  )
}

export function Terms() {
  return (
    <LegalLayout title="Terms of Service" updated="30 August 2026">
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing or using the Naja Safety website (safetyconsultants.com.my) and our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.</p>
      <h2>2. Services Description</h2>
      <p>Naja Safety provides occupational safety and health (OSH) training, CIDB-certified construction safety programmes, safety consultancy, HRD Corp claim support, and environmental compliance services. Service descriptions on this website are for informational purposes and do not constitute a binding offer.</p>
      <h2>3. Quotations and Bookings</h2>
      <p>All training quotations are valid for 30 days from the date of issue. Confirmed bookings require a signed engagement letter and deposit as specified in the quotation. Cancellation policies vary by programme and will be communicated at the time of booking.</p>
      <h2>4. HRD Corp Claims</h2>
      <p>While we assist clients in navigating HRD Corp e-TRiS grant applications, claim approval is subject to HRD Corp's discretion and eligibility criteria. Naja Safety does not guarantee grant approval or reimbursement timelines.</p>
      <h2>5. Intellectual Property</h2>
      <p>All content on this website — including text, graphics, logos, and training materials — is the property of Naja Safety or its licensors and is protected by Malaysian and international copyright laws. You may not reproduce, distribute, or create derivative works without our express written consent.</p>
      <h2>6. Limitation of Liability</h2>
      <p>To the maximum extent permitted by law, Naja Safety shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our website or services.</p>
      <h2>7. Governing Law</h2>
      <p>These Terms shall be governed by and construed in accordance with the laws of Malaysia. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Johor Bahru, Malaysia.</p>
      <h2>8. Changes to Terms</h2>
      <p>We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated effective date. Your continued use of the website after any changes indicates your acceptance of the revised Terms.</p>
      <h2>9. Contact</h2>
      <p>For questions about these Terms, please contact us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or via WhatsApp at {SITE.phone}.</p>
    </LegalLayout>
  )
}

export function Cookies() {
  return (
    <LegalLayout title="Cookie Policy" updated="30 August 2026">
      <h2>1. What Are Cookies</h2>
      <p>Cookies are small text files that websites place on your device to store information about your preferences or past actions. They help us provide a better browsing experience.</p>
      <h2>2. How We Use Cookies</h2>
      <p>Naja Safety uses cookies for the following purposes:</p>
      <ul>
        <li><strong>Essential Cookies:</strong> Required for the website to function properly, including navigation and security features.</li>
        <li><strong>Preference Cookies:</strong> Remember your language selection and other display preferences.</li>
        <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website so we can improve it. We do not use third-party advertising cookies.</li>
      </ul>
      <h2>3. Cookies We Use</h2>
      <table>
        <thead><tr><th>Name</th><th>Purpose</th><th>Duration</th></tr></thead>
        <tbody>
          <tr><td>najaLang</td><td>Stores your selected language preference.</td><td>Persistent</td></tr>
          <tr><td>_cfduid</td><td>Cloudflare security and performance cookie.</td><td>30 days</td></tr>
        </tbody>
      </table>
      <h2>4. Managing Cookies</h2>
      <p>You can control and/or delete cookies as you wish. Most browsers allow you to refuse cookies or alert you when cookies are being sent. Please note that disabling essential cookies may affect the functionality of this website.</p>
      <h2>5. Changes to This Policy</h2>
      <p>We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated effective date.</p>
      <h2>6. Contact</h2>
      <p>If you have any questions about our use of cookies, please contact us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
    </LegalLayout>
  )
}
