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
      wrap([$class: 'Xvfb', additionalOptions: '', assignedLabels: '', autoDisplayName: true, debug: true, displayNameOffset: 0, installationName: 'XVFB', parallelBuild: true, screen: '1280x720x24', timeout: 25]) {
        steps {
          sh 'npm run test:e2e'
        }
      }
    }
  }
}