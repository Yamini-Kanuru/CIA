pipeline {
    agent any

    environment {
        AWS_REGION = "ap-south-2"
        ECR_REPO = "467944391264.dkr.ecr.ap-south-2.amazonaws.com/yamini-cicd-repo"
        IMAGE_NAME = "yamini-cicd-app"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Yamini-Kanuru/CIA.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('app') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('app') {
                    sh '''
                    docker build -t $IMAGE_NAME .
                    docker tag $IMAGE_NAME:latest $ECR_REPO:latest
                    '''
                }
            }
        }

        stage('Login to AWS ECR') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'aws-credentials',
                                                 usernameVariable: 'AWS_ACCESS_KEY_ID',
                                                 passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                    sh '''
                    aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
                    aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
                    aws configure set default.region $AWS_REGION

                    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPO
                    '''
                }
            }
        }

        stage('Push Docker Image to ECR') {
            steps {
                dir('app') {
                    sh '''
                    docker push $ECR_REPO:latest
                    '''
                }
            }
        }

        stage('Deploy on EC2') {
            steps {
                sh '''
                echo "Deploying to EC2 instance..."
                # Example deployment command
                # ssh -o StrictHostKeyChecking=no ec2-user@<EC2_PUBLIC_IP> "docker pull $ECR_REPO:latest && docker run -d -p 3000:3000 $ECR_REPO:latest"
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful!"
        }
        failure {
            echo "❌ Build or deployment failed!"
        }
    }
}
