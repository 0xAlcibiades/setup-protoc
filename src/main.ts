import * as core from "@actions/core";
import * as installer from "./installer";
import * as os from "os";

async function run() {
  try {
    let version = core.getInput("version");
    let includePreReleases = convertToBoolean(
      core.getInput("include-pre-releases")
    );
    let repoToken = core.getInput("repo-token");
    let osArch = core.getInput("os-arch");
    if (osArch.length == 0) {
      osArch = os.arch();
    }
    await installer.getProtoc(version, includePreReleases, repoToken, osArch);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

function convertToBoolean(input: string): boolean {
  try {
    return JSON.parse(input);
  } catch (e) {
    return false;
  }
}
