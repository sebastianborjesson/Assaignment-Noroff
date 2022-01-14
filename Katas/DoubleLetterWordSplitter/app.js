// Write a function called splitOnDoubleLetter() that receives a word, of type string, as an argument. 
// The function should split the word where any double letter is found and return an array of the split word. 
// If no repeated letters are found, simply return an empty array

function splitOnDoubleLetter(word) {
    let words = [];
    let newWord = "";
    // Split the word to seperate characters
    const letters = Array.from(word);

    // Loop through each character
    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        
        // If the same character, add the word to the array
        // And reset newWord
        if (letter === letters[i+1]) {
            newWord += letter;
            words.push(newWord);
            newWord = "";
        } 
        // if not, add the character to the string and continue
        else {
            newWord += letter;
        }
    }
    // when the array is at an end and no other comparables exists
    // Push the word to the array
    words.push(newWord);
    // If the array only exists with one word, with no split
    // Clear the array
    if (words.length === 1) {
        words = [];
    }
    console.log(words);
}

splitOnDoubleLetter("Letter");
splitOnDoubleLetter("Really");
splitOnDoubleLetter("Happy");
splitOnDoubleLetter("Shall"); 
splitOnDoubleLetter("Tool");
splitOnDoubleLetter("Mississippi");
splitOnDoubleLetter("Easy");