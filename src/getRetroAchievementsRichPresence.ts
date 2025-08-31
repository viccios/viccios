import {
	buildAuthorization,
	getUserProfile,
	getUserRecentlyPlayedGames,
} from '@retroachievements/api';
import { updateReadMe } from './updateReadMe.ts';

const LAST_PLAYED_GAME = 0;

const username = 'viccios';
const webApiKey = String(process.env.RETROACHIEVEMENTS_WEB_API_KEY);

const authorization = buildAuthorization({ username, webApiKey });

const userProfile = await getUserProfile(authorization, {
	username: 'viccios',
});

const userRecentlyPlayedGames = await getUserRecentlyPlayedGames(
	authorization,
	{ username: 'viccios' },
);

updateReadMe({
	lastSeenIn: userRecentlyPlayedGames[LAST_PLAYED_GAME].title,
	richPresenceMsg: userProfile.richPresenceMsg,
});
