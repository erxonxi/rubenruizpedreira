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
        publishChecks name: 'example', title: 'Pipeline Check', summary: 'check through pipeline', text: 'you can publish checks in pipeline script', detailsURL: 'https://github.com/jenkinsci/checks-api-plugin#pipeline-usage', actions: [[label:'an-user-request-action', description:'actions allow users to request pre-defined behaviours', identifier:'an unique identifier']]
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
