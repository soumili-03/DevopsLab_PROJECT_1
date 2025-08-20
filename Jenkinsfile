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
                    # Clean install to ensure all dependencies are installed
                    rm -rf node_modules package-lock.json
                    npm install
                    
                    # Verify express is installed
                    if [ -d "node_modules/express" ]; then
                        echo "Express module found"
                    else
                        echo "Express module NOT found"
                        npm install express
                    fi
                    
                    ls -la node_modules/ | head -10
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
                    
                    # Clean up old files
                    rm -f app.pid app.log
                    
                    # Start the application
                    echo "Starting Node.js application..."
                    nohup node app.js > app.log 2>&1 &
                    APP_PID=$!
                    echo $APP_PID > app.pid
                    echo "Started app with PID: $APP_PID"
                    
                    # Wait for app to initialize
                    echo "Waiting for app to start..."
                    sleep 5
                    
                    # Verify the app is running
                    if ps -p $APP_PID > /dev/null; then
                        echo "Process is running with PID $APP_PID"
                    else
                        echo "Process failed to start"
                        echo "=== Error Log ==="
                        cat app.log
                        exit 1
                    fi
                    
                    # Test if app is responding
                    echo "Testing if app is responding..."
                    for i in 1 2 3 4 5; do
                        if curl -s -f http://localhost:3000 > /dev/null; then
                            echo "App is responding on port 3000!"
                            curl http://localhost:3000 | head -50
                            break
                        else
                            echo "Attempt $i failed, waiting..."
                            sleep 2
                        fi
                    done
                    
                    # Show app log
                    echo "=== App Log ==="
                    cat app.log
                '''
            }
        }
    }
    
    post {
        success {
            echo 'Deployment successful! App running on port 3000'
            echo 'Access your app at http://localhost:3001 (mapped from container port 3000)'
        }
        failure {
            echo 'Deployment failed!'
            sh '''
                echo "=== Debug Information ==="
                echo "Current directory:"
                pwd
                echo "Files in directory:"
                ls -la
                echo "Node modules:"
                ls -la node_modules/ 2>/dev/null || echo "No node_modules found"
                echo "App log:"
                cat app.log 2>/dev/null || echo "No app.log found"
            '''
        }
    }
}