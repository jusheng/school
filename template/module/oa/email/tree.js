
var stuff = [{
  id: 'hats',
  label: 'Hats',
  children: [
    {label: 'Flat cap'},
    {label: 'Fedora'},
    {label: 'Baseball'},
    {label: 'Top hat'},
    {label: 'Gatsby',
		 childen:[
			 {label:"dddd"}
		 ]
		}
  ]
},{
  id: 'pens',
  label: 'Pens',
  selected: true,
  children: [
    {label: 'Fountain'},
    {label: 'Gel ink'},
    {label: 'Roller ball'},
    {label: 'Fiber tip'},
    {label: 'Ballpoint'}
  ]
},{
  label: 'Whiskey',
  id: 'whiskey',
  children: [
    {label: 'Irish'},
    {label: 'Scotch'},
    {label: 'Rye'},
    {label: 'Tennessee'},
    {label: 'Bourbon'}
  ]
}];

var app = angular.module('bin', ['ivh.treeview']);

/*app.config(function(ivhTreeviewOptionsProvider) {
 ivhTreeviewOptionsProvider.set({
   defaultSelectedState: false,
   validate: true,
   expandToDepth: -1,
	 twistieCollapsedTpl: '+',
	 twistieExpandedTpl: '-',
	 twistieLeafTpl:"|-"
 });
});*/

app.controller('DemoCtrl', function(ivhTreeviewMgr) {

  this.stuff = stuff;

	
  
  this.selectHatsPens = function() {
    // Selecting by node id
    ivhTreeviewMgr.selectEach(stuff, ['hats', 'pens']);
  };
  
  this.deselectBaseballGel = function() {
    // selecting by node reference
    ivhTreeviewMgr.deselectEach(stuff, [
      stuff[0].children[2],
      stuff[1].children[1]
    ]);
  };
});