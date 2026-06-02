import { useState, useEffect, useRef } from 'react';
import StarField from '@/components/StarField';
import PlanetDetail from '@/components/PlanetDetail';
import Icon from '@/components/ui/icon';
import { exoplanets, filterLabels, habitabilityColors, habitabilityLabels, type Exoplanet, type FilterType } from '@/data/exoplanets';

type Section = 'home' | 'catalog' | 'education';

const NAV_ITEMS: { id: Section; label: string }[] = [
  { id: 'home', label: 'Главная' },
  { id: 'catalog', label: 'Каталог' },
  { id: 'education', label: 'Материалы' },
];

const FILTERS: FilterType[] = ['all', 'habitable', 'potential', 'hostile', 'super-earth'];

const educationItems = [
  {
    emoji: '🔭',
    title: 'Что такое экзопланета?',
    text: 'Экзопланета — любая планета за пределами нашей Солнечной системы. Первую подтверждённую экзопланету обнаружили в 1992 году. Сегодня известно более 5 600 экзопланет.',
    tag: 'Основы',
    color: '#00e5ff',
  },
  {
    emoji: '🌡️',
    title: 'Зона обитаемости',
    text: 'Зона обитаемости — область вокруг звезды, где температура позволяет воде существовать в жидком виде. Её называют "зоной Златовласки": не слишком горячо, не слишком холодно.',
    tag: 'Наука',
    color: '#39ff14',
  },
  {
    emoji: '🛸',
    title: 'Как находят экзопланеты?',
    text: 'Главный метод — транзитный: когда планета проходит перед звездой, блокируя часть её света. Телескоп Кеплер открыл более 2 600 экзопланет именно так.',
    tag: 'Методы',
    color: '#b400ff',
  },
  {
    emoji: '🧬',
    title: 'Поиск жизни',
    text: 'Астробиологи ищут биосигнатуры: кислород, метан, вода в атмосферах экзопланет. Телескоп Джеймс Уэбб впервые позволяет анализировать состав атмосфер землеподобных планет.',
    tag: 'Астробиология',
    color: '#ff0080',
  },
  {
    emoji: '📏',
    title: 'Типы экзопланет',
    text: 'Горячие юпитеры — газовые гиганты близко к звезде. Суперземли — скалистые планеты крупнее Земли. Мини-Нептуны — ледяные миры. Землеподобные — самые редкие и ценные.',
    tag: 'Классификация',
    color: '#FFD54F',
  },
  {
    emoji: '🚀',
    title: 'Будущее исследований',
    text: 'К 2030-м годам планируется запуск телескопа LUVOIR, способного напрямую фотографировать землеподобные экзопланеты. Это может стать поворотным моментом в истории науки.',
    tag: 'Будущее',
    color: '#FF8A65',
  },
];

