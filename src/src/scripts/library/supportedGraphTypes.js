var generators = require('ngraph.generators');

module.exports = getGraphTypes;

function getGraphTypes() {
  return Object.keys(generators).map(function(key) {
    var functionBody = generators[key].toString();
    var comments = getComments(functionBody);
    var parsedComments = parseComments(comments);

    return {
      name: key,
      description: parsedComments.description ? parsedComments.description.join('\n') : '',
      params: parsedComments.params
    };
  });
}

function parseComments(comments) {
  var result = {};
  var processLine = readDescription;

  for (var i = 0; i < comments.length; ++i) {
    var line = trim(comments[i]);

    processLine(line);

    var nextLine = comments[i + 1];
    if (typeof nextLine === 'string' && nextLine.indexOf('@') >= 0) {
      processLine = getNextState(nextLine);
    }
  }

  return result;

  function readDescription(line) {
    if (!result.description) result.description = [];
    if (line) result.description.push(line);
  }

  function readParam(line) {
    var paramDef = line.match(/@param \{.+\}\s+(.+?)\s+(.+)/);
    if (paramDef) {
      if (!result.params) result.params = [];
      result.params.push({
        name: paramDef[1],
        description: paramDef[2]
      });
    }
  }

  function readSee(line) {
    var seeDef = line.match(/@see\s+(.+)/);
    if (seeDef) {
      if (!result.see) result.see = [];
      result.see.push(seeDef[1]);
    }
  }

  function noop(line) { }

  function getNextState(line) {
    if (line.indexOf('@param') !== -1) return readParam;
    if (line.indexOf('@see') !== -1) return readSee;
    return noop;
  }
}

function getComments(body) {
  var strings = body.split('\n');
  var comments = [];

  for (var i = 0; i < strings.length; ++i) {
    var line = trim(strings[i]);
    var isJSDoc = (line[0] === '/' && line[1] === '*' && line[2] === '*');

    if (isJSDoc) {
      var commentLine;
      while ( (commentLine = readCommentLine(trim(strings[++i]))) ) {
        comments.push(commentLine);
      }

      return comments;
    }
  }
}

function readCommentLine(str) {
  var endOfJSDoc = str[0] === '*' && str[1] === '/';
  if (endOfJSDoc) return;

  comment = str;
  if (str[0] === '*') {
    comment = str.substr(1);
  }

  comment = trim(comment);
  return comment ? comment : ' ';
}

function trim(str) {
  return str
    .replace(/^\s+/g, '')
    .replace(/\s+$/g, '');
}
