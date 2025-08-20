pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                echo '=== CODE CHECKOUT ==='
                echo 'Code successfully checked out from GitHub!'
                sh 'ls -la'
                sh 'pwd'
            }
        }
        
        stage('Environment Check') {
            steps {
                echo '=== ENVIRONMENT CHECK ==='
                sh 'whoami'
                sh 'uname -a'
                echo 'Jenkins workspace ready!'
            }
        }
        
        stage('Build Simulation') {
            steps {
                echo '=== BUILD SIMULATION ==='
                echo 'Simulating npm install...'
                echo 'Dependencies would be installed here'
                sh 'echo "Build completed successfully!"'
            }
        }
        
        stage('Test Simulation') {
            steps {
                echo '=== TEST SIMULATION ==='
                echo 'Simulating npm test...'
                echo 'All tests would pass here'
                sh 'echo "Tests completed successfully!"'
            }
        }
        
        stage('Deploy Simulation') {
            steps {
                echo '=== DEPLOY SIMULATION ==='
                echo 'Application would be deployed here'
                echo 'App would be available at http://localhost:3001'
                sh 'echo "Deployment completed successfully!"'
            }
        }
    }
    
    post {
        always {
            echo '=== PIPELINE COMPLETED ==='
        }
        success {
            echo 'SUCCESS: CI/CD Pipeline completed successfully! '
            echo 'This demonstrates automated:'
            echo '- Code checkout from GitHub'
            echo '- Build process'
            echo '- Testing'
            echo '- Deployment'
        }
        failure {
            echo 'FAILURE: Pipeline failed '
        }
    }
}
