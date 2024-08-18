anime version of movie grid

- checking if answers are right shouldn't be hard
	- actually might be a little hard for obscure answers cause of pagination (ex. checking if va is in a show)
- how to make clues?
	- manually make some?
		- randomly generate grids and make sure there's at least n for each category? or that there's at least one of x popularity
	- can fetch top however many voice actors based on popularity/number of roles
	- could get top x anime and make categories based on common details ** seems most plausible **
        - however will def bias possible results towards more recent and popular shows. also might not play well with some clues (before 2000 + some VAs will be impossible)
	- title clues could be hard cause of different titles in english/japanese 
        - could just make it count for either english or romaji
- could make dub and sub version hehe
- probably filter out some formats, just do tv/movies?

clue ideas
- vas
- directors
- studios
- single cour (11-13 eps)
- original (ie not adaptation)
- movie
- year ranges
- before 2000/2010
- genres
- tags (careful bout spoilers)
- theme song artists
- number of words in title
- starting letter

stacc
- maybe try something besides react
    - apparently create react app is dead so maybe just a different framework?
- could be a chance to learn aws? deployment? full stack?
- basic version of this def doesn't need a database, but to have a different daily puzzle for everyone and see stats on how many people guessed each thing like movie grid it is needed

required operations
- generate puzzle/clues
    - start off hardcoded?
- search for anime
- check guess corrrectness
- keep track of guesses
- show final result

advanced functionality
- generate puzzle
    - do clues automatically (some or all)
    - make sure puzzle is solvable at all 
    - make sure puzzle is reasonably solvable/answers aren't all super obsure
    - make 1 new puzzle per day and everyone sees the same one
- multiple versions
    - movie
    - sub and dub
    - oldies
    - manga
- results
    - share/download grid image
    - see percentage of people that did each guess
    - see most and least common guesses
    - streak/personal stats
- give up
    - how to show answers if not based on what other people guessed?
