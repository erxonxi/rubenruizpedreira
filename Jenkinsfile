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
            wrap([$class: 'Xvfb', timeout: 25]) {
              sh 'npm run test:e2e'
            }
          }
        }
      }
    }
  }
  tools {
    nodejs '16.15.1'
    xvfb 'DISPLAY'
  }
}
