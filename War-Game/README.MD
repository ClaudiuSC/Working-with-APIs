**War card game**

I used the https://deckofcardsapi.com/ API to create a war card game.
It features a button that fetches a shuffled deck from the API and a button that draws two card from that deck. The API gives you the option to draw any number of cards at a time 
from the deck you requested, and updates the remaining cards.
The app compares the values of the two cards and keeps score of the game. When the deck is depleted the game ends and an overlay appears in which the winner is declared and you have
a reset button to play another game.


Oher things that I used and think are noteworthy:
* the draw button is disabled until you draw a pack of cards and disables itself when the game is over
* conditional operator to simplify an IF statement
* setTimeout to remove a class from an h1(i used this method so that it animates every time i add that class)
* a method to avoid using the switch operator, creating an object which options/cases are the keys and the results are their values. By putting the option into the brackets you
*  access the value of the key that matches the expression via the bracket notation. 


**Example:**
<!-- begin snippet: js hide: false console: true babel: null -->

<!-- language: lang-js -->

    console.log('Using a valid case:', ({
      1: 'One',
      2: 'Two',
      3: 'Three'
    })[1] ?? 'Default')

    console.log('Using an invalid case/defaulting:', ({
      1: 'One',
      2: 'Two',
      3: 'Three'
    })[7] ?? 'Default')

<!-- language: lang-css -->

<!-- end snippet -->




