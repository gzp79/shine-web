import debug from 'debug';

process.env.DEBUG = 'app:api';

export const logAPI = debug('app:api');
export const logUser = debug('app:user');

export const logDesigner = debug('designer:design');
