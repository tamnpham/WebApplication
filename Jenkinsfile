pipeline {
  agent any
  stages {
    stage('Server') {
      parallel {
        stage('Server') {
          agent any
          steps {
            sh '''cd backend
docker-compose down
docker-compose up -d --build'''
          }
        }

        stage('Client') {
          agent any
          steps {
            sh '''cd frontend/dashboard
docker-compose down
docker-compose up -d --build'''
          }
        }

      }
    }

  }
}