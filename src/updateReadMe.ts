import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export default async function updateReadMe(content: string) {
	const readMePath = join(import.meta.dirname, '../README.md');
	const readMeContents = await readFile(readMePath, 'utf8');
	const regex =
		/<!-- RETROACHIEVEMENTS:START -->[\s\S]*?<!-- RETROACHIEVEMENTS:END -->/;
	const updatedReadMe = readMeContents.replace(
		regex,
		`<!-- RETROACHIEVEMENTS:START -->\n🏆 ${content}\n<!-- RETROACHIEVEMENTS:END -->`,
	);

	await writeFile(readMePath, updatedReadMe, 'utf8');
}
