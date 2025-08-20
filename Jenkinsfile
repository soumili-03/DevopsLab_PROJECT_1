pipeline {
    agent any
    
    stages {
        stage('Environment Check') {
            steps {
                echo '=== ENVIRONMENT CHECK ==='
                sh '''
                    node --version
                    npm --version
                    pwd
                    ls -la
                '''
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo '=== INSTALLING DEPENDENCIES ==='
                sh '''
                    npm install
                    ls -la
                '''
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
                    # Kill any existing Node.js processes
                    echo "Killing any existing Node.js processes..."
                    pkill -f "node app.js" || echo "No existing processes"
                    
                    # Clean up old PID file
                    rm -f app.pid
                    
                    # Start the application
                    echo "Starting Node.js application..."
                    nohup node app.js > app.log 2>&1 &
                    APP_PID=$!
                    echo $APP_PID > app.pid
                    echo "Started app with PID: $APP_PID"
                    
                    # Wait for app to initialize
                    echo "Waiting for app to start..."
                    sleep 3
                    
                    # Verify the app is running
                    if ps -p $APP_PID > /dev/null; then
                        echo "✅ Process is running"
                    else
                        echo "❌ Process failed to start"
                        cat app.log
                        exit 1
                    fi
                    
                    # Test if app is responding
                    echo "Testing if app is responding..."
                    for i in 1 2 3 4 5; do
                        if curl -f http://localhost:3000; then
                            echo "✅ App is responding on port 3000!"
                            break
                        else
                            echo "Attempt $i failed, waiting..."
                            sleep 2
                        fi
                    done
                    
                    # Show app log
                    echo "=== App Log ==="
                    tail -10 app.log
                '''
            }
        }
    }
    
    post {
        success {
            echo '✅ Deployment successful! App should be running on port 3000'
        }
        failure {
            echo '❌ Deployment failed!'
            sh 'cat app.log || echo "No log file"'
        }
    }
}
