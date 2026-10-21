const fs = require('fs');
const path = require('path');

const transportDir = path.join(__dirname, '..', 'public', 'images', 'transport');

const mappings = {
  // Replace the old mislabelled files with actual authentic vehicle images:
  'hero-executive.jpg': 'pdf-etp-12-473862.jpg', // Genuine LOKRYD-branded white sedans fleet with chauffeur
  'sedan-fleet.jpg': 'pdf-etp-3-353022.jpg',     // Genuine LOKRYD-branded sedans lineup
  'campus-fleet.jpg': 'pdf-etp-5-199844.jpg',    // Genuine LOKRYD coach/bus with driver
  'innova-fleet.jpg': 'pdf-etp-8-266167.jpg',    // Genuine LOKRYD white corporate car with driver
  'airport-chauffeur.jpg': 'pdf-etp-64-583331.jpg', // Executive chauffeur luxury sedan at grand entrance
  'maintenance-bay.jpg': 'pdf-cp-0-1432093.jpg', // High-res fleet vehicle inspection lineup (replaces robotics factory)
  
  // Specific semantic names for new components and pages:
  'lokryd-fleet-hero.jpg': 'pdf-etp-12-473862.jpg',
  'lokryd-sedans-lineup.jpg': 'pdf-etp-3-353022.jpg',
  'lokryd-chauffeur-car.jpg': 'pdf-etp-8-266167.jpg',
  'lokryd-passenger-coach.jpg': 'pdf-etp-5-199844.jpg',
  'lokryd-executive-sedan.jpg': 'pdf-etp-64-583331.jpg',
  'lokryd-executive-interior.jpg': 'pdf-etp-2-254536.jpg',
  'lokryd-fleet-lineup.jpg': 'pdf-cp-0-1432093.jpg',
  'lokryd-corporate-campus.jpg': 'pdf-etp-0-346419.jpg',
  'volvo-passenger-coach.jpg': 'pdf-etp-14-212980.jpg',
  'passenger-travel.jpg': 'pdf-etp-9-343484.jpg',
};

for (const [target, source] of Object.entries(mappings)) {
  const srcPath = path.join(transportDir, source);
  const dstPath = path.join(transportDir, target);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    console.log(`Copied ${source} -> ${target}`);
  } else {
    console.error(`Source not found: ${srcPath}`);
  }
}
