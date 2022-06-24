let local_check = false;      
let botArr = [];   //пустой массив, заполняемый ботом при старт клике 
       
function startClick() {                                               //функция обработка старт кнопки
    let txt = document.querySelector(".message-txt").value;  


    let botRepeat = false;

    let arrBot1 = [0,0,0,0];
    let arrBot2 = [0,0,0,0];
    
    for (key in arrBot1) {
        arrBot1[key] = Math.random() * 10;
        arrBot1[key] = Math.floor(arrBot1[key]);
    }
    
    
    for(let i = 0; i<arrBot1.length; i++){                   //проверка на повторы цифр
        if(arrBot1[i] != arrBot1[i+1] &&  arrBot1[0] != arrBot1[3] && arrBot1[0] != arrBot1[2] && arrBot1[1] != arrBot1[3] && i+1 <= arrBot1.length && botRepeat == false) {
            arrBot2[i] = arrBot1[i];
            repeat = false;
        }
        else {
            repeat = true;
            break;
        }
    }
    
    while (repeat == true) {
        for (key in arrBot1) {
            arrBot1[key] = Math.random() * 10;
            arrBot1[key] = Math.floor(arrBot1[key]);
        }
        
        // console.log(arrBot1 + " вывод не отсортированного массива");
        
        for(let i = 0; i<arrBot1.length; i++){                   //проверка на повторы цифр
            if(arrBot1[i] != arrBot1[i+1] &&  arrBot1[0] != arrBot1[3] && arrBot1[0] != arrBot1[2] && arrBot1[1] != arrBot1[3] && i+1 <= arrBot1.length && botRepeat == false) {
                arrBot2[i] = arrBot1[i];
                repeat = false;
            }
            else {
                repeat = true;
                break;
            }
        }
    }    
    
    console.log(arrBot2 + " конечный массив бота");
    botArr = arrBot2;
    

    document.querySelector(".error-message").style.display="none";
    document.querySelector(".txtfield").value="";
    document.querySelector(".p-message-txt").textContent='';


   if (local_check == false) {
       local_check = true;
       document.querySelector(".message-txt").innerHTML="GAME HAS STARTED";
       document.querySelector(".player-box").style.display='flex';
       document.querySelector(".start-button").textContent='STOP';
       document.querySelector(".start-button").style.background="black";
       document.querySelector(".p-message-txt").textContent='';


   }
   else {
       local_check = false;
       document.querySelector(".player-box").style.display='none';
       document.querySelector(".start-button").textContent='START';
       document.querySelector(".message-txt").textContent="";
       document.querySelector(".start-button").style.background="rgb(174, 167, 231)";
   }
}

document.querySelector('.start-button').onclick = startClick;




let txt = "";
let availabilityErr;      //переменная для расчета результата если введены верные данные    
let gameArr = [];  
 
function checkClick() {                                             //функция обработка чек кнопки при клике
    let txt = document.querySelector('.txtfield').value;
    document.querySelector(".error-message").style.display="none";
    availabilityErr = false;  
    detectedError(txt);
    console.log(availabilityErr + " нет ошибок");
    if(availabilityErr == true) {
        // document.querySelector(".p-message-txt").textContent=gameArr;
        checkWin(botArr, gameArr);
    }
    else {
        document.querySelector(".p-message-txt").textContent="";
        console.log("найдены ошибки");
    }       
}

document.querySelector('.check-button').onclick = checkClick;



function detectedError(txt) {   // функция обработки ошибок при вводе
    let arr = [];
    arr = txt.split('');

    let repeat = false;
    let arr2 = [0,0,0,0];

     
    for(let i = 0; i<arr.length; i++){                   //проверка на повторы цифр
            if(arr[i] != arr[i+1] && i+1 <= arr.length && repeat == false && arr[0] != arr[2] && arr[1] != arr [3] && arr[0] != arr[3]) {
                arr2[i] = arr[i];
                // console.log("повторов нет");
                repeat = false;
            }
            else {
                repeat = true;
                // console.log("имеется повтор")
                break;
            }
    }
    
    // console.log(repeat);

    let space = false;                   

    for (let i = 0; i < arr.length; i++) {            //проверка на пробел
        bufer = arr[i].charCodeAt(0);
        // console.log(bufer);
        if (bufer < 48 || bufer > 58) {
            space = true;
            // console.log("обнаружен пробел");
            break;
        }

    }

    if (txt.length > 4 || txt.length < 4) {                             //проверка на длину сообщения

        document.querySelector(".error-message").style.display='block';
        document.querySelector(".error-code").innerHTML="длина введенного не равна 4 символам";
    }
    else if (repeat == true) {
        document.querySelector(".error-message").style.display='block';
        document.querySelector(".error-code").innerHTML="введенные символы повторяются";
    }
    else if ( space == true) {
        document.querySelector(".error-message").style.display='block';
        document.querySelector(".error-code").innerHTML="вы ввели пробел/иной символ";
    }
    else {
        availabilityErr = true;
        gameArr = arr2;
    }
}



function checkWin(botArr, playerArr) {
    let bulls = 0;
    let cows = 0;


    console.log(botArr + " массив бота в вин");
    console.log(playerArr + " массив игрока в вин")
    if ( botArr[0] == playerArr[0] && botArr[1] == playerArr[1] && botArr[2] == playerArr[2] && botArr[3] == playerArr[3]) {
        document.querySelector(".p-message-txt").textContent="победа";
    }
    if(playerArr[0] == botArr[0]){
        bulls++;
    }
    if(playerArr[1] == botArr[1]){
        bulls++;
    }
    if(playerArr[2] == botArr[2]){
        bulls++;
    }
    if(playerArr[3] == botArr[3]){
        bulls++;
    }
    if(playerArr[0] == botArr[1] ||playerArr[0] == botArr[2] || playerArr[0] == botArr[3]){
        cows++;
    }
    if(playerArr[1] == botArr[0] ||playerArr[1] == botArr[2] || playerArr[1] == botArr[3]){
        cows++;
    }
    if(playerArr[2] == botArr[0] ||playerArr[2] == botArr[1] || playerArr[2] == botArr[3]){
        cows++;
    }
    if(playerArr[3] == botArr[0] ||playerArr[3] == botArr[1] || playerArr[3] == botArr[2]){
        cows++;
    }

    document.querySelector(".p-message-txt").textContent=bulls + "b" + ' ' + cows + 'c';
}

