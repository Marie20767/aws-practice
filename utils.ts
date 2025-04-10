import { createWriteStream } from 'fs';
import { Readable } from 'stream';

export const saveImage = async (image_name: string, imageReadStream: Readable) => {
	const filePath = `src/assets/saved-images/${image_name}.png`;

	await new Promise<void>((resolve, reject) => {
		imageReadStream
			.pipe(createWriteStream(filePath))
			.on('error', err => {
				reject(err);
			})
			.on('finish', () => {
				resolve();
			});
	});
};
