function Worker(name, balance, pay, loanAmount) {
    this.name = name;
    this.balance = balance;
    this.pay = pay;
    this.loanAmount = loanAmount;
}

// Instantiate an object when the page loads
const johnDoe = new Worker('John Doe', 0, 0, 0);

// Constant variables for DOM-elements to be manipulated
const lapTopSelect = document.getElementById("laptopSelect");
const featureList = document.getElementById("featureList");
const infoSection = document.getElementById("infoSection");
const buySection = document.getElementById("buySection");
const cardBody = document.getElementById("cardBody");
const workerBalanceAmount = document.getElementById("workerBalanceAmount");
const payAmount = document.getElementById("payAmount");
const workerLoan = document.getElementById("workerLoan");
const workerLoanAmount = document.getElementById("workerLoanAmount");
const repayLoanButton = document.getElementById("repayLoan");

const currency = " kr";
workerBalanceAmount.innerHTML = johnDoe.balance + currency;
payAmount.innerHTML = johnDoe.pay + currency;

// Function for taking a loan
function loan() {
    let valueLoan = window.prompt("Add amount you wish to loan: ");
    console.log(valueLoan);
    // If you already have a loan
    // Prompt that you need to repay back the initial loan
    if (valueLoan == "" || valueLoan == 0) {
        alert("You need to enter a value");
    } else if (johnDoe.loanAmount > 0) {
        alert("You need to pay back your initial loan")    
    }
    // If there is a value of the loan
    // And the balance on the bank is not more than double the amount you wish to loan
    // Append the loan amount row and store it to the user
    else if ((valueLoan != "" || valueLoan != 0) && valueLoan <= (johnDoe.balance * 2)) {
        // Show the loan amount block and update the value based on the loan
        workerLoan.style.visibility = "visible";
        workerLoanAmount.innerHTML = valueLoan + currency;
        johnDoe.loanAmount = valueLoan;
        // Update balance value based on the loan
        johnDoe.balance = parseInt(johnDoe.balance) + parseInt(valueLoan);
        workerBalanceAmount.innerHTML = johnDoe.balance + currency;
        // Show the repay loan button in the work block
        repayLoanButton.style.visibility = "visible";
    } else {
        alert("You don't have enough money in your account to take a loan that high!")
    }
}

// Function for adding pay
function work() {
    // Update the pay value by 100 each time we click the "Work" button
    johnDoe.pay += 100;
    payAmount.innerHTML = johnDoe.pay + currency;
}

// Function for deposit pay to your bank-account 
function deposit() {
    const deductionForLoanFactor = 0.1;
    // If no loan, add the value of Pay to your bank balance
    if (johnDoe.loanAmount <= 0) {
        johnDoe.balance += parseInt(johnDoe.pay);
        workerBalanceAmount.innerHTML = johnDoe.balance + currency;
    } 
    // IF there is a loanamount
    else if (johnDoe.loanAmount > 0) {
        // 10% deduction on your loan if the user has an existing loan
        johnDoe.loanAmount -= parseInt(johnDoe.pay) * deductionForLoanFactor;
        johnDoe.balance -= parseInt(johnDoe.pay) * deductionForLoanFactor;
        johnDoe.pay -= parseInt(johnDoe.pay) * deductionForLoanFactor;
        // Add the remaining 90% to your balance
        johnDoe.balance += parseInt(johnDoe.pay);
        workerBalanceAmount.innerHTML = johnDoe.balance + currency;
        workerLoanAmount.innerHTML = johnDoe.loanAmount + currency;
        // If you don't have a loan, hide the tags providing the info regarding loan
        if (johnDoe.loanAmount <= 0) {
            workerLoan.style.visibility = "hidden";
            repayLoanButton.style.visibility = "hidden";
        }
    }
    // Reset the value of Pay on the object and on the DOM
    johnDoe.pay = 0;
    payAmount.innerHTML = johnDoe.pay + currency;
}

