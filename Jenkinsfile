pipeline {
    agent any

    environment {
        // We assume Jenkins has a credential with ID 'dockerhub-credentials'
        // containing a username and password
        DOCKER_CREDS = credentials('dockerhub-credentials')
        FRONTEND_IMAGE = "${DOCKER_CREDS_USR}/mini-wallet-frontend"
        BACKEND_IMAGE = "${DOCKER_CREDS_USR}/mini-wallet-backend"
        TAG = "latest" // Or define dynamically like: "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                // Jenkins will implicitly checkout the code if triggered via webhook/SCM
                // But you can explicitly define it here
                checkout scm
                echo 'Source code fully checked out.'
            }
        }

        stage('NPM Install & Build (Frontend)') {
            steps {
                dir('mini-wallet') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('NPM Install (Backend)') {
            steps {
                dir('mini-wallet-backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Container Build') {
            steps {
                echo 'Building Frontend Docker Image...'
                dir('mini-wallet') {
                    sh "docker build -t ${FRONTEND_IMAGE}:${TAG} ."
                }

                echo 'Building Backend Docker Image...'
                dir('mini-wallet-backend') {
                    sh "docker build -t ${BACKEND_IMAGE}:${TAG} ."
                }
            }
        }

        stage('Docker Hub Push') {
            steps {
                // Log in to Docker Hub using the credentials binded securely
                sh "echo ${DOCKER_CREDS_PSW} | docker login -u ${DOCKER_CREDS_USR} --password-stdin"
                
                echo 'Pushing images to Docker Hub...'
                sh "docker push ${FRONTEND_IMAGE}:${TAG}"
                sh "docker push ${BACKEND_IMAGE}:${TAG}"
                
                // Cleanup local images securely
                sh "docker rmi ${FRONTEND_IMAGE}:${TAG}"
                sh "docker rmi ${BACKEND_IMAGE}:${TAG}"
                sh "docker logout"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                // Apply all Kubernetes manifests located in the k8s directory.
                // NOTE: Jenkins server must have kubectl configured to point to your K8s cluster!
                echo 'Applying Config...'
                sh 'kubectl apply -f k8s/'
                
                // Optional: Force a rolling restart if the 'latest' tag is reused (not recommended in prod, but typical for labs)
                sh 'kubectl rollout restart deployment frontend-deployment'
                sh 'kubectl rollout restart deployment backend-deployment'
            }
        }
    }

    post {
        always {
            echo "Pipeline finished executing"
            // Clean up workspace
            cleanWs()
        }
        success {
            echo 'Deployment successfully executed to K8s cluster!'
        }
        failure {
            echo 'Pipeline failed. Check Jenkins Logs.'
        }
    }
}
