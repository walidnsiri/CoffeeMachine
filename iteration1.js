function driker(drink,sugar){
    let output = "";
    
    if(drink === "tea") output += "T:";
    if(drink === "coffee") output += "C:";
    if(drink === "chocolate") output += "H:";
    
    
    if(sugar === 1) {output +=`${sugar}:0`}
    else if(sugar === 2) {output +=`${sugar}:0`}
    else {output +='::'}
    
    
    console.log(output);
    
}

driker("tea",1);