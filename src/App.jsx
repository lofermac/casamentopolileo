import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiFillHeart, AiOutlineHeart, AiFillGift, AiOutlineCalendar, AiFillEnvironment, AiOutlineClose, AiFillCheckCircle } from 'react-icons/ai';
import { GiSurfBoard, GiCoffeeCup, GiFlowerPot } from 'react-icons/gi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Howl } from 'howler';
import { FaWhatsapp, FaArrowUp, FaChevronDown, FaUser, FaGift } from 'react-icons/fa';
import macucoImg from './assets/macuco.png';
import cataratasImg from './assets/cataratas.png';
import jantarImg from './assets/jantar.png';
import presenteImg from './assets/presente.png';
import avesImg from './assets/aves.png';
import operaArteLogo from './assets/opera-arte.webp';
import cataratasPremiumImg from './assets/catarataspremium.png';
import hotelVipImg from './assets/hotelvip.png';
import patronoImg from './assets/patrono.png';

// ---------- Configuráveis (edite aqui) -----------------
const pixKey = '00020126...SEU_PIX...';
const whatsappNumber = '+5511999999999';
const pixCodes = {
  'Parque das Aves': '00020126360014BR.GOV.BCB.PIX0114+55419995811255204000053039865406350.005802BR5918Poliana Lara Braun6008Curitiba62170513ParqueDasAves6304B6C6',
  'Passeio nas Cataratas': '00020126360014BR.GOV.BCB.PIX0114+55419995811255204000053039865406600.005802BR5918Poliana Lara Braun6008Curitiba62200516PasseioCataratas6304E935',
  'Macuco Safari': '00020126360014BR.GOV.BCB.PIX0114+55419995811255204000053039865406800.005802BR5918Poliana Lara Braun6008Curitiba62160512MacucoSafari6304AAD2',
  'Jantar Argentino': '00020126360014BR.GOV.BCB.PIX0114+55419995811255204000053039865406500.005802BR5918Poliana Lara Braun6008Curitiba62190515JantarArgentino6304A3D5',
  'Cota Secreta do Amor': '00020126360014BR.GOV.BCB.PIX0114+554199958112552040000530398654071000.005802BR5918Poliana Lara Braun6008Curitiba62120508CotaAmor63049947',
};

const customPixCodes = {
  150: '00020126360014BR.GOV.BCB.PIX0114+55419995811255204000053039865406150.005802BR5918Poliana Lara Braun6008Curitiba62120508Presente63047FD3',
  200: '00020126360014BR.GOV.BCB.PIX0114+55419995811255204000053039865406200.005802BR5918Poliana Lara Braun6008Curitiba62120508Presente6304202C',
  250: '00020126360014BR.GOV.BCB.PIX0114+55419995811255204000053039865406250.005802BR5918Poliana Lara Braun6008Curitiba62120508Presente6304AA72',
  300: '00020126360014BR.GOV.BCB.PIX0114+55419995811255204000053039865406300.005802BR5918Poliana Lara Braun6008Curitiba62120508Presente63046CB3',
};

const experiences = [
  {
    value: 600,
    title: 'Passeio nas Cataratas',
    icon: '💦',
    img: cataratasImg,
    joke: 'Selfie molhada, arco-íris garantido e muita risada nas alturas!',
    popular: true
  },
  {
    value: 800,
    title: 'Macuco Safari',
    icon: '🛶',
    img: macucoImg,
    joke: 'Ajude o Léo a voltar ensopado! Prometemos vídeo de agradecimento nos stories.',
    legendary: true
  },
  {
    value: 350,
    title: 'Parque das Aves',
    icon: '🦜',
    img: avesImg,
    joke: 'Selfie divertida com arara? Só falta seu empurrãozinho para acontecer!',
    popular: true
  },
  {
    value: 500,
    title: 'Jantar Argentino',
    icon: '🍷',
    img: jantarImg,
    joke: 'Brinde de vinho e dancinha de tango exclusiva para quem bancar essa experiência.',
  },
  {
    value: 1000,
    title: 'Cota Secreta do Amor',
    icon: '🎁',
    img: presenteImg,
    joke: 'Ousou liberar? Surpresa VIP misteriosa na lua de mel e vídeo exclusivo de agradecimento.',
    legendary: true
  },
];

