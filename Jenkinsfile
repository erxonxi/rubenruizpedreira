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

    stage('TypesCheck') {
      steps {
        sh 'npm run typecheck'
      }
    }

    stage('Unit Testing') {
      steps {
        sh 'npm run test:unit'
      }
    }
  }
  tools {
    nodejs '16.15.1'
    xvfb 'DISPLAY'
  }
}
