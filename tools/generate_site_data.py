import os
import re
import json
from bs4 import BeautifulSoup

ASSETS_DIR = "d:/Exservices/assets"
MANIFEST_PATH = os.path.join(ASSETS_DIR, "asset_manifest.json")

with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
    manifest = json.load(f)

# Let's inspect what services and equipment we have
services_data = [
    {
        "id": "on-site-calibration",
        "title": "On-Site Calibration Services",
        "category": "Field Services",
        "badge": "Min. Downtime",
        "short_desc": "Certified precision calibration conducted directly at your manufacturing plant, testing facility, or operational site with portable high-accuracy master equipment.",
        "full_desc": "EXCELLENT SERVICES offers specialized on-site calibration to minimize equipment downtime and eliminate the risk of damage during transportation. Our skilled calibration engineers travel equipped with portable master calibrators traceable to national/international standards.",
        "parameters": ["Pressure & Vacuum", "Thermal & Temperature", "Universal Testing Machines (UTM)", "Hardness Testers", "Electrical Parameters"],
        "turnaround": "Within 24-48 Hours",
        "image": "assets/images/services/1815660572services-1.jpg",
        "features": ["Zero Transit Damage Risk", "Instant Spot Calibration Reports", "NABL ISO/IEC 17025 Traceability", "On-site Sensor Verification"]
    },
    {
        "id": "mechanical-calibration",
        "title": "Mechanical & Dimensional Calibration",
        "category": "Laboratory & On-Site",
        "badge": "High Accuracy",
        "short_desc": "NABL accredited calibration for force, pressure, torque, dimensions, hardness testing machines, and UTMs.",
        "full_desc": "Our mechanical calibration lab maintains strict environmental conditions (20°C ± 1°C, RH < 50%) to guarantee ultra-low uncertainty of measurement. We calibrate universal testing machines, proving rings, load cells, pressure gauges, and all hardness testers.",
        "parameters": ["Computerised UTMs (up to 2000 kN)", "Rockwell & Superficial Hardness Testers", "Brinell & Optical Brinell Testers", "Vickers Hardness Testers", "Pressure Gauges & Barometers", "Proving Rings & Load Cells"],
        "turnaround": "3-5 Working Days / On-Site",
        "image": "assets/images/equipment/351628842computerized-universal-testing-machine.jpg",
        "features": ["ISO/IEC 17025:2017 Accredited", "High Accuracy Master Proving Rings", "Digital Pressure Calibrators", "Traceable to NPL India"]
    },
    {
        "id": "electro-technical-calibration",
        "title": "Electro-Technical Calibration",
        "category": "Laboratory & Field",
        "badge": "Precision Multi-Range",
        "short_desc": "Rigorous calibration of AC/DC voltage, current, resistance, power, frequency, multi-meters, and electrical test benches.",
        "full_desc": "Comprehensive calibration of electrical and electronic test instruments with high-precision multi-product calibrators and reference standards, ensuring absolute accuracy and repeatability in electrical measurement systems.",
        "parameters": ["Digital Multimeters (up to 6.5 & 8.5 digits)", "Insulation Testers & Meggers", "Clamp Meters & Power Analyzers", "Oscilloscopes & Frequency Counters", "Current Shunts & Decade Resistance Boxes"],
        "turnaround": "2-4 Working Days",
        "image": "assets/images/equipment/contracting-business_4198_testoelectrical-family.jpg",
        "features": ["Ultra-Low Measurement Uncertainty", "Multi-Product Calibrator Standards", "Comprehensive Linearity & Range Testing", "NABL Calibrated Reports"]
    },
    {
        "id": "thermal-calibration",
        "title": "Thermal & Temperature Calibration",
        "category": "Laboratory & On-Site",
        "badge": "-80°C to 1200°C",
        "short_desc": "Calibration of temperature sensors, RTDs, thermocouples, dry block baths, environmental chambers, ovens, and furnaces.",
        "full_desc": "Thermal calibration facility covering a wide span from cryogenic temperatures up to extreme furnace heats. We provide temperature profile mapping for stability and uniformity of heat treatment furnaces and autoclaves.",
        "parameters": ["RTD (Pt-100, Pt-1000)", "Thermocouples (J, K, R, S, T, B)", "Temperature Indicators & Controllers", "Dry Block Calibrators & Oil Baths", "Ovens, Furnaces & Stability Chambers", "Infrared Non-Contact Pyrometers"],
        "turnaround": "2-4 Working Days",
        "image": "assets/images/equipment/thermocouple-rtd-sensor_orig.jpg",
        "features": ["Fluidized & Oil Bath Calibrators", "Multi-Zone Furnace Uniformity Mapping", "Master Standard Platinum Resistance Thermometers (SPRT)", "ISO 17025 Traceable"]
    },
    {
        "id": "consultancy",
        "title": "Laboratory & Quality Consultancy",
        "category": "Consulting Services",
        "badge": "ISO/IEC 17025",
        "short_desc": "Turnkey consultancy for setting up calibration laboratories, implementing ISO/IEC 17025:2017 management systems, and NABL accreditation audit preparation.",
        "full_desc": "We guide manufacturing and testing organizations to achieve ISO/IEC 17025 accreditation. From quality manual drafting, standard operating procedures (SOP), uncertainty budget formulation to inter-laboratory comparisons (ILC/PT).",
        "parameters": ["Quality System Documentation", "Measurement Uncertainty Budgets", "Equipment Selection & Lab Layout", "Pre-Assessment Internal Audits", "PT / ILC Participation Guidance"],
        "turnaround": "Custom Project Schedule",
        "image": "assets/images/services/936108052services-2.jpg",
        "features": ["Expert NABL Lead Auditors", "End-to-End Handholding until Accreditation", "Staff Competence Building", "Continuous Quality Improvement"]
    },
    {
        "id": "training-courses",
        "title": "Industrial Training & Competence Development",
        "category": "Professional Training",
        "badge": "Certified Courses",
        "short_desc": "Hands-on professional training courses on measurement uncertainty, ISO/IEC 17025 awareness, and instrument operation.",
        "full_desc": "Tailored training programs for quality engineers, calibration technicians, and laboratory managers. Practical workshops held at our facility or in-house at your company.",
        "parameters": ["ISO/IEC 17025:2017 Implementation & Internal Audit", "Evaluation of Measurement Uncertainty as per GUM", "Hands-on Calibration Practice for Pressure, Thermal & Force", "Equipment Maintenance & Calibration Interval Optimization"],
        "turnaround": "1 to 5-Day Intensive Programs",
        "image": "assets/images/services/training.jpg",
        "features": ["Interactive Practical Lab Exercises", "Course Completion Certification", "Detailed Reference Course Material", "Post-Training Technical Advisory"]
    }
]

