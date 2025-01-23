import { exec } from 'child_process'

const EXPECTED_PYTHON_VERSION = '3.11.9'

exec(`python -c "import platform; print(platform.python_version())"`, (err, stdout, stderr) => {
  const currPythonVersion = stdout.toString()

  if (!currPythonVersion) {
    throw new Error('Python is not installed.')
  }

  if (currPythonVersion.trim() !== EXPECTED_PYTHON_VERSION) {
    throw new Error(
      `Expected Python version '${EXPECTED_PYTHON_VERSION}' but got version '${currPythonVersion}'`
    )
  }
})
