pipeline {
  agent any
  stages {
    stage('Deploy') {
      agent any
      steps {
        sh '''echo $USER
sudo docker login -u tamnpham -p tam200016'''
        sh '''sudo docker-compose down
sudo docker-compose up -d --build'''
      }
    }

    stage('Clean') {
      steps {
        cleanWs(cleanWhenSuccess: true, cleanWhenFailure: true)
      }
    }

  }
}