const jimp = require("jimp")

const fs= require("fs");
const csv = require("csv-parser")
var os = require("os-utils")
const { PerformanceObserver, performance } = require('perf_hooks');
const { isNullOrUndefined } = require("util");
const { exec } = require("child_process");








async function run(){
  console.log("Start")
  for(var i=0;i<3;i++){
    await render(i);
  }
  console.log("End")

}


function analytics(){
  var total = 0;
  var number =0;
  var results = [];
  var totalCPU = 0;
  var cpuAverage = 0;
  fs.createReadStream('test.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
      for(var result of results){
        total+= Number(result.TOTAL);
        totalCPU += Number(result.CPU)
      }
      number = results.length;
      var average = total / number;
      cpuAverage = totalCPU / number;
      fs.writeFileSync("./analytics.txt","TOTAL TIME: " + total / 60000 +"min" + "\nNUMBER OF TESTS: " + number + "\nAVERAGE TIME: "+ average / 1000 +"sec" + "\nAVERAGE CPU USAGE: " + cpuAverage*100 + "%"  )
  });
}



async function render(i){
  console.log(i)
  var start = performance.now();
  await jimp.read("./arxikiProto.png", async(err,proto1)=>{
  
   await jimp.read("./ktirio.jpg",  async(err,sample1)=>{

    
      sample1.resize(1100,1600)
      proto1.composite(sample1,100,1000);
  

      proto1.write("./test1.png");   
      var end = performance.now();
      os.cpuUsage((v)=>{
        fs.appendFileSync("./test.csv", '\n' + start +  "," + end + "," + (end-start).toString() +"," +  v + "," + Number(os.totalmem() - os.freemem())  )
      })
     
  await jimp.read("./didaktikoProto.png", async(err,proto2)=>{
  
    await jimp.read("./ktirio.jpg",  async(err,sample2)=>{
 
     
       sample2.resize(1100,1600)
       proto2.composite(sample2,100,1000);
   
 
       proto2.write("./test2.png");   
       var end = performance.now();
       os.cpuUsage((v)=>{
         fs.appendFileSync("./test.csv", '\n' + start +  "," + end + "," + (end-start).toString() +"," +  v + "," + Number(os.totalmem() - os.freemem())  )
       })
      
      
     })
 
   })

     
   await jimp.read("./ktirioProto.png", async(err,proto3)=>{
  
    await jimp.read("./ktirio.jpg",  async(err,sample3)=>{
 
     
       sample3.resize(1100,1600)
       proto3.composite(sample3,100,1000);
   
 
       prot3o.write("./test3.png");   
       var end = performance.now();
       os.cpuUsage((v)=>{
         fs.appendFileSync("./test.csv", '\n' + start +  "," + end + "," + (end-start).toString() +"," +  v + "," + Number(os.totalmem() - os.freemem())  )
       })
      
      
     })
 
   })
    })

  })

}

render();
//analytics();