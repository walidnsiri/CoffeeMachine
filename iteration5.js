class Drink {
    constructor(id,name,price,tag,type,quantity){
        this.id=id;
        this.name=name;
        this.price=price;
        this.tag=tag;
        this.type=type;
        this.quantity = quantity;
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
    
    constructor(stock) {
        this.stock = stock;
        this.recette={orders : [], totalPrice: 0};
    }

    

    addOrder(drink){
        // update quantity
        this.updateQuantity(drink);
        // add order to orders
        this.recette.orders.push(drink);
        // update total price 
        this.recette.totalPrice = this.recette.totalPrice + drink.price;
    }

    updateQuantity(drink){
        let stock = this.stock.filter(d => d.id !== drink.id);
        if(!this.isEmpty(drink)){
            drink.quantity = drink.quantity -1;
        }
        stock.push(drink);
        this.stock = stock;
        return drink;
    }

    getDrinkById(id){
        let drink = null;
        this.stock.forEach(d => {
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
        //check drink quantity
        if(!this.isEmpty(drink)){
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
        console.log(output);
        
        }else {
            this.notifyMissingDrink(drink);
        }
    }

    notifyMissingDrink(drink){
        console.log(`the drink ${drink.name} is missing`);
    }
    
    isEmpty(drink){
        return drink.quantity > 0 ? false : true;
    }
}


let stock = [new Drink(0,"Coffee",0.6,"C","hot",2),
            new Drink(1,"Chocolate",0.5,"H","hot",2),
            new Drink(2,"Tea",0.4,"T","hot",2),
            new Drink(3,"OrangeJuice",0.5,"O","cold",2)];
let coffeeMachine = new CoffeeMachine(stock);
let customerOrder = new CustomerOrder(3,0.8,1,true);
coffeeMachine.serve(customerOrder);
coffeeMachine.serve(customerOrder);
coffeeMachine.serve(customerOrder);
console.log(coffeeMachine.stock);
console.log(coffeeMachine.recette);

