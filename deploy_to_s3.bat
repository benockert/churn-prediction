echo "Deploying React app to S3..."
cd ui
set REACT_APP_API_URL=/api
start cmd.exe /k "npm run build && aws s3 sync build/ s3://fina-4390"
