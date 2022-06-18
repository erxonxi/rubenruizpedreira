pipeline {
  agent any
  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Tests') {
      parallel {
        stage('Unit Testing') {
          steps {
            sh 'npm run test:unit'
          }
        }

        stage('e2e Testing') {
          steps {
            sh 'npm run test:e2e'
          }
        }
      }
    }
  }
  tools {
    nodejs '16.5.1'
    xvfb 'DISPLAY'
  }
}
