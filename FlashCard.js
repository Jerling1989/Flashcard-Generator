// Import the packages needed
var fs = require('fs');
var inquirer = require('inquirer');
// Import the functions needes
var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');

// User needs to make atleast one card
var cardsToMake = 1;
// Ask User how many cards they would like to make
inquirer.prompt([
{
  name: 'numCards',
  message: 'How many study cards would you like to make?'
}
  ]).then(function(response){
    cardsToMake = response.numCards;
    console.log(cardsToMake);
    createCards();
  });
// Create Cards based on user input
function createCards(){
  if(cardsToMake != 0){
    inquirer.prompt([
    {
      type: 'list',
      choices: ['Basic Card', 'Cloze Card'],
      name: 'cardType',
      message: 'What type of card would you like to create?'
    }
    ]).then(function(answers){
        // If user chose basic cards
        if(answers.cardType=='Basic Card'){
          console.log('You chose basic card.');
          inquirer.prompt([
          {   // Question at front of flashcard
              name: 'front',
              message: 'ENTER YOUR FLASHCARD QUESTION'
          },
          {   // Answer on back of flashcard
              name: 'back',
              message: "ENTER THE QUESTION'S ANSWER"
          } // Stringify data and add to txt file
            ]).then(function(nextAnswers){
              var card = new BasicCard(nextAnswers.front, nextAnswers.back);
              console.log(card);
              var cardJ = JSON.stringify(card);
              fs.appendFile('cards.txt', '\r\n' + cardJ, function(err){
                if(err){
                  console.log(err);
                }
              });
              // Take one card off the total number of cards to make
              cardsToMake--;
              createCards();
          });

        }     // If user chose cloze cards
        else if(answers.cardType=='Cloze Card'){
          console.log('You chose cloze card.');
          inquirer.prompt([
          { // Full fact information
            name: 'full',
            message: 'ENTER THE FULL FACT SENTENCE'
          },
          { // Fact displayed with missing info
            name: 'cloze',
            message: 'ENTER THE FACT STUDY OMISSION'
          } // Stringify data and add to txt file
            ]).then(function(clozeAnswers){
                var card = new ClozeCard(clozeAnswers.full, clozeAnswers.cloze);
                console.log(card);
                var cardJ = JSON.stringify(card);
                fs.appendFile('cards.txt', '\r\n' + cardJ, function(err){
                  if(err){
                  console.log(err);
                  }
                });
                // Take one card off the total number of cards to make
                cardsToMake--;
                createCards();
            });
        }
    });
  }
}