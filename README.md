# RNMemoryGame

Game behaviour is based on https://www.improvememory.org/brain-games/memory-games/memory-game/

## Assumptions

NOTE: Assumptions are based on the behaviour of game at above link

- A card can only "open" on press; cannot be closed back
- At max two cards can be open at a time
- "Attempts" get increased by one when second card is opened
- After the second card is opened, after a pause to show the cards, it matches them and does one of the following operations:
  - if matches, increase "Matches" by 1 and hide/remove both the cards
  - if doesnt match, close/turn-back both the cards
-
