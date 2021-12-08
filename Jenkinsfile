pipeline {
  agent any
  stages {
    stage('Server') {
      parallel {
        stage('Server') {
          agent any
          steps {
            sh '''cd backend
sudo docker-compose down
sudo docker-compose up -d --build'''
          }
        }

        stage('Client') {
          agent any
          steps {
            sh '''cd frontend/dashboard
sudo docker-compose down
sudo docker-compose up -d --build'''
          }
        }

      }
    }

  }
}