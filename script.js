
let switch_btn=document.getElementById("switch_btn");


class Modes {

    static ADD = "add";
    static EDIT = "edit";
    static NEUTRAL= "neutral";
    constructor(currentMode) {
        this.type = currentMode;
    }
}


class UiState {

    static UIRECEIPTS = "UIRECEIPTS";
    static UIPRODUCTS = "UIPRODUCTS";
    static UILOGIN= "neutral";
    
    constructor(currentMode) {
        this.type = currentMode;
    }
}


// Usage
const mode = new Modes(Modes.ADD);
const uiState = new Modes(UiState.UIPRODUCTS);

console.log(mode.type); // "add"



let delvary_btn =document.getElementById("delvary_btn")

let coustmer=document.getElementById("coustmer")

let order_table=document.getElementById("order_table");
let receipt_table=document.getElementById("receipt_table");

let cancel_editing=document.getElementById ("cancel_editing");
// array



const AppState = {
    currentReceiptId: null,
    receipts: [],
    switchBtnStates: [switch_btn.textContent, "طلب جديد"],
    
};

/* let switch_btn_arr=[switch_btn.textContent,"طلب جديد"]; */

const mainContainer = document.querySelector("main");
function createCard(product) {
   
    const cardHTML = `
     <div class="card" id="${product.id}">
           <div class="container">
                <img id="image" src="${product.image}" alt="">
                <div class="order_btn">
                    <p type="text" id="product_name">${product.name}</p>
                    <input type="number" id="special_price" class="special_price" value="${product.price}">
                    <p class="quantity" id="quantity">1</p>
                </div>
            </div>
            <div class="quantity_container">
                <button id="increase">+</button>
                <hr>
                <button id="decrease">-</button>
            </div> <!-- Missing closing tag added -->
        </div>
`;
    mainContainer.insertAdjacentHTML("beforeend", cardHTML);
}

function main(){
    cancel_editing.classList.toggle("hidden", mode.type !== Modes.EDIT);
  if(mode.type===Modes.NEUTRAL){
      
      cancel_editing.style="display:none;"
 coustmer.value="";
     clear_product();

//showTable()
 delvary_btn.textContent="ارسال الفاتورة"
 mode.type=Modes.ADD
 
 
  }else if(mode.type===Modes.EDIT){
     cancel_editing.style="display:none;"
     delvary_btn.textContent="ارسال الفاتورة"
     
     clear_product();

showTable()
    mode.type=Modes.ADD
  }
}





// Fetch data from the server
fetch('http://localhost:3000/api/products')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse JSON response
    })
    .then(data => {
        console.log('Products:', data); // Log the products data
        // You can also update the DOM or do something with the data here
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });

function clear_product(){
    // Clean all dataPro
    localStorage.setItem('product', JSON.stringify([]));
  
  }

class Product {
    constructor(image, name, id, price) {
        this.image = image;
        this.name = name;
        this.id = id;
        this.price = price;
    }
}

class Receipt{
    constructor(id,coustmer, cashier, date,product=[],total) {
        this.id= id;
        this.coustmer = coustmer;
        this.cashier = cashier;
        this.date = date;
      
        this.product=product
        this.total=total;
    }

    add_product(pro){
        this.product.push(pro)
    }
    
}

const items = [
     new Product("product_image/nescafe.webp", "نسكفيه", 2, 25),
     new Product("product_image/dishwashing_liquid_image.jpeg", "فيري", 1, 20),
  new Product("product_image/head&sholders.webp", "هيد اند شولدر", 3, 23)
];


function resetCards(items) {
    items.forEach((item) => {
        const card = document.getElementById(item.id); // Find the card by ID
        if (card) {
            // Update the card's attributes
            card.querySelector("#image").src = item.image;
            card.querySelector("#product_name").textContent = item.name;
            card.querySelector("#special_price").value = item.price;
            card.querySelector(".quantity").textContent = "1"; // Reset quantity to 1
        }
    });
}



function init_cards(item){

for(let i=0;i<item.length;i++){
    createCard(item[i])
    }

}




/* function create_receipt(pro){
   


    AppState.receipts.push();
}
 */
init_cards(items);

function toBase(n, base = 62) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    while (n > 0) {
        result = chars[n % base] + result;
        n = Math.floor(n / base);
    }
    return result || "0"; // Return "0" if input is 0
}

