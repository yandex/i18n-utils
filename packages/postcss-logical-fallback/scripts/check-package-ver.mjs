import packageJson from "../package.json";
import { exec } from "child_process";

exec(`npm view ${packageJson.name} version`, (error, remotePackageVersion, stderr) => {
  if (error) {
    if (/not found/gi.test(error.message)) {
      console.log(`✅ Package is not published yet, everything ok`);
      process.exit(0);
    }

    console.error(error.message);
    process.exit(-1);
  }
  if (stderr) {
    console.error(stderr);
    process.exit(-1);
  }

  if (remotePackageVersion >= packageJson.version) {
    console.error(`❌ You need to update package version: \nCurrent registry version: ${remotePackageVersion}Your version: ${packageJson.version}`);
    process.exit(-1);
  }

  console.log(`✅ Version is updated, everything is OK!`);
});
