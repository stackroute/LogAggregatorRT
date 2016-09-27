    angular.module('tattva')
        .controller('contributersctrl', function($scope, $http) {

            $scope.users = [{
                    "login": "jasjeetKaur",
                    "avatar_url": "https://avatars.githubusercontent.com/u/17720719?v=3",
                    "url": "https://github.com/jasjeetKaur"
                }, {
                    "login": "Surya11111",
                    "avatar_url": "https://avatars.githubusercontent.com/u/17422920?v=3",
                    "url": "https://github.com/Surya11111"
                }, {
                    "login": "prarthanajain",
                    "avatar_url": "https://avatars.githubusercontent.com/u/17717042?v=3",
                    "url": "https://github.com/prarthanajain"
                }, {
                    "login": "poojaSingh18",
                    "avatar_url": "https://avatars.githubusercontent.com/u/17717061?v=3",
                    "url": "https://github.com/poojaSingh18"
                }, {
                    "login": "navjotsinghcheema",
                    "avatar_url": "https://avatars.githubusercontent.com/u/14845797?v=3",
                    "url": "https://github.com/navjotsinghcheema"
                }, {
                    "login": "tapasgiri9",
                    "avatar_url": "https://avatars.githubusercontent.com/u/17979189?v=3",
                    "url": "https://github.com/tapasgiri9"
                }, {
                    "login": "SuryaSah",
                    "avatar_url": "https://avatars.githubusercontent.com/u/17717207?v=3",
                    "url": "https://github.com/SuryaSah"
                }, {
                    "login": "swagat1306",
                    "avatar_url": "https://avatars.githubusercontent.com/u/17717128?v=3",
                    "url": "https://github.com/swagat1306"
                }, {
                    "login": "kunjarani",
                    "avatar_url": "https://avatars.githubusercontent.com/u/18570657?v=3",
                    "url": "https://github.com/kunjarani"
                }, {
                    "login": "RahulSKinkar",
                    "avatar_url": "https://avatars.githubusercontent.com/u/17717032?v=3",
                    "url": "https://github.com/RahulSKinkar"
                }, {
                    "login": "GurleenArneja",
                    "avatar_url": "https://avatars.githubusercontent.com/u/18570564?v=3",
                    "url": "https://github.com/GurleenArneja"
                }, {
                    "login": "rajiff",
                    "avatar_url": "https://avatars.githubusercontent.com/u/1080415?v=3",
                    "url": "https://github.com/rajiff"
                }, {
                    "login": "PrasannaKainkaryam2",
                    "avatar_url": "https://avatars.githubusercontent.com/u/18571894?v=3",
                    "url": "https://github.com/PrasannaKainkaryam2"
                }, {
                    "login": "Bhavaniuditha",
                    "url": "https://github.com/Bhavaniuditha",
                    "avatar_url": "https://avatars2.githubusercontent.com/u/20160522?v=3&s=466"
                }, {
                    "login": "divyamorukurthi",
                    "url": "https://github.com/divyamorukurthi",
                    "avatar_url": "https://avatars0.githubusercontent.com/u/20160612?v=3&s=466"
                }, {
                    "login": "kritikasingla17",
                    "url": "https://github.com/kritikasingla17",
                    "avatar_url": "https://avatars2.githubusercontent.com/u/7893355?v=3&s=72"
                }, {
                    "login": "inderjeetsingh14",
                    "url": "https://github.com/inderjeetsingh14",
                    "avatar_url": "https://avatars.githubusercontent.com/u/20180659?v=3&s=72"
                }, {
                    "login": "khatwachandan5",
                    "url": "https://github.com/khatwachandan5",
                    "avatar_url": "https://avatars.githubusercontent.com/u/20160916?v=3&s=72"
                }

            ]
            $scope.columns = columnize($scope.users, 3);

            function columnize(input, cols) {
                var arr = [];
                for (i = 0; i < input.length; i++) {
                    var colIdx = i % cols;
                    arr[colIdx] = arr[colIdx] || [];
                    arr[colIdx].push(input[i]);
                }
                return arr;
            }
        });
