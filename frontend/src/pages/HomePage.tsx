import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTelegramStore } from '@/store/telegram.store';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, showMainButton, hideMainButton, vibrate } = useTelegramStore();

  useEffect(() => {
    // Setup main button
    showMainButton('🎴 Выбрать расклад', () => {
      vibrate('light');
      navigate('/spreads');
    });

    return () => {
      hideMainButton();
    };
  }, [showMainButton, hideMainButton, navigate, vibrate]);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Левая колонка: заголовок + CTA */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              🔮 Tarot Web App
            </h1>
            <p className="text-xl opacity-80 mb-2">
              Добро пожаловать в мир мистики и предсказаний
            </p>
            {user && (
              <p className="text-lg opacity-60">
                Привет, {user.first_name}! ✨
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <button
              onClick={() => {
                vibrate('medium');
                navigate('/spreads');
              }}
              className="glass-button text-xl px-8 py-4 w-full md:w-auto pulse-glow"
            >
              🌟 Начать гадание
            </button>
            <p className="text-sm opacity-60">
              Бесплатно: 1 расклад в день • Premium: Безлимит + AI интерпретации
            </p>
          </motion.div>
        </div>

        {/* Правая колонка: фичи в гриде */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-6 sm:grid-cols-2"
        >
          <div className="glass-card p-6 text-center">
            <div className="text-4xl mb-4">🎴</div>
            <h3 className="text-xl font-semibold mb-2">15+ Раскладов</h3>
            <p className="opacity-70">
              От простого дня до сложного Кельтского креста
            </p>
          </div>

          <div className="glass-card p-6 text-center">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-semibold mb-2">Красивый UI</h3>
            <p className="opacity-70">
              Glass-morphism дизайн с плавными анимациями
            </p>
          </div>

          <div className="glass-card p-6 text-center">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold mb-2">Telegram Stars</h3>
            <p className="opacity-70">
              Безопасная монетизация через Telegram
            </p>
          </div>

          <div className="glass-card p-6 text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">Быстрый старт</h3>
            <p className="opacity-70">
              Запуск за минуты: одна команда `npm run dev`
            </p>
          </div>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default HomePage;