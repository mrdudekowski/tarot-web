import { shuffleArray } from '../utils/shuffle.js'
import { getImagePath } from '../utils/imagePath.js'

/**
 * Старшие арканы Таро (22 карты)
 * Путь к изображениям: /images/cards/major/{id}.webp
 */
const MAJOR_ARCANA = [
  { id: '00', name: 'Шут', image: getImagePath('images/cards/major/00-TheFool.webp'), description: 'Начало пути, невинность, спонтанность' },
  { id: '01', name: 'Маг', image: getImagePath('images/cards/major/01-TheMagician.webp'), description: 'Мастерство, воля, концентрация' },
  { id: '02', name: 'Верховная Жрица', image: getImagePath('images/cards/major/02-TheHighPriestess.webp'), description: 'Интуиция, тайна, внутреннее знание' },
  { id: '03', name: 'Императрица', image: getImagePath('images/cards/major/03-TheEmpress.webp'), description: 'Плодородие, изобилие, материнство' },
  { id: '04', name: 'Император', image: getImagePath('images/cards/major/04-TheEmperor.webp'), description: 'Власть, структура, порядок' },
  { id: '05', name: 'Иерофант', image: getImagePath('images/cards/major/05-TheHierophant.webp'), description: 'Традиции, учение, духовность' },
  { id: '06', name: 'Влюбленные', image: getImagePath('images/cards/major/06-TheLovers.webp'), description: 'Любовь, выбор, единство' },
  { id: '07', name: 'Колесница', image: getImagePath('images/cards/major/07-TheChariot.webp'), description: 'Победа, контроль, движение' },
  { id: '08', name: 'Сила', image: getImagePath('images/cards/major/08-Strength.webp'), description: 'Внутренняя сила, терпение, сострадание' },
  { id: '09', name: 'Отшельник', image: getImagePath('images/cards/major/09-TheHermit.webp'), description: 'Поиск, самоанализ, внутренний свет' },
  { id: '10', name: 'Колесо Фортуны', image: getImagePath('images/cards/major/10-WheelOfFortune.webp'), description: 'Судьба, циклы, перемены' },
  { id: '11', name: 'Справедливость', image: getImagePath('images/cards/major/11-Justice.webp'), description: 'Баланс, правда, карма' },
  { id: '12', name: 'Повешенный', image: getImagePath('images/cards/major/12-TheHangedMan.webp'), description: 'Жертва, новый взгляд, ожидание' },
  { id: '13', name: 'Смерть', image: getImagePath('images/cards/major/13-Death.webp'), description: 'Преобразование, конец, возрождение' },
  { id: '14', name: 'Умеренность', image: getImagePath('images/cards/major/14-Temperance.webp'), description: 'Баланс, гармония, терпение' },
  { id: '15', name: 'Дьявол', image: getImagePath('images/cards/major/15-TheDevil.webp'), description: 'Соблазн, зависимость, материальность' },
  { id: '16', name: 'Башня', image: getImagePath('images/cards/major/16-TheTower.webp'), description: 'Разрушение, освобождение, внезапные перемены' },
  { id: '17', name: 'Звезда', image: getImagePath('images/cards/major/17-TheStar.webp'), description: 'Надежда, вдохновение, исцеление' },
  { id: '18', name: 'Луна', image: getImagePath('images/cards/major/18-TheMoon.webp'), description: 'Иллюзии, страхи, подсознание' },
  { id: '19', name: 'Солнце', image: getImagePath('images/cards/major/19-TheSun.webp'), description: 'Радость, успех, просветление' },
  { id: '20', name: 'Суд', image: getImagePath('images/cards/major/20-Judgement.webp'), description: 'Оценка, прощение, новый этап' },
  { id: '21', name: 'Мир', image: getImagePath('images/cards/major/21-TheWorld.webp'), description: 'Завершение, достижение, целостность' }
]

/**
 * Получить название младшей арканы по масти и номеру
 */
const getMinorCardName = (suit, number) => {
  const suitNames = {
    cups: 'Кубков',
    pentacles: 'Пентаклей',
    swords: 'Мечей',
    wands: 'Жезлов'
  }
  const cardNames = {
    1: 'Туз',
    2: 'Двойка',
    3: 'Тройка',
    4: 'Четверка',
    5: 'Пятерка',
    6: 'Шестерка',
    7: 'Семерка',
    8: 'Восьмерка',
    9: 'Девятка',
    10: 'Десятка',
    11: 'Паж',
    12: 'Рыцарь',
    13: 'Королева',
    14: 'Король'
  }
  return `${cardNames[number]} ${suitNames[suit]}`
}

/**
 * Получить описание младшей арканы по масти и номеру
 */
