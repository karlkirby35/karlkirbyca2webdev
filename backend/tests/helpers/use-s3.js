// Sets the environment variables that make storage.service.js use S3.
// storage.service.js reads these when it is imported, so this file must be imported first.

process.env.STORAGE_DRIVER = "s3";
process.env.S3_BUCKET = "notes-test-bucket";
process.env.AWS_REGION = "eu-west-1";
