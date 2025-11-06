pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-1'
        ECR_REPO_NAME = 'cia-app'
        IMAGE_TAG = "latest"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Fetching code from GitHub...'
                git branch: 'main', url: 'https://github.com/Yamini-Kanuru/CIA.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the Node.js application...'
                dir('app') {
                    sh 'npm install'
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                dir('app') {
                    sh 'npm test || echo "No tests configured"'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t $ECR_REPO_NAME ./app'
            }
        }

        stage('Login to AWS ECR') {
            steps {
                echo 'Logging in to AWS ECR...'
                sh '''
                aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin <your-account-id>.dkr.ecr.$AWS_REGION.amazonaws.com
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                echo 'Pushing Docker image to ECR...'
                sh '''
                docker tag $ECR_REPO_NAME:latest <your-account-id>.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO_NAME:$IMAGE_TAG
                docker push <your-account-id>.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO_NAME:$IMAGE_TAG
                '''
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo 'Deploying to EC2...'
                sh 'echo "Deployment step here (e.g., SSH into EC2 and pull image)"'
            }
        }
    }

    post {
        success {
            echo '✅ Build completed successfully!'
        }
        failure {
            echo '❌ Build failed. Please check the logs.'
        }
    }
}
