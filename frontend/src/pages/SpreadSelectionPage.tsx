import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTelegramStore } from '@/store/telegram.store';
import { useTarotStore } from '@/store/tarot.store';

const SpreadSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { showBackButton, hideBackButton, vibrate } = useTelegramStore();
  const { spreads, isLoadingSpreads, spreadsError, fetchSpreads } = useTarotStore();

  useEffect(() => {
    // Setup back button
    showBackButton(() => navigate('/'));

    // Fetch spreads if not loaded
    if (spreads.length === 0 && !isLoadingSpreads) {
      fetchSpreads();
    }

    return () => {
      hideBackButton();
    };
  }, [showBackButton, hideBackButton, navigate, spreads.length, isLoadingSpreads, fetchSpreads]);

  const handleSpreadSelect = (spreadId: number) => {
    vibrate('light');
    navigate(`/reading/${spreadId}`);
  };

  if (isLoadingSpreads) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Загрузка раскладов...</p>
        </div>
      </div>
    );
  }

  if (spreadsError) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="glass-card p-6 text-center">
          <h2 className="text-xl font-bold mb-4">Ошибка загрузки</h2>
          <p className="opacity-70 mb-4">{spreadsError}</p>
          <button
            onClick={fetchSpreads}
            className="glass-button px-6 py-3"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Выберите расклад</h1>
        <p className="text-lg opacity-80">
          Выберите подходящий тип гадания для вашего вопроса
        </p>
      </motion.div>

      {/* Spreads Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {spreads.map((spread, index) => (
          <motion.div
            key={spread.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            onClick={() => handleSpreadSelect(spread.id)}
            className="glass-card p-6 cursor-pointer hover:bg-white/20 transition-all duration-300"
          >
            <div className="text-center">
              <div className="text-5xl mb-4">{spread.icon}</div>

              <div className="flex items-center justify-center gap-2 mb-2">
                <h3 className="text-xl font-semibold">{spread.name}</h3>
                {spread.isPremium && (
                  <span className="text-xs bg-accent px-2 py-1 rounded-full">
                    Premium
                  </span>
                )}
              </div>

              <p className="text-sm opacity-70 mb-3">{spread.description}</p>

              <div className="flex items-center justify-between text-xs opacity-60">
                <span>{spread.cardCount} карт</span>
                {spread.priceStars && (
                  <span>{spread.priceStars} ⭐</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Coming Soon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-8"
      >
        <div className="glass-card p-4 inline-block">
          <p className="text-sm opacity-70">
            🚀 Скоро: Любовные расклады, Карьерные гадания, Зодиакальные расклады
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SpreadSelectionPage;