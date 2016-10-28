import moment from 'moment';

import {
  legacyDate,
  legacyTime,
  modernDate,
  modernTime,
} from '../constants/formats';

export function getDateFromValue(value) {
  const currentLegacyDate = moment(value, legacyDate);
  const currentModernDate = moment(value, modernDate);

  if (currentLegacyDate.isValid()) { return currentLegacyDate; }
  if (currentModernDate.isValid()) { return currentModernDate; }
  return undefined;
}

export function getTimeFromValue(value) {
  const currentLegacyTime = moment(value, legacyTime);
  const currentModernTime = moment(value, modernTime);

  if (currentLegacyTime.isValid()) { return currentLegacyTime; }
  if (currentModernTime.isValid()) { return currentModernTime; }
  return undefined;
}
