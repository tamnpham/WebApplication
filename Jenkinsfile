pipeline {
  agent {
    node {
      label 'Built-In Node'
    }

  }
  stages {
    stage('Server') {
      parallel {
        stage('Server') {
          agent {
            node {
              label 'Built-In Node'
            }

          }
          steps {
            sh 'pwd'
          }
        }

        stage('Client') {
          agent {
            node {
              label 'master'
            }

          }
          steps {
            sh 'pwd'
          }
        }

      }
    }

  }
}