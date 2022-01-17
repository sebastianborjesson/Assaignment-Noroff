function Worker(name, balance, pay, loanAmount) {
    this.name = name;
    this.balance = balance;
    this.pay = pay;
    this.loanAmount = loanAmount;
}

const johnDoe = new Worker('John Doe', 100, 100, 0);

const currency = " kr";
document.getElementById("workerBalanceAmount").innerHTML = johnDoe.balance + currency;
document.getElementById("payAmount").innerHTML = johnDoe.pay + currency;

function loan() {
    let valueLoan = window.prompt("Add amount you wish to loan: ");
    
    // If you already have a loan
    // Prompt that you need to repay back the initial loan
    if (johnDoe.loanAmount > 0) {
        alert("You need to pay back your initial loan")    
    }
    // If there is a value of the loan
    // And the balance on the bank is not more than double the amount you wish to loan
    // Append the loan amount row and store it to the user
    else if (valueLoan != null && valueLoan <= (johnDoe.balance * 2)) {
        // Show the loan amount block and update the value based on the loan
        document.getElementById("workerLoan").style.visibility = "visible";
        document.getElementById("workerLoanAmount").innerHTML = valueLoan + currency;
        johnDoe.loanAmount = valueLoan;
        // Update balance value based on the loan
        johnDoe.balance = parseInt(johnDoe.balance) + parseInt(valueLoan);
        document.getElementById("workerBalanceAmount").innerHTML = johnDoe.balance + currency;
        // Show the repay loan button in the work block
        document.getElementById("repayLoan").style.visibility = "visible";
    } else {
        alert("You don't have enough money in your account to take a loan that high!")
    }   
}

function work() {
    // Update the pay value by 100 each time we click the "Work" button
    johnDoe.pay += 100;
    document.getElementById("payAmount").innerHTML = johnDoe.pay + currency;
}

function deposit() {
    
    // If no loan, add the value of Pay to your bank balance
    if (johnDoe.loanAmount === 0) {
        johnDoe.balance += parseInt(johnDoe.pay);
        document.getElementById("workerBalanceAmount").innerHTML = johnDoe.balance + currency;
    } 
    else if (johnDoe.loanAmount > 0) {
        // 10% deduction on your loan if the user has an existing loan
        johnDoe.loanAmount -= parseInt(johnDoe.pay) * 0.1;
        // Add the remaining 90% to your balance
        johnDoe.balance += parseInt(johnDoe.pay) * 0.9;
        document.getElementById("workerBalanceAmount").innerHTML = johnDoe.balance + currency;
        document.getElementById("workerLoanAmount").innerHTML = johnDoe.loanAmount + currency;
        if (johnDoe.loanAmount === 0) {
            document.getElementById("workerLoan").style.visibility = "hidden";
            document.getElementById("repayLoan").style.visibility = "hidden";
        }

    }
    // Reset the value of Pay on the object and on the DOM
    johnDoe.pay = 0;
    document.getElementById("payAmount").innerHTML = johnDoe.pay + currency;
}

function repayLoan () {
    johnDoe.loanAmount -= parseInt(johnDoe.pay);
    johnDoe.balance -= parseInt(johnDoe.pay);
    document.getElementById("workerBalanceAmount").innerHTML = johnDoe.balance + currency;
    document.getElementById("workerLoanAmount").innerHTML = johnDoe.loanAmount + currency;
    if (johnDoe.loanAmount === 0) {
        document.getElementById("workerLoan").style.visibility = "hidden";
        document.getElementById("repayLoan").style.visibility = "hidden";
    }
    johnDoe.pay = 0;
    document.getElementById("payAmount").innerHTML = johnDoe.pay + currency;
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
    
const lapTopSelect = document.getElementById("laptopSelect");
const featureList = document.getElementById("featureList");
const infoSection = document.getElementById("infoSection");

function listLaptops (laptops) {
    // Loop through the array of laptops and create option keys for each laptop in the select-box
    for (let index = 0; index < laptops.length; index++) {
        let singleLaptop = laptops[index];
        const laptopOption = document.createElement("option");
        laptopOption.innerText = singleLaptop.title;
        lapTopSelect.appendChild(laptopOption);
    }
    // On the first object we invoke the listFeatures function (passing with the object) to print out it's specific features
    if(laptops[0]) {
        listFeatures(laptops[0])
        infoOnLaptop(laptops[0]);
    }
    // We listen to a change of value in the selectbox. If it changes, we invoke listFeatures function (passing on the object) and change the features based on the laptop chosen
    lapTopSelect.addEventListener("change", function() {
        featureList.innerHTML = "";
        for (let index2 = 0; index2 < laptops.length; index2++) {
            if (laptops[index2].title == this.value) {
                listFeatures(laptops[index2]);
                infoOnLaptop(laptops[index2]);
            }
        }
    })
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
    infoSection.innerHTML = "";
    const imageTag = document.createElement("img");
    imageTag.id = "laptopImage";
    imageTag.className = "img-fluid";
    imageTag.style = "width: 40%";
    let imageUrl = "https://noroff-komputer-store-api.herokuapp.com/" + laptop.image;
    imageTag.src = imageUrl;
    infoSection.appendChild(imageTag);

}

getAllLaptops();
    