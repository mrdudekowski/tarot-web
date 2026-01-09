import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTelegramStore } from '@/store/telegram.store';
import { useTarotStore } from '@/store/tarot.store';

const ReadingPage: React.FC = () => {
  const { spreadId } = useParams<{ spreadId: string }>();
  const navigate = useNavigate();
  const { showBackButton, hideBackButton, vibrate } = useTelegramStore();
  const { spreads, isCreatingReading, createReadingError, createReading } = useTarotStore();

  const [question, setQuestion] = useState('');

  useEffect(() => {
    // Setup back button
    showBackButton(() => navigate('/spreads'));

    return () => {
      hideBackButton();
    };
  }, [showBackButton, hideBackButton, navigate]);

  // Find current spread from loaded spreads
  const currentSpread = spreads.find(s => s.id === Number(spreadId));

  if (!currentSpread) {
    return (
      <div className="container mx-auto px-6 py-8 text-center">
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-4">Расклад не найден</h2>
          <button
            onClick={() => navigate('/spreads')}
            className="glass-button px-6 py-3"
          >
            Выбрать другой расклад
          </button>
        </div>
      </div>
    );
  }

  const handleCreateReading = async () => {
    if (!question.trim()) {
      vibrate('warning');
      return;
    }

    vibrate('medium');

    const reading = await createReading(currentSpread.id, question);

    if (reading) {
      // Navigate to reading result page (will be implemented)
      console.log('Reading created successfully:', reading);
      // For now, just show success message
      alert('Расклад создан успешно! Детали скоро будут доступны.');
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="text-6xl mb-4">{currentSpread.icon}</div>
        <h1 className="text-3xl font-bold mb-2">{currentSpread.name}</h1>
        <p className="text-lg opacity-80">
          {currentSpread.cardCount} карт для глубокого анализа
        </p>
      </motion.div>

      {/* Question Input */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6 mb-8"
      >
        <label className="block text-sm font-medium mb-3">
          Ваш вопрос (опционально):
        </label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Например: Что ждет меня на работе? Как развиваются отношения?"
          className="glass-input w-full resize-none"
          rows={3}
          maxLength={500}
        />
        <div className="text-xs opacity-60 mt-2">
          {question.length}/500 символов
        </div>
      </motion.div>

      {/* Create Reading Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <button
          onClick={handleCreateReading}
          disabled={isCreatingReading}
          className="glass-button text-xl px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCreatingReading ? (
            <div className="flex items-center gap-3">
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
              Создание расклада...
            </div>
          ) : (
            '🎴 Создать расклад'
          )}
        </button>

        {createReadingError && (
          <p className="text-red-400 text-sm mt-2">{createReadingError}</p>
        )}

        <p className="text-sm opacity-60 mt-4">
          Карты будут выбраны случайным образом из колоды Таро Райдера-Уэйта
        </p>
      </motion.div>

      {/* Coming Soon Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center"
      >
        <div className="glass-card p-4 inline-block">
          <p className="text-sm opacity-70">
            ✨ Скоро: Красивые анимации карт, персональные интерпретации, сохранение истории
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ReadingPage;