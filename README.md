# Swedish-Wordle
A Swedish version of the popular online game 'Wordle', in which the player has to guess a random five-letter word. The game is written in vanilla JS and can be played in the browser.
<br><br>
<img width="1435" alt="Skärmavbild 2023-09-19 kl  18 25 19" src="https://github.com/axel-nyman/Swedish-Wordle/assets/96598978/438662dd-b1ab-4d5c-9d31-003c0f537a41">

## Rules
The goal is to find the secret, unknown word through iterative guessing. For each guess the player has to input a valid swedish five letter word. If a entered guess is valid, each letter of the word will be colored either green, yellow or red depending on a few conditions.
<br><br>
<img width="500" alt="Skärmavbild 2023-09-19 kl  18 27 41" src="https://github.com/axel-nyman/Swedish-Wordle/assets/96598978/a41313a1-6b3e-4b99-ab6a-9b99543a8a31">
<img width="500" alt="Skärmavbild 2023-09-19 kl  18 28 20" src="https://github.com/axel-nyman/Swedish-Wordle/assets/96598978/3cd3d166-e800-4c5e-abf5-663f037da5a9">
### Green
If a letter is colored green it is both part of the secret word and placed in the correct place. For example, if I guessed the word 'svala' (as in the example above) and the secret word contains the letter 'a' in the center position, the center 'a' in the word 'svala' will be colored green. If the secret word would have also contained an 'a' in the last position, the last 'a' in 'svala' would have been colored green as well.
### Yellow
If a letter is colored yellow it is part of the secret word but placed in the wrong position. In the example above, both 'v' and 'l' are part of the secret word but not in those specific positions. Since the center 'a' in our guess was colored green, we know that the 'v' cannot be in either the 2nd or 3rd position and that 'l' cannot be in the 3rd or 4th position.
### Red
If a letter is colored red it is not part of the secret word. A letter can also be colored red if the guessed word contains more instances of a certain letter than the secret word. As in the example above, the 's' is colored red, meaning there's no 's' in the secret word. Also, the first 'a' is colored green while the second 'a' is colored red. Therefore, the secret word only contains a single 'a', and we know it to be in the 3rd position. If the secret word would have contained more than one 'a' (for example 'alarm'), the last 'a' in the guess 'svala' would have been yellow and not red, indicating that the secret word contains more than one 'a'.

## Winning the game
The game is won when the secret word is guessed, indicated by all the letters being green and the text 'rätt svar' being displayed. The user can press spacebar or refresh the page to generate a new secret word and start over.
<br><br>
<img width="1432" alt="Skärmavbild 2023-09-19 kl  18 30 19" src="https://github.com/axel-nyman/Swedish-Wordle/assets/96598978/c88a8485-7a2e-49f5-adda-f9d9fbca3a6f">
