function points(twoPointers, threePointers) {
    // Each argument multiply with it's value
    twoPointers *= 2;
    threePointers *= 3;
    // Add the values together 
    const finalScore = twoPointers + threePointers;
    console.log(finalScore);
}

points(1, 1);
points(7, 5);
points(38, 8);
points(0, 1);
points(0, 0);

