import mapValues from 'lodash/mapValues';
import trim from 'lodash/trim';
import includes from 'lodash/includes';

export function trimValues(values, exceptions) {
  return mapValues(values, (value, key) => {
    if (includes(exceptions, key) || typeof value !== 'string') {
      return value;
    }
    return trim(value);
  });
}

export function registerTrimmer(values) {
  return trimValues(values, ['password']);
}
