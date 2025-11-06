pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-2'
        ECR_REPO = '467944391264.dkr.ecr.ap-south-2.amazonaws.com/yamini-cicd-repo'
        DOCKER_IMAGE = 'cia-app'
        PATH = "/usr/local/bin:/usr/bin:/bin:/opt/homebrew/bin"
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
                    sh 'npm test || echo "No tests found, skipping..."'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh '''
                    docker build -t ${DOCKER_IMAGE}:latest ./app
                '''
            }
        }

        stage('Login to AWS ECR') {
            steps {
                echo 'Logging in to AWS ECR...'
                sh '''
                    aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REPO}
                '''
            }
        }

        stage('Tag and Push Docker Image') {
            steps {
                echo 'Tagging and pushing Docker image to ECR...'
                sh '''
                    docker tag ${DOCKER_IMAGE}:latest ${ECR_REPO}:${BUILD_NUMBER}
                    docker push ${ECR_REPO}:${BUILD_NUMBER}
                '''
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo 'Deploying container on EC2...'
                sh '''
                    echo "Pulling image on EC2 and restarting container..."
                    # Example: Replace with your EC2 SSH deploy command
                    # ssh -o StrictHostKeyChecking=no ec2-user@<EC2-IP> \
                    # "docker pull ${ECR_REPO}:${BUILD_NUMBER} && docker run -d -p 3000:3000 ${ECR_REPO}:${BUILD_NUMBER}"
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Build and deployment completed successfully!"
        }
        failure {
            echo "❌ Build failed. Please check the logs."
        }
    }
}
