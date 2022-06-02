let tFlag = true;
let cFlag = false;
let task = document.querySelector(".taskLists");
let completed = document.querySelector(".completed");
let mCont = document.querySelector(".content")
var uid = new ShortUniqueId();

let cArr=[];
let tArr=[];

//315
if(localStorage.getItem("taskArr"))
{   
    let temp = localStorage.getItem("taskArr")
    tArr = JSON.parse(temp);
    mCont.innerHTML = "";
    completed.style.color = "lightgray";
        task.style.color = "white";
    for(let i=0;i<tArr.length;i++){
        createTask(tArr[i].name,tArr[i].id);
    }
}

if(localStorage.getItem("completedArr"))
{   
    let temp = localStorage.getItem("completedArr")
    cArr = JSON.parse(temp);
}    

function createTask(name,id){
    //console.log(id)
        if(id===undefined){
            id = uid();
            tArr.push({"name":name,"id":id}) ;
           updateStorageT();
        }
      let d = document.createElement("div");
      d.setAttribute("class","data");
      d.innerHTML=`<div> <i class="fa fa-check check"></i> </div>
                <div class="name"> ${name} </div>
               <div> <i class="fa fa-trash trash"></i> </div>`
      mCont.appendChild(d);
      let check = d.querySelector(".check");
      check.addEventListener('click',function(){
        let dIdx = getIdx(id,tArr);
        d.remove();
        cArr.push(tArr[dIdx]);
        tArr.splice(dIdx,1);
        updateStorageT()
        updateStorageC()
      })


      let del = d.querySelector(".trash");
      del.addEventListener('click',function(){
        let dIdx = getIdx(id,tArr);
        d.remove();
        tArr.splice(dIdx,1);
        updateStorageT()
      })  
    



}

let icon = document.querySelector(".icon");
let iFlag = true;
let iField = document.querySelector(".input");

icon.addEventListener('click',function(){
    if(iFlag){
   iField.style.display = "block";
    }else{
        iField.style.display = "none";
    }
    iFlag=!iFlag;
})

iField.addEventListener('keydown',function(e){
    if(e.key=="Enter"){
        let val= e.target.value;
        e.target.value = "";
        createTask(val);
        iFlag=true;
        iField.style.display = "none";

    }
})

task.addEventListener('click',function(){
    mCont.innerHTML = "";
    completed.style.color = "lightgray";
        task.style.color = "white";
    for(let i=0;i<tArr.length;i++){
        createTask(tArr[i].name,tArr[i].id);
    }
})

completed.addEventListener('click',function(){
    mCont.innerHTML = "";
    completed.style.color = "white";
    task.style.color = "lightgray";
    for(let i=0;i<cArr.length;i++){
        createData(cArr[i].name,cArr[i].id);
    }
})


function getIdx(id,arr){
    for(let i=0;i<arr.length;i++){
        if(arr[i].id==id){
            return i;
        }
    }
}

function createData(name,id){
    //console.log(id)
      let c = document.createElement("div");
      c.setAttribute("class","comp");
      c.innerHTML=`<div class="cname"> ${name} </div>
               <div> <i class="fa fa-trash del"></i> </div>`
      mCont.appendChild(c);
     let trash = c.querySelector(".del");
      trash.addEventListener('click',function(){
        let cIdx = getIdx(id,cArr);
        c.remove();
        cArr.splice(cIdx,1);
        updateStorageC()
      })
}

function updateStorageT(){
    let taskArr = JSON.stringify(tArr);
    localStorage.setItem("taskArr",taskArr);
}

function updateStorageC(){
    let completedArr = JSON.stringify(cArr);
    localStorage.setItem("completedArr",completedArr);
}