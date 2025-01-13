import fs from 'fs'
import { google } from 'googleapis';

const SPREADSHEET_ID = '1RxrlZD31IpYtMR6AQCyFjds0Rbyc8_pqWn-JYq-jcho';
const RANGE = 'Sheet1'; // Replace with your actual sheet name
const OUTPUT_FILE_PATH = './src/paintings.js';

const serviceAccount = require('./service-account.json'); // Replace with your key file path

const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function fetchSheetData() {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE,
  });

  const rows = res.data.values;

  if (!rows || rows.length === 0) {
    console.log('No data found in the sheet.');
    return [];
  }

  const [headers, ...data] = rows;
  return data.map((row) =>
    headers.reduce((acc, header, index) => {
      acc[header] = row[index] || '';
      return acc;
    }, {})
  );
}

function validateRow(row) {
  return Object.values(row).every((value) => value.trim() !== '');
}

async function updatePaintingsFile() {
  const rows = await fetchSheetData();
  const validRows = rows.filter(validateRow);

  const paintings = validRows.map((row, index) => ({
    id: index + 1,
    title: row['title'],
    price: row['price'],
    size: row['size'],
    Medium: row['Medium'],
    Surface: row['Surface'],
    ToBeDeliveredAs: row['ToBeDeliveredAs'],
    Sold: row['Sold'].toLowerCase() === 'true',
    description: row['description'],
  }));

  const fileContent = `export const paintings = ${JSON.stringify(paintings, null, 2)};`;

  fs.writeFile(OUTPUT_FILE_PATH, fileContent, (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log(`File updated at ${OUTPUT_FILE_PATH}`);
    }
  });
}

updatePaintingsFile().catch(console.error);
