import { Exoplanet, habitabilityColors, habitabilityLabels } from '@/data/exoplanets';
import Icon from '@/components/ui/icon';

interface PlanetDetailProps {
  planet: Exoplanet;
  onBack: () => void;
}

const PlanetDetail = ({ planet, onBack }: PlanetDetailProps) => {
  return (
    <div className="min-h-screen relative z-10 py-8 px-4 md:px-8 animate-fade-scale">
      {/* Back */}
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-sm font-golos transition-all hover:gap-3"
        style={{ color: planet.color }}
      >
        <Icon name="ArrowLeft" size={16} />
        <span>Назад к каталогу</span>
      </button>

      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="glass-panel rounded-2xl p-8 mb-6 relative overflow-hidden"
          style={{ borderColor: `${planet.color}40` }}>
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ background: planet.glowColor, transform: 'translate(30%, -30%)' }}
          />

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Planet visual */}
            <div className="flex-shrink-0 flex justify-center">
              <div className="relative w-44 h-44 animate-float">
                <img
                  src={planet.image}
                  alt={planet.name}
                  className="w-44 h-44 rounded-full object-cover"
                  style={{
                    boxShadow: `0 0 50px ${planet.glowColor}, 0 0 100px ${planet.glowColor}55`,
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 65% 70%, rgba(0,0,0,0.25), transparent)',
                    border: `2px solid ${planet.color}55`,
                  }}
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-xs font-orbitron px-3 py-1 rounded-full"
                  style={{
                    background: `${habitabilityColors[planet.habitability]}22`,
                    color: habitabilityColors[planet.habitability],
                    border: `1px solid ${habitabilityColors[planet.habitability]}55`,
                  }}
                >
                  {habitabilityLabels[planet.habitability]}
                </span>
                <span className="text-xs text-white/40 font-orbitron">
                  {planet.type} · {planet.discovered}
                </span>
              </div>

              <h1
                className="text-3xl md:text-5xl font-orbitron font-bold mb-2"
                style={{ color: planet.color }}
              >
                {planet.name}
              </h1>
              <p className="text-white/50 font-golos mb-6">{planet.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Расстояние', value: planet.distance, icon: 'Navigation' },
                  { label: 'Размер', value: planet.radius, icon: 'Circle' },
                  { label: 'Температура', value: planet.temperature, icon: 'Thermometer' },
                  { label: 'Звезда', value: planet.star, icon: 'Star' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl p-3 text-center"
                    style={{ background: `${planet.color}0f`, border: `1px solid ${planet.color}22` }}
                  >
                    <Icon name={stat.icon} fallback="Star" size={16} className="mx-auto mb-1" style={{ color: planet.color }} />
                    <div className="text-xs text-white/40 font-golos mb-1">{stat.label}</div>
                    <div className="text-xs font-orbitron text-white/80">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* What is it */}
          <div className="glass-panel rounded-2xl p-6" style={{ borderColor: `${planet.color}25` }}>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${planet.color}22` }}
              >
                <Icon name="Globe" size={18} style={{ color: planet.color }} />
              </div>
              <h2 className="font-orbitron font-semibold text-white/90">Что это такое?</h2>
            </div>
            <p className="text-white/65 font-golos leading-relaxed text-sm">{planet.whatIsIt}</p>
          </div>

          {/* What's there */}
          <div className="glass-panel rounded-2xl p-6" style={{ borderColor: `${planet.color}25` }}>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${planet.color}22` }}
              >
                <Icon name="Search" size={18} style={{ color: planet.color }} />
              </div>
              <h2 className="font-orbitron font-semibold text-white/90">Что там находится?</h2>
            </div>
            <p className="text-white/65 font-golos leading-relaxed text-sm">{planet.whatsThere}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Can live now */}
          <div
            className="glass-panel rounded-2xl p-6"
            style={{ borderColor: planet.canLiveNow ? '#39ff1440' : '#FF525240' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: planet.canLiveNow ? '#39ff1422' : '#FF525222' }}
              >
                <Icon
                  name={planet.canLiveNow ? 'CheckCircle' : 'XCircle'}
                  size={18}
                  style={{ color: planet.canLiveNow ? '#39ff14' : '#FF5252' }}
                />
              </div>
              <h2 className="font-orbitron font-semibold text-white/90">
                Можно ли там жить сейчас?
              </h2>
            </div>
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-orbitron mb-3"
              style={{
                background: planet.canLiveNow ? '#39ff1422' : '#FF525222',
                color: planet.canLiveNow ? '#39ff14' : '#FF5252',
                border: `1px solid ${planet.canLiveNow ? '#39ff1455' : '#FF525255'}`,
              }}
            >
              {planet.canLiveNow ? 'Возможно' : 'Нет'}
            </div>
            <p className="text-white/65 font-golos leading-relaxed text-sm">
              {planet.canLiveNow
                ? 'Условия могут поддерживать примитивные формы жизни.'
                : 'Современные условия не подходят для известных форм жизни.'}
            </p>
          </div>

          {/* Future */}
          <div
            className="glass-panel rounded-2xl p-6"
            style={{ borderColor: planet.canLiveFuture ? '#FFD54F40' : '#FF525240' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: planet.canLiveFuture ? '#FFD54F22' : '#FF525222' }}
              >
                <Icon
                  name="Rocket"
                  size={18}
                  style={{ color: planet.canLiveFuture ? '#FFD54F' : '#FF5252' }}
                />
              </div>
              <h2 className="font-orbitron font-semibold text-white/90">Будет ли пригодна?</h2>
            </div>
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-orbitron mb-3"
              style={{
                background: planet.canLiveFuture ? '#FFD54F22' : '#FF525222',
                color: planet.canLiveFuture ? '#FFD54F' : '#FF5252',
                border: `1px solid ${planet.canLiveFuture ? '#FFD54F55' : '#FF525255'}`,
              }}
            >
              {planet.canLiveFuture ? 'Перспективна' : 'Маловероятно'}
            </div>
            <p className="text-white/65 font-golos leading-relaxed text-sm">{planet.future}</p>
          </div>
        </div>

        {/* Fun fact */}
        <div
          className="glass-panel rounded-2xl p-6"
          style={{
            borderColor: `${planet.color}40`,
            background: `linear-gradient(135deg, ${planet.color}08, transparent)`,
          }}
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl mt-1">⚡</div>
            <div>
              <h3 className="font-orbitron font-semibold text-white/80 mb-2">Интересный факт</h3>
              <p className="font-golos text-white/65 leading-relaxed">{planet.funFact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetDetail;