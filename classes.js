
 class Product {
    constructor(id, name, catagory,price,image,discountLimit) {
        this.image = image;
        this.name = name;
        this.catagory=catagory;
        this.id = id;
        this.discountLimit=discountLimit;
        this.price = price;
    }
}

class InventoryProduct {
    constructor(id,product,purchasedDate,expirationDate,supplier,currentStocked,recorderLevel) {
        this.id=id;
        this.product=product;
        this.purchasedDate=purchasedDate;
        this.expirationDate=expirationDate;
        this.supplier=supplier;
        this.currentStocked=currentStocked;
        this.recorderLevel=recorderLevel;
    }

    updateCurrentStock(num){
        this.currentStocked=num;
    }
    setRecorderLevel(num){
        this.recorderLevel=num;
    }
}

 class Receipt{
    constructor(id,coustmer, cashier, date,product=[],total,isPayed,paymentMethod) {
        this.id= id;
        this.coustmer = coustmer;
        this.cashier = cashier;
        this.date = date;

        this.product=product
        this.total=total;
        this.isPayed=isPayed;
        this.paymentMethod=paymentMethod;
    }

    add_product(pro){
        this.product.push(pro)
        // total+=pro.price;
    }

    setIsPayed(flag){
        this.isPayed=flag;
    }

    setIsPayed(flag){
        this.isPayed=flag;
    }

}




module.exports = {
  Product,
  Receipt,
  InventoryProduct
};
