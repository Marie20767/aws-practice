import express, { Request, Response } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { s3Client } from 'src/services/aws/s3/s3.services';
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import path from 'path';
import { readFileSync } from 'fs';
import { saveImage } from 'utils';
import { Readable } from 'stream';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const { S3_BUCKET_NAME, AWS_REGION } = process.env;

const app = express();

app.use(
	cors({
		origin: '*',
	})
);
app.use(express.json());

const server = createServer(app);

app.post('/image/upload', async (request: Request, response: Response) => {
	const { image_name } = request.body;

	try {
		if (!image_name) {
			return response.status(400).json({ error: 'Image name required' });
		}

		const cat_image_path = path.resolve(__dirname, 'src/assets/cat-image.png');
		const cat_image = readFileSync(cat_image_path);

		const uploadParams = {
			Bucket: S3_BUCKET_NAME,
			Key: `${image_name}.png`,
			Body: cat_image,
			ContentType: 'image/png',
		};

		const command = new PutObjectCommand(uploadParams);

		await s3Client.send(command);

		const s3Url = `https://${uploadParams.Bucket}.s3.${AWS_REGION}.amazonaws.com/${uploadParams.Key}`;

		return response.status(200).json({ url: s3Url, message: 'Successfully uploaded image' });
	} catch (error) {
		console.log('>>> error: ', error);
		return response.status(500).json({ error: 'Failed to upload image' });
	}
});

app.get('/image/:name', async (request: Request, response: Response) => {
	const image_name = request.params.name;

	try {
		const fetchParams = { Bucket: S3_BUCKET_NAME, Key: `${image_name}.png` };
		const command = new GetObjectCommand(fetchParams);

		const s3Response = await s3Client.send(command);

		await saveImage(image_name, s3Response.Body as Readable);

		return response.status(200).json({ message: 'Successfully fetched image' });
	} catch (error) {
		console.log('>>> error: ', error);
		return response.status(500).json({ error: 'Failed to fetch image' });
	}
});

app.delete('/image/delete', async (request: Request, response: Response) => {
	const { image_name } = request.body;

	try {
		if (!image_name) {
			return response.status(400).json({ error: 'Image name required' });
		}

		const deleteParams = {
			Bucket: S3_BUCKET_NAME,
			Key: `${image_name}.png`,
		};

		const command = new DeleteObjectCommand(deleteParams);

		await s3Client.send(command);

		return response.status(200).json({ message: 'Successfully deleted image' });
	} catch (error) {
		console.log('>>> error: ', error);
		return response.status(500).json({ error: 'Failed to delete image' });
	}
});

app.get('/image/url/:name', async (request: Request, response: Response) => {
	const image_name = request.params.name;

	try {
		if (!image_name) {
			return response.status(400).json({ error: 'Image name required' });
		}

		const fetchParams = { Bucket: S3_BUCKET_NAME, Key: `${image_name}.png` };
		const command = new GetObjectCommand(fetchParams);
		const url = await getSignedUrl(s3Client, command, { expiresIn: 10 });

		return response.status(200).json({ message: 'Successfully fetched image', url });
	} catch (error) {
		console.log('>>> error: ', error);
		return response.status(500).json({ error: 'Failed to fetch image' });
	}
});

// TODO: deploy to EC2 without docker
// TODO: dockerise it then deploy to EC2 again and compare

const startServer = () => {
	server.listen(8080, '0.0.0.0', () => {
		console.log('This app is running on port 8080');
	});
};

startServer();
