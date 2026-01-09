/**
 * 🚀 ЗАПУСК ТЕСТОВ РАНДОМИЗАЦИИ
 * 
 * Этот файл можно запустить для проверки работы алгоритма рандомизации
 * 
 * Использование:
 * - В браузере: импортировать и вызвать runAllTests()
 * - В Node.js: запустить через ts-node
 */

import { runAllTests, testRandomization, testMultipleReadings, testUniqueness } from './test-randomization';

/**
 * Запускает все тесты и выводит результаты в консоль
 */
export function runTests(): void {
  console.log(runAllTests());
}

/**
 * Запускает быстрый тест (один расклад)
 */
export function runQuickTest(): void {
  console.log(testRandomization(3));
}

/**
 * Запускает тест нескольких раскладов
 */
export function runMultipleTest(): void {
  console.log(testMultipleReadings(5, 3));
}

/**
 * Запускает тест уникальности
 */
export function runUniquenessTest(): void {
  console.log(testUniqueness(3, 100));
}

// Если файл запускается напрямую (в Node.js окружении)
if (typeof window === 'undefined' && typeof require !== 'undefined') {
  runTests();
}

