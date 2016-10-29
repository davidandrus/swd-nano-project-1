const basePath = process.env.DEPLOY_TARGET === 'github' ? '/swd-nano-project-1' : '';
alert('basePath ' + basePath);
const applyBasePath = relPath => `${basePath}${relPath}`;
export const register = applyBasePath('/');
export const createProfile = applyBasePath('/create-profile');
export const createEvent = applyBasePath('/create-event');
export const createEventLocation = applyBasePath('/create-event-location');
export const createEventGuests = applyBasePath('/create-event-guests');
export const events = applyBasePath('/events');
