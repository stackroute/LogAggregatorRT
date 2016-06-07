var fs=require('fs');
var stream=require('stream');

var data=fs.createReadStream("../execute/dummy.json");
data.on('data',function(data)
{
var a=JSON.parse(data);
for(i in a)
{
console.log(a[i].Field);
}
});
