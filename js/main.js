const addTask = document.getElementById("addTask");
const taskValue = document.getElementById("taskValue");
const dis= document.getElementById("displayDATA");



addTask.addEventListener("click" , ()=>{
    const modul= {
                title: taskValue.value,
                apiKey:"65af2ce22681618c591c5c15"
            }
            sendData (modul)
} );



async function sendData (modul){

const apiLink = await fetch("https://todos.routemisr.com/api/v1/todos" , {
        method: 'POST',
        body : JSON.stringify(modul) ,
        headers: {"content-type" : "application/json"}
    });
    const finaApi = await apiLink.json()
    getData()

}


const getData = async ()=>{
    const apiLink = await fetch("https://todos.routemisr.com/api/v1/todos/65af2ce22681618c591c5c15");
        const finaApi = await apiLink.json()
        console.log(finaApi.todos);
        // console.log(finaApi);
        console.log(finaApi.message);
        if (finaApi.message == "success"){
            displayData(finaApi.todos)
        taskValue.value='';
        console.log(finaApi.todos.length);
       
            if (finaApi.todos.length === 0 ){
                    let spiiner = `  <div class="spinner" >
                          <div class="double-bounce1 fs-1 "></div>
                          <div class="double-bounce2 fs-1"></div>
                        </div>
                        `;
                  dis.innerHTML=spiiner
                  }
        }
}


getData()


// ADD CLASS

// Display Data 
const displayData = (dataRec)=>{
    let div = ``
    for (let i = 0; i < dataRec.length; i++) {
        div += `
        <div class="containerBox w-100 row  rounded-4  d-flex justify-content-center align-items-center mt-2 ">
        <div class="Task-name col-md-12 rounded-4 py-2 bg-white">
        <p class="ms-3 text-black my-0 fw-semibold d-inline  ">${[i + 1] } - </p>
        <p class="ms-3 text-black my-0 fw-semibold d-inline ">${dataRec[i].title}</p>
        </div>
        <div class="icons col-md-2 mx-auto d-flex justify-content-center my-2" >
        <button onclick="deleteTodo('${dataRec[i]._id}')"  class=" btn btn-black bg-white  px-4 mx-2 rounded-4">  <i class="bi bi-trash3-fill text-black"></i> </button>
        </div>
        </div>
        
`


    dis.innerHTML=div


    }
}



// //  Delete Todo


async function deleteTodo(todoId){
    
    const link = await fetch ("https://todos.routemisr.com/api/v1/todos",{
    method: 'DELETE',
        body : JSON.stringify({todoId: todoId}) ,
        headers: {"content-type" : "application/json"}
});
    const linkFinal = await link.json();
    getData()
    displayData()
    
}