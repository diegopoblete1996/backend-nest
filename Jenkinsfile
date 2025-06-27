pipeline {

    agent any

    environment {
        NPM_CONFIG_CACHE= "${WORKSPACE}/.npm"
    }

    // escenarios -> escenario -> pasos

    stages{
        stage ("saludo a usuario") {
            steps {
                sh 'echo "Comenzado mi Pipeline"'
            }
        }
        stage ("salida de los saludos a usuario") {
            steps {
                sh 'echo "Saliendo de este grupo de escenarios"'
            }
        }
        stage ("proceso de build y test") {
            agent {
                docker {
                    image 'node:22'
                    reuseNode true
                }
            }
            stages {
                stage ("instalación de dependencias"){
                    steps {
                        sh 'npm ci'
                    }
                }
                stage ("Ejecución de pruebas"){
                    steps {
                        sh 'npm run test:cov'
                    }
                }
            }
        }
    }
}