module.exports = {
  apps: [
    {
      name: "aws-practice",
      watch: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      script: "build/index.js",
      env_file: ".env"
    },
  ],
};
