import fs from 'node:fs/promises';
import { join } from 'node:path';
import { buildAuthorization, getUserProfile } from '@retroachievements/api';

const username = 'viccios';
const webApiKey = String(process.env.RETROACHIEVEMENTS_WEB_API_KEY);

const authorization = buildAuthorization({ username, webApiKey });

const userProfile = await getUserProfile(authorization, {
	username: 'viccios',
});

async function updateReadMe() {
	const readMePath = join(import.meta.dirname, '../README.md');
	const readMeContents = await fs.readFile(readMePath, 'utf8');
	const regex =
		/<!-- RETROACHIEVEMENTS:START -->[\s\S]*?<!-- RETROACHIEVEMENTS:END -->/;
	const updatedReadMe = readMeContents.replace(
		regex,
		`<!-- RETROACHIEVEMENTS:START -->\n🏆 ${userProfile.richPresenceMsg}\n<!-- RETROACHIEVEMENTS:END -->`,
	);

	await fs.writeFile(readMePath, updatedReadMe, 'utf8');
}

updateReadMe();
