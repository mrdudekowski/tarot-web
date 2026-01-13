/**
 * Алгоритм Фишера-Йетса для равномерной рандомизации массива
 * Гарантирует математически равномерное распределение всех перестановок
 * 
 * @param {Array} array - Исходный массив для перемешивания
 * @returns {Array} - Новая перемешанная копия массива (исходный не изменяется)
 */
export const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}