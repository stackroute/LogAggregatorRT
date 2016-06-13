
var flag,flagn,flaga;
if($scope.saveToDB) {
for(i in $scope.wlstdef.publisher) {
  if($scope.wlstdef.publisher[i]==="saveToDB")
  {
    flag=1;
  }
}
if(flag!=1) {
  var z="saveToDB";
    $scope.wlstdef.publisher.push(z);
}
}
else {
for(i in $scope.wlstdef.publisher) {
  if($scope.wlstdef.publisher[i]=="saveToDB")
  {
    $scope.wlstdef.publisher.splice(i, 1);
  }
}
}

if($scope.outputStream) {
for(i in $scope.wlstdef.publisher) {
  if($scope.wlstdef.publisher[i]==="outputStream")
  {
    flagn=1;
  }
}
if(flagn!=1) {
  $scope.wlstdef.publisher.push("outputStream");
}
}
else {
for(i in $scope.wlstdef.publisher) {
  if($scope.wlstdef.publisher[i]=="outputStream")
  {
    $scope.wlstdef.publisher.splice(i, 1);
  }
}
}

if($scope.publishToDashboard) {
for(i in $scope.wlstdef.publisher) {
  if($scope.wlstdef.publisher[i]==="publishToDashboard")
  {
    flaga=1;
  }
}
if(flaga!=1) {
  $scope.wlstdef.publisher.push("publishToDashboard");
}
}
else {
for(i in $scope.wlstdef.publisher) {
  if($scope.wlstdef.publisher[i]=="publishToDashboard")
  {
    $scope.wlstdef.publisher.splice(i, 1);
  }
}
}
