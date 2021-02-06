const fs = require('fs');
const csvWriter = require('csv-write-stream');
const hipString = require('./hipString.js');

const writer = csvWriter();

function descriptionParagraphGenerator(hipsterLorum) {
  const lowHipString = hipsterLorum.hipString.toLowerCase().split(' ');
  const paragraphSize = Math.floor((Math.random() + 1) * 5).toString() * 1;// in sentences;

  let hipParagraph = '  ';

  for (let i = 0; i < paragraphSize; i += 1) {
    let sentence = '';
    let j = 0;
    const sentenceLength = Math.floor((Math.random() + 5)).toString() * 1;

    while (j < sentenceLength) {
      const randomInt = Math.floor(Math.random() * lowHipString.length);
      if (j === 0) {
        sentence += ` ${lowHipString[randomInt][0].toUpperCase()}${lowHipString[randomInt].slice(1)} `;
      } else if (j === sentenceLength - 1) {
        sentence += `${lowHipString[randomInt]}.`;
      } else {
        sentence += `${lowHipString[randomInt]} `;
      }
      j += 1;
    }
    hipParagraph += sentence;
  }

  return hipParagraph;
}

// Standard description generator
function standardDescriptionGenerator() {
  return descriptionParagraphGenerator(hipString);
}

function standardGenerator() {
  const standardType = ['RL', 'RI', 'W', 'SL', 'L', 'CCRA.R', 'CCRA.W', 'CCRA.SL', 'CCRA.L', 'RH', 'RST', 'WHST'];
  const grade = ['K', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const section = ['.1', '.2', '.3', '.4', '.5', '.6', '.7', '.8', '.9', '.10'];
  const standards = [];
  for (let i = 0; i < standardType.length - 1; i += 1) {
    for (let j = 0; j < grade.length - 1; j += 1) {
      for (let z = 0; z < section.length - 1; z += 1) {
        standards.push(`${standardType[i]}.${grade[j]}${section[z]}`);
      }
    }
  }
  return standards;
}

// Product description generator
function descriptionGenerator() {
  const reviewLength = Math.floor((Math.random() * 4)) + 1;
  let reviewString = '';
  for (let i = 0; i < reviewLength; i += 1) {
    reviewString += `${descriptionParagraphGenerator(hipString)}\n` + '\n';
  }
  return reviewString;
}

function pagesGenerator() {
  const pages = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];
  const randomIndex = Math.floor(Math.random() * pages.length);
  return pages[randomIndex];
}
function answerKeyGenerator() {
  const options = [true, false];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
function teachingDurationGenerator() {
  const durations = ['Lifelong tool', '1 semester', '1 year', '1 quarter', '2 quarters', '3 quarters'];
  const randomIndex = Math.floor(Math.random() * durations.length);
  return durations[randomIndex];
}

exports.standardGenerator = standardGenerator;
exports.descriptionGenerator = descriptionGenerator;
exports.pagesGenerator = pagesGenerator;
exports.answerKeyGenerator = answerKeyGenerator;
exports.teachingDurationGenerator = teachingDurationGenerator;
exports.standardDescriptionGenerator = standardDescriptionGenerator;
