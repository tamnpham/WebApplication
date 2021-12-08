pipeline {
  agent any
  stages {
    stage('Build & Deploy') {
      parallel {
        stage('Server') {
          agent any
          
          when {
            anyOf {
              changeset 'backend/**'
            }
          }
          
          steps {
            sh '''echo $USER
sudo docker login -u tamnpham -p tam200016'''
            sh '''cd backend
sudo docker-compose down
sudo docker-compose up -d --build'''
          }
        }

        stage('Client') {
          agent any
          
          when {
            anyOf {
              changeset 'frontend/**'
            }
          }
          
          steps {
            sh 'sudo docker login -u tamnpham -p tam200016'
            sh '''cd frontend/dashboard
sudo docker-compose down
sudo docker-compose up -d --build'''
          }
        }

      }
    }

    stage('Clean') {
      steps {
        cleanWs(cleanWhenSuccess: true, cleanWhenFailure: true)
      }
    }

  }
}