const getMinorCardDescription = (suit, number) => {
  const descriptions = {
    cups: { 
      1: 'Эмоции, новые чувства', 
      2: 'Связь, партнерство', 
      3: 'Радость, празднование', 
      4: 'Апатия, разочарование', 
      5: 'Потеря, горе', 
      6: 'Ностальгия, воспоминания', 
      7: 'Выбор, возможности', 
      8: 'Отказ, отступление', 
      9: 'Удовлетворение, исполнение желаний', 
      10: 'Счастье, гармония', 
      11: 'Чувствительность, открытость', 
      12: 'Романтика, ухаживания', 
      13: 'Эмпатия, понимание', 
      14: 'Мудрость, зрелость' 
    },
    pentacles: { 
      1: 'Материя, новые возможности', 
      2: 'Баланс, гибкость', 
      3: 'Работа, мастерство', 
      4: 'Жадность, цепляние', 
      5: 'Бедность, изоляция', 
      6: 'Щедрость, благотворительность', 
      7: 'Труд, терпение', 
      8: 'Навыки, обучение', 
      9: 'Богатство, безопасность', 
      10: 'Процветание, успех', 
      11: 'Обучение, практика', 
      12: 'Дисциплина, настойчивость', 
      13: 'Безопасность, стабильность', 
      14: 'Изобилие, достижения' 
    },
    swords: { 
      1: 'Истина, новый взгляд', 
      2: 'Неопределенность, выбор', 
      3: 'Сердце, эмоциональная боль', 
      4: 'Отдых, восстановление', 
      5: 'Поражение, конфликт', 
      6: 'Бегство, переход', 
      7: 'Обман, хитрость', 
      8: 'Ограничение, застревание', 
      9: 'Тревога, беспокойство', 
      10: 'Конец, завершение', 
      11: 'Любопытство, поиск истины', 
      12: 'Действие, решительность', 
      13: 'Честность, ясность', 
      14: 'Разум, интеллект' 
    },
    wands: { 
      1: 'Идея, вдохновение', 
      2: 'Планирование, будущее', 
      3: 'Рост, расширение', 
      4: 'Празднование, гармония', 
      5: 'Конфликт, соперничество', 
      6: 'Победа, успех', 
      7: 'Вызов, защита', 
      8: 'Скорость, движение', 
      9: 'Стойкость, выносливость', 
      10: 'Бремя, ответственность', 
      11: 'Энтузиазм, страсть', 
      12: 'Путешествие, поиск', 
      13: 'Свобода, независимость', 
      14: 'Вдохновение, лидерство' 
    }
  }
  return descriptions[suit]?.[number] || 'Карта Таро'
}

/**
 * Генерирует младшие арканы для одной масти
 */
const generateMinorArcanaBySuit = (suit) => {
  const cards = []
  
  for (let number = 1; number <= 14; number++) {
    const suitCapitalized = suit.charAt(0).toUpperCase() + suit.slice(1)
    const imagePath = getImagePath(`images/cards/minor/${suit}/${suitCapitalized}${String(number).padStart(2, '0')}.webp`)
    
    cards.push({
      id: `${suit}-${number}`,
      name: getMinorCardName(suit, number),
      image: imagePath,
      description: getMinorCardDescription(suit, number)
    })
  }
  
  return cards
}

/**
 * Младшие арканы Таро (56 карт)
 * 4 масти × 14 карт (Туз, 2-10, Паж, Рыцарь, Королева, Король)
 * Путь к изображениям: /images/cards/minor/{suit}/{SuitCapitalized}{number}.webp
 */
const MINOR_ARCANA = [
  ...generateMinorArcanaBySuit('cups'),
  ...generateMinorArcanaBySuit('pentacles'),
  ...generateMinorArcanaBySuit('swords'),
  ...generateMinorArcanaBySuit('wands')
]

/**
 * Полная колода Таро (78 карт)
 * 22 Старших аркана + 56 Младших арканов
 */
const FULL_DECK = [...MAJOR_ARCANA, ...MINOR_ARCANA]

/**
 * Получить одну случайную карту из полной колоды (78 карт)
 * @returns {Object} Объект карты с полями id, name, image, description
 */
export const getSingleCard = () => {
  const shuffled = shuffleArray(FULL_DECK)
  return { ...shuffled[0] }
}

/**
 * Получить несколько уникальных карт из полной колоды
 * @param {number} count - Количество карт (максимум 78)
 * @returns {Array<Object>} Массив уникальных карт
 * @throws {Error} Если запрошено больше 78 карт
 */
export const getMultipleCards = (count) => {
  if (count > FULL_DECK.length) {
    throw new Error(`Невозможно получить ${count} карт из ${FULL_DECK.length} доступных`)
  }
  
  const shuffled = shuffleArray(FULL_DECK)
  return shuffled.slice(0, count).map(card => ({ ...card }))
}

/**
 * Получить карту дня с уникальным толкованием
 * @returns {Object} Объект карты с дополнительными полями date и dailyInterpretation
 */
export const getDailyCard = () => {
  const card = getSingleCard()
  const today = new Date()
  const dateString = today.toLocaleDateString('ru-RU', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
  
  const dailyInterpretations = [
    'Сегодня эта карта приносит особое послание',
    'В этот день энергия карты особенно сильна',
    'Карта дня напоминает о важном уроке',
    'Сегодняшний день связан с темами этой карты',
    'Эта карта освещает ваш путь сегодня'
  ]
  
  const randomInterpretation = dailyInterpretations[
    Math.floor(Math.random() * dailyInterpretations.length)
  ]
  
  return {
    ...card,
    date: dateString,
    dailyInterpretation: randomInterpretation
  }
}

/**
 * Сервис для работы с картами Таро
 */
export const tarotService = {
  getSingleCard,
  getMultipleCards,
  getDailyCard,
  getMajorArcana: () => [...MAJOR_ARCANA],
  getMinorArcana: () => [...MINOR_ARCANA],
  getFullDeck: () => [...FULL_DECK]
}