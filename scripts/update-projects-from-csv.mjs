import fs from 'fs/promises';
import path from 'path';
import csv from 'csv-parser';
import { Readable } from 'stream';

const CSV_PATH = path.join(process.cwd(), 'data', 'projects.csv');
const DATA_FILE_PATH = path.join(process.cwd(), 'lib', 'data.ts');

async function run() {
  console.log('Reading CSV file...');
  const csvFileContent = await fs.readFile(CSV_PATH, 'utf8');

  const projects = [];
  const stream = Readable.from(csvFileContent).pipe(csv());

  for await (const row of stream) {
    projects.push({
      ...row,
      id: parseInt(row.id, 10),
      budget: parseFloat(row.budget),
      raised: parseFloat(row.raised),
      images: row.images ? row.images.split('|') : [],
      videos: row.videos ? row.videos.split('|') : [],
      budgetPhases: row.budgetPhases ? JSON.parse(row.budgetPhases) : [],
      // Keeping accounting manual for now
      accounting: []
    });
  }
  
  console.log(`Found ${projects.length} projects in CSV.`);

  const projectsArrayString = JSON.stringify(projects, null, 2)
    // Replace "accounting" placeholder with an empty array for now
    // This is a simplification; a more complex setup could handle this better
    .replace(/"accounting": \[\s*\{\s*"date": "2025-06-15",\s*"description": "Initial material purchase",\s*"amount": 5000,\s*"receiptUrl": "#"\s*}\s*\]/g, 'accounting: []');


  console.log('Reading data.ts file...');
  let dataFileContent = await fs.readFile(DATA_FILE_PATH, 'utf8');

  const startMarker = '// -- PROJECTS_START --';
  const endMarker = '// -- PROJECTS_END --';
  const startIndex = dataFileContent.indexOf(startMarker);
  const endIndex = dataFileContent.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1) {
    console.error('Could not find markers in data.ts. Please add them.');
    return;
  }

  const newProjectsSection = `export const projects: Project[] = ${projectsArrayString};`;

  dataFileContent = 
    dataFileContent.substring(0, startIndex + startMarker.length) +
    '\n' +
    newProjectsSection +
    '\n' +
    dataFileContent.substring(endIndex);

  console.log('Writing updated content to data.ts...');
  await fs.writeFile(DATA_FILE_PATH, dataFileContent, 'utf8');

  console.log('✅ Successfully updated projects from CSV!');
}

run().catch(console.error);
