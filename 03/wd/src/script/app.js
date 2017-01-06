var app=angular.module("wdApp",["ionic"])
			.controller("wdCtrl",["$scope",function($scope){
				
			}])
			.controller("homeCtrl",["$scope","$http","wdService",function($scope,$http,wdService){
				$scope.produceList=wdService.fechData("produceList");
				if($scope.produceList.length<=0){
					LoadProduceList();
				}
				
				function LoadProduceList(type){
					if(!type){type=1;}
					$http.get("http://www.wd.com/prolist")
					.success(function(res){
						if(type==1){
						$scope.produceList=res.dataList.concat($scope.produceList);	
						
						}else if(type==2){
						$scope.produceList=$scope.produceList.concat(res.dataList);		
						}
						
						
					})
					.finally(function(){
						if(type==1){
							$scope.$broadcast('scroll.refreshComplete');
						}else{
							$scope.$broadcast('scroll.infiniteScrollComplete');
						}
						 wdService.saveData("produceList",$scope.produceList);
					})
				}
				$scope. doRefresh=function(){
					// type 1 是上拉 2 是下拉
					 LoadProduceList(1)
				}
				$scope.loadMore=function(){
					LoadProduceList(2)
				}
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
						if(scope.$last||scope.$first){
							setTimeout(function(){
								console.log("draw");
								window.drawCircle();
							},0)
						}
					}
				}
			}])
	.factory("wdService",[function(){
		return {
			saveData:function(name,data){
				window.localStorage.setItem(name,JSON.stringify(data));
			},
			fechData:function(name){
				var str=window.localStorage.getItem(name)||"[]";
				return JSON.parse(str);
			}
		}
	}])
