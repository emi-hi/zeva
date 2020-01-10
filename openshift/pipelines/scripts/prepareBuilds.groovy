def buildStages(String envName, String zevaRelease) {
    def buildList = []
    def buildStages = [:]
    buildStages.put('Build Frontend', prepareBuildFrontend(envName, zevaRelease))
    buildList.add(buildStages)
    return buildList
}

def prepareBuildFrontend(String envName, String zevaRelease) {
    return {
        stage('Build-Frontend') {
            timeout(30) {
                script {
                    openshift.withProject("tbiwaq-tools") {
                        def frontendJson = openshift.process(readFile(file:'openshift/templates/frontend/frontend-bc-working.json'), "-p", "RELEASE=${zevaRelease}", 'GIT_URL=$https://github.com/bcgov/zeva.git', "GIT_REF=${RELEASE}")
                        openshift.apply(frontendJson)
                        def frontendBuildSelector = openshift.selector("bc", "frontend")
                        frontendBuildSelector.startBuild("--wait")
                    }
                } //end of script
            } //end of timeout
        }
    }
}
