echo "Deploying React app to S3..."
cd ui
export REACT_APP_API_URL=/api
npm run build
aws s3 sync build/ s3://fina-4390