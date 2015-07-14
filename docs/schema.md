# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

## games
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
title           | string    | not null
company         | string    | not null
genre           | string    | not null
avg_rating      | integer   |
description     | text      | not null

## my_games
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key (references users)
game_id         | integer   | not null, foreign key (references games)
my_rating       | integer   |
status          | string    |

## comments
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
game_id         | integer   | not null, foreign key (references games)
author_id       | integer   | not null, foreign key (references users)
body            | text      | not null

<!-- unique index combining user_id and game_id -->










#
