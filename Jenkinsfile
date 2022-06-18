pipeline {
  agent any
  tools {
    nodejs  '16.15.1'
    xvfb  'Xvfb'
  }
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

    stages('Tests') {

      stage('Unit Tests') {
        steps {
          sh 'npm run test:unit'
        }
      }

      stage('e2e Tests') {
        steps {
          sh 'npm run test:e2e'
        }
      }
    }
  }
}
