import moment from 'moment';
import {
  legacyDate,
  legacyTime,
  modernDate,
  modernTime,
} from '../constants/formats';

export function getDateFromValue(value) {
  const currentLegacyDate = moment(value, legacyDate, true);
  const currentModernDate = moment(value, modernDate, true);

  if (currentLegacyDate.isValid()) { return currentLegacyDate; }
  if (currentModernDate.isValid()) { return currentModernDate; }
  return undefined;
}

export function getTimeFromValue(value) {
  const currentLegacyTime = moment(value, legacyTime, true);
  const currentModernTime = moment(value, modernTime, true);

  if (currentLegacyTime.isValid()) { return currentLegacyTime; }
  if (currentModernTime.isValid()) { return currentModernTime; }
  return undefined;
}
