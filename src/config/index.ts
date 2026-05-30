// ===== EDIT DI SINI =====
// ============================================================================
// CONFIGURATION FILE
// ============================================================================
// Edit all data below to customize the portfolio. All content throughout the
// site is rendered from this config object.
// ============================================================================

export interface SocialLinks {
  email: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  instagram: string;
}

export interface StatItem {
  number: string;
  labelEN: string;
  labelID: string;
}

export interface TechnicalSkill {
  name: string;
  nameID?: string;
  percent: number;
}

export interface SoftSkill {
  name: string;
  nameID: string;
}

export interface SkillsData {
  technical: TechnicalSkill[];
  tools: TechnicalSkill[];
  soft: SoftSkill[];
}

export interface ExperienceItem {
  year: string;
  yearID: string;
  company: string;
  companyID: string;
  position: string;
  positionID: string;
  descEN: string;
  descID: string;
}

export interface EducationItem {
  year: string;
  institution: string;
  degree: string;
  degreeID: string;
  honor: string;
  descEN: string;
  descID: string;
}

export interface CertificationItem {
  year: string;
  name: string;
  nameID: string;
}

export interface PublicationItem {
  year: string;
  titleEN: string;
  titleID: string;
  journal: string;
  descEN: string;
  descID: string;
  link: string;
}

export interface ProjectItem {
  title: string;
  titleID: string;
  description: string;
  descriptionID: string;
  image: string;
  category: string;
  tags: string[];
  demo: string;
  detail: string;
}

export interface ProjectCategory {
  key: string;
  labelEN: string;
  labelID: string;
}

export interface ServiceItem {
  icon: string;
  titleEN: string;
  titleID: string;
  descEN: string;
  descID: string;
}

export interface TestimonialItem {
  name: string;
  position: string;
  positionID: string;
  company: string;
  photo: string;
  rating: number;
  quoteEN: string;
  quoteID: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  dark: string;
  light: string;
}

export interface Config {
  // ===== IDENTITAS =====
  name: string;
  nameShort: string;
  title: string[];
  taglineEN: string;
  taglineID: string;
  bioEN: string[];
  bioID: string[];
  email: string;
  phone: string;
  location: string;
  degree: string;
  freelanceStatus: string;
  freelanceStatusID: string;
  heroPhoto: string;
  aboutPhoto: string;
  cvUrl: string;

  // ===== SOSIAL MEDIA =====
  social: SocialLinks;

  // ===== STATISTIK HERO =====
  stats: StatItem[];

  // ===== SKILLS =====
  skills: SkillsData;

  // ===== PENGALAMAN KERJA =====
  experience: ExperienceItem[];

  // ===== PENDIDIKAN =====
  education: EducationItem[];

  // ===== SERTIFIKASI =====
  certifications: CertificationItem[];

  // ===== PUBLIKASI =====
  publications: PublicationItem[];

  // ===== PORTOFOLIO =====
  projects: ProjectItem[];
  projectCategories: ProjectCategory[];

  // ===== LAYANAN =====
  services: ServiceItem[];

  // ===== TESTIMONI =====
  testimonials: TestimonialItem[];


  // ===== WARNA TEMA =====
  colors: ThemeColors;
}

