# Excellent Instrument Calibration Private Limited

> **NABL ISO/IEC 17025:2017 Accredited Laboratory**  
> Certificate No: **CC-2597 (Cycle 2025 – 2029)**  
> Official Web Portal: [https://www.excellentservices.co.in/](https://www.excellentservices.co.in/)

Modern, high-performance, clinical white-themed web portal for **Excellent Instrument Calibration Private Limited** (Jaipur, Rajasthan). Built with pure HTML5, Tailwind CSS, and Vanilla JS for instant loading, zero build-step overhead, and 100% static hosting compatibility.

---

## 🔬 Overview & Laboratory Capabilities

Established in 2008 in Jaipur, **Excellent Services** provides precision calibration services across India, serving 500+ enterprises including Adani, Bosch, Havells, Taj, Polycab, BHEL, Shapoorji Pallonji, and GMR.

- **Mechanical Calibration**: Universal Testing Machines (UTM up to 2000 kN), Rockwell/Brinell/Vickers hardness testers, torque wrenches, micrometers, calipers, height gauges, dial indicators.
- **Thermal Calibration**: Ovens, furnaces, incubators, baths, RTDs, thermocouples (-40°C to 1200°C).
- **Electro-Technical Calibration**: Digital multimeters, clamp meters, insulation testers, high-voltage test sets, oscilloscopes.
- **Pressure Calibration**: Hydraulic & pneumatic pressure gauges, transmitters, dead weight testers (up to 700 bar).
- **On-Site Plant Field Services**: Rapid turnaround calibration at manufacturing plants across Rajasthan, Delhi-NCR, Gujarat, Haryana, and pan-India.
- **ISO/IEC 17025 Consultancy & Training**: Laboratory setup, uncertainty estimation, audit readiness.

---

## ✨ Features & Architecture

- **Clinical White Laboratory Theme**: Engineered with `#F8FAFC` slate-50 background, `#FFFFFF` precision cards, `#0F172A` deep typography, royal blue accents, and amber NABL badges.
- **Zero Server Dependencies**: Pure static HTML5/Tailwind/Vanilla JS. Deployable directly to cPanel `public_html`, GitHub Pages, Vercel, or Netlify with zero build step.
- **Live Metrological Scope Search**: Interactive client-side filtering by discipline (Mechanical, Thermal, Electro-technical, Pressure), range, and CMC uncertainty values.
- **Instant WhatsApp Lead Generation**: Pre-formatted WhatsApp quote request builder connecting directly to metrology engineers at `+91-9314501796`.
- **Pre-Rendered Enterprise Marquee**: High-contrast, responsive client marquee showcasing leading manufacturing partners.
- **Full Media Integration**: Over 110 original crawled media assets and 9 official NABL accreditation documents.
- **Full Mobile Responsiveness**: Slide-out navigation drawer and touch-optimized layout.

---

## 📁 Repository Structure

```
├── index.html               # Corporate homepage & interactive scope search
├── about.html               # Heritage, leadership, & environmental standards
├── services.html            # On-site calibration & laboratory disciplines
├── calibration-scope.html   # Searchable metrology parameter scope
├── accreditation.html       # NABL CC-2597 certificates & traceability chart
├── clientele.html           # 500+ client portfolio & industrial logos
├── gallery.html             # Laboratory facility & on-site testing gallery
├── contact.html             # Lab headquarters info & WhatsApp quotation builder
├── assets/
│   ├── css/
│   │   └── style.css        # Precision grid, animations, & custom styling
│   ├── js/
│   │   ├── main.js          # Core UI, mobile drawer, modals, search
│   │   └── scope-data.js    # Client logos & calibration database
│   ├── docs/                # NABL certificates, GST, & catalog PDFs
│   └── images/              # Equipment, certificates, logos, & banners
└── tools/                   # Maintenance, verification, & build utilities
```

---

## 🚀 Quick Start & Local Preview

To run the portal locally without installing Node.js or any dependencies:

```bash
# Python 3 built-in HTTP server
python -m http.server 8080

# Open in browser:
# http://localhost:8080/
```

---

## 🌐 Deployment

### cPanel / Apache / Nginx
Simply copy all files into your `public_html` directory:
```bash
# Verify all asset paths
python tools/verify_site.py

# Build deployable zip
python tools/package_deploy.py
```

---

## 📞 Laboratory Contact & Headquarters

- **Headquarters**: B-34-35, G-7, B-54, Ganpati Paradise, Central Spine, Vidhyadhar Nagar, Jaipur, Rajasthan - 302039 (India)
- **Direct Phone / WhatsApp**: [+91-9314501796](tel:+919314501796)
- **Email**: [brijesh_singh16@yahoo.com](mailto:brijesh_singh16@yahoo.com) / [brijesh@excellentservices.co.in](mailto:brijesh@excellentservices.co.in)
- **Website**: [https://www.excellentservices.co.in/](https://www.excellentservices.co.in/)

---

© 2008 – 2026 Excellent Instrument Calibration Private Limited. All rights reserved.
