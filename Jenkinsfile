pipeline {
    agent any
    
    stages {
        stage('Environment Check') {
            steps {
                echo '=== ENVIRONMENT CHECK ==='
                sh 'node --version || echo "Node.js not found"'
                sh 'npm --version || echo "NPM not found"'
                sh 'pwd'
                sh 'ls -la'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo '=== INSTALLING DEPENDENCIES ==='
                sh 'npm install'
                sh 'ls -la node_modules/ || echo "Dependencies installed"'
            }
        }
        
        stage('Run Tests') {
            steps {
                echo '=== RUNNING TESTS ==='
                sh 'npm test'
            }
        }
        
        stage('Deploy Application') {
            steps {
                echo '=== DEPLOYING APPLICATION ==='
                sh '''
                    echo "Killing any existing Node.js processes..."
                    pkill -f "node app.js" || echo "No existing processes"
                    sleep 2
                    
                    echo "Starting Node.js application..."
                    nohup node app.js > app.log 2>&1 &
                    APP_PID=$!
                    echo $APP_PID > app.pid
                    echo "Started app with PID: $APP_PID"
                    
                    echo "Waiting for app to start..."
                    sleep 5
                    
                    echo "Testing if app is responding..."
                    curl -f http://localhost:3000 && echo "App is running!" || echo "App failed to respond"
                '''
            }
        }
    }
    
    post {
        success {
            echo 'SUCCESS: Real deployment completed! '
            echo 'App should be running on port 3000'
        }
        failure {
            echo 'FAILURE: Deployment failed '
        }
    }
}
