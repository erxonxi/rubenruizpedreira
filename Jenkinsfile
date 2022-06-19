void setCompletBuildStatus(String context, String message, String state) {
  step([
      $class: 'GitHubCommitStatusSetter',
      reposSource: [$class: 'ManuallyEnteredRepositorySource', url: 'https://github.com/erxonxi/rubenruizpedreira'],
      contextSource: [$class: 'ManuallyEnteredCommitContextSource', context: context],
      errorHandlers: [[$class: 'ChangingBuildStatusErrorHandler', result: 'UNSTABLE']],
      statusResultSource: [ $class: 'ConditionalStatusResultSource', results: [[$class: 'AnyBuildResult', message: message, state: state]] ]
  ])
}

pipeline {
  agent any
  stages {
    stage('Install Dependencies') {
      steps {
        setCompletBuildStatus('ci/jenkins/lint', 'Linting...', 'PENDING')
        setCompletBuildStatus('ci/jenkins/typecheck', 'Checking Types...', 'PENDING')
        setCompletBuildStatus('ci/jenkins/test:unit', 'Unit Testing Running...', 'PENDING')
        sh 'npm install'
      }
    }

    stage('Lint') {
      steps {
        script {
          try {
            sh 'npm run lint'
            setCompletBuildStatus('ci/jenkins/lint', 'Linted Correctly', 'SUCCESS')
          } catch (Exception e) {
            setCompletBuildStatus('ci/jenkins/lint', 'Error Linting code', 'FAILURE')
          }
        }
      }
    }

    stage('TypesCheck') {
      steps {
        script {
          try {
            sh 'npm run typecheck'
            setCompletBuildStatus('ci/jenkins/typecheck', 'Types Checked Correctly', 'SUCCESS')
          } catch (Exception e) {
            setCompletBuildStatus('ci/jenkins/typecheck', 'Error Checking Types', 'FAILURE')
          }
        }
      }
    }

    stage('Unit Testing') {
      steps {
        script {
          try {
            sh 'npm run test:unit'
            setCompletBuildStatus('ci/jenkins/test:unit', 'Unit Testing Correctly', 'SUCCESS')
          } catch (Exception e) {
            setCompletBuildStatus('ci/jenkins/test:unit', 'Error In Unit Testing', 'FAILURE')
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
