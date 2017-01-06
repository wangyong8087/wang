var app=angular.module("wdApp",["ionic"])
			.controller("wdCtrl",["$scope",function($scope){
				
			}])
			.controller("homeCtrl",["$scope","$http",function($scope,$http){
				$http.get("http://www.wd.com/prolist")
				.success(function(res){
					console.log(res);
					$scope.produceList=res.dataList;
				})
			}])
			.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){
				// 路由状态提供者
				$stateProvider
				// tabs 状态 ； 没有名字  （views 他是对应首页里面的 ion-nav-view）
				// 状态
				.state("tabs",{
					// 状态对应的地址
					url:"/tabs",
					// 状态所对应的模板
					templateUrl:"templates/pages/tabs.html"
				})
				// tabs子状态home
				.state("tabs.home",{
					
					url:"/home",
					// 视图 名称(ion-nav-view名称 )
					views:{"home":{templateUrl:"templates/pages/home.html"}}
				})
				.state("tabs.produce",{
					url:"/produce",
					views:{"produce":{templateUrl:"templates/pages/produce.html"}}
				})
				.state("tabs.user",{
					url:"/user",
					views:{"user":{templateUrl:"templates/pages/user.html"}}
				})
				// 默认跳转到tabs
				// 地址栏目的 提供者
				$urlRouterProvider.otherwise("/tabs/home")
			}])
			.directive("wdRender",[function(){
				return{
					restrict:"A",
					link:function(scope,elem,attr){
						if(scope.$last){
							setTimeout(function(){
								window.drawCircle()
							},0)
						}
					}
				}
			}])
