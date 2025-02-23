include .env

lambda-create-function:
	aws lambda create-function --function-name ai-information-collection-app-typescript --runtime 'nodejs22.x' --role ${AWS_LAMBDA_ROLE} --zip-file 'fileb://dist/index.zip' --handler index.handler

deploy:
	aws lambda update-function-code --function-name ai-information-collection-app-typescript --zip-file 'fileb://dist/index.zip'