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
    - give them different difficulty/specificness ratings to calibrate the difficulty
        - VAs/studios = more specific, formats = less specific
        - or just based on number of anime on anilist that qualify
    - add field to clue types for other types they can't be combined with (ex movie or ghibli/ep count, studios/voice actors and release year)
    - just put clues into two groups, can put ones that can't be combined into the same group
        - might make it more repetitive, some clues can't be combined with themselves so can't put in both groups, but could still be combined with others in the same group (ex studio)
- could make dub and sub version hehe
- probably filter out some formats, just do tv/movies?
- need to mitigate and/or handle rate limits
    - maybe change the search to have to finish typing and press enter instead of auto loading? :/
- do fancy graphql things
    - type stuff with graph code gen + graphql request
        - should the generated types be committed? : /
    - graphql request lets you batch queries
    - react fragments? for building the info queries?
    - can't do both graphql code gen and dynamically building queries with string templates
        - option 1: use directives and combine all fragments into one big anime info query
        - option 2: make each fragment its own query and batch them together
        - option 3: throw out graphql codegen and use string templates at least for info query
        - option 4: make custom thingy to generate query based off clue type enum

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
- demographics (shonen/shojo etc)

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
    - no sequels/second+ seasons mode
    - all voice actors >:)
        - find a way to avoid duplicated paginated requests tho
    - make game mode react context to make it easy to change stuff hehe
- results
    - share/download grid image
    - see percentage of people that did each guess
    - see most and least common guesses
    - streak/personal stats
- give up
    - how to show answers if not based on what other people guessed?
