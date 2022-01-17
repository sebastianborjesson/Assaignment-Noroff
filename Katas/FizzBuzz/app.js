function FizzBuzz() {
    for (let i = 1; i <= 100; i++) {
        if((i%15) == 0) {
            const fizzBuzz = document.createElement("p");
            fizzBuzz.innerText = i + " = " + "FizzBuzz";
            document.body.appendChild(fizzBuzz);
        } else if((i%3) == 0) {
            const fizz = document.createElement("p");
            fizz.innerText = i + " = " + "Fizz";
            document.body.appendChild(fizz);
        } else if ((i%5) == 0) {
            const buzz = document.createElement("p");
            buzz.innerText = i + " = " +"Buzz";
            document.body.appendChild(buzz);
        } else {
            const number = document.createElement("p");
            number.innerText = i + " = " + i;
            document.body.appendChild(number);
        }
    }
}

FizzBuzz();