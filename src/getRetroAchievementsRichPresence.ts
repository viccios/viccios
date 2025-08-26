import { buildAuthorization, getUserProfile } from '@retroachievements/api';
import updateReadMe from './updateReadMe.ts';

const username = 'viccios';
const webApiKey = String(process.env.RETROACHIEVEMENTS_WEB_API_KEY);

const authorization = buildAuthorization({ username, webApiKey });

const userProfile = await getUserProfile(authorization, {
	username: 'viccios',
});

updateReadMe(userProfile.richPresenceMsg);
