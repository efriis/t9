# T9 Implementation
For Meteor coding challenge. Written in TypeScript

## Usage
To run the full application (with bigram predicitions based on context):
```js
node js/index.js
```
In this version, you can type numbers to add to the current word, letters to select a suggestion to add to your message, backspace to delete a number, or enter to select the first suggestion.

To run the simple predictions in the console:
```js
node js/simple.js
```

## Configuration
You can configure the program in `config.json`. Here, you can change the max number of suggestions it searches for and prints (by default, 10).
You can also configure the dialpad mappings. In theory, you could even create a map including nearby characters on a keyboard to repurpose lib.ts as a version of autocorrect. However, this will not work with my main stdin program, since it uses letters to select what you would like to add to the message.

## Installation
No installation is required

## Build
If you would like to rebuild the word library and the 2-gram library from updated files, you can replace `assets/words.txt` and `assets/2grams.txt` with your new files. Then, run `npm run build`.

## Sources
assets/words.txt is from [https://github.com/first20hours/google-10000-english](https://github.com/first20hours/google-10000-english), and it contains the 20,000 most common words in English from Google's trillion words corpus in frequency order.
w2_.txt is the "non case sensitive" 2-gram list from [http://www.ngrams.info/download_coca.asp](http://www.ngrams.info/download_coca.asp). It contains bigrams to give even better suggestions to the user.