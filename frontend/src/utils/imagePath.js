/**
 * Генерирует путь к изображению с учетом BASE_URL
 * Работает локально (BASE_URL = '/') и на GitHub Pages (BASE_URL = '/tarot-web/')
 * 
 * @param {string} path - Путь относительно public/ 
 *   Примеры:
 *   - 'images/cards/major/00-TheFool.webp'
 *   - '/images/cards/major/00-TheFool.webp' (ведущий слеш будет удален)
 * @returns {string} Полный путь с учетом BASE_URL
 * 
 * @example
 * getImagePath('images/cards/major/00-TheFool.webp')
 * // Локально: '/images/cards/major/00-TheFool.webp'
 * // GitHub Pages: '/tarot-web/images/cards/major/00-TheFool.webp'
 */
export function getImagePath(path) {
  // Убираем ведущий слеш, если есть
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  // Получаем BASE_URL (должен быть установлен в vite.config.js и workflow)
  const base = import.meta.env.BASE_URL || '/'
  
  // Убеждаемся, что base заканчивается на слеш
  const baseWithSlash = base.endsWith('/') ? base : `${base}/`
  
  return `${baseWithSlash}${cleanPath}`
}

/**
 * Короткий alias для удобства
 */
export const img = getImagePath
