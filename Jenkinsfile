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

    stage('Test Install') {
      steps {
        sh 'sudo apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb'
      }
    }

    stage('e2e Tests') {
      steps {
        sh 'npm run test:e2e'
      }
    }
  }
}