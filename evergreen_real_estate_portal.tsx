import React, { useState, useMemo } from 'react';
import { 
  Home, 
  Search, 
  Calculator, 
  BookOpen, 
  Activity, 
  ShoppingCart, 
  Phone, 
  MapPin, 
  CheckCircle, 
  Menu, 
  X, 
  ChevronRight, 
  TrendingUp, 
  Award, 
  ShieldCheck, 
  Layers, 
  DollarSign, 
  Check, 
  AlertCircle, 
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';

// --- MOCK DATA ---
const PROPERTY_LISTINGS = [
  {
    id: 1,
    title: "ধীরাশ্রম ফ্লাইওভার সংলগ্ন বাণিজ্যিক ও শিল্প প্লট",
    location: "ধীরাশ্রম, গাজীপুর সদর",
    category: "commercial",
    price: 30000000,
    area: "১০ বিঘা (আউটরাইট)",
    highlight: "হাইওয়ে ও রেল সংযোগের নিকটবর্তী এবং ভারী শিল্পের উপযোগী উঁচু লাল মাটি।",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80",
    verified: true,
    mouzaRate: "১,৫০,০০০ টাকা/শতাংশ"
  },
  {
    id: 2,
    title: "ভাওয়াল কলেজ সংলগ্ন রাজউক অনুমোদিত বহুতল বাণিজ্যিক প্লট",
    location: "গাজীপুর চৌরাস্তা",
    category: "commercial",
    price: 170000000,
    area: "২১ কাঠা (১৬ তলা নকশা অনুমোদিত)",
    highlight: "ঢাকা-ময়মনসিংহ মহাসড়কের সরাসরি সংযোগ ও শতভাগ ক্লিয়ার ওআইসি এবং নকশা অনুমোদন।",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
    verified: true,
    mouzaRate: "৫,০০,০০০ টাকা/শতাংশ"
  },
  {
    id: 3,
    title: "মাওনা অর্থনৈতিক জোন সংলগ্ন শিল্প কারখানা উপযোগী জমি",
    location: "মাওনা, শ্রীপুর",
    category: "industrial",
    price: 13800000,
    area: "১০০ শতাংশ (উঁচু ও সমতল জমি)",
    highlight: "গার্মেন্টস, টেক্সটাইল বা লজিস্টিক পার্কের জন্য উপযুক্ত প্রধান সড়ক সংলগ্ন নিষ্কাশন সুবিধাযুক্ত স্থান।",
    image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80",
    verified: true,
    mouzaRate: "১,৩৮,০০০ টাকা/শতাংশ"
  },
  {
    id: 4,
    title: "বাঘের বাজার সাফারি পার্কের নিকটবর্তী উঁচু আবাসিক প্লট",
    location: "বাঘের বাজার, শ্রীপুর",
    category: "residential",
    price: 51120000,
    area: "১৪.২২ কাঠা",
    highlight: "বন্যামুক্ত লাল মাটি, আবাসিক আবাসন বা ডেইরি/পোল্ট্রি খামার স্থাপনের আদর্শ পরিবেশ।",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=800&q=80",
    verified: true,
    mouzaRate: "৯২,০০০ টাকা/শতাংশ"
  },
  {
    id: 5,
    title: "কালীগঞ্জ পূর্বাচল এশিয়ান হাইওয়ে সংলগ্ন রেডি আবাসন প্লট",
    location: "কালীগঞ্জ, গাজীপুর",
    category: "residential",
    price: 148000000,
    area: "১১২ শতাংশ (রাজউক পূর্বাচল সংলগ্ন)",
    highlight: "দ্রুত বর্ধনশীল এলাকা, গ্যাস ও বিদ্যুৎ সংযোগ প্রস্তুত। তাৎক্ষণিক রেজিস্ট্রেশন ও নামজারি।",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    verified: true,
    mouzaRate: "১,২০,০০০ টাকা/শতাংশ"
  },
  {
    id: 6,
    title: "মৌচাক-ফুলবাড়িয়া রোড সংলগ্ন ক্ষুদ্র মাঝারি খামার বা কুটির শিল্প প্লট",
    location: "কালিয়াকৈর, গাজীপুর",
    category: "industrial",
    price: 5400000,
    area: "১০ শতাংশ",
    highlight: "সাশ্রয়ী মূল্যে নিরাপদ বিনিয়োগ। খামার ব্যবসা বা ক্ষুদ্র ও মাঝারি শিল্প গড়ে তোলার চমৎকার সুযোগ।",
    image: "https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=800&q=80",
    verified: true,
    mouzaRate: "৪৫,০০০ টাকা/শতাংশ"
  }
];

const AGRO_COURSES = [
  {
    id: "agro-1",
    title: "আধুনিক পোল্ট্রি খামার ব্যবস্থাপনা",
    duration: "৪ মাস (হাতে-কলমে শিক্ষা)",
    description: "বায়োসিকিউরিটি, ব্রুডিং ম্যানেজমেন্ট, পুষ্টি পরিকল্পনা, রোগ প্রতিরোধ ও আধুনিক ভ্যাকসিনেশন কৌশল।",
    features: ["পরীক্ষা ও সরকারি মানসম্পন্ন সনদপত্র", "উদ্যোক্তা উন্নয়ন প্রশিক্ষণ", "সহজ শর্তে ব্যাংক ঋণের গাইডলাইন"]
  },
  {
    id: "agro-2",
    title: "মাছ চাষ ও মৎস্য ব্যবস্থাপনা",
    duration: "৪ মাস (ব্যবহারিকসহ)",
    description: "মিশ্র মাছ চাষ, আধুনিক বায়োফ্লক ও আরএএস (RAS) প্রযুক্তি, পুকুর প্রস্তুতি এবং রোগ প্রতিরোধ ও পানি ব্যবস্থাপনা।",
    features: ["সনদপত্র ও লাইসেন্সিং পরামর্শ", "দেশবন্ধু এগ্রো ফিড বিশেষ ছাড়", "খামার নকশা ডিজাইন ও সহায়তা"]
  },
  {
    id: "agro-3",
    title: "গবাদিপশু পালন ও প্রাথমিক চিকিৎসা",
    duration: "৪ মাস (অন-ফিল্ড প্র্যাকটিস)",
    description: "উন্নত জাতের গাভী ও ষাঁড় মোটাতাজাকরণ, ছাগল ও ভেড়া পালন এবং প্রাথমিক প্রাণিসম্পদ চিকিৎসা পদ্ধতি।",
    features: ["ভেট ডক্টরের অধীনে সরাসরি ইন্টার্নশিপ", "ব্যাংক ঋণ ও ব্যবসায়িক পরিকল্পনা প্রণয়ন", "ফিড ও মেডিসিন ব্যাকআপ"]
  }
];

const MEDICAL_COURSES = [
  {
    code: "LMAF",
    title: "Local Medical Assistant & Family Planning (LMAF)",
    duration: "১ বছর",
    qualification: "এসএসসি / সমমান",
    focus: "প্রাথমিক চিকিৎসা, ওটি প্র্যাকটিস, ফার্মাকোলজি ও মা ও শিশু স্বাস্থ্য।"
  },
  {
    code: "Paramedical",
    title: "Community Paramedic Course (CPC)",
    duration: "২ বছর",
    qualification: "এসএসসি/এইচএসসি",
    focus: "নিবন্ধিত স্বাস্থ্যসেবা প্রদানকারী হিসেবে ক্যারিয়ার গড়ার জন্য অনুমোদিত ডিপ্লোমা।"
  },
  {
    code: "RMP",
    title: "Registered Medical Practitioner (RMP)",
    duration: "৬ মাস",
    qualification: "ন্যূনতম ৮ম শ্রেণী / অভিজ্ঞ পল্লী চিকিৎসক",
    focus: "জরুরী প্রাথমিক চিকিৎসা, প্রেসক্রিপশন নিয়মাবলি এবং ড্রাগ কন্ট্রোল গাইড।"
  },
  {
    code: "DMS/DMSS",
    title: "Diploma in Medicine and Surgery (DMS/DMSS)",
    duration: "২-৩ বছর",
    qualification: "এইচএসসি বিজ্ঞান (পছন্দনীয়)",
    focus: "উন্নত অ্যানাটমি, প্যাথলজি, ডায়াগনোসিস ও জটিল কেস রেফারেল সিস্টেম।"
  }
];

const FEED_PRODUCTS = [
  {
    id: "feed-1",
    name: "দেশবন্ধু স্টার্টার ব্রয়লার ফিড (Poultry)",
    category: "poultry",
    price: 3600,
    unit: "৫০ কেজি ব্যাগ",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=400&q=80",
    desc: "উচ্চ প্রোটিন সমৃদ্ধ, দ্রুত শারীরিক বৃদ্ধি নিশ্চিত করে এবং হজম শক্তি বাড়ায়।"
  },
  {
    id: "feed-2",
    name: "দেশবন্ধু ফ্লোটিং ফিশ ফিড (মৎস্য খাদ্য)",
    category: "fish",
    price: 2400,
    unit: "৪০ কেজি ব্যাগ",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=400&q=80",
    desc: "পানিতে দীর্ঘক্ষণ ভাসমান থাকে, পুষ্টির অপচয় রোধ করে এবং দ্রুত বর্ধনে সাহায্য করে।"
  },
  {
    id: "feed-3",
    name: "দেশবন্ধু ডেইরি গোল্ড কনসেনট্রেট (গবাদিপশু)",
    category: "cattle",
    price: 1950,
    unit: "৩৭.৫ কেজি ব্যাগ",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=400&q=80",
    desc: "দুধ উৎপাদন ক্ষমতা বৃদ্ধি করতে এবং গাভীর স্বাস্থ্য সুরক্ষায় সুষম পুষ্টি উপাদান।"
  },
  {
    id: "feed-4",
    name: "দেশবন্ধু লেয়ার গ্রোয়ার ফিড (Poultry)",
    category: "poultry",
    price: 3100,
    unit: "৫০ কেজি ব্যাগ",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=400&q=80",
    desc: "ডিম উৎপাদনের হার বৃদ্ধি করে এবং কুসুমের গুণগত মান নিশ্চিত করে।"
  }
];

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Property filters state
  const [propertyCategory, setPropertyCategory] = useState('all');
  const [propertySearch, setPropertySearch] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Cart state for Feed Portal
  const [cart, setCart] = useState([]);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [orderName, setOrderName] = useState('');
  const [orderPhone, setOrderPhone] = useState('');
  const [orderAddress, setOrderAddress] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Registry Calculator State
  const [landValue, setLandValue] = useState(5000000); // Default 50 Lakh BDT
  const [zoneType, setZoneType] = useState('commercial'); // commercial, municipal, rural
  const [showCalculationResult, setShowCalculationResult] = useState(true);

  // General Online Registration Form State
  const [regForm, setRegForm] = useState({
    name: '',
    phone: '',
    purpose: 'land_buy', // land_buy, land_sell, agro_training, medical_training, feed_distributor
    selectedCourse: 'LMAF',
    customNotes: ''
  });
  const [regSuccess, setRegSuccess] = useState(false);

  // Doc verification state
  const [verificationSerial, setVerificationSerial] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  // Document verification mock trigger
  const handleDocVerification = (e) => {
    e.preventDefault();
    if (!verificationSerial) return;
    
    // Simulate legal search database
    setTimeout(() => {
      setVerificationResult({
        serial: verificationSerial,
        status: "VERIFIED_SECURE",
        ownerName: "মোঃ মফিজুল ইসলাম ও অংশীদারগণ",
        mouza: "ধীরাশ্রম, জে.এল নং- ৪৮",
        mutationStatus: "হালনাগাদ নামজারি ও জমাভাগ সম্পন্ন (শতভাগ ক্লিয়ার খতিয়ান)",
        investigator: "এভারগ্রিন লিগ্যাল উইং টিম (উইথ ইনভেস্টিগেশন রিপোর্ট)",
        verifiedDate: new Date().toLocaleDateString('bn-BD')
      });
    }, 800);
  };

  // Registry Calculation Logic based on proposed FY 2025-26 Budget Changes
  const calculationResults = useMemo(() => {
    const value = Number(landValue) || 0;
    
    // Standard static rates in Bangladesh
    const stampDutyRate = 0.015; // 1.5%
    const registrationFeeRate = 0.01; // 1%
    const localGovTaxRate = zoneType === 'rural' ? 0.02 : 0.03; // Rural 2%, Municipal/CityCorp 3%
    
    // Capital gains / Source tax comparison (FY 24-25 vs FY 25-26 budget)
    let sourceTaxRate2425 = 0.08;
    let sourceTaxRate2526 = 0.06;

    if (zoneType === 'municipal') {
      sourceTaxRate2425 = 0.06;
      sourceTaxRate2526 = 0.04;
    } else if (zoneType === 'rural') {
      sourceTaxRate2425 = 0.04;
      sourceTaxRate2526 = 0.03;
    }

    // Calculations 2024-25
    const stampDuty2425 = value * stampDutyRate;
    const regFee2425 = value * registrationFeeRate;
    const localGovTax2425 = value * localGovTaxRate;
    const sourceTax2425 = value * sourceTaxRate2425;
    const total2425 = stampDuty2425 + regFee2425 + localGovTax2425 + sourceTax2425;

    // Calculations 2025-26 (incorporating budget reductions & VAT changes)
    const stampDuty2526 = value * stampDutyRate; // remains 1.5%
    const regFee2526 = value * registrationFeeRate; // 1%
    const localGovTax2526 = value * localGovTaxRate;
    const sourceTax2526 = value * sourceTaxRate2526; // Reduced Source Tax
    const total2526 = stampDuty2526 + regFee2526 + localGovTax2526 + sourceTax2526;

    const directSavings = total2425 - total2526;

    return {
      stampDuty: stampDuty2526,
      regFee: regFee2526,
      localGovTax: localGovTax2526,
      sourceTaxPrev: sourceTax2425,
      sourceTaxNew: sourceTax2526,
      totalPrev: total2425,
      totalNew: total2526,
      savings: directSavings
    };
  }, [landValue, zoneType]);

  // Handle inquiry submission
  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setRegSuccess(true);
    setTimeout(() => {
      setRegSuccess(false);
      setRegForm({
        name: '',
        phone: '',
        purpose: 'land_buy',
        selectedCourse: 'LMAF',
        customNotes: ''
      });
      setSelectedProperty(null);
    }, 4000);
  };

  // Cart operations
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId, change) => {
    setCart((prev) => 
      prev.map((item) => {
        if (item.id === productId) {
          const newQty = item.quantity + change;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setOrderSuccess(true);
    setTimeout(() => {
      setCart([]);
      setOrderSuccess(false);
      setCheckoutModal(false);
      setOrderName('');
      setOrderPhone('');
      setOrderAddress('');
    }, 4000);
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('bn-BD').format(amount) + " ৳";
  };

  // Nav actions
  const changeTab = (tab) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased">
      {/* --- TOP BRAND BAR --- */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-850 text-white text-xs md:text-sm py-2 px-4 shadow-sm border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 md:gap-4 font-medium">
            <span className="bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider animate-pulse">নতুন বাজেট আপডেট</span>
            <p>২০২৫-২৬ অর্থবছরে জমি রেজিস্ট্রেশন ও ট্যাক্স হ্রাস! এখন শতাংশের হিসেবে ট্যাক্স প্রদান করুন।</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:01947-822399" className="hover:text-amber-300 transition duration-150 flex items-center gap-1 font-semibold">
              <Phone size={14} className="text-amber-400" /> ০১৯৪৭-৮২২৩৯৯
            </a>
            <span className="hidden md:inline text-slate-400">|</span>
            <a href="tel:+8801969149711" className="hover:text-amber-300 transition duration-150 hidden md:flex items-center gap-1 font-semibold">
              <Phone size={14} className="text-amber-400" /> +৮৮০ ১৯৬৯-১৪৯৭১১
            </a>
          </div>
        </div>
      </div>

      {/* --- PREMIUM HEADER --- */}
      <header className="bg-white sticky top-0 z-40 border-b border-slate-100 shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex justify-between items-center">
          {/* Logo Brand Component */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => changeTab('home')}>
            <div className="relative p-2.5 bg-gradient-to-tr from-emerald-800 to-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-700/20">
              <Layers size={24} className="animate-spin-slow" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-emerald-900 tracking-tight leading-none uppercase">
                EVERGREEN <span className="text-amber-500 text-sm md:text-base block font-bold tracking-widest mt-1">REAL ESTATE MEDIA</span>
              </h1>
              <span className="text-[10px] md:text-xs text-emerald-700 font-bold tracking-wide mt-1 block">বিশ্বাস • স্বচ্ছতা • সফল বিনিয়োগ</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { id: 'home', label: 'হোমপেজ', icon: <Home size={16} /> },
              { id: 'properties', label: 'নিরাপদ প্রোপার্টিজ', icon: <Search size={16} /> },
              { id: 'calculator', label: 'বাজেট ক্যালকুলেটর', icon: <Calculator size={16} /> },
              { id: 'agro', label: 'এগ্রো ট্রেনিং', icon: <Award size={16} /> },
              { id: 'medical', label: 'মেডিকেল কোর্স', icon: <Activity size={16} /> },
              { id: 'feed', label: 'দেশবন্ধু ফিড', icon: <ShoppingCart size={16} /> },
              { id: 'contact', label: 'যোগাযোগ ও ভেরিফিকেশন', icon: <ShieldCheck size={16} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => changeTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition duration-150 ${
                  currentTab === tab.id 
                    ? 'bg-emerald-50 text-emerald-800 border-b-2 border-emerald-600 font-bold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-800'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Right Action Button & Cart Indicator */}
          <div className="hidden lg:flex items-center gap-4">
            {cart.length > 0 && (
              <button 
                onClick={() => changeTab('feed')}
                className="relative p-2.5 text-emerald-800 hover:bg-emerald-50 rounded-xl transition duration-150"
              >
                <ShoppingCart size={22} />
                <span className="absolute top-0 right-0 w-5 h-5 bg-amber-500 text-slate-950 font-bold rounded-full text-xs flex items-center justify-center animate-bounce">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </button>
            )}
            <button 
              onClick={() => changeTab('contact')}
              className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-md hover:from-emerald-800 hover:to-emerald-700 transition duration-200 transform active:scale-95"
            >
              আজই রেজিস্ট্রেশন করুন
            </button>
          </div>

          {/* Mobile Hamburguer Menu */}
          <div className="flex items-center gap-3 lg:hidden">
            {cart.length > 0 && (
              <button 
                onClick={() => changeTab('feed')}
                className="relative p-2 text-emerald-800 hover:bg-emerald-50 rounded-lg"
              >
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-950 font-bold rounded-full text-[10px] flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </button>
            )}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-emerald-800 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* --- MOBILE DRAWER --- */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 py-4 px-4 shadow-lg sticky top-20 z-30 animate-fade-in">
          <div className="flex flex-col gap-2">
            {[
              { id: 'home', label: 'হোমপেজ', icon: <Home size={18} /> },
              { id: 'properties', label: 'নিরাপদ প্রোপার্টিজ', icon: <Search size={18} /> },
              { id: 'calculator', label: 'বাজেট ক্যালকুলেটর', icon: <Calculator size={18} /> },
              { id: 'agro', label: 'এগ্রো ট্রেনিং পোর্টাল', icon: <Award size={18} /> },
              { id: 'medical', label: 'মেডিকেল পল্লী চিকিৎসা', icon: <Activity size={18} /> },
              { id: 'feed', label: 'দেশবন্ধু ফিড শপ', icon: <ShoppingCart size={18} /> },
              { id: 'contact', label: 'যোগাযোগ ও দলিলাদি যাচাই', icon: <ShieldCheck size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => changeTab(tab.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left text-base font-bold transition ${
                  currentTab === tab.id 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : 'text-slate-700 hover:bg-slate-100 hover:text-emerald-800'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <button
                onClick={() => changeTab('contact')}
                className="w-full bg-amber-500 text-slate-950 font-black py-3 rounded-xl text-center shadow-md hover:bg-amber-600 transition"
              >
                রেজিস্ট্রেশন করুন আজই
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- RENDER CURRENT TAB --- */}
      <main className="flex-grow">
        
        {/* ================= HOMEPAGE TAB ================= */}
        {currentTab === 'home' && (
          <div>
            {/* 1. Hero Dynamic Presentation Banner */}
            <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white overflow-hidden py-16 md:py-24 px-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 bg-emerald-800/60 border border-emerald-700/50 px-4 py-1.5 rounded-full text-xs md:text-sm text-emerald-300 font-bold">
                    <ShieldCheck size={16} className="text-amber-400" />
                    <span>১০০% মালিকানা যাচাইকৃত ও আইনি ঝুঁকিমুক্ত ল্যান্ডিং হাব</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight md:leading-none text-white">
                    নিরাপদ জমি, <br className="hidden md:inline" />
                    <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-200">নিশ্চিত ভবিষ্যৎ</span>
                  </h2>
                  
                  <p className="text-slate-300 text-base md:text-lg max-w-xl leading-relaxed">
                    আবাসিক, বাণিজ্যিক বা শিল্প প্রকল্পের জন্য গাজীপুর অঞ্চলে আপনার পছন্দের লোকেশনে ও বাজেটে যাচাইকৃত সম্পত্তি খুঁজে পেতে কাজ করছে আমাদের অভিজ্ঞ ইনভেস্টিগেশন টিম।
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <button 
                      onClick={() => changeTab('properties')}
                      className="bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black px-8 py-4 rounded-xl shadow-lg hover:from-amber-600 hover:to-amber-500 transition duration-200 transform hover:-translate-y-0.5"
                    >
                      নিরাপদ জমি খুঁজুন
                    </button>
                    <button 
                      onClick={() => changeTab('calculator')}
                      className="bg-emerald-800/80 border border-emerald-600 text-white font-bold px-6 py-4 rounded-xl hover:bg-emerald-700 transition duration-150 flex items-center gap-2"
                    >
                      <Calculator size={18} />
                      রেজিস্ট্রি খরচ গণনা করুন
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-6 pt-8 border-t border-emerald-800/60 text-slate-300">
                    <div>
                      <h4 className="text-2xl md:text-3xl font-black text-white">১০০%</h4>
                      <p className="text-xs text-slate-400">নির্দোষ দলিলাদি</p>
                    </div>
                    <div>
                      <h4 className="text-2xl md:text-3xl font-black text-white">৫টি</h4>
                      <p className="text-xs text-slate-400">গাজীপুরের প্রধান জোন</p>
                    </div>
                    <div>
                      <h4 className="text-2xl md:text-3xl font-black text-white">১০০০+</h4>
                      <p className="text-xs text-slate-400">সফল উদ্যোক্তা তৈরি</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 relative">
                  <div className="relative mx-auto max-w-[400px] lg:max-w-none">
                    {/* Architectural visual elements mimicking logo frame */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-emerald-500/20 rounded-3xl blur-2xl transform rotate-6"></div>
                    <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 border border-emerald-500/30 p-4 rounded-3xl shadow-2xl">
                      <img 
                        src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80" 
                        alt="Evergreen Real Estate visual representation"
                        className="rounded-2xl w-full object-cover h-64 md:h-80 shadow-md border border-slate-700" 
                      />
                      <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black p-4 rounded-2xl shadow-xl flex items-center gap-3">
                        <Award size={36} className="text-slate-950" />
                        <div>
                          <p className="text-xs text-amber-950 font-bold">বিশ্বস্ত অংশীদার</p>
                          <p className="text-sm">এভারগ্রিন মিডিয়া</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Interactive Strategic Synergy Ecosystem Section */}
            <section className="py-16 px-4 max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-emerald-700 font-extrabold text-xs tracking-widest uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">ইউনিক ব্যবসায়িক লুপ</span>
                <h3 className="text-3xl md:text-4xl font-black mt-3 text-slate-900">এভারগ্রিন সমন্বিত এগ্রো-মেডিকেল ইকোসিস্টেম</h3>
                <p className="text-slate-600 mt-3 text-sm md:text-base leading-relaxed">
                  আমরা শুধু জমি কেনাবেচায় সীমাবদ্ধ নই। আমাদের লক্ষ্য উদ্যোক্তা তৈরি করে টেকসই উন্নয়ন সাধন করা। আমাদের সিস্টার কনসার্নগুলোর সমন্বয় নিচে দেখুন:
                </p>
              </div>

              {/* Dynamic Ecosystem Flow Visualization */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                
                {/* Step 1 */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition duration-200 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-emerald-500/10">
                      ০১
                    </div>
                    <h4 className="text-lg font-black text-slate-800">নিরাপদ খামারের জমি</h4>
                    <p className="text-sm text-slate-600">এভারগ্রিন ইনভেস্টিগেশন টিম দ্বারা শতভাগ নিখুঁত আবাসিক/বাণিজ্যিক/শিল্প বা এগ্রো প্রকল্পের জমি সংগ্রহ।</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center text-xs text-emerald-700 font-bold">
                    <span>এভারগ্রিন রিয়েল এস্টেট</span>
                    <ArrowRight size={14} />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition duration-200 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-emerald-500/10">
                      ০২
                    </div>
                    <h4 className="text-lg font-black text-slate-800">উদ্যোক্তা ও দক্ষ প্রশিক্ষণ</h4>
                    <p className="text-sm text-slate-600">বাংলাদেশ পোল্ট্রি অ্যান্ড ফিশ ফার্মার্স অ্যাসোসিয়েশনের অধীনে ৪ মাসের আধুনিক খামার ও মৎস্য চাষে হাতে-কলমে শিক্ষা।</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center text-xs text-emerald-700 font-bold">
                    <span>কৃষি ও মেডিকেল উইং</span>
                    <ArrowRight size={14} />
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition duration-200 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-emerald-500/10">
                      ০৩
                    </div>
                    <h4 className="text-lg font-black text-slate-800">দেশবন্ধু উচ্চ-মানের ফিড</h4>
                    <p className="text-sm text-slate-600">আপনার উৎপাদিত খামারের মৎস্য বা মুরগির জন্য সরাসরি নিজস্ব কারখানা উৎপাদিত দেশবন্ধু এগ্রো ফিড সরবরাহ ও মুনাফা সাশ্রয়।</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center text-xs text-emerald-700 font-bold">
                    <span>দেশবন্ধু এগ্রো ফিড</span>
                    <ArrowRight size={14} />
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-2xl p-6 shadow-lg flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-lg">
                      ০৪
                    </div>
                    <h4 className="text-lg font-black text-amber-300">ঋণ সহায়তা ও আত্মনির্ভরশীল</h4>
                    <p className="text-sm text-slate-300">প্রশিক্ষণ শেষে সহজ শর্তে ব্যাংক থেকে উদ্যোক্তা বা ডেইরি/পোল্ট্রি শেড স্থাপনে ব্যাংক ঋণ গ্রহণে এভারগ্রিনের বিশেষ পরামর্শ ও সহায়তা।</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-emerald-700/50 flex justify-between items-center text-xs text-amber-300 font-bold">
                    <span>সফল উদ্যোক্তা প্রজেক্ট</span>
                    <CheckCircle size={14} />
                  </div>
                </div>

              </div>

              {/* Mathematical System Formula Section */}
              <div className="mt-12 bg-emerald-50 rounded-2xl p-6 md:p-8 border border-emerald-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="space-y-2">
                  <h4 className="text-emerald-950 font-black text-lg">ক্লোজড-লুপ ইন্টিগ্রেটেড প্রফিট মডেল (Closed-Loop System Formula)</h4>
                  <p className="text-xs md:text-sm text-emerald-800 leading-relaxed max-w-2xl">
                    আমরা আমাদের রিয়েল এস্টেট ক্রেতাদের দক্ষ প্রশিক্ষিত খামারীতে রূপান্তরিত করি এবং দেশবন্ধু ফিড সরবরাহের মাধ্যমে আজীবন সর্বোচ্চ মুনাফা (System Yield) ও নিরাপত্তা নিশ্চিত করি।
                  </p>
                </div>
                <div className="bg-white px-6 py-4 rounded-xl border border-emerald-200 shadow-sm text-center font-mono">
                  <span className="text-slate-400 text-[10px] block uppercase font-sans font-bold">সিস্টেম মুনাফা সূত্র</span>
                  <span className="text-emerald-800 font-black text-sm md:text-base">
                    P_integrated = ∑ (L_i + T_i + F_i + C_i) - C_acq
                  </span>
                </div>
              </div>
            </section>

            {/* 3. Core Features - Services Banner */}
            <section className="bg-white py-16 border-t border-slate-100">
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-6 space-y-6">
                  <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-100 px-3 py-1 rounded-full">আমাদের সেবাসমূহ</span>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">স্বপ্নের ঠিকানা গড়ার বিশ্বস্ত ও দায়িত্বশীল অংশীদার</h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    গাজীপুরের অন্যতম অগ্রগামী রিয়েল এস্টেট প্ল্যাটফর্ম হিসেবে আমরা আইনি ঝুঁকি এড়াতে সর্বোচ্চ পেশাদারিত্ব নিশ্চিত করি।
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "পছন্দের লোকেশনে নিরাপদ জমি নির্বাচন",
                      "শতভাগ যাচাইকৃত ও বৈধ ওডি দলিলাদি",
                      "ন্যায্য ও বাজারসম্মত মূল্যের নিশ্চয়তা",
                      "অভিজ্ঞ ইনভেস্টিগেশন টিম দ্বারা দলিল যাচাই",
                      "ক্রয়-বিক্রয়ে পূর্ণাঙ্গ আইনি পরামর্শ",
                      "প্রতারণা ও আইনি ঝুঁকি থেকে শতভাগ নিরাপত্তা"
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                        <CheckCircle size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button 
                      onClick={() => changeTab('properties')}
                      className="bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-800 transition"
                    >
                      আমাদের প্রোপার্টি সমূহ
                    </button>
                    <button 
                      onClick={() => changeTab('contact')}
                      className="text-emerald-700 hover:bg-emerald-50 px-4 py-3 rounded-xl transition font-bold"
                    >
                      যোগাযোগ করুন
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center mb-3">
                        <ShieldCheck size={20} />
                      </div>
                      <h5 className="font-black text-slate-800 text-base">১০০% ভেরিফাইড</h5>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">জাল দলিল সনাক্তে আমাদের ইনভেস্টিগেশন উইং সর্বদা কাজ করে।</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                      <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center mb-3">
                        <Clock size={20} />
                      </div>
                      <h5 className="font-black text-slate-800 text-base">দ্রুত সাবমিশন</h5>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">অনলাইন মিউটেশন ও নামজারি মাত্র অল্প সময়ে নিশ্চিত করা হয়।</p>
                    </div>
                  </div>
                  <div className="space-y-4 pt-6">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                      <div className="w-10 h-10 rounded-lg bg-emerald-800 text-white flex items-center justify-center mb-3">
                        <TrendingUp size={20} />
                      </div>
                      <h5 className="font-black text-slate-800 text-base">উচ্চ মুনাফা</h5>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">শিল্প হাব ও রাজউক রোড সংলগ্ন ভবিষ্যৎ লাভজনক জমি প্রদান।</p>
                    </div>
                    <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center mb-3">
                        <Award size={20} />
                      </div>
                      <h5 className="font-black text-slate-800 text-base">সরকারি লাইসেন্স</h5>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">REHAB ও ল্যান্ড অথরিটি গাইডলাইন সম্পূর্ণ অনুসরনকারী।</p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* 4. CTA Promotion Banner */}
            <section className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white py-12 px-4">
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                <div className="space-y-2">
                  <h4 className="text-2xl md:text-3xl font-black">নিরাপদ জমি দিয়ে গড়ে তুলুন স্বপ্নের ভবিষ্যৎ</h4>
                  <p className="text-slate-300 text-sm max-w-xl">
                    গাজীপুর সদর, ঢাকা উত্তর ও দক্ষিণ সিটি কর্পোরেশন এবং দেশের বিভিন্ন জোনে আমাদের কার্যক্রম অব্যাহত রয়েছে। আজই বুকিং সম্পন্ন করুন।
                  </p>
                </div>
                <button 
                  onClick={() => changeTab('properties')}
                  className="bg-amber-400 text-slate-950 hover:bg-amber-500 transition duration-150 font-black px-8 py-4 rounded-xl shadow-lg shrink-0"
                >
                  প্লট সমূহের তালিকা দেখুন
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ================= PROPERTIES TAB ================= */}
        {currentTab === 'properties' && (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <span className="text-emerald-700 font-extrabold text-xs tracking-widest uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">প্রোপার্টি ডেটাবেজ</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">গাজীপুরের যাচাইকৃত নিরাপদ জমি ও প্লটসমূহ</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                নিচের প্রোপার্টিগুলো আমাদের অভিজ্ঞ আইনি ইনভেস্টিগেশন টিম দ্বারা দলিলাদি ও রেজিস্ট্রি সম্পন্ন করার পূর্বে শতভাগ মালিকানা নিশ্চিত করা হয়েছে।
              </p>
            </div>

            {/* Filters bar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Category selector */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {[
                  { id: 'all', label: 'সকল ক্যাটাগরি' },
                  { id: 'residential', label: 'আবাসিক প্লট' },
                  { id: 'commercial', label: 'বাণিজ্যিক স্পেস' },
                  { id: 'industrial', label: 'শিল্প প্রকল্প' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setPropertyCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition duration-150 ${
                      propertyCategory === cat.id 
                        ? 'bg-emerald-600 text-white shadow-sm' 
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search field */}
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="লোকেশন বা অঞ্চল দিয়ে খুঁজুন..."
                  value={propertySearch}
                  onChange={(e) => setPropertySearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <Search size={18} className="absolute left-3.5 top-3 text-slate-400" />
              </div>
            </div>

            {/* Property Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROPERTY_LISTINGS.filter((item) => {
                const matchesCat = propertyCategory === 'all' || item.category === propertyCategory;
                const matchesSearch = item.location.toLowerCase().includes(propertySearch.toLowerCase()) || 
                                      item.title.toLowerCase().includes(propertySearch.toLowerCase());
                return matchesCat && matchesSearch;
              }).map((property) => (
                <div key={property.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition duration-200 flex flex-col h-full">
                  
                  {/* Image container with category badge */}
                  <div className="relative h-56 w-full bg-slate-100">
                    <img 
                      src={property.image} 
                      alt={property.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase text-white shadow-sm ${
                        property.category === 'commercial' ? 'bg-amber-500' :
                        property.category === 'industrial' ? 'bg-indigo-600' : 'bg-emerald-600'
                      }`}>
                        {property.category === 'commercial' ? 'বাণিজ্যিক' :
                         property.category === 'industrial' ? 'শিল্প প্রকল্প' : 'আবাসিক'}
                      </span>
                    </div>

                    {property.verified && (
                      <div className="absolute top-4 right-4 bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-1.5 rounded-lg shadow-sm flex items-center gap-1">
                        <ShieldCheck size={14} />
                        <span>১০০% দলিলাদি ভেরিফাইড</span>
                      </div>
                    )}
                  </div>

                  {/* Body Info */}
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin size={14} className="text-emerald-600" />
                        <span>{property.location}</span>
                      </div>
                      
                      <h4 className="font-black text-slate-800 text-lg leading-snug hover:text-emerald-700 transition duration-150">
                        {property.title}
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {property.highlight}
                      </p>
                    </div>

                    {/* Metadata indicators */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700">
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">ভূমির পরিমাণ</span>
                        <span className="font-bold">{property.area}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">মৌজা রেট</span>
                        <span className="font-bold">{property.mouzaRate}</span>
                      </div>
                    </div>

                    {/* Footer / CTA and Price */}
                    <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">আনুমানিক মূল্য</span>
                        <span className="text-emerald-700 font-extrabold text-base md:text-lg">
                          {formatPrice(property.price)}
                        </span>
                      </div>
                      <button 
                        onClick={() => setSelectedProperty(property)}
                        className="bg-emerald-50 text-emerald-800 font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-emerald-600 hover:text-white transition duration-150"
                      >
                        বিস্তারিত জানুন
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* If no properties found */}
            {PROPERTY_LISTINGS.filter((item) => {
              const matchesCat = propertyCategory === 'all' || item.category === propertyCategory;
              const matchesSearch = item.location.toLowerCase().includes(propertySearch.toLowerCase()) || 
                                    item.title.toLowerCase().includes(propertySearch.toLowerCase());
              return matchesCat && matchesSearch;
            }).length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 p-8 space-y-4 max-w-lg mx-auto mt-8">
                <AlertCircle size={48} className="text-amber-500 mx-auto" />
                <h4 className="font-black text-slate-800 text-lg">দুঃখিত, কোনো সম্পত্তি পাওয়া যায়নি!</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  আপনার কাঙ্ক্ষিত নির্দিষ্ট লোকেশন বা বাজেটটি আমাদের ইনভেস্টিগেশন টিমকে জানাতে সরাসরি রেজিস্ট্রেশন ফর্মটি পূরণ করুন।
                </p>
                <button 
                  onClick={() => changeTab('contact')}
                  className="bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md"
                >
                  আপনার জমির চাহিদা জানান
                </button>
              </div>
            )}

            {/* Property details and contact modal */}
            {selectedProperty && (
              <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 relative shadow-2xl border border-slate-100 animate-fade-in">
                  <button 
                    onClick={() => setSelectedProperty(null)}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-50 rounded-full"
                  >
                    <X size={20} />
                  </button>

                  <div className="space-y-6">
                    <div>
                      <span className="text-emerald-700 bg-emerald-50 border border-emerald-100 font-black text-[10px] px-2.5 py-1.5 rounded-lg">
                        নিরাপদ সম্পত্তি বিস্তারিত
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-2 leading-tight">
                        {selectedProperty.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                        <MapPin size={14} className="text-emerald-600" />
                        <span>{selectedProperty.location}</span>
                      </div>
                    </div>

                    <img 
                      src={selectedProperty.image} 
                      alt="Property closeup" 
                      className="rounded-2xl w-full h-48 object-cover border border-slate-100"
                    />

                    <div className="space-y-2 text-xs md:text-sm text-slate-700 leading-relaxed">
                      <p className="font-medium text-slate-600">
                        আমাদের অভিজ্ঞ লিগ্যাল ও ফিল্ড টিম এই জমির সিএস, এসএ, আরএস, বিএস খতিয়ান ও নামজারি সম্পূর্ণ নিখুঁত পেয়েছে। আপনি কোনো আইনি ঝামেলা ছাড়াই সরাসরি মালিকানা রেজিস্ট্রি করতে পারবেন।
                      </p>
                      <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl">
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">মোট দাম</span>
                          <span className="text-emerald-700 font-extrabold text-base">{formatPrice(selectedProperty.price)}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">জমির পরিমাণ</span>
                          <span className="font-extrabold text-base text-slate-800">{selectedProperty.area}</span>
                        </div>
                      </div>
                    </div>

                    {/* Inquiry Form Inside Modal */}
                    <form onSubmit={handleInquirySubmit} className="space-y-4 pt-4 border-t border-slate-100">
                      <h4 className="font-black text-slate-800 text-sm">এই জমির আইনি দলিলাদি ও ক্রয়ের জন্য বুকিং ইনকোয়ারি পাঠান:</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          required
                          placeholder="আপনার নাম"
                          value={regForm.name}
                          onChange={(e) => setRegForm({...regForm, name: e.target.value})}
                          className="w-full border border-slate-200 px-3 py-2 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="মোবাইল নম্বর"
                          value={regForm.phone}
                          onChange={(e) => setRegForm({...regForm, phone: e.target.value})}
                          className="w-full border border-slate-200 px-3 py-2 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-emerald-700 to-emerald-600 text-white font-bold text-xs py-3 rounded-xl shadow-md"
                      >
                        ফ্রি পরামর্শ ও দলিলাদি বুকিং পাঠান
                      </button>
                    </form>

                    {regSuccess && (
                      <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center space-y-2">
                        <CheckCircle size={24} className="text-emerald-600 mx-auto" />
                        <h5 className="font-black text-emerald-800 text-xs">আপনার বুকিং তথ্য সফলভাবে গৃহীত হয়েছে!</h5>
                        <p className="text-[10px] text-emerald-700">আমাদের লিগ্যাল ইনভেস্টিগেশন টিম আগামী ২৪ ঘণ্টার মধ্যে সরাসরি আপনার সাথে যোগাযোগ করবে। ধন্যবাদ।</p>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ================= REGISTRY CALCULATOR TAB ================= */}
        {currentTab === 'calculator' && (
          <div className="max-w-7xl mx-auto px-4 py-12">
            
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <span className="text-emerald-700 font-extrabold text-xs tracking-widest uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">আইনি ও আর্থিক টুলস</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">২০২৫-২৬ সংশোধিত ল্যান্ড রেজিস্ট্রি খরচ ক্যালকুলেটর</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                বাংলাদেশ সরকারের নতুন বাজেটীয় বিধি অনুযায়ী ২% পর্যন্ত রেজিস্ট্রেশন ট্যাক্স হ্রাস এবং ক্যাপিটাল গেইন্স (উৎসে কর) এলাকাভিত্তিক যথাক্রমে ৮% থেকে কমিয়ে ৬%, ৪% ও ৩% নির্ধারণ করা হয়েছে। নিচে আপনার জমির মূল্য দিয়ে নতুন সাশ্রয়ের হিসাব দেখুন।
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Inputs Panel */}
              <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <h4 className="font-black text-slate-800 text-lg flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Calculator size={20} className="text-emerald-600" />
                  <span>জমির আর্থিক হিসাব</span>
                </h4>

                <div className="space-y-4">
                  {/* Land value */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 block">জমির ঘোষিত মূল্য (দলিলে উল্লেখিত মূল্য BDT):</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={landValue}
                        onChange={(e) => setLandValue(e.target.value)}
                        className="w-full border border-slate-200 pl-10 pr-4 py-3 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                      <span className="absolute left-3.5 top-3.5 text-slate-400 font-bold text-xs">BDT</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      অনুমান: {new Intl.NumberFormat('bn-BD').format(landValue)} টাকা
                    </span>
                  </div>

                  {/* Area type for Capital gains tax */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 block">জমির প্রকৃতি ও এলাকার ক্যাটাগরি:</label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { id: 'commercial', label: 'উচ্চ বাণিজ্যিক জোন (যেমন: গাজীপুর চৌরাস্তা/ধীরাশ্রম হাইওয়ে)', note: '২০২৫-২৬ উৎস কর: ৬% (পূর্বে ছিল ৮%)' },
                        { id: 'municipal', label: 'পৌরসভা/সিটি কর্পোরেশন অঞ্চল (যেমন: গাজীপুর সদর/কোনাবাড়ি)', note: '২০২৫-২৬ উৎস কর: ৪% (পূর্বে ছিল ৬%)' },
                        { id: 'rural', label: 'ইউনিয়ন/প্রত্যন্ত গ্রামীণ অঞ্চল (যেমন: কাপাসিয়া/কালিয়াকৈর জোন)', note: '২০২৫-২৬ উৎস কর: ৩% (পূর্বে ছিল ৪%)' }
                      ].map((type) => (
                        <label 
                          key={type.id} 
                          className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                            zoneType === type.id 
                              ? 'bg-emerald-50/50 border-emerald-500' 
                              : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="zoneType"
                            checked={zoneType === type.id}
                            onChange={() => setZoneType(type.id)}
                            className="mt-1 accent-emerald-600"
                          />
                          <div>
                            <span className="text-xs font-bold text-slate-800 block">{type.label}</span>
                            <span className="text-[10px] text-emerald-700 block mt-0.5">{type.note}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 flex items-start gap-2.5">
                  <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-amber-900 leading-relaxed">
                    <strong>বিঃদ্রঃ:</strong> উপরোক্ত হিসাবগুলো সোনালী ব্যাংক ট্রেজারি চালানের মাধ্যমে সরাসরি সাব-রেজিস্ট্রার অফিসে প্রদানের আইনানুগ চার্জ। দলিল লেখক বা কমিশন লেখক ফি এবং সাব-রেজিস্ট্রির আনুষঙ্গিক ই-ফি (E-fee, N-fee) এর বাইরে থাকে।
                  </p>
                </div>
              </div>

              {/* Outputs Panel / Visualization */}
              <div className="lg:col-span-7 space-y-6">
                
                {showCalculationResult && (
                  <div className="bg-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

                    <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">রেজিস্ট্রি ব্যয়ের বাজেট তুলনামূলক হিসাব</span>
                        <h4 className="text-lg md:text-xl font-black mt-1">২০২৫-২৬ সংশোধিত বাজেট বাজেট বনাম পূর্ববর্তী বাজেট</h4>
                      </div>
                      <span className="bg-emerald-500 text-slate-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-full animate-bounce">
                        সরাসরি সাশ্রয়
                      </span>
                    </div>

                    {/* Results display */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 text-center">
                        <span className="text-slate-400 text-xs block">আগের বাজেটে মোট খরচ (২০২৪-২৫)</span>
                        <span className="text-xl md:text-2xl font-black text-rose-400 block mt-2">
                          {formatPrice(calculationResults.totalPrev)}
                        </span>
                      </div>

                      <div className="bg-emerald-950/70 p-4 rounded-2xl border border-emerald-500/30 text-center">
                        <span className="text-emerald-300 text-xs block">নতুন বাজেটে মোট খরচ (২০২৫-২৬)</span>
                        <span className="text-xl md:text-2xl font-black text-emerald-400 block mt-2">
                          {formatPrice(calculationResults.totalNew)}
                        </span>
                      </div>

                    </div>

                    {/* Direct Savings Callout */}
                    <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 p-5 rounded-2xl text-center border border-emerald-600/50">
                      <span className="text-amber-300 text-xs font-black uppercase tracking-wider block">আপনার সরাসরি নগদ লাভ / কর সাশ্রয়:</span>
                      <span className="text-2xl md:text-3xl font-black text-white block mt-1">
                        {formatPrice(calculationResults.savings)}
                      </span>
                      <p className="text-[10px] text-emerald-200 mt-1">
                        (উৎস কর সর্বোচ্চ ২% কমে যাওয়ায় আপনার দলিলের মোট রেজিস্ট্রেশন খরচ প্রায় ৪০% পর্যন্ত কমছে!)
                      </p>
                    </div>

                    {/* Breakdown Details */}
                    <div className="space-y-3 pt-2">
                      <h5 className="text-slate-300 font-bold text-xs border-b border-slate-800 pb-1.5 uppercase">বিস্তারিত খরচের বিবরণী (২০২৫-২৬):</h5>
                      
                      <div className="space-y-2 text-xs md:text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">১. স্ট্যাম্প ডিউটি ফি (১.৫%):</span>
                          <span className="font-semibold text-slate-200">{formatPrice(calculationResults.stampDuty)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">২. দলিল সাব-রেজিস্ট্রেশন ফি (১%):</span>
                          <span className="font-semibold text-slate-200">{formatPrice(calculationResults.regFee)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">৩. স্থানীয় সরকার ফি (এলাকাভেদে ২% বা ৩%):</span>
                          <span className="font-semibold text-slate-200">{formatPrice(calculationResults.localGovTax)}</span>
                        </div>
                        <div className="flex justify-between border-t border-slate-800 pt-2 text-amber-300 font-bold">
                          <span>৪. সংশোধিত উৎসে কর / গেইন ট্যাক্স (Capital Gains):</span>
                          <span>{formatPrice(calculationResults.sourceTaxNew)} <span className="text-[9px] text-slate-400">(পূর্বে ছিল {formatPrice(calculationResults.sourceTaxPrev)})</span></span>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* Additional Guidance */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <h4 className="font-black text-slate-800 text-sm flex items-center gap-1.5">
                    <ShieldCheck size={18} className="text-emerald-600" />
                    <span>জমির রেজিস্ট্রেশনের আগে করণীয় ৪টি আইনানুগ চেক:</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700 leading-relaxed">
                    <div className="space-y-1">
                      <p className="font-bold text-emerald-700">১. দলিলের চেইন ভেরিফিকেশন:</p>
                      <p>নিশ্চিত করুন সিএস, এসএ, আরএস এবং সর্বশেষ বিএস রেকর্ড অনুযায়ী জমির মালিকানার পরম্পরা বা ধারাবাহিকতা বৈধ রয়েছে কিনা।</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-emerald-700">২. নামজারি ও জমাভাগ চেক:</p>
                      <p>বিক্রেতার নামে সহকারী কমিশনার (ভূমি) বা এসি ল্যান্ড অফিস থেকে নামজারি এবং সর্বশেষ বছরের কর দাখিলা হালনাগাদ থাকতে হবে।</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-emerald-700">৩. অর্পিত ও খাস সম্পত্তি মুক্তি:</p>
                      <p>প্রস্তাবিত জমিটি কোনো সরকারি অর্পিত, খাস বা বন বিভাগের সংরক্ষিত বনের সীমানার মধ্যে অন্তর্ভুক্ত নয় তা ভূমি অফিস থেকে নিশ্চিত করুন।</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-emerald-700">৪. এভারগ্রিন ইনভেস্টিগেশন টিম সাপোর্ট:</p>
                      <p>আপনার জমি ক্রয়ের পূর্বে আমাদের টিম দলিলাদির সত্যতা সাব-রেজিস্ট্রি এবং ভূমি রেকর্ড অফিস থেকে সরাসরি যাচাই করে আইনি গ্যারান্টি দেয়।</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ================= AGRO TRAINING PORTAL TAB ================= */}
        {currentTab === 'agro' && (
          <div className="max-w-7xl mx-auto px-4 py-12">
            
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <span className="text-emerald-700 font-extrabold text-xs tracking-widest uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">বাংলাদেশ পোল্ট্রি অ্যান্ড ফিশ ফার্মার্স অ্যাসোসিয়েশন</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">আধুনিক কৃষি খামার প্রশিক্ষণ পোর্টাল</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                ৪ মাস মেয়াদি সরাসরি হাতে-কলমে আধুনিক পোল্ট্রি, মাছ চাষ ও ডেইরি ফার্মিং বিষয়ক প্রশিক্ষণ। প্রশিক্ষণ শেষে ব্যাংক লোন প্রাপ্তি ও সফল খামারী উদ্যোক্তা হিসেবে গড়ে উঠতে আমরা পূর্ণাঙ্গ সহায়তা প্রদান করি।
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {AGRO_COURSES.map((course) => (
                <div key={course.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition duration-200">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-3 py-1 rounded-full font-bold">
                      <Clock size={14} />
                      <span>{course.duration}</span>
                    </div>

                    <h4 className="text-lg font-black text-slate-800">{course.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{course.description}</p>

                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">বিশেষ সুবিধাসমূহ:</span>
                      {course.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <Check size={14} className="text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <button 
                      onClick={() => {
                        setRegForm({...regForm, purpose: 'agro_training', customNotes: `ভর্তির আগ্রহ: ${course.title}`});
                        changeTab('contact');
                      }}
                      className="w-full bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 transition duration-150 font-bold text-xs py-3 rounded-xl text-center"
                    >
                      কোর্সে ভর্তি আবেদন করুন
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Special Attraction Panel */}
            <div className="mt-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-6 md:p-10 text-slate-950 flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl">
              <div className="space-y-2 text-center md:text-left">
                <span className="bg-slate-950 text-amber-400 text-[10px] font-black uppercase px-2.5 py-1 rounded-full">বিশেষ আকর্ষণ</span>
                <h4 className="text-2xl md:text-3xl font-black">প্রশিক্ষণ শেষে সহজ শর্তে ব্যাংক লোন প্রাপ্তির গ্যারান্টি</h4>
                <p className="text-slate-900 text-sm max-w-xl leading-relaxed">
                  আপনার খামার প্রকল্প গড়ে তুলতে লাইসেন্সিং ও ব্যাংক ঋণ আবেদনের জন্য আমাদের স্পেশাল কনসালট্যান্ট টিম প্রজেক্ট প্রোফাইল তৈরিতে সরাসরি সহায়তা করবে।
                </p>
              </div>
              <button 
                onClick={() => changeTab('contact')}
                className="bg-slate-950 text-white hover:bg-slate-900 transition font-black px-8 py-4 rounded-xl shadow-lg shrink-0"
              >
                আজই রেজিস্ট্রেশন করুন
              </button>
            </div>

          </div>
        )}

        {/* ================= MEDICAL TRAINING HUB TAB ================= */}
        {currentTab === 'medical' && (
          <div className="max-w-7xl mx-auto px-4 py-12">
            
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <span className="text-emerald-700 font-extrabold text-xs tracking-widest uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">বাংলাদেশ পল্লী চিকিৎসা ট্রেনিং সেন্টার</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">পল্লী চিকিৎসা প্রশিক্ষণ ও দক্ষতা উন্নয়ন</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                নিজেকে একজন দক্ষ ও স্বাধীন পল্লী চিকিৎসক হিসেবে গড়ে তুলতে আধুনিক চিকিৎসা শিক্ষা অর্জন করুন। ফার্মেসী ব্যবসা বা গ্রামীণ প্রাথমিক স্বাস্থ্যসেবা প্রদানে আমাদের কোর্সসমূহ অত্যন্ত উপযোগী ও সরকারি বিধি অনুমোদিত।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {MEDICAL_COURSES.map((course) => (
                <div key={course.code} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 flex flex-col justify-between hover:shadow-md transition">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="bg-emerald-600 text-white font-black text-sm px-3 py-1 rounded-lg">
                        {course.code}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1 font-semibold">
                        <Clock size={14} className="text-emerald-600" />
                        মেয়াদ: {course.duration}
                      </span>
                    </div>

                    <h4 className="text-lg md:text-xl font-black text-slate-800">{course.title}</h4>
                    
                    <div className="space-y-1 text-xs text-slate-700">
                      <p><strong>ভর্তির ন্যূনতম যোগ্যতা:</strong> {course.qualification}</p>
                      <p className="text-slate-600 mt-2 leading-relaxed"><strong>কোর্সের মূল ফোকাস:</strong> {course.focus}</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-50 mt-6">
                    <button
                      onClick={() => {
                        setRegForm({...regForm, purpose: 'medical_training', customNotes: `মেডিকেল কোর্স আগ্রহ: ${course.code}`});
                        changeTab('contact');
                      }}
                      className="w-full bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl shadow-md hover:bg-emerald-800 transition"
                    >
                      ভর্তি ফরম ওপেন করুন
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Practical Support Panel */}
            <div className="mt-12 bg-emerald-50 rounded-3xl p-6 md:p-8 border border-emerald-100 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 space-y-2">
                <h4 className="font-black text-emerald-950 text-lg">আমাদের বিশেষ সুবিধা সমূহের তালিকা:</h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  হাতে-কলমে শিক্ষা ও আধুনিক ওটি প্র্যাকটিস, পরীক্ষা শেষে সরাসরি সফলভাবে উত্তীর্ণদের সনদপত্র প্রদান এবং স্বাবলম্বী হয়ে ওঠার জন্য ফার্মেসী ড্রাগ লাইসেন্সিং সংক্রান্ত পূর্ণাঙ্গ টেকনিক্যাল পরামর্শ সহায়তা দেওয়া হয়।
                </p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-emerald-200 text-center font-bold text-emerald-900 shadow-sm text-sm">
                <span>১০০% প্র্যাকটিক্যাল গ্যারান্টি</span>
              </div>
            </div>

          </div>
        )}

        {/* ================= DESHBONDHU FEED PORTAL TAB ================= */}
        {currentTab === 'feed' && (
          <div className="max-w-7xl mx-auto px-4 py-12">
            
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <span className="text-emerald-700 font-extrabold text-xs tracking-widest uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">দেশবন্ধু এগ্রো ফিড লিমিটেড</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">উচ্চ-মানের পোল্ট্রি, মৎস্য ও গবাদিপশুর ফিড</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                বৈজ্ঞানিক ফর্মুলায় প্রস্তুতকৃত দেশবন্ধু ফিড নিয়মিত ব্যবহারে আপনার খামারের মাছ ও গবাদিপশুর হজমশক্তি দ্রুত বৃদ্ধি পায়, ডিম ও দুধের উৎপাদন বাড়ে এবং রোগ বালাইয়ের হার উল্লেখযোগ্যভাবে কমে আসে।
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Product Catalog Grid (3 cols) */}
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                {FEED_PRODUCTS.map((prod) => (
                  <div key={prod.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition">
                    
                    <div className="relative h-48 w-full bg-slate-100">
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-emerald-600 text-white font-black text-[9px] uppercase px-2.5 py-1 rounded-lg shadow-sm">
                          {prod.category === 'poultry' ? 'পোল্ট্রি ফিড' :
                           prod.category === 'fish' ? 'মৎস্য খাদ্য' : 'গবাদিপশু'}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                      <div className="space-y-1">
                        <h4 className="font-black text-slate-800 text-sm md:text-base">{prod.name}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{prod.desc}</p>
                        <span className="text-xs font-bold text-amber-600 block pt-1">প্যাকেজিং ইউনিট: {prod.unit}</span>
                      </div>

                      <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase font-bold">মূল্য (ব্যাগ)</span>
                          <span className="text-emerald-700 font-extrabold text-base">{formatPrice(prod.price)}</span>
                        </div>
                        <button 
                          onClick={() => addToCart(prod)}
                          className="bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-emerald-800 transition duration-150"
                        >
                          অর্ডার কার্টে যোগ করুন
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

              {/* Shopping Cart Sidebar Panel (1 col) */}
              <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit space-y-6">
                <h4 className="font-black text-slate-800 text-base flex items-center gap-1.5 border-b border-slate-100 pb-3">
                  <ShoppingCart size={18} className="text-emerald-600" />
                  <span>আপনার কার্ট</span>
                  <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-2 py-0.5 rounded-full ml-auto">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </h4>

                {cart.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 space-y-2">
                    <ShoppingCart size={32} className="mx-auto" />
                    <p className="text-xs font-semibold">কার্টটি খালি রয়েছে। পোল্ট্রি ও ফিশ খাদ্য যোগ করুন।</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-2 items-start border-b border-slate-50 pb-3 text-xs">
                        <div className="flex-grow space-y-1">
                          <h5 className="font-bold text-slate-800 leading-tight">{item.name}</h5>
                          <span className="text-emerald-700 font-bold block">{formatPrice(item.price)} × {item.quantity}</span>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-rose-500 font-semibold text-[10px]"
                          >
                            রিমুভ
                          </button>
                          <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 rounded-lg px-1 py-0.5">
                            <button onClick={() => updateCartQuantity(item.id, -1)} className="font-bold px-1.5 hover:text-emerald-700">-</button>
                            <span className="font-bold">{item.quantity}</span>
                            <button onClick={() => updateCartQuantity(item.id, 1)} className="font-bold px-1.5 hover:text-emerald-700">+</button>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="pt-2 space-y-2 text-xs">
                      <div className="flex justify-between text-slate-500">
                        <span>মোট আইটেম:</span>
                        <span>{cart.reduce((sum, item) => sum + item.quantity, 0)} ব্যাগ</span>
                      </div>
                      <div className="flex justify-between font-bold text-slate-800 text-sm border-t border-slate-100 pt-2">
                        <span>সর্বমোট মূল্য:</span>
                        <span className="text-emerald-700">
                          {formatPrice(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0))}
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setCheckoutModal(true)}
                      className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-3 rounded-xl shadow-md text-center"
                    >
                      অর্ডার বুক করুন
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Checkout modal */}
            {checkoutModal && (
              <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-md w-full p-6 relative shadow-2xl animate-fade-in">
                  <button 
                    onClick={() => setCheckoutModal(false)}
                    className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-800"
                  >
                    <X size={20} />
                  </button>

                  <h3 className="font-black text-slate-800 text-lg border-b border-slate-100 pb-3">দেশবন্ধু ফিড ডেলিভারি ইনফরমেশন</h3>
                  
                  <form onSubmit={handleOrderSubmit} className="space-y-4 pt-4 text-xs">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600 block">আপনার নাম/খামারের নাম:</label>
                      <input 
                        type="text" 
                        required
                        value={orderName}
                        onChange={(e) => setOrderName(e.target.value)}
                        placeholder="নাম লিখুন"
                        className="w-full border border-slate-200 px-3 py-2.5 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-600 block">মোবাইল নম্বর:</label>
                      <input 
                        type="tel" 
                        required
                        value={orderPhone}
                        onChange={(e) => setOrderPhone(e.target.value)}
                        placeholder="মোবাইল নম্বর লিখুন"
                        className="w-full border border-slate-200 px-3 py-2.5 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-600 block">ডেলিভারি ঠিকানা (ডিস্ট্রিবিউশন জোন/চৌরাস্তা/বাঘের বাজার):</label>
                      <textarea 
                        rows="3"
                        required
                        value={orderAddress}
                        onChange={(e) => setOrderAddress(e.target.value)}
                        placeholder="বিস্তারিত গ্রাম/থানা/জেলা সহ ঠিকানা লিখুন"
                        className="w-full border border-slate-200 px-3 py-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      ></textarea>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between font-bold text-slate-800">
                      <span>পরিশোধযোগ্য মূল্য (ক্যাশ অন ডেলিভারি):</span>
                      <span className="text-emerald-700">
                        {formatPrice(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0))}
                      </span>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-md"
                    >
                      ডেলিভারি নিশ্চিত করুন
                    </button>
                  </form>

                  {orderSuccess && (
                    <div className="absolute inset-0 bg-white rounded-3xl p-6 flex flex-col justify-center items-center text-center space-y-3">
                      <CheckCircle size={48} className="text-emerald-600 animate-bounce" />
                      <h4 className="font-black text-slate-800 text-base">আপনার ফিড অর্ডারটি গৃহীত হয়েছে!</h4>
                      <p className="text-xs text-slate-600">আমাদের গাজীপুর সদর ডিস্ট্রিবিউশন ইউনিট থেকে প্রতিনিধি আপনার ঠিকানায় ফিড ব্যাগ ডেলিভারি নিশ্চিত করতে ২৪ ঘণ্টার মধ্যে কল করবে।</p>
                    </div>
                  )}

                </div>
              </div>
            )}

          </div>
        )}

        {/* ================= CONTACT & VERIFICATION TAB ================= */}
        {currentTab === 'contact' && (
          <div className="max-w-7xl mx-auto px-4 py-12">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Column: Secure Registration & Inquiry Form */}
              <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <div className="space-y-2">
                  <span className="text-emerald-700 font-extrabold text-xs tracking-widest uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">অনলাইন পোর্টাল</span>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900">নিরাপদ রেজিস্ট্রেশন ও বুকিং ফর্ম</h3>
                  <p className="text-slate-600 text-xs md:text-sm">
                    আপনার বাজেট ও চাহিদামত জমি অনুসন্ধান, এগ্রো/মেডিকেল প্রশিক্ষণ কোর্সে ভর্তি আবেদন অথবা দেশবন্ধু এগ্রো ফিড ডিস্ট্রিবিউটরশিপ বুকিং সম্পন্ন করতে নিচের ফর্মটি সাবমিট করুন।
                  </p>
                </div>

                <form onSubmit={handleInquirySubmit} className="space-y-4 pt-4 text-xs md:text-sm text-slate-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600 block">আপনার সম্পূর্ণ নাম:</label>
                      <input 
                        type="text" 
                        required
                        value={regForm.name}
                        onChange={(e) => setRegForm({...regForm, name: e.target.value})}
                        placeholder="উদাঃ মোঃ আব্দুল করিম"
                        className="w-full border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600 block">সক্রিয় মোবাইল নম্বর:</label>
                      <input 
                        type="tel" 
                        required
                        value={regForm.phone}
                        onChange={(e) => setRegForm({...regForm, phone: e.target.value})}
                        placeholder="উদাঃ ০১৯৪৭-XXXXXX"
                        className="w-full border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 block">আপনার প্রধান উদ্দেশ্য / সার্ভিসের ধরণ:</label>
                    <select
                      value={regForm.purpose}
                      onChange={(e) => setRegForm({...regForm, purpose: e.target.value})}
                      className="w-full border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                    >
                      <option value="land_buy">নিরাপদ জমি / প্লট ক্রয় করতে চাই</option>
                      <option value="land_sell">আমার গাজীপুরের জমি বিক্রি / ডেভেলপমেন্টে দিতে চাই</option>
                      <option value="agro_training">বাংলাদেশ পোল্ট্রি অ্যান্ড ফিশ ফার্মার্স অ্যাসোসিয়েশন (কৃষি কোর্স)</option>
                      <option value="medical_training">বাংলাদেশ পল্লী চিকিৎসা ট্রেনিং সেন্টার (মেডিকেল কোর্স)</option>
                      <option value="feed_distributor">দেশবন্ধু এগ্রো ফিড ডিস্ট্রিবিউটরশিপ নিতে চাই</option>
                    </select>
                  </div>

                  {/* Conditional Fields based on purpose */}
                  {regForm.purpose === 'medical_training' && (
                    <div className="space-y-1 animate-fade-in">
                      <label className="font-bold text-slate-600 block">মনোনীত পল্লী চিকিৎসা কোর্স নির্বাচন করুন:</label>
                      <select
                        value={regForm.selectedCourse}
                        onChange={(e) => setRegForm({...regForm, selectedCourse: e.target.value})}
                        className="w-full border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                      >
                        <option value="LMAF">LMAF (১ বছর মেয়াদী - প্রাথমিক চিকিৎসা)</option>
                        <option value="Paramedical">Paramedical (২ বছর মেয়াদী - কমিউনিটি প্যারামেডিক)</option>
                        <option value="RMP">RMP (৬ মাস মেয়াদী - রেজিস্টার্ড মেডিকেল প্র্যাক্টিশনার)</option>
                        <option value="DMS">DMS/DMSS (২-৩ বছর মেয়াদী - ডিপ্লোমা ইন মেডিসিন অ্যান্ড সার্জারি)</option>
                      </select>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 block">অতিরিক্ত বার্তা / জমির সুনির্দিষ্ট বিবরণ বা চাহিদা (ঐচ্ছিক):</label>
                    <textarea 
                      rows="4"
                      value={regForm.customNotes}
                      onChange={(e) => setRegForm({...regForm, customNotes: e.target.value})}
                      placeholder="জমির ক্ষেত্রে আপনার পছন্দের লোকেশন, বাজেট বা পোল্ট্রি খামারের আয়তন বিস্তারিত লিখুন..."
                      className="w-full border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-700 to-emerald-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:from-emerald-800 hover:to-emerald-700 transition"
                  >
                    রেজিস্ট্রেশন সাবমিট করুন
                  </button>
                </form>

                {regSuccess && (
                  <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl text-center space-y-2 animate-fade-in">
                    <CheckCircle size={32} className="text-emerald-600 mx-auto" />
                    <h5 className="font-black text-emerald-800 text-sm">রেজিস্ট্রেশন সফলভাবে সম্পন্ন হয়েছে!</h5>
                    <p className="text-xs text-emerald-700">এভারগ্রিন গ্রুপের সংশ্লিষ্ট বিভাগ থেকে ২৪ ঘণ্টার মধ্যে সরাসরি আপনার সাথে যোগাযোগ করা হবে।</p>
                  </div>
                )}
              </div>

              {/* Right Column: Contact info & Doc Verification */}
              <div className="lg:col-span-5 space-y-8">
                
                {/* 1. Official Address & Contact Panel */}
                <div className="bg-gradient-to-br from-emerald-850 to-emerald-950 text-white p-6 md:p-8 rounded-3xl shadow-xl space-y-6">
                  <h4 className="font-black text-amber-300 text-lg border-b border-emerald-800 pb-3 flex items-center gap-2">
                    <MapPin size={20} />
                    <span>প্রধান কার্যালয়ের ঠিকানা</span>
                  </h4>

                  <div className="space-y-4 text-xs md:text-sm">
                    <div className="space-y-1">
                      <p className="text-slate-400 uppercase tracking-widest font-bold text-[10px]">EVERGREEN REAL ESTATE MEDIA</p>
                      <p className="font-bold text-slate-100">গাজীপুর সদর, মেট্রোপলিটন পুলিশ হেডকোয়ার্টার সংলগ্ন নাটা রোড, গাজীপুর-১৭০২, বাংলাদেশ।</p>
                    </div>

                    <div className="space-y-1 pt-2">
                      <p className="text-slate-400 uppercase tracking-widest font-bold text-[10px]">অফিসিয়াল হটলাইন</p>
                      <p className="font-bold text-slate-100">০১৯৪৭-৮২২৩৯৯</p>
                      <p className="font-bold text-slate-100">+৮৮০ ১৯৬৯-১৪৯৭১১</p>
                    </div>

                    <div className="space-y-1 pt-2">
                      <p className="text-slate-400 uppercase tracking-widest font-bold text-[10px]">অফিসিয়াল ওয়েবসাইট</p>
                      <p className="font-medium text-slate-100">DeshbondhuAgroFeed.com</p>
                      <p className="font-medium text-slate-100">EvergreenGroup999.com</p>
                    </div>
                  </div>
                </div>

                {/* 2. Interactive Document Verification Widget */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <h4 className="font-black text-slate-800 text-sm flex items-center gap-2">
                    <ShieldCheck size={18} className="text-emerald-600" />
                    <span>আইনি দলিল ভেরিফিকেশন সার্ভিস</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    আপনার কেনা জমির দলিল নাম্বার বা মিউটেশন খতিয়ান ট্র্যাকিং আইডি এখানে দিয়ে আমাদের অভিজ্ঞ ইনভেস্টিগেশন টিম দ্বারা সরাসরি পরীক্ষা করতে পারেন।
                  </p>

                  <form onSubmit={handleDocVerification} className="space-y-3">
                    <input
                      type="text"
                      required
                      placeholder="দলিল বা খতিয়ান আইডি দিন (উদাঃ ১৫৩/২৬)"
                      value={verificationSerial}
                      onChange={(e) => setVerificationSerial(e.target.value)}
                      className="w-full border border-slate-200 px-3 py-2.5 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full bg-slate-900 text-white font-bold text-xs py-2.5 rounded-xl shadow-md hover:bg-slate-800 transition"
                    >
                      আইনি রেকর্ড ভেরিফাই করুন
                    </button>
                  </form>

                  {/* Verification Mock Result */}
                  {verificationResult && (
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-2 text-xs animate-fade-in">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                        <CheckCircle size={16} className="text-emerald-600" />
                        <span>দলিল রেকর্ড স্ট্যাটাস: নিরাপদ (SECURE)</span>
                      </div>
                      <div className="space-y-1 text-slate-700 text-[11px]">
                        <p><strong>আইডি:</strong> {verificationResult.serial}</p>
                        <p><strong>মালিকের নাম:</strong> {verificationResult.ownerName}</p>
                        <p><strong>মৌজা:</strong> {verificationResult.mouza}</p>
                        <p><strong>স্ট্যাটাস:</strong> {verificationResult.mutationStatus}</p>
                        <p><strong>যাচাইকারী:</strong> {verificationResult.investigator}</p>
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>
        )}

      </main>

      {/* --- PREMIUM FOOTER --- */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <h4 className="text-white font-black text-lg tracking-wider uppercase leading-none">
              EVERGREEN <span className="text-amber-400 block text-xs mt-1 font-bold">REAL ESTATE MEDIA</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              আবাসিক, বাণিজ্যিক ও শিল্প প্রকল্পের জন্য জমি সংগ্রহ, আধুনিক এগ্রো-পোল্ট্রি ও মৎস্য খামার প্রশিক্ষণ এবং মানসম্পন্ন দেশবন্ধু এগ্রো ফিড প্রক্রিয়াকরণ ও সরবরাহের সমন্বিত প্ল্যাটফর্ম।
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="text-white font-bold text-sm">সহযোগী সংস্থাসমূহ</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• বাংলাদেশ পল্লী চিকিৎসা ট্রেনিং সেন্টার</li>
              <li>• বাংলাদেশ পোল্ট্রি অ্যান্ড ফিশ ফার্মার্স অ্যাসোসিয়েশন</li>
              <li>• দেশবন্ধু এগ্রো ফিড লিমিটেড</li>
              <li>• এভারগ্রিন ইনভেস্টিগেশন ও লিগ্যাল উইং</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-white font-bold text-sm">প্রশিক্ষণ কোর্সসমূহ</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• LMAF (১ বছর মেয়াদী চিকিৎসা)</li>
              <li>• Community Paramedical ডিপ্লোমা</li>
              <li>• আধুনিক পোল্ট্রি খামার ব্যবস্থাপনা (৪ মাস)</li>
              <li>• সুষম মাছ চাষ ও মৎস্য ব্যবস্থাপনা (৪ মাস)</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-white font-bold text-sm">যোগাযোগ ও লোকেশন</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              মেট্রোপলিটন পুলিশ হেডকোয়ার্টার সংলগ্ন নাটা রোড, গাজীপুর-১৭০২, বাংলাদেশ। <br />
              হটলাইন: ০১৯৪৭-৮২২৩৯৯
            </p>
            <div className="pt-2">
              <span className="bg-amber-400 text-slate-900 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider block w-fit">
                নিরাপদ জমি নিশ্চিত ভবিষ্যৎ
              </span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Evergreen Real Estate Media. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex gap-4">
            <a onClick={() => changeTab('home')} className="hover:text-emerald-400 cursor-pointer">হোমপেজ</a>
            <a onClick={() => changeTab('properties')} className="hover:text-emerald-400 cursor-pointer">নিরাপদ জমি</a>
            <a onClick={() => changeTab('calculator')} className="hover:text-emerald-400 cursor-pointer">ট্যাক্স ক্যালকুলেটর</a>
          </div>
        </div>
      </footer>
    </div>
  );
}