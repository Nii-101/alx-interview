#!/usr/bin/node

'use strict';

const filmNumber = process.argv[2];

let characters = [];
const url = `https://swapi-api.alx-tools.com/api/films/${filmNumber}`;

async function fetchData (url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

async function main () {
  try {
    const filmData = await fetchData(url);
    characters = filmData.characters;
    const characterPromises = characters.map(characterUrl => fetchData(characterUrl));
    const characterData = await Promise.all(characterPromises);

    characterData.forEach((data) => {
      console.log(`${data.name}`);
    });
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

main();
