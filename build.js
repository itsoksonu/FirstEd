// build.js
import { execSync } from 'child_process';

// Your build commands
try {
  execSync('npm install');
  // Add more commands as needed
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
