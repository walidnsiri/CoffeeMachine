class Drink {
    constructor(name,price,tag){
        this.name = name;
        this.price = price;
        this.tag = tag;
        
    }
    
}

class CoffeeMachine {
    
    constructor() {
        this.drinks = [new Drink("Coffee",0.6,"C"),new Drink("Chocolate",0.5,"H"),new Drink("Tea",0.4,"T")]
    }

    serve(drink,sugar){
        let output = "";
        this.drinks.forEach(d => {
            if(drink.name===d.name) {
                let diff = drink.price - d.price;
                if(diff >= 0) {
                    output += `${drink.tag}:`
                    if(sugar>0){
                        output += `${sugar}:0`
                    }else {
                        output += `:`
                    }
                }else {
                    output= `${Math.abs(diff)} is missing`;
                }
            }
        });

        return output;
    }

}

let coffeeMachine = new CoffeeMachine();
console.log(coffeeMachine.serve(new Drink("Coffee",0.2,"C"),1));