export const CONFIG: Config = {
  // ===== IDENTITAS =====
  name: "Galih Wahyu Setya Anggara, S.Hut.",
  nameShort: "Galih W. S. Anggara",

  // Typewriter titles (bilingual, cycling)
  title: [
    "Geospatial Analyst | Mangrove & Ecological Restoration Specialist",
    "Geospatial Analyst | Mangrove & Ecological Restoration Specialist"
  ],

  taglineEN: "Leveraging spatial data and ecological expertise to drive sustainable landscape restoration across Indonesia.",
  taglineID: "Menggunakan data spasial dan keahlian ekologi untuk mendorong restorasi lanskap berkelanjutan di Indonesia.",

  bioEN: [
    "I am a Forestry graduate from Gadjah Mada University with a deep focus on conservation, GIS, and ecosystem rehabilitation. I have led and supervised large-scale mangrove restoration projects across North Sumatra and Riau under the Peatland and Mangrove Restoration Agency (BRGM).",
    "Currently serving as GIS Assistant at PPIU North Sumatra under the M4CR Project (August 2025-present), I specialize in spatial analysis, drone mapping, ecosystem monitoring, and community-based rehabilitation planning. My work bridges scientific rigor with on-the-ground community engagement.",
    "I am passionate about evidence-based projects that advance ecological sustainability and social welfare - believing that spatial data and ecological approaches can transform the future of Indonesia's landscapes."
  ],
  bioID: [
    "Saya adalah lulusan Kehutanan dari Universitas Gadjah Mada dengan fokus pada konservasi, GIS, dan rehabilitasi ekosistem. Saya telah memimpin dan mengawasi proyek restorasi mangrove skala besar di Sumatera Utara dan Riau di bawah Badan Restorasi Gambut dan Mangrove (BRGM).",
    "Saat ini bertugas sebagai GIS Assistant di PPIU Sumatera Utara dalam Project M4CR (Agustus 2025-sekarang), saya mengkhususkan diri pada analisis spasial, pemetaan drone, pemantauan ekosistem, dan perencanaan rehabilitasi berbasis masyarakat.",
    "Saya memiliki passion terhadap proyek berbasis bukti yang memajukan keberlanjutan ekologi dan kesejahteraan sosial - percaya bahwa data spasial dan pendekatan ekologi dapat mengubah masa depan lanskap Indonesia."
  ],

  email: "galihanggara0@gmail.com",
  phone: "+62 853-4520-9335",
  location: "Medan, Sumatera Utara, Indonesia",
  degree: "S.Hut. (Sarjana Kehutanan / Bachelor of Forestry)",
  freelanceStatus: "Open to Collaboration",
  freelanceStatusID: "Terbuka untuk Kolaborasi",

  // Foto profil - GANTI URL dengan foto asli kamu
  heroPhoto: "/images/hero-photo.jpg",
  aboutPhoto: "/images/about-photo.jpg",

  cvUrl: "cv_Baru_2025.pdf",

  // ===== SOSIAL MEDIA =====
  social: {
    email: "mailto:galihanggara0@gmail.com",
    whatsapp: "https://wa.me/6285345209335",
    linkedin: "https://linkedin.com/in/galih-anggara",
    github: "https://github.com/galih-anggara",
    instagram: "https://instagram.com/galih_anggara"
  },

  // ===== STATISTIK HERO =====
  stats: [
    { number: "3+", labelEN: "Years Experience", labelID: "Tahun Pengalaman" },
    { number: "5+", labelEN: "Major Projects", labelID: "Proyek Besar" },
    { number: "2", labelEN: "Organizations", labelID: "Instansi" },
    { number: "1", labelEN: "Publication", labelID: "Publikasi Ilmiah" }
  ],

  // ===== SKILLS =====
  skills: {
    technical: [
      { name: "Supervised & Unsupervised Classification", percent: 0 },
      { name: "Time-Series Vegetation Indexing", percent: 0 },
      { name: "UAV Photogrammetry & Orthomosaic", percent: 0 },
      { name: "Geodatabase Architecture", percent: 0 },
      { name: "Spatial Clustering", percent: 0 },
      { name: "Drone SOP Implementation", percent: 0 }
    ],
    tools: [],
    soft: [
      { name: "Project Management", nameID: "Manajemen Proyek" },
      { name: "Community Engagement", nameID: "Pemberdayaan Masyarakat" },
      { name: "Stakeholder Collaboration", nameID: "Kolaborasi Pemangku Kepentingan" },
      { name: "Leadership", nameID: "Kepemimpinan" },
      { name: "Public Communication", nameID: "Komunikasi Publik" },
      { name: "Field Research", nameID: "Riset Lapangan" },
      { name: "Bilingual (EN & ID)", nameID: "Bilingual (Inggris & Indonesia)" }
    ]
  },

  // ===== PENGALAMAN KERJA =====
  experience: [
    {
      year: "Aug 2025 - Present",
      yearID: "Agustus 2025 - Sekarang",
      company: "PPIU North Sumatra - M4CR Project",
      companyID: "PPIU Sumatera Utara - Project M4CR",
      position: "GIS Assistant",
      positionID: "Asisten GIS",
      descEN: "Supporting spatial data management and GIS analysis for the M4CR (Mangroves for Coastal Resilience) project in North Sumatra. Responsibilities include producing spatial maps, conducting land cover analysis, and supporting field monitoring activities.",
      descID: "Mendukung manajemen data spasial dan analisis GIS untuk proyek M4CR (Mangroves for Coastal Resilience) di Sumatera Utara. Tanggung jawab mencakup produksi peta spasial, analisis tutupan lahan, dan dukungan kegiatan monitoring lapangan."
    },
    {
      year: "2022 - Dec 2024",
      yearID: "2022 - Desember 2024",
      company: "Peatland and Mangrove Restoration Agency (BRGM)",
      companyID: "Badan Restorasi Gambut dan Mangrove (BRGM)",
      position: "Technical Staff / Field Supervisor - Mangrove Rehabilitation",
      positionID: "Staf Teknis / Supervisor Lapangan Rehabilitasi Mangrove",
      descEN: "Led mangrove rehabilitation projects across North Sumatra and Riau. Conducted ecosystem analysis using drone mapping and GIS, designed conservation strategies, facilitated community engagement, and maintained stakeholder partnerships with local governments, NGOs, and international organizations.",
      descID: "Memimpin proyek rehabilitasi mangrove di Sumatera Utara dan Riau. Melakukan analisis ekosistem menggunakan pemetaan drone dan GIS, merancang strategi konservasi, memfasilitasi keterlibatan masyarakat, serta menjaga kemitraan dengan pemerintah daerah, LSM, dan organisasi internasional."
    }
  ],

  // ===== PENDIDIKAN =====
  education: [
    {
      year: "2016 - 2022",
      institution: "Universitas Gadjah Mada (Gadjah Mada University)",
      degree: "S.Hut. - Faculty of Forestry",
      degreeID: "S.Hut. - Fakultas Kehutanan",
      honor: "",
      descEN: "Specialized in forest resource management, biodiversity conservation, silviculture, ecosystem rehabilitation and restoration, and forestry policy & planning. Thesis: Feeding Tree Palatability of Helmeted Hornbill (Rhinoplax vigil).",
      descID: "Spesialisasi dalam pengelolaan sumber daya hutan, konservasi keanekaragaman hayati, silvikultur, rehabilitasi dan restorasi ekosistem, serta kebijakan dan perencanaan kehutanan. Skripsi: Palatabilitas Pohon Pakan Rangkong Gading (Rhinoplax vigil)."
    }
  ],

  // ===== SERTIFIKASI =====
  certifications: [
    { year: "2022", name: "Basic Remote Pilot License (RPAS)", nameID: "Kursus Lisensi Pilot Jarak Jauh Dasar" },
    { year: "2020", name: "Drone Mapping Training", nameID: "Pelatihan Pemetaan dengan Drone" },
    { year: "2019", name: "Geographic Information System (GIS) Training", nameID: "Pelatihan Sistem Informasi Geografis (GIS)" }
  ],

  // ===== PUBLIKASI =====
  publications: [
    {
      year: "2024",
      titleEN: "Spatial Analysis of Land Cover Changes in Mangrove and Peatland Forests in North Sumatra, Indonesia",
      titleID: "Analisis Spasial Perubahan Tutupan Lahan di Hutan Mangrove dan Gambut di Sumatera Utara, Indonesia",
      journal: "IOP Conference Series: Earth and Environmental Science",
      descEN: "Focuses on spatial analysis of land cover changes in mangrove and peatland ecosystems in North Sumatra, highlighting significant impacts of deforestation and land-use changes, and offering conservation and restoration insights.",
      descID: "Berfokus pada analisis spasial perubahan tutupan lahan di ekosistem mangrove dan gambut di Sumatera Utara, menyoroti dampak signifikan deforestasi dan perubahan penggunaan lahan, serta memberikan wawasan untuk strategi konservasi dan restorasi.",
      link: "/Suryanta_2024_IOP_Conf._Ser.__Earth_Environ._Sci._1352_012071.pdf" // UPDATE: ganti dengan URL jurnal asli
    }
  ],

  // ===== PORTOFOLIO =====
  projects: [
    {
      title: "Mangrove Rehabilitation - North Sumatra & Riau",
      titleID: "Rehabilitasi Mangrove - Sumatera Utara & Riau",
      description: "Large-scale mangrove restoration project covering coastal areas in North Sumatra and Riau, involving community-based planting and ecosystem monitoring.",
      descriptionID: "Proyek restorasi mangrove skala besar mencakup kawasan pesisir Sumatera Utara dan Riau, melibatkan penanaman berbasis masyarakat dan pemantauan ekosistem.",
      image: "/images/project-1.jpg",
      category: "rehabilitation",
      tags: ["Mangrove", "GIS", "Drone Mapping", "Community Engagement"],
      demo: "#",
      detail: "Managed and supervised mangrove rehabilitation across multiple sites. Used drone mapping for pre- and post-planting monitoring. Coordinated with local communities, NGOs, and government agencies."
    },
    {
      title: "Mangrove Carbon Stock Dashboard (GEE)",
      titleID: "Mangrove Carbon Stock Dashboard (GEE)",
      description: "Engineered an interactive, cloud-based Google Earth Engine (GEE) application to quantify mangrove carbon stock and CO2 equivalent. Processed Sentinel-2 multispectral imagery and GMW baselines to drive evidence-based restoration interventions.",
      descriptionID: "Engineered an interactive, cloud-based Google Earth Engine (GEE) application to quantify mangrove carbon stock and CO2 equivalent. Processed Sentinel-2 multispectral imagery and GMW baselines to drive evidence-based restoration interventions.",
      image: "/images/gee-carbon-dashboard.jpg",
      category: "gis",
      tags: ["Google Earth Engine", "Remote Sensing", "Carbon Stock", "JavaScript API"],
      demo: "#",
      detail: "Engineered an interactive, cloud-based Google Earth Engine (GEE) application to quantify mangrove carbon stock and CO2 equivalent. Processed Sentinel-2 multispectral imagery and GMW baselines to drive evidence-based restoration interventions."
    },
    {
      title: "Drone Ecosystem Mapping",
      titleID: "Pemetaan Ekosistem dengan Drone",
      description: "Authored and implemented Standard Operating Procedures (SOP) for UAV photogrammetry, standardizing aerial data acquisition for field teams and external vendors.",
      descriptionID: "Authored and implemented Standard Operating Procedures (SOP) for UAV photogrammetry, standardizing aerial data acquisition for field teams and external vendors.",
      image: "/images/project-3.jpg",
      category: "mapping",
      tags: ["UAV", "Drone", "Ecosystem Mapping", "Monitoring"],
      demo: "#",
      detail: "Operated UAV systems for aerial survey and photogrammetry. Processed drone data into orthomosaic maps for ecosystem analysis and project reporting."
    },
    {
      title: "Helmeted Hornbill Feeding Tree Study",
      titleID: "Studi Pohon Pakan Rangkong Gading",
      description: "Undergraduate thesis research on the palatability of feeding trees for the critically endangered Helmeted Hornbill (Rhinoplax vigil).",
      descriptionID: "Penelitian skripsi tentang palatabilitas pohon pakan bagi Rangkong Gading (Rhinoplax vigil) yang terancam punah kritis.",
      image: "/images/project-4.jpg",
      category: "research",
      tags: ["Biodiversity", "Wildlife Ecology", "Field Research", "Conservation"],
      demo: "#",
      detail: "Field-based research on feeding preferences of Helmeted Hornbill. Conducted systematic transect surveys and food tree identification in natural forest habitat."
    },
    {
      title: "M4CR GIS Support - PPIU North Sumatra",
      titleID: "Dukungan GIS M4CR - PPIU Sumatera Utara",
      description: "Architected and deployed Master Geodatabase v7 Platinum to standardize spatial data management across provincial restoration targets.",
      descriptionID: "Architected and deployed Master Geodatabase v7 Platinum to standardize spatial data management across provincial restoration targets.",
      image: "/images/project-5.jpg",
      category: "gis",
      tags: ["GIS", "M4CR", "Coastal Resilience", "Spatial Data", "Mangrove"],
      demo: "#",
      detail: "Providing GIS analysis and spatial mapping support for M4CR project activities. Producing thematic maps, conducting land cover assessments, and supporting field data collection."
    },
    {
      title: "Community Conservation Workshops",
      titleID: "Lokakarya Konservasi Masyarakat",
      description: "Designed and facilitated educational workshops and seminars for local communities to improve conservation awareness and participation.",
      descriptionID: "Merancang dan memfasilitasi lokakarya edukatif untuk masyarakat lokal guna meningkatkan kesadaran dan partisipasi konservasi.",
      image: "/images/project-6.jpg",
      category: "community",
      tags: ["Community Engagement", "Education", "Conservation", "Workshop"],
      demo: "#",
      detail: "Organized and facilitated community workshops on mangrove and peatland conservation. Partnered with local governments and international NGOs to amplify reach and impact."
    }
  ],

  // Filter kategori portofolio
  projectCategories: [
    { key: "all", labelEN: "All Projects", labelID: "Semua Proyek" },
    { key: "gis", labelEN: "GIS & Mapping", labelID: "GIS & Pemetaan" },
    { key: "rehabilitation", labelEN: "Rehabilitation", labelID: "Rehabilitasi" },
    { key: "mapping", labelEN: "Drone Mapping", labelID: "Pemetaan Drone" },
    { key: "research", labelEN: "Research", labelID: "Penelitian" },
    { key: "community", labelEN: "Community", labelID: "Komunitas" }
  ],

  // ===== LAYANAN =====
  services: [
    {
      icon: "\uD83D\uDDFA\uFE0F",
      titleEN: "GIS & Spatial Analysis",
      titleID: "GIS & Analisis Spasial",
      descEN: "Spatial mapping, land cover analysis, and GIS data management using ArcGIS, QGIS, and Google Earth Engine.",
      descID: "Pemetaan spasial, analisis tutupan lahan, dan manajemen data GIS menggunakan ArcGIS, QGIS, dan Google Earth Engine."
    },
    {
      icon: "\uD83C\uDF3F",
      titleEN: "Ecosystem Rehabilitation",
      titleID: "Rehabilitasi Ekosistem",
      descEN: "Planning and implementing mangrove and peatland rehabilitation based on community-based and scientific approaches.",
      descID: "Perencanaan dan implementasi rehabilitasi mangrove dan gambut berbasis pendekatan komunitas dan ilmiah."
    },
    {
      icon: "\uD83D\uDE81",
      titleEN: "Drone & UAV Mapping",
      titleID: "Pemetaan Drone & UAV",
      descEN: "Aerial surveys, photogrammetry, and orthomosaic map production for ecosystem monitoring and project reporting.",
      descID: "Survei udara, fotogrametri, dan produksi peta ortomosaik untuk pemantauan ekosistem dan pelaporan proyek."
    },
    {
      icon: "\uD83D\uDD2C",
      titleEN: "Conservation Monitoring",
      titleID: "Monitoring Konservasi",
      descEN: "Biodiversity monitoring, camera trap surveys, and habitat effectiveness assessment for protected ecosystems.",
      descID: "Monitoring keanekaragaman hayati, survei kamera jebak, dan penilaian efektivitas perlindungan habitat."
    },
    {
      icon: "\uD83D\uDC65",
      titleEN: "Community Engagement",
      titleID: "Pemberdayaan Masyarakat",
      descEN: "Facilitating community conservation programs, educational workshops, and stakeholder coordination.",
      descID: "Memfasilitasi program konservasi berbasis masyarakat, lokakarya edukasi, dan koordinasi pemangku kepentingan."
    },
    {
      icon: "\uD83D\uDCC4",
      titleEN: "Environmental Consulting",
      titleID: "Konsultasi Lingkungan",
      descEN: "Scientific writing, environmental assessment reports, and project documentation for conservation and restoration projects.",
      descID: "Penulisan ilmiah, laporan penilaian lingkungan, dan dokumentasi proyek untuk konservasi dan restorasi."
    }
  ],

  // ===== TESTIMONI =====
  testimonials: [
    {
      name: "Dani Arief Wahyudi",
      position: "Head of Mangrove Rehabilitation Sub-Working Group, North Sumatra & Riau",
      positionID: "Kepala Sub Kelompok Kerja Rehabilitasi Mangrove Sumatera Utara dan Riau",
      company: "BRGM",
      photo: "/images/testimonial-1.jpg",
      rating: 5,
      quoteEN: "Galih is a staff member with excellent community communication skills. He demonstrates field toughness and is able to build trust with various parties. His loyalty and commitment to work and the organization are commendable.",
      quoteID: "Galih adalah staf dengan kemampuan komunikasi masyarakat yang sangat baik. Ia menunjukkan ketangguhan kerja lapangan dan mampu membangun kepercayaan dengan berbagai pihak. Loyalitas dan komitmennya terhadap pekerjaan dan organisasi patut diapresiasi."
    },
    {
      name: "Gatot Soebiantoro",
      position: "Deputy for Community Empowerment",
      positionID: "Deputi Bidang Pemberdayaan Masyarakat",
      company: "BRGM",
      photo: "/images/testimonial-2.jpg",
      rating: 5,
      quoteEN: "Galih demonstrates high creativity and is able to synergize various disciplines to complete tasks efficiently. He is patient, adaptive, and systematic even under pressure. His direction is always clear and has real impact on team performance.",
      quoteID: "Galih menunjukkan kreativitas tinggi dan mampu mensinergikan berbagai ilmu untuk menyelesaikan tugas secara efisien. Ia sabar, adaptif, dan tetap runtut meski di bawah tekanan. Setiap arahan yang dilaksanakannya mudah dipahami dan berdampak nyata."
    }
  ],

  // ===== WARNA TEMA =====
  colors: {
    primary: "#2D6A4F",
    secondary: "#52B788",
    accent: "#B7E4C7",
    dark: "#1B4332",
    light: "#D8F3DC"
  }
};