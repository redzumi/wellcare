pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker-compose build'
            }
        }
        stage('Tests') {
            steps {
                sh 'docker-compose run -T frontend yarn test'
            }
        }
        stage('Run') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}