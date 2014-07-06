var moment = require('moment');
var offlineData = require('./offlineData');

module.exports = function getLibraries($http, $q, libraries) {
  return $q.all(libraries.map(getRepositoryInfo));

  function getRepositoryInfo(name) {
    return $http.get('https://api.github.com/repos/' + name)
                .then(extractFields)
                .then(mergeWithOfflineData);
  }

  function extractFields(reposResponse) {
    var repoInfo = reposResponse.data;

    return {
      name: repoInfo.full_name,
      description: repoInfo.description,
      forks: repoInfo.forks,
      watchers: repoInfo.watchers,
      url: repoInfo.html_url,
      issues: repoInfo.open_issues,
      createdTime: new Date(Date.parse(repoInfo.created_at)),
      created: moment(repoInfo.created_at).fromNow(),
      createdTooltip: repoInfo.created_at,
      updatedTime: new Date(Date.parse(repoInfo.pushed_at)),
      updated: moment(repoInfo.pushed_at).fromNow(),
      updatedTooltip: repoInfo.pushed_at,
      commits: 'tbd'
    };
  }

  function mergeWithOfflineData(repoInfo) {
    var offlineInfo = offlineData.libraries[repoInfo.name];
    if (!offlineInfo) {
      // we don't know wabout this library, bail out:
      return repoInfo;
    }
    for (var name in offlineInfo) {
      // skip standard properties and those which are present in the online data:
      if (!offlineInfo.hasOwnProperty(name) || repoInfo.hasOwnProperty(name)) continue;

      repoInfo[name] = offlineInfo[name];
    }

    return repoInfo;
  }
};