function generateReceiptId() {
    // Get the current timestamp in seconds
    const timestamp = Math.floor(Date.now() / 1000);

    // Convert timestamp to Base 62
    const base62Timestamp = toBase(timestamp, 62);

    // Generate a 6-character random alphanumeric string
    const randomString = Array.from({ length: 6 }, () =>
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[
            Math.floor(Math.random() * 62)
        ]
    ).join("");

    // Combine timestamp and random string
    return `${base62Timestamp}${randomString}`;
}

// Example usage
console.log(generateReceiptId());




function add_new_receipt(){
    
    // id,coustmer, cashier, date,_clock,product=[],total
   
    
    let total=0 ;
    const cashier = "ahmed"; // Or get cashier name dynamically
    const date = new Date(); // Or get date from user input if needed
  
    // جلب البيانات المخزنة
    AppState.receipts = localStorage.receipt ? JSON.parse(localStorage.receipt) : [];

    let dataPro = localStorage.product ? JSON.parse(localStorage.product) : [];

  for(pro of dataPro){
   total+= parseFloat(pro.total);
  }

    

console.log("modes "+mode.type)

if(mode.type===Modes.ADD){
        // إضافة فاتورة الجديد
       const id1=generateReceiptId().toString()
        let new_receipt = {
            id:id1,
            cashier:cashier,
            date: date.toISOString(),
           product:dataPro,
           coustmer:coustmer.value,
            total:total
            
       };
     
        console.log("\nnew_receipt.id_: "+new_receipt.id)
        console.log(coustmer.value)
        console.log(total)
        AppState.receipts.push(new_receipt);
   }
    else if(mode.type===Modes.EDIT)
    {
       AppState.receipts[AppState.currentReceiptId].product = dataPro;
    AppState.receipts[AppState.currentReceiptId].date = date;        
   AppState.receipts[AppState.currentReceiptId].total = total;   
    AppState.receipts[AppState.currentReceiptId].coustmer = coustmer.value;  

//mode.type=Modes.ADD;
for(pro of AppState.receipts[AppState.currentReceiptId].product){
   console.log(pro+"\n")
  }
  
  delvary_btn.textContent="ارسال البيانات"  
    }
    // حفظ البيانات في LocalStorage
    localStorage.setItem('receipt', JSON.stringify(AppState.receipts));

    
}




function increaseInTable(id) {
    // Get the current products data from localStorage
    let dataPro = JSON.parse(localStorage.product);

    // Find the product by its id and increment the quantity
    dataPro.forEach(item => {
        if (item.id === id.toString()) {
            /* console.log("table increase ");
            console.table({item}) */
            item.quantity++;
            item.total = item.quantity * item.special_price; // Update the total if necessary
        }else{
            console.log("table increase proplem"+": "+id);
            console.log(item.id)

        }
    });

    // Save the updated data back to localStorage
    localStorage.product = JSON.stringify(dataPro);

    // Refresh the table
    showTable();
}

function decreaseInTable(id) {
    // Get the current products data from localStorage
    let dataPro = JSON.parse(localStorage.product);

    // Find the product by its id and decrement the quantity
    dataPro.forEach(item => {
        if (item.id === id.toString() && item.quantity > 0) { // Ensure quantity doesn't go below 0
            item.quantity--;
            item.total = item.quantity * item.special_price; // Update the total if necessary
        }
    });

    // Save the updated data back to localStorage
    localStorage.product = JSON.stringify(dataPro);

    // Refresh the table
    showTable();
}

// التعامل مع أزرار + و -
document.querySelectorAll('.quantity_container button').forEach((button) => {
    button.addEventListener('click', function () {
        // تحديد نوع الزر (+ أو -)
        const isIncrease = button.id === 'increase';
        const card = button.closest('.card');
        const quantityElement = card.querySelector('.quantity');
        

     const cardId = card ? card.id : null;

        // Log the ID
        console.log('Card ID:', cardId);
        // الوصول إلى الكمية الحالة
      
        let currentQuantity = parseInt(quantityElement.textContent);

        // تعديل الكمية بناءً على نوع الزر
        if (isIncrease) {
            currentQuantity += 1;
       
        // تحديث الكمية في البطاقة
        quantityElement.textContent = currentQuantity;     save_changes_to_product(card)
        } else if (currentQuantity > 0) {
            currentQuantity -= 1;
      
        // تحديث الكمية في البطاقة
        quantityElement.textContent = currentQuantity;      save_changes_to_product(card)
        }

    });
});

