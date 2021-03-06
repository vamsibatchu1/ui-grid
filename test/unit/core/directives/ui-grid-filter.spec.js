describe('uiGridFilter', function () {
  var grid, recompile, $compile, $scope, $document, $httpBackend;

  var data = [
    { 'name': 'Ethel Price', 'gender': 'female', 'company': 'Enersol' },
    { 'name': 'Claudine Neal', 'gender': 'female', 'company': 'Sealoud' },
    { 'name': 'Beryl Rice', 'gender': 'female', 'company': 'Velity' },
    { 'name': 'Wilder Gonzales', 'gender': 'male', 'company': 'Geekko' }
  ];

  var columnDefs = [
    { name: 'name' },
    { name: 'gender' },
    { name: 'company' }
  ];

  beforeEach(module('ui.grid'));

  beforeEach(inject(function (_$compile_, $rootScope, _$document_, _$httpBackend_) {
    $compile = _$compile_;
    $scope = $rootScope;
    $document = _$document_;
    $httpBackend = _$httpBackend_;

    $scope.gridOpts = {
      columnDefs: columnDefs,
      data: data
    };

    recompile = function () {
      grid = angular.element('<div style="width: 500px; height: 300px" ui-grid="gridOpts"></div>');

      $compile(grid)($scope);
      $document[0].body.appendChild(grid[0]);

      $scope.$digest();
    };

    recompile();
  }));

  afterEach(function() {
    grid.remove();
  });

  describe('should handle a URL-based template defined in filterHeaderTemplate', function () {
    it('should handle', function () {
      var el, url = 'http://www.a-really-fake-url.com/filterHeaderTemplate.html';

      $scope.gridOpts.enableFiltering = true;
      $scope.gridOpts.columnDefs[0].filterHeaderTemplate = url;

      $httpBackend.expectGET(url).respond('<div class="filterHeaderTemplate">filterHeaderTemplate content</div>');
      recompile();

      el = $(grid).find('.filterHeaderTemplate');
      expect(el.text()).toEqual('');

      $httpBackend.flush();
      el = $(grid).find('.filterHeaderTemplate');
      expect(el.text()).toEqual('filterHeaderTemplate content');
    });
  });
});
