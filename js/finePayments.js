"use strict";
/**
Перед вами список полів. Це можна сказати пряме посилання на кожне із полів форми.
Якщо ви додасте до змінної .value (fineNumber.value) то отримаєте значення
яке зберігається в цьому полі.
 */
let fineNumber = document.getElementById("fineNumber");
let passport = document.getElementById("passport");
let creditCardNumber = document.getElementById("creditCardNumber");
let cvv = document.getElementById("cvv");
let amount = document.getElementById("amount");
let buttonSubmit = document.getElementById("payFine");

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let DB = data.finesData;
let regFineNumber = /\d/;
let regPassport = /[А-Яа-яёЁЇїІіЄєҐґ]{2}\d{6}/;
let regCreditCardNumber = /\d{16}/;
let regCVV = /\d/;



/**
Вам необхідно реалізувати наступний функціонал.
Зробити валідацію до всіх полів
1. Номер та сума повинні бути однакові як в існуючого штрафу - якщо ні видавати
alert "Номер не співпадає" або "Сума не співпадає"

2. Паспортні дані у форматі - перші дві літери укр алфавіту, та 6 цифр.
Якщо не співпадає то видавати alert "Не вірний паспортний номер"

3. Номер кредитної карки 16 цифр -
якщо не співпадає то видавати alert "Не вірна кредитна картка"

4. cvv 3 цифри - якщо не співпадає то видавати alert "Не вірний cvv".

Якщо валідація проходить успішно, то виконати оплату,
 тобто вам потрібно видалити обєкт з DB
 */
buttonSubmit.addEventListener('click',payFine);
function payFine(){

    

    let validateArr = [];
    let findFineNumber = searchFineNumber(fineNumber.value);
    validateArr.push(findFineNumber);

    validateArr.push(validatePassport(passport.value),
                        validateCreditCardNumber(creditCardNumber.value), 
                        validateCVV(cvv.value));

    let findAmount = searchAmount(amount.value,findFineNumber);

    validateArr.push(findAmount);
  
    let intermediateError = unionAlert(validateArr);


    if (findFineNumber.res == true && findAmount.res == true && Boolean(intermediateError) != true){
 
        validateArr.push(deleteFine(findFineNumber,findAmount));
        let error = unionAlert(validateArr);
        alert(error);
    }else{
        let error = unionAlert(validateArr);
        alert(error);
    }
}



function validatePassport(str){
    if(str == ""){
        return {res: false,
                text: "Паспортные данные не введены!"};
    }else if(str.length > 8 ){
       //alert("В паспортных данных должно быть меньше символов!");
        return {res: false,
                text: "В паспортных данных должно быть меньше символов!"};
    }else if(str.length < 8){
        //alert("В паспортных данных должно быть больше символов!");
        return {res: false,
                text: "В паспортных данных должно быть больше символов!"};
    }else if (str.length == 8){
        if (regPassport.test(str)){
            return {res: true,
                    text: "Ок"};
        } else{
            return {res: false,
                    text: "Не правильные паспортные данные!"};
        }
    }
    

}

function validateCreditCardNumber(str){
    if(str == ""){
        return {res: false,
                text: "Данные кредитной карты не введены!"};
    }else if(str.length > 16){
        //alert("В номере кредитной карты должно быть меньше символов!");
        return {res: false,
                text: "В номере кредитной карты должно быть меньше символов!"};
     }else if(str.length < 16){
         //alert("В номере кредитной карты должно быть больше символов!");
        return {res: false,
                text: "В номере кредитной карты должно быть больше символов!"};
     }else if (str.length == 16){
        if (regCreditCardNumber.test(str)){
            return {res: true,
                    text: "Ок"};
        } else{
            return {res: false,
                    text: "Не правильные данные кредитной карты!"};
        }
    }
     
}

function validateCVV(str){
    if(str == ""){
        return {res: false,
                text: "Данные cvv не введены!"};
    }else if(str.length > 3){
        //alert("В cvv должно быть меньше символов!");
        return {res: false,
                text: "В cvv должно быть меньше символов!"};
     }else if(str.length < 3){
         //alert("В cvv должно быть больше символов!");
        return {res: false,
                text: "В cvv должно быть больше символов!"};
     }else if (str.length == 3){
        if (regCVV.test(str)){
            return {res: true,
                    text: "Ок"};
        } else{
            return {res: false,
                    text: "Не правильные данные cvv!"};
        }
     } 
}


function searchFineNumber(fineNumber){
    if(fineNumber == ""){
        return {res: false,
                text: "Вы не ввели номер штрафа"};
    }

    let searchFineNumber =  DB.map(function(item){
        if(item.номер == fineNumber){
            return true; 
        }else{
            return false;
        }
    });

    let indexFineNumber;
    for(let i in searchFineNumber){
        if(searchFineNumber[i] == true){
            indexFineNumber = i;
        }
    }

    if (indexFineNumber === undefined){
        return {res: false,
                text: "Неправильный номер штрафа!"};
    }

    if(searchFineNumber[indexFineNumber] == true){
        return {res: true,
                text: "Ок",
                index: indexFineNumber};
    }


    

}


function searchAmount(amount,obj){
    if(amount == ""){
        return {res: false,
                text: "Вы не ввели сумму"};
    }


    let searchAmount =  DB.map(function(item){
        if(item.сума == amount){
            return true; 
        }else{
            return false;
        }
    });

    if(obj.res == true){
        if(searchAmount[obj.indexFineNumber] == true){
            return {res: true,
                    text: "Ок",
                    index: indexAmount};
        }
    }

    let indexAmount;
    for(let i in searchAmount){
        if(searchAmount[i] == true){
            indexAmount = i;
        }
    }

    if(indexAmount === undefined){
        return {res: false,
                text: "Неправильная сумма!"};
    }

    if(searchAmount[indexAmount] == true){
        return {res: true,
                text: "Ок",
                index: indexAmount};
    }

}


function deleteFine(fineObj,amountObj){


     
     if(fineObj.index == amountObj.index){
        DB.splice(fineObj.indexFineNumber,1);
        return {res: false,
                text: "Штраф удален!"};
     }else{
        return {res: false,
                text: "Номер штраф или суммма не совпадают с существующим штрафом!"};
     } 

}

function unionAlert(arr){
// Проверяем присланные массив на количество верных исполнений валидации если все валидации прошли верно он нам вернет себя же
    let index = arr.filter(function(item){
        return item.res;    
    });


    let testError = "";
//если в arr есть хоть один неправильный результат то он зайдет в этот if и о начнет объединять все присланные ошибки в одну для alert'a
    if(index.length < arr.length){
        for(let item in arr){
            if(arr[item].res == false){
                testError += arr[item].text;
                testError += "\n";
            }
        }
    }
    return testError;
}






