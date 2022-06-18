pipeline {
  agent any
  tools {
    nodejs  '16.15.1'
  }
  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }
  }
}