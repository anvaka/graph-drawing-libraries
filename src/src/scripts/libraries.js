var moment = require('moment');

module.exports = function getLibraries($http, $q, libraries) {
  return $q.all(libraries.map(getRepositoryInfo));

  function getRepositoryInfo(name) {
    return $http.get('https://api.github.com/repos/' + name).then(extractFields);
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
      created: moment(repoInfo.created_at).fromNow(),
      createdTooltip: repoInfo.created_at,
      updated: moment(repoInfo.pushed_at).fromNow(),
      updatedTooltip: repoInfo.pushed_at,
      commits: 'tbd'
    };
  }
};
