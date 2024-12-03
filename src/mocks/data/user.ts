import { HttpResponse, http } from 'msw';

export const noUserInfo = http.get('https://mocked.com/identity/api/auth/user/info', async () => {
    return HttpResponse.json(
        { status: 401, type: 'unauthorized', instance: null, detail: 'Missing session info', extension: null },
        { status: 401 }
    );
});

export const defaultLoginProvider = http.get('https://mocked.com/identity/api/auth/providers', async () => {
    return HttpResponse.json(
        {
            providers: [
                'google',
                'gitlab',
                'github',
                'discord',
                'aaa',

                //duplicates
                'google',
                'gitlab',
                'github',
                'discord'
            ]
        },
        { status: 200 }
    );
});
