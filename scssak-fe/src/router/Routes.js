export const BASE_URL = 'http://localhost:8080/api/v1';

export const notFountRoute = '/404';

export const loginRoute = '/login';
export const mainRoute = '/main';

export const boardRoute = '/board';
export const articleWriteRoute = '/board/write';
export const articleEditRoute = '/board/edit';

export const mailboxRootRoute = '/mailbox';
export const mailboxRoute = mailboxRootRoute + '/:receiver_id';
export const mailWriteRoute = mailboxRootRoute + '/write/:receiver_id';

export const profileRootRoute = '/profile';
export const profileRoute = profileRootRoute + '/:user_id';
export const profileEditRoute = profileRootRoute + '/edit';
