/********************************
Filename: main.js
Author: Celina Katayama
Description: Generate random lottery numbers
Date: November 1, 2018
*********************************/


document.addEventListener("DOMContentLoaded",init);

let pages = []; // empty array

function init(){
    // find all the pages 
    pages = document.querySelectorAll(".page");
    
    console.log(pages);
    
    document.getElementById("btnSend").addEventListener("click", function(){
        serverData.getJSON(); 
    });

    document.getElementById("btnBack").addEventListener("click", function(){
        EmptyList();
    });   
}

let serverData = {
    url: "https://davidst.edumedia.ca/mad9014/nums.php",
    
    // POST is used to send the numbers (digits and max)
    httpRequest: "POST",
    
    getJSON: function () {
    
        let formdata = new FormData();

        let digits = document.getElementById("digits");
        let max = document.getElementById("max");
        
        console.log(digits.value.length);
        console.log(max.value.length);
        
        if (digits.value.length == 0){
            alert("You must enter the Number of Digits!");
            digits.focus();
            return;
        } else if (digits.value <= 0 || digits.value > 10){
            alert("You must enter a Number between 1 and 10!");
            digits.focus();
            return;
        } else if (max.value.length == 0){
            alert("You must enter the Max of the Range!");
            max.focus();
            return;    
        } else if (max.value <= 0 || max.value > 99){
            alert("You must enter a Max between 1 and 99!");
            max.focus();
            return;  
        }
    
        //get the parameters digits and max
        formdata.append("digits", document.getElementById("digits").value);
        formdata.append("max", document.getElementById("max").value);

        //test
//        console.log(document.getElementById("digits").value);
//        console.log(document.getElementById("max").value);
        
        
        let customSettings = {
            method: serverData.httpRequest,
            mode: "cors",
            body: formdata
        };

        // pass fetch a Request object
        let request = new Request(serverData.url, customSettings); 

        console.log(customSettings);

        fetch(request)
            .then(function (response) {
                //ask lotto numbers
                console.log(response); 

                return response.json();
            })
            .then(function (data) {
                //get and show lotto numbers
                if(data.code == 0){
                    showLottoNumbers(data);
                } else{
                    alert(data.message);
                    return;
                }     
            })
            .catch(function (err) {
                alert("Error: " + err.message);
            });
    }
}

function showLottoNumbers(data) {
    
    //console.log(data.numbers);
    
    let lottoNumbers = [];
    lottoNumbers = data.numbers;

    //locate the list of numbers in html
    let ul = document.querySelector(".num_list");
    
    lottoNumbers.forEach(function(item){
        
        let li = document.createElement("li");
        li.textContent = item;
        //let text = document.createTextNode(item);
        
        ul.appendChild(li);
        //li.appendChild(text);
        
    })
    
    pages[0].classList.toggle("active");
    pages[1].classList.toggle("active");

}
  
function EmptyList(){
    //locate the list of numbers in html
    let ul = document.querySelector(".num_list");
    console.log(ul);

    //remove the list itens
    while (ul.hasChildNodes()) {   
        ul.removeChild(ul.firstChild);
    }

    pages[0].classList.toggle("active");
    pages[1].classList.toggle("active");
        
}
    
    
    
  