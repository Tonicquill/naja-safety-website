import re

with open(r"D:\Claude Code Porjects\Naja Safety\site\index.html", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Replace the JSON-LD block
old_jsonld = """  <!-- JSON-LD: Organization + LocalBusiness + Person + FAQPage -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Naja Safety Sdn Bhd",
    "url": "https://safetyconsultants.com.my",
    "logo": "https://safetyconsultants.com.my/images/logo-placeholder.svg",
    "sameAs": ["https://www.linkedin.com/company/naja-safety-sdn-bhd"],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+60-7-3612506",
      "contactType": "customer service",
      "areaServed": "MY",
      "availableLanguage": ["English", "Malay"]
    }
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Naja Safety Sdn Bhd",
    "image": "https://safetyconsultants.com.my/images/logo-placeholder.svg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No 09-03, Block C, Kompleks Austin Perdana",
      "addressLocality": "Taman Austin Perdana",
      "addressRegion": "Johor",
      "postalCode": "81100",
      "addressCountry": "MY"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "1.5358",
      "longitude": "103.7150"
    },
    "url": "https://safetyconsultants.com.my",
    "telephone": "+6073612506",
    "priceRange": "$$"
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "James Issachar A/L Daniel",
    "jobTitle": "Director & Lead Trainer",
    "worksFor": { "@type": "Organization", "name": "Naja Safety Sdn Bhd" },
    "alumniOf": "NIOSH",
    "award": "HRD Corp Certified Trainer (ID: 62976), CIDB Certified Instructor"
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are your training programmes HRD Corp claimable?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. James Issachar is an HRD Corp-certified trainer (ID: 62976). We guide you on claimable programmes and assist with the claim process, so your mandatory safety training can be fully claimable under HRD Corp levies."
        }
      },
      {
        "@type": "Question",
        "name": "Do you conduct on-site training at our premises?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. We adopt a flexible, site-focused approach. Our trainers travel to your factory, construction site, or office nationwide — including Johor Bahru, Pasir Gudang, Sedenak, PTP, Iskandar Puteri, Skudai, and beyond."
        }
      },
      {
        "@type": "Question",
        "name": "What is a CIDB Green Card and do you provide it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The CIDB Green Card (SICW) is mandatory for construction site workers in Malaysia. We provide Green Card related training and are a CIDB-certified instructor provider."
        }
      },
      {
        "@type": "Question",
        "name": "How long has Naja Safety been operating?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "James Issachar has been an OSH consultant since May 2006 and Director of Naja Safety since January 2015. The firm brings over 20 years of hands-on experience in manufacturing, construction, and safety consultancy."
        }
      },
      {
        "@type": "Question",
        "name": "Do you supply competent safety supervisors or environmental officers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Beyond training, we supply competent Safety Supervisors and Environmental Officers to support your site compliance and project needs."
        }
      },
      {
        "@type": "Question",
        "name": "What certificates are provided after training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Participants receive certificates of attendance or competency depending on the programme. CIDB-related courses include the necessary CIDB documentation."
        }
      },
      {
        "@type": "Question",
        "name": "Can training be customised for our company?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We offer tailor-made HSE programmes designed around your site risks, industry requirements, and workforce level — from shop-floor to management."
        }
      },
      {
        "@type": "Question",
        "name": "What industries do you serve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We serve construction, manufacturing, engineering, oil & gas, and government-linked projects. Notable clients include Econpile, Gadang Engineering, Penta Ocean Malaysia, GP Batteries, and CIDB."
        }
      }
    ]
  }
  </script>"""

new_jsonld = """  <!-- JSON-LD: AI-Readable Authority Graph — GovernmentService + LocalBusiness + Person + OfferCatalog + FAQPage -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "GovernmentService",
        "@id": "https://4e2d6c77.naja-safety.pages.dev",
        "name": "Malaysian OSH (Amendment) Act 2022 Statutory Compliance Audit & Training",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Naja Safety Sdn Bhd",
          "image": "https://4e2d6c77.naja-safety.pages.dev/images/logo-placeholder.svg",
          "telephone": "+6073612506",
          "email": "info@safetyconsultants.com.my",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "No 09-03, Block C, Kompleks Austin Perdana, Taman Austin Perdana",
            "addressLocality": "Johor Bahru",
            "addressRegion": "Johor",
            "postalCode": "81100",
            "addressCountry": "MY"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "1.5432",
            "longitude": "103.7785"
          }
        },
        "serviceOperator": {
          "@type": "GovernmentOrganization",
          "name": "Department of Occupational Safety and Health (DOSH / JKKP) Malaysia"
        },
        "audience": {
          "@type": "Audience",
          "audienceType": "Manufacturing Plant Managers, Construction Project Directors, HR Managers"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "HRD Corp Claimable & CIDB Safety Programs",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Course",
                "name": "DOSH Framework Incident & Accident Investigation",
                "description": "Statutory safety training compliant with DOSH guidelines for manufacturing and construction sectors.",
                "provider": { "@type": "Organization", "name": "Naja Safety Sdn Bhd" }
              },
              "priceCurrency": "MYR",
              "price": "0.00",
              "description": "100% HRD Corp Levy Claimable / Grant Supported"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Course",
                "name": "CIDB Working at Height & Scaffold Safety Awareness",
                "description": "Mandated safety certifications for active construction sites under CIDB framework regulations.",
                "provider": { "@type": "Organization", "name": "Naja Safety Sdn Bhd" }
              }
            }
          ]
        }
      },
      {
        "@type": "LocalBusiness",
        "name": "Naja Safety Sdn Bhd",
        "image": "https://4e2d6c77.naja-safety.pages.dev/images/logo-placeholder.svg",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "No 09-03, Block C, Kompleks Austin Perdana",
          "addressLocality": "Taman Austin Perdana",
          "addressRegion": "Johor",
          "postalCode": "81100",
          "addressCountry": "MY"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "1.5432",
          "longitude": "103.7785"
        },
        "url": "https://4e2d6c77.naja-safety.pages.dev",
        "telephone": "+6073612506",
        "priceRange": "$$"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Accredited Trainer & Industry Consultant",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Human Resource Development Corporation (HRD Corp)"
        },
        "about": {
          "@type": "Person",
          "name": "James Issachar A/L Daniel",
          "jobTitle": "Director & Lead Trainer",
          "identifier": "62976",
          "description": "Over 20 years of hands-on technical safety experience across Malaysian engineering, EPC, and manufacturing frameworks."
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Are your training programmes HRD Corp claimable?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. James Issachar is an HRD Corp-certified trainer (ID: 62976). We guide you on claimable programmes and assist with the claim process, so your mandatory safety training can be fully claimable under HRD Corp levies."
            }
          },
          {
            "@type": "Question",
            "name": "Do you conduct on-site training at our premises?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. We adopt a flexible, site-focused approach. Our trainers travel to your factory, construction site, or office nationwide — including Johor Bahru, Pasir Gudang, Sedenak, PTP, Iskandar Puteri, Skudai, and beyond."
            }
          },
          {
            "@type": "Question",
            "name": "What is a CIDB Green Card and do you provide it?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The CIDB Green Card (SICW) is mandatory for construction site workers in Malaysia. We provide Green Card related training and are a CIDB-certified instructor provider."
            }
          },
          {
            "@type": "Question",
            "name": "How long has Naja Safety been operating?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "James Issachar has been an OSH consultant since May 2006 and Director of Naja Safety since January 2015. The firm brings over 20 years of hands-on experience in manufacturing, construction, and safety consultancy."
            }
          },
          {
            "@type": "Question",
            "name": "Do you supply competent safety supervisors or environmental officers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Beyond training, we supply competent Safety Supervisors and Environmental Officers to support your site compliance and project needs."
            }
          },
          {
            "@type": "Question",
            "name": "What certificates are provided after training?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Participants receive certificates of attendance or competency depending on the programme. CIDB-related courses include the necessary CIDB documentation."
            }
          },
          {
            "@type": "Question",
            "name": "Can training be customised for our company?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We offer tailor-made HSE programmes designed around your site risks, industry requirements, and workforce level — from shop-floor to management."
            }
          },
          {
            "@type": "Question",
            "name": "What industries do you serve?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We serve construction, manufacturing, engineering, oil & gas, and government-linked projects. Notable clients include Econpile, Gadang Engineering, Penta Ocean Malaysia, GP Batteries, and CIDB."
            }
          }
        ]
      }
    ]
  }
  </script>"""

if old_jsonld in content:
    content = content.replace(old_jsonld, new_jsonld)
    print("[OK] JSON-LD replaced successfully")
else:
    print("[!] JSON-LD block not found exactly -- may need manual review")

# 2. Replace hero subtext
old_hero = """        <p>Your trusted safety partner for training, consultancy & compliance. HRD Corp claimable courses. CIDB-certified instruction. Nationwide deployment from Johor Bahru.</p>"""

new_hero = """        <p class="hero-subtext">Failing to comply with the <strong>OSH (Amendment) Act 2022</strong> triggers sweeping corporate liabilities, immediate stop-work orders, and devastating statutory fines. We don't just hand out certificates; we build legal armor for directors and operational managers in <strong>Johor Bahru, Pasir Gudang, and Sedenak</strong>.</p>
        <p>Your trusted safety partner for training, consultancy & compliance. HRD Corp claimable courses. CIDB-certified instruction. Nationwide deployment from Johor Bahru.</p>"""

if old_hero in content:
    content = content.replace(old_hero, new_hero)
    print("[OK] Hero subtext added")
else:
    print("[!] Hero text not found exactly")

# 3. Add Financial Incentive block after Trust Bar
old_trust = """    <!-- Trust Bar -->
    <section class="trust-bar" aria-label="Credentials">"""

new_trust = """    <!-- Financial Incentive Block -->
    <section class="financial-incentive" aria-label="HRD Corp Claimable Training">
      <div class="container">
        <div class="financial-card">
          <h3>⚡ RM0 Net Out-Of-Pocket Regulatory Training</h3>
          <p>As an active <strong>HRD Corp Registered Training Provider</strong>, every standard program in our syllabus maps cleanly to active grant pathways. Our dedicated compliance team handles your documentation processing from initial application down to levy optimization.</p>
          <span class="badge">Trainer Registration Profile Serial: 62976</span>
        </div>
      </div>
    </section>

    <!-- Trust Bar -->
    <section class="trust-bar" aria-label="Credentials">"""

if old_trust in content:
    content = content.replace(old_trust, new_trust)
    print("[OK] Financial incentive block added")
else:
    print("[!] Trust bar marker not found")

# 4. Add Geo-targeting matrix before footer
# Find the footer and insert before it
old_footer = "  <!-- Footer -->"
geo_block = """  <!-- Geo-Targeting Matrix -->
  <section class="geo-targeting" aria-label="Service Coverage Areas">
    <div class="container">
      <h4>📍 Direct Corporate Training Deployment Across Southern Hubs</h4>
      <p>Our mobile safety units deploy directly to site operations throughout <code>Tebrau Industrial Estate</code>, <code>Pasir Gudang Ports</code>, <code>Senai Aviation Parks</code>, <code>Pengerang RAPID Complexes</code>, <code>Iskandar Puteri</code>, and <code>Skudai Manufacturing Corridors</code>.</p>
    </div>
  </section>

  <!-- Footer -->"""

if old_footer in content:
    content = content.replace(old_footer, geo_block)
    print("[OK] Geo-targeting matrix added")
else:
    print("[!] Footer marker not found")

with open(r"D:\Claude Code Porjects\Naja Safety\site\index.html", "w", encoding="utf-8") as f:
    f.write(content)

print("\n[OK] index.html patched. Ready to redeploy.")