const testimonials = [
  '“Nunca vi tanta água nem tanta risada: Poliana e Léo molhados da cabeça aos pés, mas felizes da vida!” — Turista Aleatório, 2030',
  '“O vídeo do tango na fronteira deveria virar patrimônio cultural!” — Influencer Viajante, 2032',
  '“A selfie com o quati... só quem viveu sabe!” — Padrinho Anônimo, 2031'
];

// memories array
const memories = [
  {
    src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=60',
    caption: "Momento: 'só queria um café decente' — Paris, 2022"
  },
  {
    src: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=600&q=60',
    caption: 'Leonardo tentando cozinhar — Spoiler: queimou até água!'
  },
  {
    src: 'https://images.unsplash.com/photo-1529626455591-2a3d4c3b14dd?auto=format&fit=crop&w=600&q=60',
    caption: 'Poliana correndo atrás do pôr do sol perfeito — Bali, 2023'
  },
  {
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=60',
    caption: 'Selfie 98 tentativas — Roma, 2021'
  },
];

// possibilities array
const possibilities=[
  {icon:'🛶',text:'Léo no Macuco igual um doido: selfie toda molhada e óculos embaçado (prometemos postar nos stories)'},
  {icon:'🦝',text:'Poliana enfrentando o quati no café da manhã do hotel (spoiler: o quati ganha)'},
  {icon:'📸',text:'Selfie romântica nas Cataratas que provavelmente vai virar meme de família'},
  {icon:'🎤',text:'Passeio noturno na Argentina: risco real de Léo desafinar no karaokê de Puerto Iguazú'},
  {icon:'🛁',text:'Fotos de roupão no hotel: quanto mais apoio, mais chances de mandar cartão postal pra você!'},
  {icon:'🦜',text:'Parque das Aves: Poliana filosofando com os tucanos (e Léo morrendo de medo dos flamingos)'},
];

const honorGifts = [
  {
    value: 1500,
    title: 'VIP Cataratas',
    img: cataratasPremiumImg,
    icon: '👑',
    pix: '00020126360014BR.GOV.BCB.PIX0114+554199958112552040000530398654071500.005802BR5918Poliana Lara Braun6008Curitiba62180514HonraCataratas63048E99',
    joke: 'Guia exclusivo nas quedas, brinde gourmet, fotos profissionais e vídeo VIP de agradecimento. A aventura mais épica que poderíamos ter!'
  },
  {
    value: 2500,
    title: 'Noite Real Hotel',
    img: hotelVipImg,
    icon: '💎',
    pix: '00020126360014BR.GOV.BCB.PIX0114+554199958112552040000530398654072500.005802BR5918Poliana Lara Braun6008Curitiba62140510HonraHotel6304B6C0',
    joke: 'Suíte master com vista incrível, tratamento de spa completo, jantar privativo, mordomias de rei e rainha e brinde deluxe. Uma noite digna de contos!'
  },
  {
    value: 5000,
    title: 'Patrono Lua de Mel',
    img: patronoImg,
    icon: '🏆',
    pix: '00020126360014BR.GOV.BCB.PIX0114+554199958112552040000530398654075000.005802BR5918Poliana Lara Braun6008Curitiba62110507Patrono63046928',
    joke: 'Seu nome eternizado no nosso álbum, vídeo exclusivo de agradecimento, presente surpresa premium, certificado digital de patrono e spoilers da viagem em primeira mão!'
  },
];
// -------------------------------------------------------

// Hook para gerenciar tema
const useTheme = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);
  return [theme, setTheme];
};

const TARGET_GOAL = 100; // porcentagem meta

