angular.element(document).ready () ->
  # make sure that all localStorage items are populated/working before init.
  chrome.storage.sync.get 'filter.substitutions', (res) ->
    if typeof res['filter.substitutions'] is 'undefined'
      chrome.storage.sync.set { 'filter.substitutions': [] }, () ->
        initSelectors()
    else
      initSelectors()


  initSelectors = () ->
    chrome.storage.sync.get 'filter.selectors', (res) ->
      if typeof res['filter.selectors'] is 'undefined'
        chrome.storage.sync.set { 'filter.selectors': [] }, () ->
          initCustomJS()
      else
        initCustomJS()


  initCustomJS = () ->
    chrome.storage.sync.get 'filter.customjs', (res) ->
      if typeof res['filter.customjs'] is 'undefined'
        chrome.storage.sync.set { 'filter.customjs': {text:''} }, () ->
          angular.bootstrap document, ['filterOptions']
      else
        angular.bootstrap document, ['filterOptions']




angular.module('filterOptions', [])

.controller('substitutionCtrl', ['$window', '$scope', ($window, $scope) ->
  $scope.substitutions = []
  $scope.timeout = false

  # retrieve our substitutions from chrome storage.
  chrome.storage.sync.get 'filter.substitutions', (results) ->
    $scope.$apply () ->
      $scope.substitutions = results['filter.substitutions']


  $scope.addSubstitution = () ->
    # add to the in-memory collection.
    $scope.substitutions.push
      selector: $scope.newSelector
      substitute: $scope.newSubstitution

    updateChromeStorage()


  $scope.removeSubstitution = (index) ->
    $scope.substitutions.splice index, 1

    updateChromeStorage()


  updateChromeStorage = () ->
    # push only the non-angular values to chrome storage.
    safeSubs = $scope.substitutions.map (sub) ->
      _.pick sub, 'selector', 'substitute'

    chrome.storage.sync.set { 'filter.substitutions': safeSubs }, () ->
      $scope.$apply () ->
        $scope.newSelector = ''
        $scope.newSubstitution = ''


  $scope.updateItem = () ->
    if $scope.timeout == true
      return

    $scope.timeout = true
    setTimeout(() ->
      $scope.$apply () ->
        updateChromeStorage()
        $scope.timeout = false
    , 200)

])


.controller('removeTagCtrl', ['$window', '$scope', ($window, $scope) ->
  $scope.selectors = []
  $scope.timeout = false

  # retrieve our selectors from chrome storage.
  chrome.storage.sync.get 'filter.selectors', (results) ->
    $scope.$apply () ->
      $scope.selectors = results['filter.selectors']


  $scope.addSelector = () ->
    # add to the in-memory collection.
    $scope.selectors.push { name: $scope.newSelector }
    updateChromeStorage()


  $scope.removeSelector = (index) ->
    $scope.selectors.splice index, 1
    updateChromeStorage()


  updateChromeStorage = () ->
    # push only the non-angular values to chrome storage.
    safeSelectors = $scope.selectors.map (sel) ->
      _.pick sel, 'name'

    chrome.storage.sync.set { 'filter.selectors': safeSelectors }, () ->
      $scope.$apply () ->
        $scope.newSelector = ''

  $scope.updateItem = () ->
    if $scope.timeout == true
      return

    $scope.timeout = true
    setTimeout(() ->
      $scope.$apply () ->
        updateChromeStorage()
        $scope.timeout = false
    , 200)

])


.controller('customJSCtrl', ['$window', '$scope', ($window, $scope) ->
  $scope.customjs = {text:''}
  $scope.timeout = false

  # retrieve our selectors from chrome storage.
  chrome.storage.sync.get 'filter.customjs', (results) ->
    $scope.$apply () ->
      $scope.customjs = results['filter.customjs']

  updateChromeStorage = () ->
    # push only the non-angular values to chrome storage.
    safeText = _.pick $scope.customjs, 'text'

    chrome.storage.sync.set { 'filter.customjs': safeText }, () ->


  $scope.updateScript = () ->
    if $scope.timeout == true
      return

    $scope.timeout = true
    setTimeout(() ->
      $scope.$apply () ->
        updateChromeStorage()
        $scope.timeout = false
    , 200)

])

