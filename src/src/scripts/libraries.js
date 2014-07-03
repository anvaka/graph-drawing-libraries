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
      created_at: repoInfo.created_at,
      commits: 'tbd',
      updated_at: repoInfo.updated_at
    };
  }
};
