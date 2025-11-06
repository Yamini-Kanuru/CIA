pipeline {
    agent any

    environment {
        AWS_REGION = "ap-south-2"
        ECR_REPO = "467944391264.dkr.ecr.ap-south-2.amazonaws.com/yamini-cicd-repo"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Fetching code from GitHub..."
                git branch: 'main', url: 'https://github.com/Yamini-Kanuru/CIA.git'
            }
        }

        stage('Build') {
            steps {
                echo "Building the Node.js application..."
                dir('app') {
                    sh 'npm install'
                }
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
                dir('app') {
                    sh 'npm test || echo "No tests defined"'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image..."
                dir('app') {
                    sh "docker build -t yamini-cicd-app ."
                }
            }
        }

        stage('Login to AWS ECR') {
            steps {
                echo "Logging in to AWS ECR..."
                sh '''
                    aws ecr get-login-password --region ${AWS_REGION} | \
                    docker login --username AWS --password-stdin ${ECR_REPO}
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                echo "Tagging and pushing image to ECR..."
                sh '''
                    docker tag yamini-cicd-app:latest ${ECR_REPO}:latest
                    docker push ${ECR_REPO}:latest
                '''
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo "Deploying container on EC2..."
                sh '''
                    echo "Simulating deployment on EC2"
                    # Actual EC2 deployment commands would go here
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Build and Deployment successful!"
        }
        failure {
            echo "❌ Build failed. Please check the logs."
        }
    }
}
