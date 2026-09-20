// ==========================================================================
// EXCELLENT SERVICES - COMPREHENSIVE CALIBRATION & EQUIPMENT SCOPE DATA
// ==========================================================================

const CALIBRATION_DATA = [
  {
    id: "utm",
    name: "Computerised Universal Testing Machines (UTM)",
    category: "Mechanical",
    scope: "Force, Tension & Compression",
    range: "0.5 kN to 2000 kN",
    uncertainty: "± 0.5% (Class 1 & Class 0.5)",
    standard: "ISO 7500-1 / IS 1828",
    method: "Calibrated using Master Proving Rings & High Precision Load Cells",
    image: "assets/images/equipment/351628842computerized-universal-testing-machine.jpg",
    tags: ["mechanical", "force", "tensile", "compression", "utm", "testing machine"],
    onsite: true,
    lab: true
  },
  {
    id: "rockwell",
    name: "Rockwell & Superficial Hardness Testers",
    category: "Mechanical",
    scope: "Hardness Verification",
    range: "HRA, HRB, HRC, HR15N, HR30N, HR45N",
    uncertainty: "± 0.5 HR",
    standard: "ASTM E18 / ISO 6508 / IS 1586",
    method: "Direct & Indirect verification using certified Standard Hardness Blocks & Indenters",
    image: "assets/images/equipment/1998576295rockwell-cum-rockwell-superficial-hardness-testers.jpg",
    tags: ["hardness", "rockwell", "superficial", "mechanical", "metal testing"],
    onsite: true,
    lab: true
  },
  {
    id: "brinell",
    name: "Brinell Hardness Testing Machines",
    category: "Mechanical",
    scope: "Hardness Verification",
    range: "HBW 2.5/62.5 to HBW 10/3000",
    uncertainty: "± 1.0 %",
    standard: "ASTM E10 / ISO 6506 / IS 1500",
    method: "Test force calibration & calibrated optical measuring microscope validation",
    image: "assets/images/equipment/brinell-hardness-testing-machines.jpg",
    tags: ["brinell", "hardness", "metallurgy", "foundry", "mechanical"],
    onsite: true,
    lab: true
  },
  {
    id: "optical-brinell",
    name: "Optical Brinell Hardness Testing Machine",
    category: "Mechanical",
    scope: "Optical Impression & Force",
    range: "Ball indenters 2.5mm, 5mm, 10mm (up to 3000 kgf)",
    uncertainty: "High Precision Optical",
    standard: "ISO 6506 / IS 1500",
    method: "Optical micrometer verification with stage glass micrometers & load verification",
    image: "assets/images/equipment/Optical-Brinell-Hardness-Testing-Machine.jpg",
    tags: ["optical", "brinell", "hardness", "microscope"],
    onsite: true,
    lab: true
  },
  {
    id: "vickers",
    name: "Vickers-cum-Brinell Hardness Testers",
    category: "Mechanical",
    scope: "Micro & Macro Hardness",
    range: "HV 0.1 to HV 100",
    uncertainty: "± 1.2 %",
    standard: "ASTM E92 / ISO 6507",
    method: "Optical diagonal measuring systems and precision calibrated dead weights",
    image: "assets/images/equipment/vickers-cum-brinell-hardness-testing.jpg",
    tags: ["vickers", "micro hardness", "mechanical"],
    onsite: true,
    lab: true
  },
  {
    id: "pressure-gauge",
    name: "Industrial & Test Pressure Gauges",
    category: "Pressure",
    scope: "Hydraulic & Pneumatic Pressure",
    range: "-1 bar (Vacuum) up to 1400 bar",
    uncertainty: "± 0.05% to ± 0.25% of Span",
    standard: "DKD-R 6-1 / IS 3624",
    method: "Direct comparison using Master Digital Calibrators & Dead Weight Testers",
    image: "assets/images/equipment/thumb-lg-wika-pressure-gauge.jpg",
    tags: ["pressure", "gauge", "vacuum", "bar", "psi", "hydraulic"],
    onsite: true,
    lab: true
  },
  {
    id: "load-cell",
    name: "Electronic Load Cells & Force Transducers",
    category: "Force",
    scope: "Tension & Compression Load",
    range: "1 kN to 2000 kN",
    uncertainty: "± 0.1% of Reading",
    standard: "ISO 376 / IS 4169",
    method: "Calibrated on Master Class-00 / Class-0.5 Testing Systems",
    image: "assets/images/equipment/load-cell-calibration.jpg",
    tags: ["load cell", "force", "transducer", "weighing", "tensile"],
    onsite: true,
    lab: true
  },
  {
    id: "proving-ring",
    name: "Master Proving Rings",
    category: "Force",
    scope: "Tension & Compression Verification",
    range: "2 kN to 1000 kN",
    uncertainty: "Class 1 & Class 0.5",
    standard: "IS 4169 / ISO 376",
    method: "Precision deflection calibration with high resolution dial / digital gauges",
    image: "assets/images/equipment/proving-ring-calibration.jpg",
    tags: ["proving ring", "force standard", "compression ring", "mechanical"],
    onsite: false,
    lab: true
  },
  {
    id: "thermal-sensor",
    name: "Thermocouples & RTD Temperature Sensors",
    category: "Thermal",
    scope: "Contact Temperature Measurement",
    range: "-80°C to +1200°C",
    uncertainty: "± 0.15°C to ± 1.5°C",
    standard: "EURAMET / ASTM E220",
    method: "Comparison with Standard Platinum Resistance Thermometer (SPRT) in fluidized oil baths & dry blocks",
    image: "assets/images/equipment/thermocouple-rtd-sensor_orig.jpg",
    tags: ["temperature", "thermal", "rtd", "pt100", "thermocouple", "heat"],
    onsite: true,
    lab: true
  },
  {
    id: "lux-meter",
    name: "Digital Lux & Illuminance Meters",
    category: "Electro-Optics",
    scope: "Light Intensity Measurement",
    range: "0.1 Lux to 50,000 Lux",
    uncertainty: "± 2.5%",
    standard: "CIE Publication 69",
    method: "Photometric bench comparison with Standard Tungsten Halogen Illuminance Lamp",
    image: "assets/images/equipment/lux-meter-calibration.jpg",
    tags: ["lux", "light", "illuminance", "photometry"],
    onsite: true,
    lab: true
  },
  {
    id: "barometer",
    name: "Aneroid & Digital Barometers",
    category: "Pressure",
    scope: "Atmospheric Pressure",
    range: "600 hPa to 1100 hPa",
    uncertainty: "± 0.2 hPa",
    standard: "WMO Standards",
    method: "Controlled environmental pressure chamber with digital quartz master barometer",
    image: "assets/images/equipment/barometer-calibration-new.jpg",
    tags: ["barometer", "atmospheric", "weather", "pressure"],
    onsite: true,
    lab: true
  },
  {
    id: "electrical",
    name: "Digital Multimeters, Clamp Meters & Electrical calibrators",
    category: "Electro-Technical",
    scope: "Voltage, Current, Resistance, Frequency",
    range: "AC/DC Voltage (up to 1000V), Current (up to 1000A), Resistance (up to 1 GΩ)",
    uncertainty: "Low ppm accuracy",
    standard: "EURAMET / IEC 61010",
    method: "Multi-product reference calibrator standards with direct digital synthesis",
    image: "assets/images/equipment/contracting-business_4198_testoelectrical-family.jpg",
    tags: ["electrical", "multimeter", "voltage", "current", "resistance", "megger"],
    onsite: true,
    lab: true
  }
];

