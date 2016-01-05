var libraries = require('../data/libraries');

module.exports = function getLibraries($http) {
  return $http.get('//gh-graph-stats.herokuapp.com/githubstats/').then(mergeWithOfflineData);

  function mergeWithOfflineData(res) {
    var repositories = res.data.repositories;
    repositories.forEach(merge);
    return repositories;

    function merge(repoInfo) {
      var offlineInfo = libraries.libraries[repoInfo.name];
      if (!offlineInfo) {
        // we don't know about this library, bail out:
        return repoInfo;
      }
      for (var name in offlineInfo) {
        // skip standard properties and those which are present in the online data:
        if (!offlineInfo.hasOwnProperty(name) || repoInfo.hasOwnProperty(name)) continue;

        repoInfo[name] = offlineInfo[name];
      }

      return repoInfo;
    }
  }
};
