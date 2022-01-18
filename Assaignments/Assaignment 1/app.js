function Worker(name, balance, pay, loanAmount) {
    this.name = name;
    this.balance = balance;
    this.pay = pay;
    this.loanAmount = loanAmount;
}

const johnDoe = new Worker('John Doe', 100000, 0, 0);
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

// 2.1 Pay
// The pay or your current salary amount in your currency. Should show how much money you have earned by
// “working”. This money is NOT part of your bank balance.
// 2.2 Bank Button
// The bank button must transfer the money from your Pay/Salary balance to your Bank balance. Remember to reset
// your pay/salary once you transfer.
// Constraints on Bank button:
// 1. If you have an outstanding loan, 10% of your salary MUST first be deducted and transferred to the
// outstanding Loan amount
// 2. The balance after the 10% deduction may be transferred to your bank account
// 2.4 Repay Loan button
// Once you have a loan, a new button labeled “Repay Loan” should appear. Upon clicking this button, the full value of
// your current Pay amount should go towards the outstanding loan and NOT your bank account.
// Any remaining funds after paying the loan may be transferred to your bank account

function work() {
    // Update the pay value by 100 each time we click the "Work" button
    johnDoe.pay += 100;
    payAmount.innerHTML = johnDoe.pay + currency;
}

function deposit() {
    const deductionForLoanFactor = 0.1;
    // If no loan, add the value of Pay to your bank balance
    if (johnDoe.loanAmount <= 0) {
        johnDoe.balance += parseInt(johnDoe.pay);
        workerBalanceAmount.innerHTML = johnDoe.balance + currency;
    } 
    else if (johnDoe.loanAmount > 0) {
        // 10% deduction on your loan if the user has an existing loan
        johnDoe.loanAmount -= parseInt(johnDoe.pay) * deductionForLoanFactor;
        johnDoe.balance -= parseInt(johnDoe.pay) * deductionForLoanFactor;
        johnDoe.pay -= parseInt(johnDoe.pay) * deductionForLoanFactor;
        // Add the remaining 90% to your balance
        johnDoe.balance += parseInt(johnDoe.pay);
        workerBalanceAmount.innerHTML = johnDoe.balance + currency;
        workerLoanAmount.innerHTML = johnDoe.loanAmount + currency;
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
    if (johnDoe.pay >= johnDoe.loanAmount) {
        repayAmount = johnDoe.loanAmount;
        johnDoe.balance -= parseInt(repayAmount);
        johnDoe.loanAmount -= parseInt(johnDoe.pay);
        johnDoe.pay -= repayAmount;
        workerBalanceAmount.innerHTML = johnDoe.balance + currency;
        workerLoanAmount.innerHTML = johnDoe.loanAmount + currency;
        payAmount.innerHTML = johnDoe.pay + currency;
        if (johnDoe.loanAmount <= 0) {
            workerLoan.style.visibility = "hidden";
            repayLoanButton.style.visibility = "hidden";
        }
    } else {
        johnDoe.balance -= parseInt(johnDoe.pay);
        johnDoe.loanAmount -= parseInt(johnDoe.pay);
        johnDoe.pay -= parseInt(johnDoe.pay);
        workerBalanceAmount.innerHTML = johnDoe.balance + currency;
        workerLoanAmount.innerHTML = johnDoe.loanAmount + currency;
        payAmount.innerHTML = johnDoe.pay + currency;
    }
}

// 3.1 Laptop selection (Figure 3)
// Use a select box to show the available computers. The feature list of the selected laptop must be displayed here.
// Changing a laptop should update the user interface with the information for that selected laptop. 
// 3.2 Info section (Figure 4)
// The Info section is where the image, name, and description as well as the price of the laptop must be displayed.
// 3.2.1 Images
// The path to the image of a laptop can be found in the response. Remember to use the base URL WITHOUT the
// computers path.
// e.g., https://noroff-komputer-store-api.herokuapp.com/assets/images/1.png
// 3.2.2 Buy Now button
// The buy now button is the final action of your website. This button will attempt to “Buy” a laptop and validate
// whether the bank balance is sufficient to purchase the selected laptop.
// If you do not have enough money in the “Bank”, a message must be shown that you cannot afford the laptop.
// When you have sufficient “Money” in the account, the amount must be deducted from the bank and you must
// receive a message that you are now the owner of the new laptop!

// https://noroff-komputer-store-api.herokuapp.com/computers

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
    // We listen to a change of value in the selectbox. If it changes, we invoke listFeatures and InfoOnLaptop functions (passing on the object) and change the features based on the laptop chosen
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
    for (let spec = 0; spec < laptop.specs.length; spec++) {
        let feature = laptop.specs[spec];
        const lapTopFeature = document.createElement("li");
        lapTopFeature.innerText = feature;    
        featureList.appendChild(lapTopFeature);
    }
}

function infoOnLaptop (laptop) {
    //console.log(laptop.price);
    infoSection.innerHTML = "";
    buySection.innerHTML = "";

    // Section for adding image
    const imageTag = document.createElement("img");
    imageTag.id = "laptopImage";
    imageTag.className = "img-fluid card-img-top";
    imageTag.style = "width: 40%; display: block; margin-left: auto; margin-right: auto;";
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

// 3.2.2 Buy Now button
// The buy now button is the final action of your website. This button will attempt to “Buy” a laptop and validate
// whether the bank balance is sufficient to purchase the selected laptop.
// If you do not have enough money in the “Bank”, a message must be shown that you cannot afford the laptop.
// When you have sufficient “Money” in the account, the amount must be deducted from the bank and you must
// receive a message that you are now the owner of the new laptop!

function buyComputer () {
    let laptopValue = parseInt(document.getElementById("laptopPrice").innerText);
    console.log(laptopValue);
    if(johnDoe.balance < laptopValue) {
        alert("You have insufficient funds to purchase this computer!");
    } else {
        alert("You have purchased the computer!");
        johnDoe.balance -= laptopValue;
        workerBalanceAmount.innerHTML = johnDoe.balance + currency;
    }

}

    