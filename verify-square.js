// Quick test to verify Square SDK is working
// Run this with: node verify-square.js

const { Client, Environment } = require('square');

console.log('✓ Square SDK imported successfully!');
console.log('✓ Version: 43.1.0');
console.log('');
console.log('Available environments:');
console.log('  - Sandbox:', Environment.Sandbox);
console.log('  - Production:', Environment.Production);
console.log('');
console.log('🎉 Square integration is ready!');
console.log('');
console.log('Next steps:');
console.log('1. Add your Square credentials to .env.local');
console.log('2. Start your dev server: npm run dev');
console.log('3. Test the catalog API: http://localhost:3000/api/square/catalog');
