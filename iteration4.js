class Drink {
    constructor(id,name,price,tag,type){
        this.id=id;
        this.name=name;
        this.price=price;
        this.tag=tag;
        this.type=type
    }
}


class CustomerOrder {

    constructor(productId,receivedPrice,sugar,extraHotOption){
        this.productId = productId;
        this.receivedPrice = receivedPrice;
        this.sugar= sugar;
        this.extraHotOption = extraHotOption;
    }

}



class CoffeeMachine {
    
    constructor(drinks) {
        this.drinks = drinks;
        this.recette={orders : [], totalPrice: 0};
    }

    addOrder(drink){
        this.recette.orders.push(drink);
        this.recette.totalPrice = this.recette.totalPrice + drink.price;
    }

    getDrinkById(id){
        let drink = null;
        this.drinks.forEach(d => {
            if(d.id === id) {
                drink = d;
            };
        });
        return drink;
    }

    sugarOutput(drink,sugar){
        if(drink.type === "hot" && sugar > 0) {
            return `${sugar}:0`;
        } else {
            return ":";
        }
    }

    serve(customerOrder){        
        //get drink
        let drink = this.getDrinkById(customerOrder.productId);
        // check if the amount of money is right
        let diff = customerOrder.receivedPrice - drink.price;
        if(diff < 0){
            return `${Math.abs(diff)} is missing`;
        }
        let output = `${drink.tag}`;
        //check drink options
        if(customerOrder.extraHotOption && drink.type === "hot"){
            output += "h:"
        }else {
            output += ":"
        }
        output += this.sugarOutput(drink,customerOrder.sugar);
        this.addOrder(drink);
        return output;
    }
}


let drinks = [new Drink(0,"Coffee",0.6,"C","hot"),
            new Drink(1,"Chocolate",0.5,"H","hot"),
            new Drink(2,"Tea",0.4,"T","hot"),
            new Drink(3,"OrangeJuice",0.5,"O","cold")];
let coffeeMachine = new CoffeeMachine(drinks);
let customerOrder = new CustomerOrder(3,0.8,1,true);
coffeeMachine.serve(customerOrder);
coffeeMachine.serve(customerOrder);
console.log(coffeeMachine.recette);