const App = () => {
  const [modalGift, setModalGift] = useState(null);
  const [copied, setCopied] = useState(false);
  const [counter, setCounter] = useState(72);
  const [theme, setTheme] = useTheme();
  const [rainHearts, setRainHearts] = useState([]);
  const [donations, setDonations] = useState([]);
  const names = ['Maria','Carlos','Ana','Pedro','Juliana','Bruno','Fernanda','Rafael'];
  const [customAmount, setCustomAmount] = useState(150);
  const [heartClicks,setHeartClicks]=useState(0);
  const [ninjaUnlocked,setNinjaUnlocked]=useState(false);
  const [showScroll,setShowScroll]=useState(false);
  const [piano,setPiano]=useState(null);

  // Audio sinos
  useEffect(() => {
    const sound = new Howl({ src: ['https://assets.mixkit.co/sfx/preview/mixkit-bell-notification-933.mp3'], volume: 0.2 });
    sound.play();
  }, []);

  // Fake counter increment
  useEffect(() => {
    const int = setInterval(() => setCounter((c) => (c < 40 ? c + 1 : c)), 8000);
    return () => clearInterval(int);
  }, []);

  useEffect(()=>{
    const interval = setInterval(()=>{
      const exp = experiences[Math.floor(Math.random()*experiences.length)];
      const name = names[Math.floor(Math.random()*names.length)];
      const message = `${name} contribuiu com R$${exp.value} e liberou ${exp.title}!`;
      setDonations((d)=> [message, ...d].slice(0,5));
    }, 8000);
    return ()=>clearInterval(interval);
  },[]);

  useEffect(()=>{
    const onScroll=()=>{setShowScroll(window.scrollY>400)};
    window.addEventListener('scroll',onScroll);
    return()=>window.removeEventListener('scroll',onScroll);
  },[]);

  const copyPix = () => {
    let codeToCopy = pixKey;
    if (modalGift) {
      // Verifica se é um presente de honra
      const honor = honorGifts.find(g => g.title === modalGift.title);
      if (honor && honor.pix) {
        codeToCopy = honor.pix;
      } else if (pixCodes[modalGift.title]) {
        codeToCopy = pixCodes[modalGift.title];
      }
    } else if (customPixCodes[customAmount]) {
      codeToCopy = customPixCodes[customAmount];
    }
    console.log('analytics: copy_pix', { amount: modalGift?.value || Number(customAmount) || 0 });
    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    const ids=Array.from({length:20},(_,i)=>Date.now()+i);
    setRainHearts(prev=>[...prev,...ids]);
    setTimeout(()=>{
      setRainHearts(prev=>prev.filter(id=>!ids.includes(id)));
    },4000);
    setTimeout(() => setCopied(false), 3000);
  };

  // Confetti pieces for thank you
  const confettiPieces = Array.from({ length: 30 });

  // Countdown
  const [countdown,setCountdown]=useState({days:0,hours:0,minutes:0,seconds:0});
  useEffect(()=>{
    const target=new Date('2025-07-19T00:00:00');
    const tick=()=>{
      const now=new Date();
      const diff= target - now;
      if(diff<=0){setCountdown({days:0,hours:0,minutes:0,seconds:0});return;}
      const d=Math.floor(diff/(1000*60*60*24));
      const h=Math.floor((diff/(1000*60*60))%24);
      const m=Math.floor((diff/60000)%60);
      const s=Math.floor((diff/1000)%60);
      setCountdown({days:d,hours:h,minutes:m,seconds:s});
    };
    tick();
    const int=setInterval(tick,1000);
    return()=>clearInterval(int);
  },[]);

  const playPiano = () => {
    if(!piano){
      const p = new Howl({src:['https://assets.mixkit.co/music/download/mixkit-soft-piano-melody-495.mp3'],volume:0.15});
      setPiano(p);
      p.play();
    } else if(!piano.playing()){ piano.play(); }
  };

  useEffect(() => {
    if (modalGift) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modalGift]);

  return (
    <div className={`font-sans text-stone-800 min-h-screen overflow-x-hidden ${theme==='dark' ? 'bg-animated-dark' : 'bg-animated'}`}>
      {/* Hearts rain */}
      {rainHearts.map((id)=>(
        <AiFillHeart key={id} className="text-rose/70 fixed left-1/2 rain-heart" style={{fontSize:`${14+Math.random()*20}px`, marginLeft:`${(Math.random()*200-100)}px`}} />
      ))}

      {/* SAVE THE DATE HERO */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center pt-20 sm:pt-24 pb-10 text-center px-6 bg-paper relative overflow-hidden">
        {/* Logo Ópera Arte */}
        <img src={operaArteLogo} alt="Ópera Arte" className="mx-auto mb-6 w-40 h-auto drop-shadow-lg" />
        {/* Ornamental lines */}
        <svg className="absolute top-0 right-0 w-40 h-40" viewBox="0 0 100 100"><path d="M100 0 C70 40 30 60 0 100" className="ornament-line"/></svg>
        <svg className="absolute bottom-0 left-0 w-40 h-40 rotate-180" viewBox="0 0 100 100"><path d="M100 0 C70 40 30 60 0 100" className="ornament-line"/></svg>

        {/* HEADINGS */}
        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8}} className="tracking-[0.3em] text-taupe uppercase text-sm mb-8">Save the Date</motion.p>

        <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.8}} className="font-hand text-4xl sm:text-5xl md:text-6xl text-taupe mb-1">Poliana</motion.h1>
        <motion.span initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}} className="text-taupe text-2xl mb-1">+</motion.span>
        <motion.h2 initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{delay:0.6,duration:0.8}} className="font-hand text-4xl sm:text-5xl md:text-6xl text-taupe mb-6">Leonardo</motion.h2>

        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.8,duration:0.8}} className="text-stone-600 tracking-[0.3em] text-sm sm:text-base mb-12">19 • 07 • 2025</motion.p>

        {/* COUNTDOWN */}
        <motion.h3 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1,duration:0.8}} className="font-hand text-2xl text-taupe mb-4">Contagem Regressiva</motion.h3>

        <div className="flex gap-2 sm:gap-3 justify-center">
          <div className="count-block w-16 sm:w-20"><motion.div key={countdown.days} initial={{scale:0.9,opacity:0.6}} animate={{scale:1,opacity:1}} className="count-number animate-pulse-soft">{String(countdown.days).padStart(2,'0')}</motion.div><div className="count-label">dias</div></div>
          <div className="count-block w-16 sm:w-20"><motion.div key={countdown.hours} initial={{scale:0.9,opacity:0.6}} animate={{scale:1,opacity:1}} className="count-number animate-pulse-soft">{String(countdown.hours).padStart(2,'0')}</motion.div><div className="count-label">horas</div></div>
          <div className="count-block w-16 sm:w-20"><motion.div key={countdown.minutes} initial={{scale:0.9,opacity:0.6}} animate={{scale:1,opacity:1}} className="count-number animate-pulse-soft">{String(countdown.minutes).padStart(2,'0')}</motion.div><div className="count-label">minutos</div></div>
          <div className="count-block w-16 sm:w-20"><motion.div key={countdown.seconds} initial={{scale:0.9,opacity:0.6}} animate={{scale:1,opacity:1}} className="count-number animate-pulse-soft">{String(countdown.seconds).padStart(2,'0')}</motion.div><div className="count-label">segundos</div></div>
        </div>
      </section>

      {/* PRESENTES DE HONRA */}
      <section id="honra" className="py-16 px-6 md:px-20 bg-paper honra-mobile-spacing">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-yellow-700 drop-shadow-lg">Presentes de Honra ✨</h2>
        <p className="text-center max-w-2xl mx-auto mb-10 text-lg text-yellow-900 font-medium">
          Para convidados que querem marcar nossa história com experiências realmente inesquecíveis!<br/>
          São presentes premium, dignos de honra, que vão transformar nossa lua de mel em algo épico. Se quiser nos surpreender de verdade, escolha um desses e prepare-se para um agradecimento VIP! 🏅
        </p>
        <div className="grid sm:grid-cols-3 gap-8 items-stretch">
          {honorGifts.map((gift) => (
            <motion.div key={gift.value} whileHover={{ scale: 1.09, rotateX: -4, rotateY: 4 }} whileTap={{ scale: 0.97 }} className="cursor-pointer select-none [perspective:1000px]">
              <div
                onClick={() => {console.log('analytics: open_honor_gift_modal', {title:gift.title,value:gift.value}); setModalGift(gift)} }
                className="gift-card premium-gold-card border-4 border-yellow-400 transition-transform min-h-[560px] p-6"
              >
                <span className="absolute top-4 right-4 bg-yellow-300 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-gold animate-premium-float border border-yellow-400">Honra</span>
                <div className="gift-img w-[220px] h-[220px] flex items-center justify-center bg-white border-4 border-white rounded-[1rem] mb-4 text-5xl text-yellow-500 premium-gold-placeholder" style={{boxShadow:'0 2px 6px rgba(0,0,0,0.05)'}}>
                  {gift.img
                    ? <img src={gift.img} alt={gift.title} className="w-full h-full object-cover rounded-[1rem]" />
                    : <span>{gift.icon}</span>
                  }
                </div>
                <div className="flex flex-col flex-grow justify-start">
                  <h3 className="font-hand text-lg mb-2 text-yellow-800 font-extrabold drop-shadow-gold text-center whitespace-nowrap">{gift.title}</h3>
                  <p className="text-sm text-stone-700 mb-3 max-w-xs mx-auto leading-relaxed text-center">{gift.joke}</p>
                  <span className="gift-value text-yellow-700 premium-gold-value text-center block">R$ {gift.value}</span>
                </div>
                <button className="gift-btn premium-gold-btn bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 text-black font-extrabold animate-gold-glow mt-2">Quero presentear com Honra!</button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GIFTS */}
      <section id="presente" className="py-16 px-6 md:px-20 bg-paper">
        <h2 className="text-3xl font-semibold text-center mb-6">Presenteie com Amor (e Riso) 😄</h2>
        <p className="text-center max-w-xl mx-auto mb-8">Nosso maior sonho? Uma lua de mel épica em Foz do Iguaçu! Se quiser deixar nossa viagem lendária, escolha abaixo uma experiência para patrocinar. Sua presença é tudo — mas sua contribuição pode transformar cada passeio em algo inesquecível! 🌈✨</p>
        {/* Barra de Progresso moderna */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-4xl">
            <div className="progress-wrapper shadow-2xl border border-rose-200/70" style={{boxShadow:'0 6px 32px 0 rgba(248,183,190,0.18), 0 1.5px 8px 0 rgba(244,151,163,0.10)'}}>
              <div
                className="progress-bar transition-all duration-1000"
                style={{ 
                  width: `${Math.min((counter / TARGET_GOAL) * 100, 100)}%`,
                  background: 'linear-gradient(90deg,#f8b7be 0%,#f497a3 50%,#ffe1ec 100%)',
                  boxShadow: '0 2px 12px 0 #f8b7be55',
                  animation: 'gradient-bg 3s ease-in-out infinite',
                }}
              />
              <span className="progress-text text-lg font-bold text-[#3E2723] tracking-tight" style={{letterSpacing:'-0.01em'}}>
                Nossa lua de mel está quase lá! 🚀
              </span>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-6 items-stretch">
          {experiences.map((exp) => (
            <motion.div key={exp.value} whileHover={{ scale: 1.07, rotateX: -5, rotateY: 5 }} whileTap={{ scale: 0.95 }} className="cursor-pointer select-none [perspective:1000px]">
              <div
                onClick={() => {console.log('analytics: open_gift_modal', {title:exp.title,value:exp.value}); setModalGift(exp)} }
                className="gift-card p-6 text-center relative flex flex-col h-full"
              >
                {(exp.popular || exp.legendary) && (
                  <span className="ribbon">{exp.legendary ? 'Lendário' : 'Favorita!'}</span>
                )}
                {exp.img ? (<img src={exp.img} alt={exp.title} className="gift-img mb-6" />)
                 : (<div className="gift-img flex items-center justify-center text-[10px] text-taupe/60 mb-6 text-center leading-tight">Insira
imagem
aqui</div>)}
                <div className="flex flex-col flex-grow justify-start">
                  <h3 className="font-hand text-xl mb-2 text-taupe">{exp.title}</h3>
                  <p className="text-sm text-stone-700 mb-3 max-w-xs mx-auto leading-relaxed">{exp.joke}</p>
                  <span className="gift-value">R$ {exp.value}</span>
                </div>
                <button className="gift-btn w-full">Quero presentear!</button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Donations ticker */}
      <section className="py-16 px-6 md:px-20 bg-paper flex flex-col items-center">
        <div className="w-full max-w-xl mx-auto rounded-3xl shadow-xl border border-rose-100/60 bg-white/80 backdrop-blur-lg p-8">
          <h3 className="font-semibold text-2xl text-center mb-2 text-taupe tracking-tight">Presentes Recentes</h3>
          <p className="text-center text-base text-stone-700 mb-6 font-medium">Cada presente faz nossa lua de mel ainda mais inesquecível! Veja quem já embarcou nessa e inspire-se a deixar sua marca 💖</p>
          <ul className="space-y-3 text-base">
            {(() => {
              // Filtrar para não repetir nomes (apenas a doação mais recente de cada pessoa)
              const seen = new Set();
              const filtered = [];
              for (let i = 0; i < donations.length; i++) {
                const d = donations[i];
                const match = d.match(/(\w+) contribuiu com (R\$\d+) e liberou (.+)!/);
                let nome, valor, presente;
                if (match) {
                  nome = match[1];
                  valor = match[2];
                  presente = match[3];
                } else {
                  nome = '';
                  valor = '';
                  presente = d;
                }
                if (!seen.has(nome)) {
                  seen.add(nome);
                  filtered.push({ nome, valor, presente });
                }
              }
              return filtered.map(({ nome, valor, presente }, idx) => {
                // Buscar o emoji do presente pelo nome
                const exp = experiences.find(e => presente && presente.toLowerCase().includes(e.title.toLowerCase()));
                const emoji = exp ? exp.icon : '🎁';
                return (
                  <li key={idx} className="flex items-center gap-3 text-stone-800 font-medium bg-rose-50/60 rounded-xl px-4 py-2 shadow-sm border border-rose-100/40">
                    <span className="text-2xl animate-premium-float" aria-label="ícone do presente">{emoji}</span>
                    <span>
                      <span className="font-bold text-rose-500">{nome}</span> <span className="text-stone-500">presenteou com</span> <span className="font-bold text-emerald-600">{valor}</span> <span className="text-stone-500">em</span> <span className="font-bold italic text-taupe">{presente}</span>
                    </span>
                  </li>
                );
              });
            })()}
          </ul>
        </div>
      </section>

      {/* COTA LIVRE */}
      <section className="py-16 px-6 md:px-20 bg-paper">
        <h2 className="text-2xl font-semibold text-center mb-4">Não achou seu presente?</h2>
        <p className="text-center max-w-lg mx-auto mb-6 text-sm">Qualquer valor já faz nossa aventura mais épica! Escolha o valor abaixo e copie o nosso Pix 💖</p>
        <div className="max-w-sm mx-auto bg-white/60 dark:bg-stone-700/50 backdrop-blur rounded-3xl p-6 text-center shadow flex flex-col items-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={() => setCustomAmount(a => {
                const options = [150, 200, 250, 300];
                const idx = options.indexOf(Number(a));
                return options[Math.max(0, idx - 1)];
              })}
              className="bg-rose/20 text-rose-700 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold hover:bg-rose/30 transition"
              aria-label="Diminuir valor"
            >
              –
            </button>
            <span className="text-3xl font-bold text-taupe min-w-[120px] text-center select-none">R$ {customAmount}</span>
            <button
              onClick={() => setCustomAmount(a => {
                const options = [150, 200, 250, 300];
                const idx = options.indexOf(Number(a));
                return options[Math.min(options.length - 1, idx + 1)];
              })}
              className="bg-rose/20 text-rose-700 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold hover:bg-rose/30 transition"
              aria-label="Aumentar valor"
            >
              +
            </button>
          </div>
          <button
            onClick={copyPix}
            className="bg-rose text-white w-full py-3 rounded-full hover:brightness-110 transition flex items-center justify-center gap-2 text-lg font-semibold mt-2"
          >
            <AiFillGift/> Copiar PIX
          </button>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 px-6 bg-paper">
        <h2 className="text-3xl font-semibold text-center mb-10 text-taupe">Depoimentos do Futuro 🔮</h2>
        <div className="space-y-8 max-w-xl mx-auto">
          {testimonials.map((t, idx) => {
            // Separar depoimento e autor
            const match = t.match(/(.+)[—-]\s*(.+)/);
            const texto = match ? match[1].replace(/[""]/g, '') : t;
            const autor = match ? match[2] : '';
            return (
              <motion.blockquote
                key={idx}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/70 rounded-2xl p-8 shadow-xl border border-rose-100/50 flex flex-col items-center relative"
              >
                <span className="text-5xl text-rose-200 absolute -top-8 left-6 select-none">"</span>
                <p className="text-lg text-stone-700 font-medium text-center mb-4 z-10">{texto}</p>
                <span className="text-taupe font-semibold text-base z-10">{autor}</span>
              </motion.blockquote>
            );
          })}
        </div>
      </section>

      {/* MEMORIES */}
      {/* POSSIBILIDADES ÉPICAS */}
      <section className="py-16 px-6 md:px-20 bg-paper">
        <h2 className="text-3xl font-semibold text-center mb-8">O que pode acontecer nessa viagem… 🤔</h2>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={16}
          slidesPerView={1.1}
          breakpoints={{640:{slidesPerView:2.2},1024:{slidesPerView:3.2}}}
          autoplay={{delay:3500,disableOnInteraction:false}}
          loop={true}
          pagination={{clickable:true}}
          navigation
        >
          {possibilities.map((p,i)=>(
            <SwiperSlide key={i}>
              <motion.div whileHover={{y:-6}} className="bg-white dark:bg-stone-800 rounded-3xl p-6 shadow-sm text-center h-full flex flex-col justify-center">
                <div className="text-4xl mb-3">{p.icon}</div>
                <p className="text-sm leading-relaxed">{p.text}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-sm bg-paper text-stone-800 px-4 relative overflow-hidden">
        <p className="mb-2">Obrigado por fazer parte desse capítulo!</p>
        <p>Dúvidas? Fale com nossa cerimonialista: <a href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`} className="underline">{whatsappNumber}</a></p>
      </footer>

      {/* MODAL */}
      <AnimatePresence>
        {modalGift && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-[#F8F5F0]/95 flex items-center justify-center z-50 p-4"
            style={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              height: '100vh',
              minHeight: '100dvh',
              width: '100vw',
              padding: 'env(safe-area-inset-top, 16px) 0',
            }}
          >
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} transition={{ type: 'spring', bounce: 0.3 }} className="bg-white rounded-3xl w-full max-w-md p-8 sm:p-10 relative text-center border border-stone-200/80" style={{backgroundColor:'#fff'}}>
              <button className="absolute top-3 right-3 text-stone-500" onClick={() => setModalGift(null)}><AiOutlineClose size={24} /></button>
              <div className="text-6xl mb-4">{modalGift.icon}</div>
              <h3 className="text-[32px] font-bold mb-4 text-[#222]">{modalGift.title}</h3>
              <p className="text-[#333] text-base mb-5 leading-relaxed">{modalGift.joke}</p>
              <p className="mb-6 text-2xl font-bold text-[#222]">R$ {modalGift.value}</p>

              <button onClick={copyPix} className="bg-rose text-[#111] px-6 py-4 rounded-full w-full flex items-center justify-center gap-2 hover:brightness-110 transition mb-4 shadow-sm font-semibold">
                <AiFillGift /> Copiar PIX
              </button>

              {copied && (
                <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-green-700 flex items-center justify-center gap-1 mb-4 font-medium">
                  <AiFillCheckCircle /> Copiado!
                </motion.div>
              )}

              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 0.4 }} className="text-sm text-[#333] mb-4">
                🎉 Parabéns, você destravou uma conquista secreta!
              </motion.p>

              <a
                href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=Acabei%20de%20presentear%20${modalGift.title}%20para%20os%20noivos!`}
                className="underline text-sm text-rose-700 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Compartilhar no WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating share */}
      {!modalGift && (
        <a href={`https://wa.me/?text=Confere%20o%20site%20do%20casório%20do%20Léo%20e%20Poli!%20${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" title="Falar com os noivos" className="float-btn sm:hidden">
          <FaWhatsapp size={24}/>
        </a>
      )}
      {showScroll && (
        <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className="float-btn scroll-top">
          <FaArrowUp/>
        </button>
      )}

      {/* Ninja modal */}
      <AnimatePresence>
        {ninjaUnlocked && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/70 flex items-center justify-center z-[70] p-4">
            <motion.div initial={{scale:0.7}} animate={{scale:1}} exit={{scale:0.7}} className="bg-white rounded-3xl p-6 text-center">
              <h3 className="text-2xl font-bold mb-2">🚀 Cotista Ninja!</h3>
              <p className="mb-4 text-sm">Mandou bem! Que tal considerar a <strong>Cota Secreta do Amor</strong> e garantir um agradecimento VIP? 😎</p>
              <button onClick={()=>{console.log('analytics: ninja_modal_close'); setNinjaUnlocked(false);} } className="bg-rose text-white px-6 py-2 rounded-full">Fechar</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Luzes de palco */}
      {Array.from({length:12}).map((_,i)=>(
        <span key={`light-${i}`} className="stage-light note-edge" style={{
          left:`${Math.random()*100}%`,
          fontSize:`${4+Math.random()*6}px`,
          color: i%2? '#ffffffaa':'#ffd54faa',
        }}>•</span>
      ))}
    </div>
  );
};

export default App; 