import 'dotenv/config';

module.exports = {
  apps: [
    {
      name: "aws-practice",
      watch: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      script: "build/index.js",
      env: {
        AWS_REGION: process.env.AWS_REGION,
        ACCESS_KEY: process.env.ACCESS_KEY,
        SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
        S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
      }
    },
  ],
};