function save_changes_to_product(card){
    
    
        const productName = card.querySelector('#product_name').textContent;
        const specialPrice = card.querySelector('.special_price').value;
        const quantity = card.querySelector('.quantity').textContent;
        
        
        let total = specialPrice * quantity;

        // جلب البيانات المخزنة
        let dataPro = localStorage.product ? JSON.parse(localStorage.product) : [];

        // البحث عن المنتج في LocalStorage
        const existingIndex = dataPro.findIndex((item) => item.product_name === productName);

        if (existingIndex !== -1) {
            // تحديث بيانات المنتج الموجود
            dataPro[existingIndex].special_price = specialPrice;
            dataPro[existingIndex].quantity = quantity;
            dataPro[existingIndex].total = total;
            dataPro[existingIndex].id=card.id
        } else {
            // إضافة المنتج الجديد
            const newPro = {
                product_name: productName,
                special_price: specialPrice,
                quantity: quantity,
                id:card.id,
                total: total,
            };
            dataPro.push(newPro);
        }

        // حفظ البيانات في LocalStorage
        localStorage.setItem('product', JSON.stringify(dataPro));

        // تحديث الجدول
        showTable();
    
}



document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', function () {
   
    save_changes_to_product(card)
    
        console.log("added to table")
    }/* function switch_to_product(){
    
    order_table.style.display="flex"
    receipt_table.style.display="none"
    switch_btn.textContent= btn=AppState.switchBtnStates[0];
        mainContainer.style="display:flex;"
        showTable()
            
}

function switch_to_receipt(){
    order_table.style.display="none"
    receipt_table.style.display="flex" 
    switch_btn.textContent= btn=AppState.switchBtnStates[1];
    showReceipt()
        
        mainContainer.style="display:none;"
}
 */);
});



function switchView(isProductView) {




console.log("uistate: ",uiState.type)
if(isProductView){
    order_table.style.display = "flex"
    receipt_table.style.display = "none" 
    switch_btn.textContent = AppState.switchBtnStates[0];
    showTable()
    
    uiState.type=UiState.UIPRODUCTS
}else{
    order_table.style.display = "none"
    receipt_table.style.display = "flex" 
    switch_btn.textContent = AppState.switchBtnStates[1];
    showReceipt();
    
    uiState.type=UiState.UIRECEIPTS     
}
    /* order_table.style.display = isProductView ? "flex" : "none";
    receipt_table.style.display = isProductView ? "none" : "flex";
    switch_btn.textContent = isProductView ? AppState.switchBtnStates[0] : AppState.switchBtnStates[1];
    isProductView? showTable():showReceipt(); */
}




// event listner
switch_btn.addEventListener("click",function(){
    let btn=this.textContent;
  

    //جميع الفواتير
    if(btn===AppState.switchBtnStates[0]){
        //switch_to_receipt()
        switchView(false)
         
        }
    else{
    clear_product();
    
    switchView(true)
    coustmer.value=""
  /*   
    const cards=document.querySelectorAll(".card");
     for(card of cards){
        const qty = card.querySelector('.quantity');
          const sPrice = card.querySelector('.special_price');
        sPrice.textContent;
        
    } */
  resetCards(items); // Reset attributes of the existing cards
    }
       

  
});
  
  

  
// عرض البيانات في الجدول
function showTable() {
    const dataPro = localStorage.product ? JSON.parse(localStorage.product) : [];
    let table = "";
    dataPro.forEach((item, i) => {
        table += `
        <tr>
            <td>${item.id}</td>
            <td>${item.product_name}</td>
            <td>${item.special_price}</td>
            <td >${item.quantity}</td>
            <td>${item.total}</td>
        <td>   
            <div class="delete-container">
                <button onClick="deleteProduct(${i})" id="deleteTd">🗑</button>
            </div>
            <div class="buttons-container">
                <button onClick="increaseInTable(${item.id.toString()})" id="increaseTd">+</button>
            
                <button onClick="decreaseInTable(${item.id})" id="decreaseTd">-</button>
            </div>
        </td>
        </tr>`;
    });
    document.getElementById("tbody").innerHTML = table;
}




delvary_btn.addEventListener("click",
    function(){
    
  if(uiState.type===UiState.UIPRODUCTS){
  add_new_receipt();
 mode.type=Modes.NEUTRAL
  }






console.log("receipt added");
  main();
switchView(false);

    }
);

