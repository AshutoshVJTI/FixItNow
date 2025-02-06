import { promises as fs } from 'fs';
import path from 'path';
import { createCanvas } from 'canvas';

async function generatePlaceholderImage(
  width: number,
  height: number,
  text: string,
  outputPath: string
) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // Add text
  ctx.fillStyle = '#000000';
  ctx.font = '48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  await fs.writeFile(outputPath, buffer);
}

async function main() {
  const assetsDir = path.join(process.cwd(), 'assets');

  // Create assets directory if it doesn't exist
  await fs.mkdir(assetsDir, { recursive: true });

  // Generate placeholder images
  await generatePlaceholderImage(1024, 1024, 'Icon', path.join(assetsDir, 'icon.png'));
  await generatePlaceholderImage(1242, 2436, 'Splash', path.join(assetsDir, 'splash.png'));
  await generatePlaceholderImage(1024, 1024, 'Adaptive', path.join(assetsDir, 'adaptive-icon.png'));
  await generatePlaceholderImage(48, 48, 'F', path.join(assetsDir, 'favicon.png'));

  console.log('Generated placeholder assets successfully!');
}

main().catch(console.error); 