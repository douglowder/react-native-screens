// This should only be run from the project root by scripts/create-tvos-example.sh

// Modify FabricExample/package.json to use react-native-tvos

const fs = require('fs');
const path = require('path');

const packageJsonPath = path.resolve(__dirname, '../FabricExample/package.json');

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

packageJson.dependencies['react-native'] = 'npm:react-native-tvos@0.81.4-0';

packageJson.scripts['build-tvos'] =
  'xcodebuild -workspace ios/FabricExample.xcworkspace -scheme FabricExample -configuration Debug -sdk appletvsimulator -arch arm64 -derivedDataPath ios/build';

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