function showReceipt() {
    const receiptData = localStorage.receipt ? JSON.parse(localStorage.receipt) : [];
    let table = "";
    
let productsHTML = "";

receiptData.forEach((receipt, i) => {
    // Start a new details section for each receipt
    //id #${receipt.id}
    productsHTML += `<details>
        <summary>الاسم:${receipt.coustmer} | المجموع: ${receipt.total} </summary>
        <ul>`;
    
    // Add product items inside the details
    if (Array.isArray(receipt.product)) {
        productsHTML += receipt.product.map((p, j) => `
            <li>${j + 1}. ${p.product_name} (x${p.quantity}) - $${p.special_price}</li>
        `).join("");
    } else {
        productsHTML += `<li>No products found</li>`;
    }
    
    // Close the list and the details section
    productsHTML += `</ul>
    </details>
    <div class="receipt_buttons">
    <button id="edit_receipt"
    class="edit_receipt" onClick="edit_receipt('${receipt.id}')">تعديل</button>
    
    <button id="delete_receipt"
    class="delete_receipt" onClick="delete_receipt('${receipt.id}')">حذف</button> 
    </div>
    `;
});

// Inject the generated HTML
document.getElementById("receiptTbody").innerHTML = productsHTML;
} 
 


// حذف بيانات من الجدول
function deleteProduct(i) {
    let dataPro = JSON.parse(localStorage.product);
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showTable();
}


function delete_receipt(id) {
    // Retrieve the receipts from localStorage
    let receipts = localStorage.receipt ? JSON.parse(localStorage.receipt) : [];

    // Find the index of the receipt with the given id
    const index = receipts.findIndex((receipt) => receipt.id === id);

    // If receipt is found, delete it
    if (index !== -1) {
        receipts.splice(index, 1);
        console.log(`Receipt with id ${id} deleted successfully.`);
    } else {
        console.error(`Receipt with id ${id} not found.`);
        return;
    }

    // Save the updated receipts back to localStorage
    localStorage.setItem('receipt', JSON.stringify(receipts));

    // Optionally, refresh the UI
    showReceipt(); // Call the function to refresh the receipt table
}

function edit_receipt(id_) {

    clear_product();
    console.log("id_: edit "+id_)
  // Retrieve receipts from localStorage
  let receipt = localStorage.receipt ? JSON.parse(localStorage.receipt) : [];

  // Find the receipt with the given id
   const receipt_to_edit = receipt.find((rec) => rec.id === id_);
   
 const index = receipt.findIndex((rec) => rec.id === id_);
if (index === -1) {
    console.error(`Receipt with id ${id_} not found.`);
    return;
}


  if (!receipt_to_edit) {
      console.error(`Receipt with id ${id_} not found.`);
      return;
  }

  // Retrieve the product list from the found receipt
  let dataPro = receipt_to_edit.product.map((rec) => ({
      product_name: rec.product_name,
      special_price: rec.special_price || 0, // Ensure property exists
      quantity: rec.quantity,
      total: rec.total,
      id:rec.id
  }));

  // Update localStorage with the new dataPro
  localStorage.setItem('product', JSON.stringify(dataPro));

  //move to product page
  switchView(true); 
  
 
 
console.log(mode.type); // "edit"
AppState.currentReceiptId=index;
//تحديث اسم المشتري على حسب الفاتورة
  coustmer.value=receipt_to_edit.coustmer;
  
  mode.type=Modes.EDIT;
  delvary_btn.textContent="تثبيت التعديل"  
    cancel_editing.style="display:flex;"
    
    showTable()
    
  
  //updating cards property to match the to edit receipt
  dataPro.forEach(pro=>{
     const card=  document.getElementById(pro.id);
    
     const specialPrice = card.querySelector('.special_price'); 
     const quantity = card.querySelector('.quantity'); 
    console.table({card})
     quantity.textContent=pro.quantity;
    
    if (specialPrice) {
            specialPrice.value = pro.special_price.toString();
            console.log(`Updated special price: pro ${pro.special_price}, special_price.value ${specialPrice.value}`);
        } else {
            console.warn(`Special price input not found in card ${pro.id}`);
        }
    
    
    /* save_changes_to_product(card) */ }); 
  
 
 
  showTable();
}


cancel_editing.addEventListener('click',()=>{
    
 mode.type=Modes.NEUTRAL;
main();
})
    
    
    

    
document.querySelectorAll('.special_price').forEach((inPrice) => {
    inPrice.addEventListener('change', function () {
  const card= inPrice.closest(".card");
  
    save_changes_to_product(card)
    showTable();
        console.log("blurred is active")
    });
});