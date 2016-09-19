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