export default function Index() {
  const [section, setSection] = useState<Section>('home');
  const [selectedPlanet, setSelectedPlanet] = useState<Exoplanet | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [heroVisible, setHeroVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filtered = exoplanets.filter((p) => {
    const matchesFilter = activeFilter === 'all' || p.filterType === activeFilter;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleNav = (s: Section) => {
    setSection(s);
    setSelectedPlanet(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedPlanet) {
    return (
      <div style={{ background: 'var(--space-dark)', minHeight: '100vh' }}>
        <StarField />
        <nav
          className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4"
          style={{
            background: 'rgba(5,7,20,0.85)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(0,229,255,0.1)',
          }}
        >
          <span className="font-orbitron text-sm neon-text-cyan tracking-widest">✦ EXOPLANETS</span>
          <div className="flex gap-1">
            {NAV_ITEMS.map((n) => (
              <button
                key={n.id}
                onClick={() => handleNav(n.id)}
                className="px-4 py-2 text-xs font-orbitron rounded-lg transition-all text-white/40 hover:text-cyan-400"
              >
                {n.label}
              </button>
            ))}
          </div>
        </nav>
        <div className="pt-20">
          <PlanetDetail planet={selectedPlanet} onBack={() => setSelectedPlanet(null)} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--space-dark)', minHeight: '100vh' }}>
      <StarField />

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(5,7,20,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,229,255,0.1)' : '1px solid transparent',
        }}
      >
        <button
          onClick={() => handleNav('home')}
          className="font-orbitron text-sm neon-text-cyan tracking-widest hover:opacity-80 transition-opacity"
        >
          ✦ EXOPLANETS
        </button>
        <div className="flex gap-1">
          {NAV_ITEMS.map((n) => (
            <button
              key={n.id}
              onClick={() => handleNav(n.id)}
              className="px-4 py-2 text-xs font-orbitron rounded-lg transition-all"
              style={{
                color: section === n.id ? '#00e5ff' : 'rgba(255,255,255,0.5)',
                background: section === n.id ? 'rgba(0,229,255,0.08)' : 'transparent',
                border: section === n.id ? '1px solid rgba(0,229,255,0.25)' : '1px solid transparent',
              }}
            >
              {n.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── HOME ── */}
      {section === 'home' && (
        <div>
          {/* Hero */}
          <section
            ref={heroRef}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4"
          >
            <div
              className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
              style={{
                border: '1px solid rgba(0,229,255,0.06)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
            <div
              className="absolute w-[900px] h-[900px] rounded-full pointer-events-none"
              style={{
                border: '1px solid rgba(180,0,255,0.04)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />

            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 1s ease',
              }}
            >
              <p className="font-orbitron text-xs tracking-[0.4em] text-white/30 mb-6 uppercase">
                Млечный путь · {exoplanets.length} планет
              </p>

              <h1
                className="font-orbitron font-black leading-none mb-4"
                style={{
                  fontSize: 'clamp(4rem, 12vw, 10rem)',
                  background: 'linear-gradient(135deg, #00e5ff 0%, #b400ff 50%, #ff0080 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 40px rgba(0,229,255,0.3))',
                }}
              >
                ЭКЗО
                <br />
                ПЛАНЕТЫ
              </h1>

              <p
                className="font-golos text-white/50 max-w-xl mx-auto text-lg mb-12 leading-relaxed"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.8s ease 0.2s',
                }}
              >
                Миры за пределами нашей звёздной системы.
                <br />
                Исследуй планеты Млечного Пути — некоторые из них могут стать новым домом.
              </p>

              <div
                className="flex gap-4 justify-center flex-wrap"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.8s ease 0.4s',
                }}
              >
                <button
                  onClick={() => handleNav('catalog')}
                  className="font-orbitron text-sm px-8 py-4 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(180,0,255,0.15))',
                    border: '1px solid rgba(0,229,255,0.4)',
                    color: '#00e5ff',
                    boxShadow: '0 0 30px rgba(0,229,255,0.15)',
                  }}
                >
                  Открыть каталог
                </button>
                <button
                  onClick={() => handleNav('education')}
                  className="font-orbitron text-sm px-8 py-4 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  Узнать больше
                </button>
              </div>
            </div>

            <div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              style={{ opacity: heroVisible ? 0.4 : 0, transition: 'opacity 1s ease 1s' }}
            >
              <span className="font-orbitron text-xs tracking-widest text-white/40">ПРОКРУТИ</span>
              <div className="w-px h-12 bg-gradient-to-b from-cyan-400 to-transparent" />
            </div>
          </section>

          {/* Featured planets */}
          <section className="relative z-10 px-4 md:px-8 pb-24">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <p className="font-orbitron text-xs tracking-widest text-white/30 mb-2">ИЗБРАННЫЕ</p>
                  <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white/90">
                    Планеты на карте
                  </h2>
                </div>
                <button
                  onClick={() => handleNav('catalog')}
                  className="font-orbitron text-xs text-white/40 hover:text-cyan-400 transition-colors flex items-center gap-2"
                >
                  Все планеты <Icon name="ArrowRight" size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {exoplanets.slice(0, 4).map((planet, i) => (
                  <div
                    key={planet.id}
                    className="planet-card rounded-2xl p-5 cursor-pointer"
                    style={{
                      border: `1px solid ${planet.color}30`,
                      boxShadow: `0 0 20px ${planet.glowColor}20`,
                      opacity: heroVisible ? 1 : 0,
                      transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: `all 0.6s ease ${0.6 + i * 0.1}s`,
                    }}
                    onClick={() => setSelectedPlanet(planet)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-full"
                        style={{
                          background: `radial-gradient(circle at 35% 35%, ${planet.color}, ${planet.color}44, #050714)`,
                          boxShadow: `0 0 20px ${planet.glowColor}`,
                        }}
                      />
                      <span
                        className="text-xs font-orbitron px-2 py-0.5 rounded-full"
                        style={{
                          background: `${habitabilityColors[planet.habitability]}15`,
                          color: habitabilityColors[planet.habitability],
                          border: `1px solid ${habitabilityColors[planet.habitability]}40`,
                        }}
                      >
                        {planet.emoji}
                      </span>
                    </div>
                    <h3 className="font-orbitron text-sm font-bold mb-1" style={{ color: planet.color }}>
                      {planet.name}
                    </h3>
                    <p className="text-xs text-white/40 font-golos mb-3 line-clamp-2">{planet.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-orbitron text-white/25">{planet.distance}</span>
                      <Icon name="ChevronRight" size={14} style={{ color: planet.color, opacity: 0.6 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats */}
          <section
            className="relative z-10 px-4 py-12 mb-8"
            style={{
              borderTop: '1px solid rgba(0,229,255,0.06)',
              borderBottom: '1px solid rgba(0,229,255,0.06)',
            }}
          >
            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { val: '5 600+', label: 'Экзопланет открыто', color: '#00e5ff' },
                { val: '3', label: 'Планеты в зоне обитаемости', color: '#39ff14' },
                { val: '4.24', label: 'Световых лет до ближайшей', color: '#b400ff' },
                { val: '2041', label: 'Год запуска LUVOIR', color: '#ff0080' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="font-orbitron text-3xl font-black mb-1"
                    style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}` }}
                  >
                    {stat.val}
                  </div>
                  <div className="text-xs font-golos text-white/35">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ── CATALOG ── */}
      {section === 'catalog' && (
        <div className="relative z-10 pt-24 px-4 md:px-8 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <p className="font-orbitron text-xs tracking-widest text-white/30 mb-2">МЛЕЧНЫЙ ПУТЬ</p>
              <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white/90 mb-2">
                Каталог экзопланет
              </h1>
              <p className="font-golos text-white/40">{exoplanets.length} планет в базе данных</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  placeholder="Поиск планеты..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl font-golos text-sm bg-white/5 border border-white/10 text-white/80 placeholder-white/25 outline-none focus:border-cyan-400/50 transition-colors"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className="px-4 py-2 rounded-xl text-xs font-orbitron transition-all"
                    style={{
                      background: activeFilter === f ? 'rgba(0,229,255,0.12)' : 'rgba(255,255,255,0.04)',
                      border:
                        activeFilter === f
                          ? '1px solid rgba(0,229,255,0.4)'
                          : '1px solid rgba(255,255,255,0.08)',
                      color: activeFilter === f ? '#00e5ff' : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {filterLabels[f]}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <div className="text-6xl mb-4">🔭</div>
                <p className="font-orbitron text-white/30">Планеты не найдены</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((planet) => (
                  <div
                    key={planet.id}
                    className="planet-card rounded-2xl p-5 animate-fade-scale cursor-pointer"
                    style={{ border: `1px solid ${planet.color}25` }}
                    onClick={() => setSelectedPlanet(planet)}
                  >
                    <div className="flex justify-center mb-4">
                      <div
                        className="w-20 h-20 rounded-full relative animate-float"
                        style={{
                          background: `radial-gradient(circle at 35% 35%, ${planet.color}ee, ${planet.color}44, #050714)`,
                          boxShadow: `0 0 30px ${planet.glowColor}, 0 0 60px ${planet.glowColor}44`,
                        }}
                      >
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: 'radial-gradient(circle at 65% 70%, rgba(0,0,0,0.4), transparent)',
                          }}
                        />
                        <span className="absolute top-2 left-3 text-2xl">{planet.emoji}</span>
                      </div>
                    </div>

                    <div
                      className="inline-block px-2 py-0.5 rounded-full text-xs font-orbitron mb-2"
                      style={{
                        background: `${habitabilityColors[planet.habitability]}15`,
                        color: habitabilityColors[planet.habitability],
                        border: `1px solid ${habitabilityColors[planet.habitability]}35`,
                      }}
                    >
                      {habitabilityLabels[planet.habitability]}
                    </div>

                    <h3 className="font-orbitron font-bold text-sm mb-1" style={{ color: planet.color }}>
                      {planet.name}
                    </h3>
                    <p className="text-xs text-white/35 font-golos mb-4 leading-relaxed line-clamp-2">
                      {planet.description}
                    </p>

                    <div className="flex justify-between text-xs text-white/25 font-orbitron">
                      <span>{planet.distance}</span>
                      <span>{planet.type}</span>
                    </div>

                    <div
                      className="mt-4 w-full py-2 rounded-lg text-center text-xs font-orbitron transition-all hover:opacity-80"
                      style={{
                        background: `${planet.color}12`,
                        border: `1px solid ${planet.color}30`,
                        color: planet.color,
                      }}
                    >
                      Подробнее →
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── EDUCATION ── */}
      {section === 'education' && (
        <div className="relative z-10 pt-24 px-4 md:px-8 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <p className="font-orbitron text-xs tracking-widest text-white/30 mb-2">НАУКА</p>
              <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white/90 mb-4">
                Образовательные материалы
              </h1>
              <p className="font-golos text-white/40 max-w-xl mx-auto">
                Всё что нужно знать об экзопланетах — от базовых понятий до последних открытий
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {educationItems.map((item, i) => (
                <div
                  key={item.title}
                  className="glass-panel rounded-2xl p-6 animate-fade-scale"
                  style={{
                    borderColor: `${item.color}20`,
                    animationDelay: `${i * 0.08}s`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                    >
                      {item.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="text-xs font-orbitron px-2 py-0.5 rounded-full"
                          style={{
                            background: `${item.color}15`,
                            color: item.color,
                            border: `1px solid ${item.color}30`,
                          }}
                        >
                          {item.tag}
                        </span>
                      </div>
                      <h3 className="font-orbitron font-semibold text-sm text-white/90 mb-2">{item.title}</h3>
                      <p className="font-golos text-sm text-white/55 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-12 rounded-2xl p-8 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(0,229,255,0.06), rgba(180,0,255,0.06))',
                border: '1px solid rgba(0,229,255,0.15)',
              }}
            >
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-orbitron text-xl font-bold text-white/90 mb-3">
                Готов к исследованию?
              </h3>
              <p className="font-golos text-white/45 mb-6 max-w-md mx-auto">
                Открой каталог экзопланет и узнай подробности о каждом мире Млечного Пути
              </p>
              <button
                onClick={() => handleNav('catalog')}
                className="font-orbitron text-sm px-8 py-4 rounded-xl transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(180,0,255,0.15))',
                  border: '1px solid rgba(0,229,255,0.4)',
                  color: '#00e5ff',
                  boxShadow: '0 0 30px rgba(0,229,255,0.15)',
                }}
              >
                Открыть каталог →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
