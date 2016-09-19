# AngularUnitTest
angular单元测试
## angular单元测试


### 1.创建项目


![创建项目](http://upload-images.jianshu.io/upload_images/1062695-5482a4f8f3b06149.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 2.创建文件夹
在项目中创建3个文件夹分别用于存放项目中用到的html、js、test文件。

### 3.安装框架
服务器依赖于nodejs，需要安装nodejs的包，首先在根目录下创建package.json文件。

- 安装angular等框架  

```  
	npm install bootstrap -save
	
	npm install install angular -save
	
	npm install angular-mocks -save

```

- 安装http-server模块   

 ```
 npm install http-server -save
 
 ```
 
 - 安装其他模块   

 ```
 npm install jasmine-core -save
 
 npm install karma -save
 
 npm install karma-chrome-launcher -save
 
 npm install karma-jasmine -save
 
 npm install karma-junit-reporter -save
 
 npm install protractor -save
 
 ```
 
###  4.启动服务器  
要启动node服务器需要在package.json中配置script节点,dependencies中定义依赖包，在script配置start节点用于启动服务器，test节点的内容会在后面讲解。  

```

{
  "name": "application-name",
  "description": "AngularUnitTest",
  "version": "0.0.1",
  "dependencies": {
    "angular": "^1.5.8",
    "angular-mocks": "^1.5.8",
    "bootstrap": "^3.3.7",
    "http-server": "^0.9.0",
    "install": "^0.8.1",
    "jasmine-core": "^2.5.2",
    "karma": "^1.3.0",
    "karma-chrome-launcher": "^2.0.0",
    "karma-jasmine": "^1.0.2",
    "karma-junit-reporter": "^1.1.0",
    "protractor": "^4.0.8"
  },
  "scripts": {
    "prestart": "npm install",
    "start": "http-server -a localhost -p 8000 -c-1",
    "pretest": "npm install",
    "test": "karma start karma.conf.js",
    "test-single-run": "karma start karma.conf.js  --single-run"
  }
}
```

配置后运行命令,启动服务器，浏览器上输入http://localhost:8000  

```
npm start
```  

![npm start](http://upload-images.jianshu.io/upload_images/1062695-8ea19edef0dc2f74.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

### 5.编写功能代码

在文件js中新建js文件index.js。在index.js中定义congroller,实现简单累加方法add,代码如下:

```
var appControllers = angular.module('app', []);
appControllers.controller('indexCtrl',['$scope',function($scope) {

    $scope.add = function (a, b) {
        if(a && b)
            return Number(a) + Number(b)
        return 0;
    };
    
    $scope.detect = function (a, b) {
        if(a && b)
            return Number(a) - Number(b)
        return 0;
    };
    
    $scope.pr = function () {
        console.log('Function pr');
    };

}]);


``` 

在文件html中新建html文件index.html，加入两个输入框用户获取输入，当输入后绑定controller中的add方法实现计算器功能，代码如下:

<p>&lt;!DOCTYPE html&gt;<br /> 
&lt;html lang=&quot;en&quot; ng-app=&quot;app&quot;&gt;<br /> 
&lt;head&gt;<br /> 
    &lt;meta charset=&quot;UTF-8&quot;&gt;<br /> 
    &lt;title&gt;index&lt;/title&gt;<br /> 
&lt;/head&gt;<br /> 
&lt;body&gt;<br /> 
&lt;div ng-controller=&quot;indexCtrl&quot;&gt;<br /> 
    &lt;input type=&quot;text&quot; ng-model=&quot;a&quot; value=&quot; 0&quot;&gt;<br /> 
    +<br /> 
    &lt;input type=&quot;text&quot; ng-model=&quot;b&quot; value=&quot;0&quot;&gt;<br /> 
    =&lt;span id=&quot;result&quot;&gt;{{add(a,b)}}&lt;/span&gt;<br /> 
&lt;/div&gt;<br /> 
&lt;/body&gt;<br /> 
&lt;/html&gt;<br /> 
&lt;script src=&quot;/node<em>modules/angular/angular.min.js&quot;&gt;&lt;/ script&gt;<br /> 
&lt;script src=&quot;/node</em>modules/angular-mocks/angular-mocks.js&quot;&gt;&lt;/script&gt;<br /> 
&lt;script src=&quot;/js/index.js&quot;&gt;&lt;/script&gt;</p><br /> 


启动服务器看到下图效果
![效果图](http://upload-images.jianshu.io/upload_images/1062695-f16d76958d16c3d0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 6.编写测试代码

```
'use strict';
describe('app', function () {
    beforeEach(module('app'));
    describe('indexCtrl', function () {
        it('add 测试', inject(function ($controller) {
            var $scope = {};
            //spec body
            var indexCtrl = $controller('indexCtrl', {$scope: $scope});
            expect(indexCtrl).toBeDefined();
            expect($scope.add(2, 3)).toEqual(5);
        }));
        it('test detect function', function () {
            expect(scope.detect(4,3)).toEqual(1);
        });
        it('test pr function', function () {
            expect(scope.pr()).toEqual();
        });

    });
});

```

### 7.单元测试配置
```
karma init
```

![karma init](http://upload-images.jianshu.io/upload_images/1062695-6eae9385ac77aa2e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


在karma配置文件代码中每个节点都有默认注释请参

```

// Karma configuration
// Generated on Mon Sep 19 2016 10:51:55 GMT+0800 (CST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular/angular.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'js/index.js',
      'test/index-test.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: '/test_out/unit.xml',
      suite: 'unit'
    }
  })
}

```

在package.json scripts 配置测试信息,指定karma文件地址

```
"test": "karma start karma.conf.js",

```

### 8.运行单元测试

```
npm test

```
![npm run](http://upload-images.jianshu.io/upload_images/1062695-0c2224619eec10a7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![test page1](http://upload-images.jianshu.io/upload_images/1062695-1defb99c819cffde.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![test page2](http://upload-images.jianshu.io/upload_images/1062695-ba60430131515263.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![test result](http://upload-images.jianshu.io/upload_images/1062695-d88d80a63e862386.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### 9.添加网络测试

- $http service示例

```
var app = angular.module('Application', []);

app.controller('MainCtrl', function($scope, $http) {
    $http.get('Users/users.json').success(function(data){
        $scope.users = data;
    });
    $scope.text = 'Hello World!';
});
```  

- 使用$httpBackend设置伪后台

```
describe('MainCtrl', function() {
    //我们会在测试中使用这个scope
    var scope, $httpBackend;

    //模拟我们的Application模块并注入我们自己的依赖
    beforeEach(angular.mock.module('Application'));

    //模拟Controller，并且包含 $rootScope 和 $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller, _$httpBackend_) {
        //设置$httpBackend冲刷$http请求
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', 'Users/users.json').respond([{
            id: 1,
            name: 'Bob'
        }, {
            id: 2,
            name: 'Jane'
        }]);
        //创建一个空的 scope
        scope = $rootScope.$new();

        //声明 Controller并且注入已创建的空的 scope
        $controller('MainCtrl', {
            $scope: scope
        });
    }));

    // 测试从这里开始
    it('should have variable text = "Hello World!"', function() {
        expect(scope.text).toBe('Hello World!');
    });
    it('should fetch list of users', function() {
        $httpBackend.flush();
        expect(scope.users.length).toBe(2);
        expect(scope.users[0].name).toBe('Bob');
        //输出结果以方便查看
        for(var i=0;i<scope.users.length;i++){
            console.log(scope.users[i].name);
        }
    });
});
```

以上示例中，可以使用$httpBackend.when和$httpBackend.expect提前设置请求的伪数据。最后在请求后执行$httpBackend.flush就会立即执行完成http请求。

在demo中具体情况是这样的，添加常规常量和变量测试，以及两个网络测试，具体代码如下：

```
//常规变量
    $scope.aaa = 1;
    $scope.testText = 'Hello Jsamine And Karma';

    //
    $http.get('users.json').success(function(data){
        $scope.users = data;
    }).error(function (error) {
        $scope.users = error;
    });

    //获取网络数据,制造伪后台
    $http.post('api/000').success(function(data){
        $scope.userInfo = data;
    }).error(function (error) {
        $scope.userInfo = error;
    });

```

在测试文件中这么写

```
/**
 * Created by apple on 16/9/19.
 */
'use strict';
describe('app', function () {
    beforeEach(module('app'));

    var scope,ctrl,$httpBackend;

    beforeEach(inject(function ($controller, $rootScope,_$httpBackend_) {

        $httpBackend = _$httpBackend_;


        $httpBackend.when('GET', 'users.json').respond([
            {
                "id": 1,
                "name": "Bob",
                "age":20
            },
            {
                "id": 2,
                "name": "Jane",
                "age":21
            },
            {
                "id": 3,
                "name": "gary",
                "age":22
            }
        ]);

        $httpBackend.when('POST', 'api/000').respond({
            "dataList": [
                {
                    "moduleId": "501",
                    "moduleList": [
                        {
                            "moduleId": "501001",
                            "moduleName": "融资申请",
                            "moduleUrl": "/financing",
                            "parentModuleId": "501"
                        },
                        {
                            "moduleId": "501002",
                            "moduleName": "融资进度查询",
                            "moduleUrl": "/myFinancing",
                            "parentModuleId": "501"
                        }
                    ],
                    "moduleName": "票据融资",
                    "moduleUrl": "",
                    "parentModuleId": "00"
                }
            ],
            "imgCaptchaRequired": "N",
            "isModifyPwd": "N",
            "isSetTradePwd": "N",
            "loginId": "15250964261",
            "loginType": "00",
            "participantName": "guyu",
            "phone": "15250964261",
            "retCode": "000000",
            "retMsg": "交易成功",
            "shortName": "",
            "totalCount": 3,
            "userName": "15250964261"
        });

        //模拟生成scope, $rootScope是angular中的顶级scope，angular中每个controller中的scope都是rootScope new出来的
        scope = $rootScope.$new();

        //模拟生成controller 并把先前生成的scope传入以方便测试
        ctrl = $controller('indexCtrl', {$scope: scope});


    }));


    describe('indexCtrl', function () {
        it('test add function', function () {
            expect(scope.add(2, 3)).toEqual(5);
        });
        it('test detect function', function () {
            expect(scope.detect(4,3)).toEqual(1);
        });
        it('test pr function', function () {
            expect(scope.pr()).toEqual();
        });

        it('test normal varibles', function () {
            expect(scope.testText).toEqual('Hello Jsamine And Karma');
            expect(scope.aaa).toBe(1);

        });

        //测试伪后台的json数据
        it('test get json', function () {
            $httpBackend.flush();
            expect(scope.users.length).toBe(3);
            expect(scope.users[0].name).toBe('Bob');
            expect(scope.users[1].name).toEqual('Jane');
            expect(scope.users[1].id).toBe(2);
            expect(scope.users[2].age).toBe(22);

            //输出结果以方便查看
            for(var i=0;i<scope.users.length;i++){
                console.log(scope.users[i].id);
                console.log(scope.users[i].name +"    "+ scope.users[i].age);
            }
        });

        //测试伪后台网络数据
        it('test get network data', function () {
            $httpBackend.flush();
            expect(scope.userInfo).toBeDefined();
            expect(scope.userInfo.isModifyPwd).toEqual('N');
            expect(scope.userInfo.retCode).toEqual('000000');
            expect(scope.userInfo.phone).toEqual('15250964261');
            expect(scope.userInfo.dataList.length).toBe(1);
            expect(scope.userInfo.dataList[0].moduleId).toEqual("501");
            expect(scope.userInfo.dataList[0].moduleList[0].moduleId).toEqual("501001");
            expect(scope.userInfo.dataList[0].moduleList[0].parentModuleId).toEqual("501");
            expect(scope.userInfo.dataList[0].moduleList[0].moduleUrl).toEqual("/financing");
            expect(scope.userInfo.dataList[0].moduleList[1].moduleId).toEqual("501002");
            expect(scope.userInfo.dataList[0].moduleList[1].moduleName).toEqual("融资进度查询");
            expect(scope.userInfo.dataList[0].moduleList[1].moduleUrl).toEqual("/myFinancing");
            console.log(scope.userInfo);
        });

    });
});

```

测试结果：
![测试结果](http://upload-images.jianshu.io/upload_images/1062695-ac3c140f157719f9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 补充：$httpBackend常用方法
#### when
新建一个后端定义（backend definition）。

```
when(method, url, [data], [headers]);
```

#### expect
新建一个请求期望（request expectation）。

```
expect(method, url, [data], [headers]);
```
when和expect都需要4个参数method, url, data, headers, 其中后2个参数可选。

- method表示http方法注意都需要是大写(GET, PUT…);<br/>

- url请求的url可以为正则或者字符串；

- data请求时带的参数，

- headers请求时设置的header。

如果这些参数都提供了，那只有当这些参数都匹配的时候才会正确的匹配请求。when和expect都会返回一个带respond方法的对象。respond方法有3个参数status，data，headers通过设置这3个参数就可以伪造返回的响应数据了。
#### 区别：
$httpBackend.when与$httpBackend.expect的区别在于：$httpBackend.expect的伪后台只能被调用一次(调用一次后会被清除)，第二次调用就会报错，而且$httpBackend.resetExpectations可以移除所有的expect而对when没有影响。




 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 