const CLIENT_LOGOS = [
  { name: "Adani Group", logo: "assets/images/clients/714428087-adani-group-vector-logo.png", category: "Infrastructure & Energy" },
  { name: "Bosch India", logo: "assets/images/clients/1773689144-bosch-logo.png", category: "Automotive & Engineering" },
  { name: "Havells India", logo: "assets/images/clients/2042716592-havells-logo.wine.png", category: "Electrical & Appliances" },
  { name: "Taj Hotels & Resorts", logo: "assets/images/clients/656703426-1143px-taj_hotels_logo.svg.png", category: "Hospitality & Facilities" },
  { name: "Polycab Wires", logo: "assets/images/clients/406693168-polycab-wires-cable-500x500.png", category: "Cables & Fasteners" },
  { name: "BHEL", logo: "assets/images/clients/99286430-logo_bhel1.jpg", category: "Power & Heavy Engineering" },
  { name: "Shapoorji Pallonji", logo: "assets/images/clients/1007705921-1200px-shapoorji_pallonji_group_logo.svg.png", category: "Construction & Infra" },
  { name: "GMR Infrastructure", logo: "assets/images/clients/461778892-gmr-infrastructure-logo-(gmr-website)-1569946108.jpg", category: "Aviation & Highways" },
  { name: "BKT Tires", logo: "assets/images/clients/270429098-60-603574_bal-krishna-png-bkt-logo-png.png", category: "Tire & Automotive" },
  { name: "Heidelberg Cement", logo: "assets/images/clients/993512669-heidelberg-cement-india-infrastructure-development-cement-infra-news-india-infra-sector-india_14933.png", category: "Cement & Building Materials" },
  { name: "Fortis Hospitals", logo: "assets/images/clients/873911588-fortis-hospitals-logo-large-715x400.jpg", category: "Healthcare & Biomedical" },
  { name: "Wonder Cement", logo: "assets/images/clients/864501660-wonder_cement_logo.jpg", category: "Cement & Infrastructure" },
  { name: "Electrotherm", logo: "assets/images/clients/860727588-electrotherm.jpg", category: "Steel & Metallurgy" }
];

const TESTIMONIALS = [
  {
    quote: "Excellent Services has been our primary calibration partner for over 8 years. Their on-site engineers handle our UTM and heavy hardness testers with extreme precision, minimal factory downtime, and spotless NABL documentation.",
    author: "Quality Assurance Head",
    company: "Tier-1 Auto Components Manufacturer, Neemrana",
    rating: 5
  },
  {
    quote: "The low uncertainty of measurements and quick turnaround time for our thermal and pressure calibrations are exemplary. Their NABL certificate (CC-2597) is universally recognized by our international auditors.",
    author: "Chief Metrologist",
    company: "Industrial Cable & Engineering Corp, Jaipur",
    rating: 5
  },
  {
    quote: "From setting up our internal testing standards to handling annual on-site calibration across our plant, Brijesh Singh and the team deliver top-tier metrology expertise every single time.",
    author: "Plant Operations Director",
    company: "Leading Infrastructure & Materials Group",
    rating: 5
  }
];

// Attach to window for global access
if (typeof window !== "undefined") {
  window.CALIBRATION_DATA = CALIBRATION_DATA;
  window.CLIENT_LOGOS = CLIENT_LOGOS;
  window.TESTIMONIALS = TESTIMONIALS;
}
