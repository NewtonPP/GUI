# GenerateScripts Backend API

The `GenerateScripts` API is a backend service that dynamically generates neural network configuration scripts based on user-provided parameters. The scripts are formatted with specific keys and values and stored in the server's file system.

---

## Features

- **Dynamic Script Generation**: Supports atom types, atomic masses, fingerprints, screening parameters, network layers, and calibration parameters.
- **Flexible Input Structure**: Accepts complex nested JSON input and parses it into the required script format.
- **File Storage**: Saves the generated script to a specific directory with a unique filename.

---

## Prerequisites

- Node.js (v14+ recommended)
- npm or yarn for dependency management
- Ensure the `scripts` directory exists or the server has permissions to create it dynamically.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NewtonPP/GUI.git
