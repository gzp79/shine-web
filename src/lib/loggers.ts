import debug from 'debug';

// to enable logs in the browser:
// - set level to All (verbose)
// - window.localStorage.setItem('debug', 'designer:design');

export const logAPI = debug('app:api');
export const logUser = debug('app:user');

export const logDesigner = debug('designer:design');
