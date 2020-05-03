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
                sh 'docker-compose run -T frontend npm run test'
            }
        }
        stage('Run') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}