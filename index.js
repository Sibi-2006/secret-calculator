let secretTriggered = false;
let btn=document.getElementById('secretPage');
function press(num) {
    let display = document.getElementById('display');
    display.value += num;

    if (display.value === "123456" && !secretTriggered) {
        Secret();
        secretTriggered = true;
    }
}


        function enter(){
                
            try{
                let display = document.getElementById('display');
                 display.value = eval(display.value);
            }catch{
                display.value="ERROR!!"
            }
          
        }

        function clearDisplay(){
            document.getElementById('display').value = '';
        }
        document.getElementById("display").addEventListener("keypress",function(event){
            if(event.key==="Enter"){
                event.preventDefault();
                enter();
            }
        });
        document.getElementById("display").addEventListener("keydown",function(event){
            if(event.key==="Delete"){
                event.preventDefault();
                clearDisplay();
            }
        });


function Secret() {
    btn.style.display = "block"
    alert("Do you want to go Secret page 🤫");  
}
