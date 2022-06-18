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

    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Unit Tests') {
      steps {
        sh 'npm run test:unit'
      }
    }

    stage('e2e Tests') {
      steps {
        wrap([$class: 'Xvfb', autoDisplayName: true]) {
          sh 'npm run test:e2e'
        }
      }
    }
  }
}
