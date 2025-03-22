import { execSync } from 'child_process';

function getLastCommitDate() {
  try {
    const gitDate = execSync('git log -1 --format=%cd').toString().trim();
    return new Date(gitDate);
  } catch (error) {
    console.error('Failed to get git last commit date:', error);
    return new Date();
  }
}

export default getLastCommitDate();