equipment_data = [
    {
        "name": "Universal Testing Machine (UTM)",
        "sub": "Computerised & Electronic UTM",
        "range": "Up to 2000 kN (Tension & Compression)",
        "category": "Mechanical",
        "image": "assets/images/equipment/351628842computerized-universal-testing-machine.jpg",
        "method": "Calibrated with Master Class-1 Proving Rings & Precision Load Cells"
    },
    {
        "name": "Rockwell & Superficial Hardness Testers",
        "sub": "Digital & Analog Hardness Testers",
        "range": "HRA, HRB, HRC, HR15N, HR30N, HR45N",
        "category": "Mechanical",
        "image": "assets/images/equipment/1998576295rockwell-cum-rockwell-superficial-hardness-testers.jpg",
        "method": "Direct & Indirect verification using certified Standard Hardness Blocks & Indenters"
    },
    {
        "name": "Brinell & Optical Brinell Hardness Testers",
        "sub": "Optical Measuring Microscope Brinell",
        "range": "HBW 2.5/62.5 to HBW 10/3000",
        "category": "Mechanical",
        "image": "assets/images/equipment/Optical-Brinell-Hardness-Testing-Machine.jpg",
        "method": "Force verification and optical impression diameter measurement calibration"
    },
    {
        "name": "Vickers Hardness Testing Machines",
        "sub": "Micro & Macro Vickers",
        "range": "HV 0.1 to HV 100",
        "category": "Mechanical",
        "image": "assets/images/equipment/vickers-cum-brinell-hardness-testing.jpg",
        "method": "Precision optical diagonal measuring systems and load accuracy verification"
    },
    {
        "name": "Digital & Industrial Pressure Gauges",
        "sub": "Dial Gauges, Transducers & Transmitters",
        "range": "-1 bar to 1400 bar (Hydraulic & Pneumatic)",
        "category": "Pressure",
        "image": "assets/images/equipment/thumb-lg-wika-pressure-gauge.jpg",
        "method": "Comparison with Dead Weight Testers & Master Digital Pressure Indicators"
    },
    {
        "name": "Load Cells & Proving Rings",
        "sub": "Tension & Compression Reference Devices",
        "range": "1 kN to 2000 kN",
        "category": "Force",
        "image": "assets/images/equipment/load-cell-calibration.jpg",
        "method": "Secondary reference verification traceable to National Standards (NPL)"
    },
    {
        "name": "Barometers & Manometers",
        "sub": "Aneroid & Digital Barometers",
        "range": "600 hPa to 1100 hPa",
        "category": "Pressure",
        "image": "assets/images/equipment/barometer-calibration-new.jpg",
        "method": "High-accuracy digital reference barometer in controlled environmental chamber"
    },
    {
        "name": "Lux Meters & Illuminance Sensors",
        "sub": "Digital Light Intensity Meters",
        "range": "0.1 Lux to 50,000 Lux",
        "category": "Electro-Optics",
        "image": "assets/images/equipment/lux-meter-calibration.jpg",
        "method": "Calibrated against Standard Tungsten Halogen Illuminance Lamp"
    },
    {
        "name": "Thermocouples & RTD Sensors",
        "sub": "Industrial Temp Sensors & Gauges",
        "range": "-80°C to +1200°C",
        "category": "Thermal",
        "image": "assets/images/equipment/thermocouple-rtd-sensor_orig.jpg",
        "method": "Comparison with Standard Platinum Resistance Thermometer (SPRT) in high stability baths"
    }
]

# Write structured data
with open(os.path.join(ASSETS_DIR, "services_data.json"), "w", encoding="utf-8") as f:
    json.dump(services_data, f, indent=2)

with open(os.path.join(ASSETS_DIR, "equipment_data.json"), "w", encoding="utf-8") as f:
    json.dump(equipment_data, f, indent=2)

print("Created services_data.json and equipment_data.json successfully!")
