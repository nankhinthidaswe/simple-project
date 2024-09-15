const first_player ='O';
const second_player='X';

let count = 1;
const winCondition=[
    ['p1','p2','p3'],
    ['p4','p5','p6'],
    ['p7','p8','p9'],
];

let isRun = true;

function $(id){
    return document.getElementById(id);
}
function isFirstPlay(){
    let isFirst =count %2;
    return isFirst == 1;
}

function decide() {
    let isEnd = false;

        for(let row=0;row<3;row++){
          isEnd =  isWin(winCondition[row][0],winCondition[row][1],winCondition[row][2]);
            if(isEnd){
                result($(winCondition[row][0]).value + 'is winner' )
                return true;
            }
        }
        for(let col=0;col<3;col++){
           isEnd = isWin(winCondition[0][col],winCondition[1][col],winCondition[2][col]);
           if(isEnd){
            result($(winCondition[0][col]).value + 'is winner');
            return true;
           }   
        }
        isEnd = isWin(winCondition[0][0],winCondition[1][1],winCondition[2][2]);
        if(isEnd){
            result($(winCondition[0][0]).valueOf + 'is winner');
            return true;
        }
        isEnd = isWin(winCondition[0][2],winCondition[1][1],winCondition[2][0]);
        if(isEnd){
            result($(winCondition[0][2]).value + 'is winner');
            return true;
        }
        if(9 <= count){
            result('Try again');
            return true;
        }
        return false;
    
}

function isWin(firstId,secondId,thirdId){
   
    if($(firstId).value == ''){
        return false;
    }
    if($(secondId).value == ''){
        return false;
   }
   if($(thirdId).value == ''){
    return false;
    }
    if(($(firstId).value == $(secondId).value) && ($(secondId).value == $(thirdId).value)){
        return true;
    }
    return false;
}

function result(message) {
    $('result').innerHTML = message;
    isRun = false;
   }

function click(event){
    if(!isRun){
        return;
    }
    let id = event.target.id;
    let object = $(id);

    if (object.value !== '') {
        return;
    }
    if(isFirstPlay()){
        object.value = first_player;
    }else{
        object.value = second_player;
    }
    if(decide()){
        return;
    }
    
   count = count + 1;
}
function resetAction(){
    count = 1;
    
    for(let row =0; row<3; row++){
        for(let col=0;col<3;col++){
            $(winCondition[row][col]).value='';
        }
    }
    result('');
    isRun = true;


}
function loadAction(){
    for(let row=0;row<3;row++){
        for(let col=0;col<3;col++){
            $(winCondition[row][col]).onclick = click;
        }
    }
    $('reset').onclick = resetAction;
}
window.onload = loadAction;