# Flux-capacitr

[Heroku link][heroku]

[heroku]: http://ubermicro.herokuapp.com

## Minimum Viable Product
UberMicro is a clone of GoodReads, where instead of books, users will find their next favorite video game. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] favorite games
- [ ] mark games as 'played'
- [ ] marks games as 'want to play'
- [ ] rate games
- [ ] see average game rating
- [ ] User's home shows feed of recommended games
- [ ] Signed in Users can see 'myGames'
- [ ] 'myGames' has all 'played' and 'want to play' games
- [ ] Search for games by title
- [ ] Search for games by genre

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication and rails setup (~1 day)
First thing will be to add user authentication along with the basic database schema that the rest of the app will depend on. This will involve creating a games, users, and comments table, along with a my_games table which will hold the relationship data between a user and a game. This join table along with the relationship will also house the users rating for the game and the status of the game for the user (either null, "wants-to-play" or "played").

[Details][phase-one]

### Phase 2: building API (~2 days)
This Phase will involve building the jbuilder files along with setting the api up for backbone. Once this is done I will create a backbone model for games and another nested model my_games. I will then create the games show page which will allow the user to change their relationship to games with background ajax requests.

[Details][phase-two]

### Phase 3: Adding comments and adding additional information (~1-2 days)
In this phase I will add the ability to comment on games on the show page for games. In this phase I will also use the giantbomb api to supplement the information I am already gathering from my database. This way I will be able to gather images with out storing them in the data base, along with an myriad of other information the api may hold.

[Details][phase-three]

### Phase 4: Recommended (~1-2 days)
This phase will consist of creating a page of recommended games. At first this page will only utilize the genre's of other games the user has liked to recommend games that are of the same genre. As a bonus later I will try to create a better algorithm + using more api information to recommend games.

[Details][phase-four]

### Phase 5: MyGames (~2 days)
In this phase I will add a user's myGames page which will house all games the user has wanted to play or has played. From this page the user will be able to change the status of games, remove games, rate their games, and even see the average rating of a game.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] better recommend algorithm
- [ ] Pagination/infinite scroll
- [ ] add friends
- [ ] add friend recommenations
- [ ] "Like" button to comments
- [ ] comment on users
- [ ] User avatars
- [ ] Multiple sessions/session management

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
