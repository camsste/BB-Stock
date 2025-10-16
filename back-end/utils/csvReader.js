const fs = require('fs');
const csv = require('csv-parser');

const readCSV = (filePath, delimiter = ',') => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv({ separator: delimiter }))
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

const getItensBBTS = () => readCSV('../data/dados_hackathon.csv', ';');
const getUsuarios = () => readCSV('../data/usuarios.csv');

module.exports = {
  getItensBBTS,
  getUsuarios
};