// ajax script here

// const REQ_URL = "https://atma.up.railway.app/"
const REQ_URL = "localhost:8000"


var RESPONSE_DATA = "";

window.addEventListener('load', getData);

const table = document.getElementById("table");

document.getElementById("getBtn").addEventListener('click', getData);

function getData(){
    const xhr = new XMLHttpRequest();

    xhr.open("GET", `${REQ_URL}/posts`, true);

    xhr.responseType = "json";

    xhr.onload = ()=>{
        if(xhr.status === 200){
            var data = xhr.response;
            console.log(data);

            RESPONSE_DATA = data;
            document.getElementById('msg_no').max = RESPONSE_DATA.length;

            table.innerHTML = "";

            table.innerHTML += "<thead><td>no</td><td>NAME</td><td>MESSAGE</td><td>ID</td></thead>";

            for(i = 0; i<data.length; i++){

                var msg_no = i+1

                table.innerHTML += "<tr><td>" + msg_no + "</td><td>" + data[i].title + "</td><td>" + data[i].description + "</td><td>"+ data[i]._id + "</td></tr>"
            }

        }
        else{
            console.log("Error occured");
        }
    }

    xhr.send();

}


document.getElementById("insert-btn").addEventListener('click', (e)=>{
    e.preventDefault();
    
    // get all data of user
    let usr_title = document.getElementById("user-title").value;
    let usr_description = document.getElementById("textarea").value;

    if(usr_title.trim()=="" || usr_description.trim()==""){
        alert("Name or Message field is empty");
    }
    else{
        insertData(usr_title, usr_description)
    }

})

function insertData(usr_title, usr_description){
    
    // create xhr object
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "https://nipanepostapi.herokuapp.com/posts", true);

    // set request header
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = ()=>{
        if(xhr.status===200){

            document.getElementById('insert-form').reset();

            getData();

            document.getElementById("msg").innerHTML='<div class="msg-success">Data uploaded Success Fully</div>';
            setTimeout(()=>{
                document.getElementById("msg").innerHTML=""
            }, 2000)

            
        }
        else{

            document.getElementById("msg").innerHTML='<div class="msg-failed">Failed to upload data plz try again later</div>';

            setTimeout(()=>{
                document.getElementById("msg").innerHTML=""
            }, 2000);
        }
    }



    // js object 
    const mydata = {title:usr_title, description:usr_description};

    // js object to json
    const data = JSON.stringify(mydata);

    // send data 
    xhr.send(data);
}


document.getElementById('delete-btn').addEventListener('click', (e)=>{
    e.preventDefault();

    const pass = "ARYANDELETE"

    // get data 
    const msg_no = document.getElementById('msg_no').value;
    const pss = document.getElementById('pss').value;

    if(msg_no.trim()=="" || pss.trim()=="" || pss.trim()!=pass || msg_no.trim()>RESPONSE_DATA.length){
        alert("Only Admin can delete messages");
    }else{
        let msg_id = RESPONSE_DATA[msg_no-1]._id;
        delete_data(msg_id);
    }

});


function delete_data(msg_id){
    const xhr = new XMLHttpRequest();


    const url = `https://nipanepostapi.herokuapp.com/posts/${msg_id}`;

    xhr.open("delete", url , true);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = ()=>{
        if(xhr.status === 200){
            console.log("Deleted" + "\n" + url + "\n" + xhr.response);
            getData();
        }
        else{
            console.log("Failed to delete");
        }
    }

    // const mydata = {}

    xhr.send();
}