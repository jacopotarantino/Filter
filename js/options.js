angular.element(document).ready(function() {
  var initCustomJS, initSelectors;
  chrome.storage.sync.get('filter.substitutions', function(res) {
    if (typeof res['filter.substitutions'] === 'undefined') {
      return chrome.storage.sync.set({
        'filter.substitutions': []
      }, function() {
        return initSelectors();
      });
    } else {
      return initSelectors();
    }
  });
  initSelectors = function() {
    return chrome.storage.sync.get('filter.selectors', function(res) {
      if (typeof res['filter.selectors'] === 'undefined') {
        return chrome.storage.sync.set({
          'filter.selectors': []
        }, function() {
          return initCustomJS();
        });
      } else {
        return initCustomJS();
      }
    });
  };
  return initCustomJS = function() {
    return chrome.storage.sync.get('filter.customjs', function(res) {
      if (typeof res['filter.customjs'] === 'undefined') {
        return chrome.storage.sync.set({
          'filter.customjs': {
            text: ''
          }
        }, function() {
          return angular.bootstrap(document, ['filterOptions']);
        });
      } else {
        return angular.bootstrap(document, ['filterOptions']);
      }
    });
  };
});

angular.module('filterOptions', []).controller('substitutionCtrl', [
  '$window', '$scope', function($window, $scope) {
    var updateChromeStorage;
    $scope.substitutions = [];
    $scope.timeout = false;
    chrome.storage.sync.get('filter.substitutions', function(results) {
      return $scope.$apply(function() {
        return $scope.substitutions = results['filter.substitutions'];
      });
    });
    $scope.addSubstitution = function() {
      $scope.substitutions.push({
        selector: $scope.newSelector,
        substitute: $scope.newSubstitution
      });
      return updateChromeStorage();
    };
    $scope.removeSubstitution = function(index) {
      $scope.substitutions.splice(index, 1);
      return updateChromeStorage();
    };
    updateChromeStorage = function() {
      var safeSubs;
      safeSubs = $scope.substitutions.map(function(sub) {
        return _.pick(sub, 'selector', 'substitute');
      });
      return chrome.storage.sync.set({
        'filter.substitutions': safeSubs
      }, function() {
        return $scope.$apply(function() {
          $scope.newSelector = '';
          return $scope.newSubstitution = '';
        });
      });
    };
    return $scope.updateItem = function() {
      if ($scope.timeout === true) {
        return;
      }
      $scope.timeout = true;
      return setTimeout(function() {
        return $scope.$apply(function() {
          updateChromeStorage();
          return $scope.timeout = false;
        });
      }, 200);
    };
  }
]).controller('removeTagCtrl', [
  '$window', '$scope', function($window, $scope) {
    var updateChromeStorage;
    $scope.selectors = [];
    $scope.timeout = false;
    chrome.storage.sync.get('filter.selectors', function(results) {
      return $scope.$apply(function() {
        return $scope.selectors = results['filter.selectors'];
      });
    });
    $scope.addSelector = function() {
      $scope.selectors.push({
        name: $scope.newSelector
      });
      return updateChromeStorage();
    };
    $scope.removeSelector = function(index) {
      $scope.selectors.splice(index, 1);
      return updateChromeStorage();
    };
    updateChromeStorage = function() {
      var safeSelectors;
      safeSelectors = $scope.selectors.map(function(sel) {
        return _.pick(sel, 'name');
      });
      return chrome.storage.sync.set({
        'filter.selectors': safeSelectors
      }, function() {
        return $scope.$apply(function() {
          return $scope.newSelector = '';
        });
      });
    };
    return $scope.updateItem = function() {
      if ($scope.timeout === true) {
        return;
      }
      $scope.timeout = true;
      return setTimeout(function() {
        return $scope.$apply(function() {
          updateChromeStorage();
          return $scope.timeout = false;
        });
      }, 200);
    };
  }
]).controller('customJSCtrl', [
  '$window', '$scope', function($window, $scope) {
    var updateChromeStorage;
    $scope.customjs = {
      text: ''
    };
    $scope.timeout = false;
    chrome.storage.sync.get('filter.customjs', function(results) {
      return $scope.$apply(function() {
        return $scope.customjs = results['filter.customjs'];
      });
    });
    updateChromeStorage = function() {
      var safeText;
      safeText = _.pick($scope.customjs, 'text');
      return chrome.storage.sync.set({
        'filter.customjs': safeText
      }, function() {});
    };
    return $scope.updateScript = function() {
      if ($scope.timeout === true) {
        return;
      }
      $scope.timeout = true;
      return setTimeout(function() {
        return $scope.$apply(function() {
          updateChromeStorage();
          return $scope.timeout = false;
        });
      }, 200);
    };
  }
]);
