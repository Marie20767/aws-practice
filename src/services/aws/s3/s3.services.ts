import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';

const { AWS_REGION, ACCESS_KEY, SECRET_ACCESS_KEY } = process.env;

export const s3Client = new S3Client({
	region: AWS_REGION,
	credentials: {
		accessKeyId: ACCESS_KEY,
		secretAccessKey: SECRET_ACCESS_KEY,
	},
} as S3ClientConfig);
