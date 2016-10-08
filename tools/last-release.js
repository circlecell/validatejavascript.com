const { execSync } = require('child_process');
const { clean } = require('semver');

module.exports = (config, pluginConfig, callback) => {
    const refs = execSync('git show-ref --tags').toString('utf-8').trim().split('\n');
    let latestVersion;
    let latestVersionCommitHash;

    for(const ref of refs) {
        const [commitHash, refName] = ref.split(' ');
        const version = clean(refName.split('/')[2]);

        // version is null if not valid
        if(version) {
            if(!latestVersion) {
                latestVersion = version;
                latestVersionCommitHash = commitHash;
            } else {
                if(lt(latestVersion, version)) {
                    latestVersion = version;
                    latestVersionCommitHash = commitHash;
                }
            }
        }
    }

    if(!latestVersion) {
        throw Error('There is no valid git tag. If you just started using last-release-git-tag you need to create the first valid git tag manually. Run "git tag v0.0.0".');
    }

    callback(null, {
        version: latestVersion,
        gitHead: latestVersionCommitHash
    });
};