function repayLoan () {
    let repayAmount = 0;
    // If we have a loan and we have more money on pay that we use to repay the loan, 
    // We pay back the loan, adjust the loan amount and balance value and the rest of the pay value may be used to transfer to you account
    if (johnDoe.pay >= johnDoe.loanAmount) {
        repayAmount = johnDoe.loanAmount;
        johnDoe.balance -= parseInt(repayAmount);
        johnDoe.loanAmount -= parseInt(johnDoe.pay);
        johnDoe.pay -= repayAmount;
        workerBalanceAmount.innerHTML = johnDoe.balance + currency;
        workerLoanAmount.innerHTML = johnDoe.loanAmount + currency;
        payAmount.innerHTML = johnDoe.pay + currency;
        // When the entire loan has been payed back, hide the tags providing the info regarding loan
        if (johnDoe.loanAmount <= 0) {
            workerLoan.style.visibility = "hidden";
            repayLoanButton.style.visibility = "hidden";
        }
    } 
    // If you have lower or equal amount of pay
    // reduce the amount of the loan and the balance based on pay
    else {
        johnDoe.balance -= parseInt(johnDoe.pay);
        johnDoe.loanAmount -= parseInt(johnDoe.pay);
        johnDoe.pay -= parseInt(johnDoe.pay);
        workerBalanceAmount.innerHTML = johnDoe.balance + currency;
        workerLoanAmount.innerHTML = johnDoe.loanAmount + currency;
        payAmount.innerHTML = johnDoe.pay + currency;
    }
}

function getAllLaptops () {
    fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(function(response) {
        return response.json();
    })
    .then(function(laptops) {
        listLaptops(laptops);
    }
)}
    
getAllLaptops();

function listLaptops (laptops) {
    // Loop through the array of laptops and create option keys for each laptop in the select-box
    for (let index = 0; index < laptops.length; index++) {
        let singleLaptop = laptops[index];
        const laptopOption = document.createElement("option");
        laptopOption.innerText = singleLaptop.title;
        lapTopSelect.appendChild(laptopOption);
    }
    // On the first object we invoke the listFeatures and InfoOnLaptop function (passing with the object) to print out it's specific features
    if(laptops[0]) {
        listFeatures(laptops[0])
        infoOnLaptop(laptops[0]);
    }
    // We listen to a change of value in the select-box. If it changes, we invoke listFeatures and InfoOnLaptop functions (passing on the object) 
    // and change the features based on the laptop chosen
    lapTopSelect.addEventListener("change", function() {
        featureList.innerHTML = "";
        for (let index2 = 0; index2 < laptops.length; index2++) {
            if (laptops[index2].title == this.value) {
                listFeatures(laptops[index2]);
                infoOnLaptop(laptops[index2]);
            }
        }
    });
}

function listFeatures (laptop) {
    // Loop through the laptop object's features and create a list on the DOM
    for (let spec = 0; spec < laptop.specs.length; spec++) {
        let feature = laptop.specs[spec];
        const lapTopFeature = document.createElement("li");
        lapTopFeature.innerText = feature;    
        featureList.appendChild(lapTopFeature);
    }
}

function infoOnLaptop (laptop) {
    infoSection.innerHTML = "";
    buySection.innerHTML = "";

    // Section for adding image
    const laptopName = document.createElement("H1");
    laptopName.innerText = laptop.title;
    infoSection.appendChild(laptopName);
    const imageTag = document.createElement("img");
    imageTag.id = "laptopImage";
    imageTag.className = "img-fluid card-img-top";
    imageTag.style = "width: 40%; display: block; margin-left: auto; margin-right: auto;";
    console.log(laptop.image);
    // Making sure that we provide the correct image on "The Visor object"
    // with replacing .jpg to .png on the url 
    if (laptop.image == "assets/images/5.jpg") {
        laptop.image = laptop.image.replace("jpg", "png");
    }
    imageTag.src = "https://noroff-komputer-store-api.herokuapp.com/" + laptop.image;
    infoSection.appendChild(imageTag);

    //Section for adding description for laptop
    const imageSection = document.createElement("div");
    imageSection.className = "card-body";
    infoSection.appendChild(imageSection);
    const laptopDescription = document.createElement("H5");
    laptopDescription.className = "card-text";
    laptopDescription.innerText = laptop.description;
    imageSection.appendChild(laptopDescription);

    // Section for the price and buy button
    const buyButton = document.createElement("button");
    buyButton.className = "btn btn-primary";
    buyButton.innerText = "BUY NOW";
    buyButton.onclick = function(){buyComputer();};
    const laptopPrice = document.createElement("H3");
    laptopPrice.id = "laptopPrice";
    laptopPrice.innerText = laptop.price + currency;
    buySection.appendChild(laptopPrice);
    buySection.appendChild(buyButton);
}

function buyComputer () {
    let laptopValue = parseInt(document.getElementById("laptopPrice").innerText);
    if(johnDoe.balance < laptopValue) {
        alert("You have insufficient funds to purchase this computer!");
    } 
    else {
        alert("You have purchased the computer!");
        johnDoe.balance -= laptopValue;
        workerBalanceAmount.innerHTML = johnDoe.balance + currency;
    }

}

    