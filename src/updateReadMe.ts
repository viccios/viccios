import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

interface UpdateReadMeArgs {
	lastSeenIn: string;
	richPresenceMsg: string;
}

export async function updateReadMe({
	lastSeenIn,
	richPresenceMsg,
}: UpdateReadMeArgs) {
	const readMePath = join(import.meta.dirname, '../README.md');
	const readMeContents = await readFile(readMePath, 'utf8');
	const regex =
		/(<!-- RETROACHIEVEMENTS:START -->)[\s\S]*?(<!-- RETROACHIEVEMENTS:END -->)/;
	const updatedReadMe = readMeContents.replace(
		regex,
		`$1\n🕹 Last seen in: ${lastSeenIn}\n\n🏆 ${richPresenceMsg}\n$2`,
	);

	await writeFile(readMePath, updatedReadMe, 'utf8');
}
