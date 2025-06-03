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

2. Navigate to the Backend and Frontend directory with cd Backend, and cd Frontend commands. At this point make sure you have nodejs installend in your system. If not install it. 
Do npm install in terminal. This will install necessary packages listed in the package.json.
You can run the Backend server with node server.js
You can run the Frontend with npm run dev.

This is all you need to setup GUI in your local machine. 


# Tutorial for Using the GUI

## This guide provides step-by-step instructions to effectively use the GUI.

### Step 1: Select Atom Types

Begin by selecting the required atom types.

Add atoms by clicking on the Add Atom button and selecting the desired atoms from the list.

### Step 2: Define Fingerprints

For each atom you selected, specify the number of fingerprints.

Enter the fingerprint details:

Select the fingerprint type.

Specify the fingerprint constants from the provided options.

### Step 3: Configure Nets

For each selected atom, choose the number of Nets

Select the Net Type
For layer size, input comma separated values.
This will enable number of layers - 1 activation options, which you can select from the dropdown.
After this select the fingerprint map.

### Step 4: Choose Activation Functions

In the Activation Functions section, assign an activation function to each layer for your atoms.

### Step 5: Define State Equations

Specify the number of state equations.

Write the equations in the input fields.

Based on your equations, a dynamic selection section will appear where you need to select other parameters accordingly.

### Step 6: Screening Section

In this section, all possible combinations of your selected atoms (in groups of 3) will be displayed.

For each combination:

Set the Cmin value (must be ≥ 0.8).

Set the Cmax value (must be ≤ 3).

### Step 7: Calibration Parameters

Configure the calibration parameters:

Algorithm: Select the desired algorithm.

Dump Directory: Choose the output directory for the results. By default this is . 
This doesnot work. So you need to manually enter the path after downloading the file if you have path other than current directory.

Doforces: Select the appropriate option (0 or 1)

Normalize Input: Enter the value for normalizing inputs.

Tolerance: Provide the tolerance value.

Regularizer: Specify the regularization value.

Log File: Write the name of the file in .log extension

Log File: Write the name of the file in .nn extension

Potential Output Frequency: Write the Potential Output Frequency value. Default value given is 10.

Max Epochs: Write the Max Epochs value. Default value given is 10000.

Overwrite Potentials: Write the Overwrite Potentials value. Default value given is 10000.

debug1freq: Write the debug1freq value. Default value given is 10.

debug2freq: Write the debug2freq value. Default value given is 0.

debug3freq: Write the debug3freq value. Default value given is 0.

debug4freq: Write the debug4freq value. Default value given is 0.

debug5freq: Write the debug5freq value. Default value given is 0.

debug6freq: Lambda Initial :

Adaptive Regularizer: Choose the Adaptive Regularizer value either 0 or 1. Default value given is 0.

Lambda Initial: Write the Lambda Initial value. Default value given is 1000.

Lambda Increase: Write the Lambda Increase value. Default value given is 10.

Lambda Reduce: Write the Lambda Reduce value. Default value given is 0.2.

Inum Weight: Write the Inum Weight value. Default value given is 1.

Seed: Write the value for seed

Target type: Select the value for Target Type. The given options are 1, 2, 3.

Follow these steps to complete the setup using the GUI. Each section dynamically adjusts based on your inputs to ensure a streamlined and user-friendly experience.


