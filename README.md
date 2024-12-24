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


Tutorial for Using the GUI

This guide provides step-by-step instructions to effectively use the GUI.

Step 1: Select Atom Types

Begin by selecting the required atom types.

Add atoms by clicking on the Add Atom button and selecting the desired atoms from the list.

Step 2: Define Fingerprints

For each atom you selected, specify the number of fingerprints.

Enter the fingerprint details:

Select the fingerprint type.

Specify the fingerprint constants from the provided options.

Step 3: Configure Network Layers

For each selected atom, configure its network layers:

Select the number of layers.

Enter the layer size for each layer.

Step 4: Choose Activation Functions

In the Activation Functions section, assign an activation function to each layer for your atoms.

Step 5: Define State Equations

Specify the number of state equations.

Write the equations in the input fields.

Based on your equations, a dynamic selection section will appear where you need to select other parameters accordingly.

Step 6: Screening Section

In this section, all possible combinations of your selected atoms (in groups of 3) will be displayed.

For each combination:

Set the Cmin value (must be ≥ 0.8).

Set the Cmax value (must be ≤ 3).

Step 7: Calibration Parameters

Configure the calibration parameters:

Algorithm: Select the desired algorithm.

Dump Directory: Choose the output directory for the results.

Doforces: Select the appropriate option.

Normalize Input: Enter the value for normalizing inputs.

Tolerance: Provide the tolerance value.

Regularizer: Specify the regularization value.

Follow these steps to complete the setup using the GUI. Each section dynamically adjusts based on your inputs to ensure a streamlined and user-friendly experience.


