import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');

async function optimizeImages() {
  console.log('Optimizing images...');
  
  const filesToResize = [
    { name: 'project-2.webp', width: 766, height: 766 },
    { name: 'car-rental.webp', width: 766, height: 766 },
    { name: 'quiz-app.webp', width: 766, height: 766 },
    { name: 'gyanyatra.webp', width: 766, height: 766 }, // Resize also if needed
  ];
  
  for (const file of filesToResize) {
    const filePath = path.join(publicDir, file.name);
    if (fs.existsSync(filePath)) {
      const tempPath = filePath + '.temp.webp';
      await sharp(filePath)
        .resize(file.width, file.height, { fit: 'cover', withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(tempPath);
      fs.renameSync(tempPath, filePath);
      console.log(`Optimized ${file.name}`);
    }
  }

  // Compress hero-nepal
  const heroPath = path.join(publicDir, 'hero-nepal.webp');
  if (fs.existsSync(heroPath)) {
    const tempPath = heroPath + '.temp.webp';
    await sharp(heroPath)
      .webp({ quality: 70 }) // reduce quality slightly
      .toFile(tempPath);
    fs.renameSync(tempPath, heroPath);
    console.log('Optimized hero-nepal.webp');
  }
  
  console.log('Done!');
}

optimizeImages().catch(console.error);
