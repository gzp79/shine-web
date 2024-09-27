import debug from 'debug';

process.env.DEBUG = 'app:user';

export const logUser = debug('app:user');
export const logAPI = debug('app:admin');

export const logDesigner = debug('designer:design');
