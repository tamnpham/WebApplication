pipeline {
  agent any
  stages {
    stage('Server') {
      parallel {
        stage('Server') {
          agent any
          steps {
            sh 'pwd'
          }
        }

        stage('Client') {
          agent any
          steps {
            sh 'pwd'
          }
        }

      }
    }

  }
}