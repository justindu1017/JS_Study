const arr1 = ['ele1', 'ele2','ele3','ele4','ele5','ele6','ele7','ele8','ele9','ele10',];

[c, ...rest] = arr1;

// console.log(a);
// console.log(b);
// console.log(rest)
// console.log(c);

const object1 = {
    myName:"Justin Du",
    myBirthday:"1998/11/10",
    myfood:{
        firstF:"strawberry",
        secondF:"noodle"
    }   
} 



const { myName , myBirthday:birthday} = object1;
console.log(birthday);