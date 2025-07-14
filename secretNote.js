let btn=document.getElementById('btn');
let res=document.getElementById('res');
let input=document.getElementById('input');
let para= document.createElement('div');
let notes=[];
let clear = document.getElementById('clear');


res.appendChild(para);
btn.addEventListener('click', () => {
    let trimmed = input.value.trim();
    if (trimmed === "") return; 

    notes.push(trimmed);
    localStorage.setItem("Notes", JSON.stringify(notes));
    ListNote(trimmed);
    input.value = '';
});


function symbol(){
    let sym=["➭","➪","❥","➽","⤷","✈︎","☕︎︎","➢","⥅","𖹭"];
    return sym[Math.floor(Math.random()*10)];
}
function color(){
    let cal=["#ffc0cb","#2c1f21","#ffffff","#ffd700","#3d99fb","#c285fcff"];
    return cal[Math.floor(Math.random() * cal.length)];

}
function ListNote(note){
    let h4=document.createElement('h4');
    h4.textContent=`${symbol()} ${note}`;
    h4.style.color=color();
    para.appendChild(h4);
    
    h4.addEventListener('click',()=>{
        h4.style.textDecoration = "line-through";
        remove(note);
    });
    h4.addEventListener('dblclick',()=>{
        para.removeChild(h4);
        remove(note);
    });
}
function remove(note){
    let index=notes.indexOf(note);
    if(index>-1){
        notes.splice(index,1);
    }
    localStorage.setItem("Notes",JSON.stringify(notes));
}

clear.addEventListener('click',()=>{
    if (confirm("Are you sure you want to delete all notes?")) {
     notes = [];
    para.innerHTML = '';
    localStorage.removeItem('Notes');
    }

});

function start(){
    notes=JSON.parse(localStorage.getItem('Notes')) || [];
    notes.forEach(note => {
        ListNote(note);
    });
}
start();