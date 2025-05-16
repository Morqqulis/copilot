// Разрешенные коды стран для API news, weather, travel согласно API /api/countries
export const ALLOWED_COUNTRY_CODES = ['gb', 'us', 'no', 'se', 'de', 'dk', 'fi', 'nl', 'be'];

// Разрешенные коды стран для API voices
export const ALLOWED_VOICES_COUNTRY_CODES = ['uk', 'us', 'no', 'fi', 'sw', 'be', 'gm', 'da', 'nl'];

// Маппинг кодов стран для API news, weather, travel
export const countryCodeMapping = {
  // Стандартные двухбуквенные коды
  'gb': 'gb', // Великобритания
  'uk': 'gb', // Альтернативный код для Великобритании
  'us': 'us', // США
  'no': 'no', // Норвегия
  'se': 'se', // Швеция
  'de': 'de', // Германия
  'dk': 'dk', // Дания
  'fi': 'fi', // Финляндия
  'nl': 'nl', // Нидерланды
  'be': 'be', // Бельгия
  
  // Полные названия стран
  'norway': 'no',
  'sweden': 'se',
  'germany': 'de',
  'united kingdom': 'gb',
  'united states': 'us',
  'usa': 'us',
  'denmark': 'dk',
  'finland': 'fi',
  'netherlands': 'nl',
  'belgium': 'be',
  
  // Другие возможные варианты названий
  'england': 'gb',
  'great britain': 'gb',
  'america': 'us',
  'deutschland': 'de',
  'sverige': 'se',
  'norge': 'no',
  'danmark': 'dk',
  'suomi': 'fi',
  'nederland': 'nl',
  'belgique': 'be',
  'belgien': 'be',
};

// Маппинг для API /api/voices 
export const voicesCountryCodeMapping = {
  // Прямой маппинг для кодов API /voices
  'uk': 'uk', // Великобритания
  'us': 'us', // США
  'no': 'no', // Норвегия
  'fi': 'fi', // Финляндия
  'sw': 'sw', // Швеция
  'be': 'be', // Бельгия
  'gm': 'gm', // Германия
  'da': 'da', // Дания
  'nl': 'nl', // Нидерланды
  
  // Другие возможные коды стран, которые нужно преобразовать
  'gb': 'uk', // Великобритания (из gb в uk)
  'se': 'sw', // Швеция (из se в sw)
  'de': 'gm', // Германия (из de в gm)
  'dk': 'da', // Дания (из dk в da)
  
  // Полные названия стран
  'norway': 'no',
  'sweden': 'sw',
  'finland': 'fi',
  'denmark': 'da',
  'germany': 'gm',
  'belgium': 'be',
  'united kingdom': 'uk',
  'united states': 'us',
  'netherlands': 'nl',
};

// Маппинг языков для стран
export const languageMapping = {
  'gb': 'en', // Великобритания -> английский
  'us': 'en', // США -> английский
  'no': 'no', // Норвегия -> норвежский
  'se': 'sv', // Швеция -> шведский
  'de': 'de', // Германия -> немецкий
  'dk': 'da', // Дания -> датский
  'fi': 'fi', // Финляндия -> финский
  'nl': 'nl', // Нидерланды -> нидерландский
  'be': 'nl', // Бельгия -> нидерландский (основной язык)
  
  // Также добавляем маппинг для voices API кодов
  'uk': 'en', // Великобритания -> английский
  'sw': 'sv', // Швеция -> шведский
  'gm': 'de', // Германия -> немецкий
  'da': 'da', // Дания -> датский
  'fi': 'fi', // Финляндия -> финский
  'be': 'nl', // Бельгия -> нидерландский
  'nl': 'nl', // Нидерланды -> нидерландский
};

/**
 * Получает правильный код страны для API news, weather, travel
 * @param {string} regionCode - Код или название региона
 * @returns {string} - Нормализованный код страны для API
 */
export function getApiCountryCode(regionCode) {
  if (!regionCode) return 'gb'; // Значение по умолчанию - Великобритания
  
  // Сначала пробуем найти маппинг напрямую по полному значению
  const lowerRegion = typeof regionCode === 'string' ? regionCode.toLowerCase() : '';
  
  // Проверяем маппинг по полному названию
  if (countryCodeMapping[lowerRegion]) {
    const mappedCode = countryCodeMapping[lowerRegion];
    // Проверяем, что маппинг входит в список разрешенных кодов
    if (ALLOWED_COUNTRY_CODES.includes(mappedCode)) {
      return mappedCode;
    }
  }
  
  // Если полного маппинга нет, пробуем первые два символа
  if (lowerRegion.length >= 2) {
    const countryCode = lowerRegion.slice(0, 2);
    if (countryCodeMapping[countryCode]) {
      const mappedCode = countryCodeMapping[countryCode];
      // Проверяем, что маппинг входит в список разрешенных кодов
      if (ALLOWED_COUNTRY_CODES.includes(mappedCode)) {
        return mappedCode;
      }
    }
  }
  
  // Если никакого маппинга нет или маппинг не в списке разрешенных, возвращаем значение по умолчанию
  return 'gb'; // Значение по умолчанию - Великобритания
}

/**
 * Получает правильный код страны для API voices
 * @param {string} regionCode - Код или название региона
 * @returns {string} - Нормализованный код страны для API voices
 */
export function getVoicesApiCountryCode(regionCode) {
  if (!regionCode) return 'uk'; // Значение по умолчанию - Великобритания
  
  // Сначала пробуем найти маппинг напрямую по полному значению
  const lowerRegion = typeof regionCode === 'string' ? regionCode.toLowerCase() : '';
  
  // Проверяем маппинг по полному названию
  if (voicesCountryCodeMapping[lowerRegion]) {
    const mappedCode = voicesCountryCodeMapping[lowerRegion];
    // Проверяем, что маппинг входит в список разрешенных кодов
    if (ALLOWED_VOICES_COUNTRY_CODES.includes(mappedCode)) {
      return mappedCode;
    }
  }
  
  // Если полного маппинга нет, пробуем первые два символа
  if (lowerRegion.length >= 2) {
    const countryCode = lowerRegion.slice(0, 2);
    if (voicesCountryCodeMapping[countryCode]) {
      const mappedCode = voicesCountryCodeMapping[countryCode];
      // Проверяем, что маппинг входит в список разрешенных кодов
      if (ALLOWED_VOICES_COUNTRY_CODES.includes(mappedCode)) {
        return mappedCode;
      }
    }
  }
  
  // Если никакого маппинга нет или маппинг не в списке разрешенных, возвращаем значение по умолчанию
  return 'uk'; // Значение по умолчанию - Великобритания для API voices
}

/**
 * Получает язык для выбранной страны
 * @param {string} countryCode - Код страны 
 * @returns {string} - Код языка
 */
export function getLanguageForCountry(countryCode) {
  return languageMapping[countryCode] || 'en'; // По умолчанию английский
} 