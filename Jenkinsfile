pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-2'
        ECR_REPO = '467944391264.dkr.ecr.ap-south-2.amazonaws.com/yamini-cicd-repo'
        DOCKER_IMAGE = 'cia-app'
        PATH = "/opt/homebrew/bin:$PATH"
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
                    sh 'npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t ${DOCKER_IMAGE} ./app'
            }
        }

        stage('Login to AWS ECR') {
            steps {
                echo 'Logging in to AWS ECR...'
                sh '''
                    aws ecr get-login-password --region ${AWS_REGION} | \
                    docker login --username AWS --password-stdin ${ECR_REPO}
                '''
            }
        }

        stage('Tag and Push Docker Image') {
            steps {
                echo 'Tagging and pushing Docker image to ECR...'
                sh '''
                    docker tag ${DOCKER_IMAGE}:latest ${ECR_REPO}:latest
                    docker push ${ECR_REPO}:latest
                '''
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo 'Deploying Docker image to EC2...'
                // Replace with your EC2 SSH command once ready
                // Example:
                // sh 'ssh -i /path/to/key.pem ec2-user@your-ec2-ip "docker pull ${ECR_REPO}:latest && docker run -d -p 80:3000 ${ECR_REPO}:latest"'
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
