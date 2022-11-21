const tasks = [
    
    {
        start:"04:30",
        end:"06:50",
        task:"tution"
    }
    ,{
    start: "00:30",
    end:"05:20",
 
    task:"school"
},{
    start: "07:50",
    end:"08:20",
    task:"school"
}

,{
    start: "07:30",
    end:"08:40",
    task:"school"
}
];
const times = ['12:00',"01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00"]
const taskContainer = document.getElementById("tasks-section");
const timeContainer= document.getElementById("times-section")
const startHour = document.getElementById("start-hour");
const startMinute = document.getElementById("start-minute");
const endHour = document.getElementById("end-hour");
const endMinute = document.getElementById("end-minute");
const btn =document.getElementById("add-button")
const taskInput = document.getElementById("task-input")
const startAMPM = document.getElementById("start-am-pm")
const endAMPM = document.getElementById("end-am-pm")


let st_hr="00"
let st_min="00"
let en_hr="00"
let en_min="00"
let task_inp=''
let start_zone='am'
let end_zone ='am'

function getOption(len, time_unit){
    const opFrag1 = document.createDocumentFragment();
    let unit;
    let start;
    if(time_unit==="hour"){
        unit=1;
        start =1;
        const op = document.createElement("option");
        op.setAttribute("value", (12*unit).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
        useGrouping: false
        }))
        op.innerText = (12*unit).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
        useGrouping: false
        });
        opFrag1.append(op);
    }
    else{
        unit =10;
        start =0;
    }

    

    for(let item = start; item<len ;item++ ){
        const op = document.createElement("option");
        op.setAttribute("value", (item*unit).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
        useGrouping: false
        }))
        op.innerText = (item*unit).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
        useGrouping: false
        });
        opFrag1.append(op);
    }

    return opFrag1;
}


function convertTO24hours(time){
    console.log(time)
    const splitted = time.split(' ')
    let [hr,min] = splitted[0].split(":")
    if(splitted[1]=='pm'){
        if(hr !== "12"){
            hr = `${parseInt(hr)+12}`;
        }
    }
    else{
        if(hr=="12") hr="00";
    }
    return `${hr}:${min}`

}



function load(){


    startHour.innerText="";
    endHour.innerText="";
    startHour.append(getOption(12,"hour"));
    endHour.append(getOption(12,"hour"))

    startAMPM.removeEventListener("change",handleChange)
    endAMPM.removeEventListener("change",handleChange)
    startHour.removeEventListener('change', handleChange)
    endHour.removeEventListener('change', handleChange)
    startMinute.removeEventListener('change', handleChange)
    endMinute.removeEventListener('change', handleChange)
    btn.removeEventListener("click", handleAdd)
    taskInput.removeEventListener('keyup', handleInput)
    
    startAMPM.addEventListener("change",handleChange)
    endAMPM.addEventListener("change",handleChange)
    startHour.addEventListener('change', handleChange)
    endHour.addEventListener('change', handleChange)
    startMinute.addEventListener('change', handleChange)
    endMinute.addEventListener('change', handleChange)
    btn.addEventListener("click", handleAdd)
    taskInput.addEventListener('keyup', handleInput)


    startMinute.innerText=""
    endMinute.innerText=""

    startMinute.append(getOption(6,"minute"))
    endMinute.append(getOption(6,"minute"))
    
    timeContainer.innerText=""

    const frag = document.createDocumentFragment();
    times.forEach(item=>{
           const ele = document.createElement("div");
           ele.classList.add('time-div');
           ele.innerText=`${item} AM`;
           frag.append(ele); 
    })  

    // ,"12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"

    times.forEach(item=>{
        const ele = document.createElement("div");
        ele.classList.add('time-div');
        ele.innerText=`${item} PM`;
        frag.append(ele); 
 })
    timeContainer.append(frag)
    const newFrag = document.createDocumentFragment();
    let prev_margin = 0;
    
    
    tasks.sort(compare)
    console.log(tasks)
    taskContainer.innerText=""
    tasks.forEach((item,idx)=>{
        const {top, height} = calculateHeight(item);
        const dv= document.createElement("div");
        dv.classList.add("task");
        dv.style.top = `${top}px`;
        dv.style.height= `${height}px`;
        dv.style.background = "blue";
        const htag = document.createElement("h4");
        htag.classList.add("task-detail")
        htag.innerText = item.task;
        dv.style.width = "250px"
        if(idx !== 0){
            console.log(item.start,tasks[idx-1].end)
            if(tasks[idx-1].end > item.start ){
                prev_margin+=220;
                console.log(prev_margin)
                dv.style.left = `${prev_margin}px`
                dv.style.background = "red";
            }
            else{
                prev_margin=0;
            }
            
        }
        dv.append(htag)
        newFrag.append(dv);


    })

    taskContainer.append(newFrag)
}

function compare(a,b){
    if(a.start < b.start) return -1;
    else if(a.start > b.start ) return 1;
    return 0;

}


function calculateHeight(time){
     
     const splited_start = time.start.split(":");
     const hr = parseInt(splited_start[0])
     const min = parseInt(splited_start[1])
     let start = hr*60+min
     const splited_end = time.end.split(":");
     const hr_end = parseInt(splited_end[0])
     const min_end = parseInt(splited_end[1])
     let end= hr_end*60+min_end

     return {top: start, height:end-start}

    

}

function handleChange(e){

    if(e.target.name === "start-hour") st_hr = e.target.value
    else if(e.target.name === "start-minute") st_min = e.target.value
    else if(e.target.name ==="end-hour") en_hr= e.target.value
    else if(e.target.name === "end-minute")en_min = e.target.value
    else if(e.target.name === "start-am-pm") {
        start_zone = e.target.value
        console.log(e.target.value)
    }
    else if(e.target.name === "end-am-pm") {
        end_zone = e.target.value 
        console.log(e.target.value)
        console.log(start_zone)

    }
            
}



function handleAdd(){
    if(task_inp){
        let start = `${st_hr}:${st_min} ${start_zone}`;
        let end = `${en_hr}:${en_min} ${end_zone}`

        start = convertTO24hours(start);
        end = convertTO24hours(end);
        console.log(start,end)
        // return

        if(start > end){
            alert("start time must be before the end time")
            return
        }
        else {


            let new_task = {
                start,
                end,
                task: task_inp
            }

            tasks.push(new_task)

            load()
        }
    }
    else{
        alert("fill all the fields")
    }
}


function handleInput(e){
    task_inp = e.target.value
}
load()