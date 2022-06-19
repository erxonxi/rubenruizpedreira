void setBuildStatus(String message, String state) {
  step([
      $class: 'GitHubCommitStatusSetter',
      reposSource: [$class: 'ManuallyEnteredRepositorySource', url: 'https://github.com/erxonxi/rubenruizpedreira'],
      contextSource: [$class: 'ManuallyEnteredCommitContextSource', context: 'ci/jenkins/status'],
      errorHandlers: [[$class: 'ChangingBuildStatusErrorHandler', result: 'UNSTABLE']],
      statusResultSource: [ $class: 'ConditionalStatusResultSource', results: [[$class: 'AnyBuildResult', message: message, state: state]] ]
  ])
}

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

  post {
    success {
        setBuildStatus('Build succeeded', 'SUCCESS')
    }
    failure {
        setBuildStatus('Build failed', 'FAILURE')
    }
  }

  tools {
    nodejs '16.15.1'
    xvfb 'DISPLAY'
  }
}
