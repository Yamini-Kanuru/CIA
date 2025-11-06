pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-2'
        ECR_REPO = '467944391264.dkr.ecr.ap-south-2.amazonaws.com/yamini-cicd-repo'
        IMAGE_NAME = 'yamini-cicd-image'
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
                sh 'cd app && npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'cd app && node test.js'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh '''
                cd app
                docker build -t $IMAGE_NAME .
                docker tag $IMAGE_NAME:latest $ECR_REPO:latest
                '''
            }
        }

        stage('Login to AWS ECR') {
            steps {
                echo 'Logging in to AWS ECR...'
                sh '''
                aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPO
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                echo 'Pushing Docker image to AWS ECR...'
                sh 'docker push $ECR_REPO:latest'
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo 'Deploying Docker container on EC2...'
                sh '''
                echo "This is where we’d deploy the image using SSH or AWS CLI."
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Build failed. Please check the logs.'
        }
    }
}
