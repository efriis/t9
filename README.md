# T9 Implementation
For Meteor coding challenge

## Running
To run the full application (with bigram predicitions based on context):
```js
node js/index.js
```

To run the simple predictions in the console:
```js
node js/simple.js
```

## Configuration


## Installation
No installation is required

## Build
If you would like to rebuild the word library and the 2-gram library from updated files, you can replace `assets/words.txt` and `assets/2grams.txt` with your new files. Then, run `npm run build`.

## Sources
assets/words.txt is from [https://github.com/first20hours/google-10000-english](https://github.com/first20hours/google-10000-english), and it contains the 20,000 most common words in English from Google's trillion words corpus in frequency order.
w2_.txt is the "non case sensitive" 2-gram list from [http://www.ngrams.info/download_coca.asp](http://www.ngrams.info/download_coca.asp). It contains bigrams to give even better suggestions to the user.