import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

export const GenerateScripts = async (req, res) => {
    try {
        const { atoms, atomicMasses } = req.body.atomtypes;
        const { fingerprintsPerElement, fingerprintsArray } = req.body.fingerprintsperelement;
        const { screening } = req.body;
        const { networklayers } = req.body;
        const { calibrationparameters } = req.body;
        const { activationfunctions } = req.body;
        const { stateequations } = req.body;
        const { netsperelement } = req.body;
        const lines = [];

        lines.push("atomtypes:");
        lines.push(atoms.join(" "));

        for (let key in atomicMasses) {
            lines.push(`mass:${key}:\n${atomicMasses[key]}`);
        }

        for (let key in fingerprintsPerElement) {
            lines.push(`fingerprintsperelement:${key}:\n${fingerprintsPerElement[key]}`);
        }

        const paramKeys = new Set(["re", "rc", "dr", "o", "n", "m"]);

        for (let elem in fingerprintsArray) {
            fingerprintsArray[elem].forEach(({ fingerprint, fingerprinttype, params }) => {
                lines.push(`fingerprints:${fingerprint}:\n${fingerprinttype}`);
                for (let key in params) {
                    const base = `fingerprintconstants:${fingerprint}:${fingerprinttype}:${key}`;
                    if (paramKeys.has(key)) {
                        lines.push(`${base}\n${params[key]}`);
                    } else if (key === "alpha" || key === "alphak") {
                        lines.push(`${base}\n${params[key].join(" ")}`);
                    }
                }
            });
        }

        for (let key in screening) {
            for (let c in screening[key]) {
                lines.push(`screening:${key}:${c}:\n${screening[key][c]}`);
            }
        }

        for (let key in networklayers) {
            lines.push(`networklayers:${key}:\n${networklayers[key].length}`);
            networklayers[key].forEach((layerSize, i) => {
                lines.push(`layersize:${key}:${i}:\n${layerSize}`);
            });
        }

        for (let key in activationfunctions) {
            for (let i = 0; i < activationfunctions[key].length - 1; i++) {
                lines.push(`activationfunctions:${key}:${i}:\n${activationfunctions[key][i]}`);
            }
        }
        for (let key in stateequations) {
            stateequations[key].forEach(({ equation, type, stateequationconstants }) => {
                lines.push(`stateequations:${equation}:\n${type}`);
                for (let constKey in stateequationconstants) {
                    const fullKey = `stateequationconstants:${equation}:${type}:${constKey}:`;
                    const val = stateequationconstants[constKey];
                    lines.push(Array.isArray(val) ? `${fullKey}\n${val?.join(" ")}` : `${fullKey}\n${val}`);
                }
            });
        }

        for (let key in calibrationparameters) {
            lines.push(`calibrationparameters:${key}:\n${calibrationparameters[key]}`);
        }

        for (let entry of netsperelement) {
            lines.push(`nets:${entry.atom}:`);
            lines.push(entry.Nets.map(n => n?.value).filter(Boolean)?.join(" "));

            for (let net of entry.Nets) {
                if (!net?.value) continue;
                lines.push(`netconstants:${entry.atom}:${net.value}:layersize:\n${net.layersize?.join(" ")}`);
                lines.push(`netconstants:${entry.atom}:${net.value}:activation:\n${net.activation?.join(" ")}`);
                lines.push(`netconstants:${entry.atom}:${net.value}:fingerprintmap:\n${net?.fingerprintmap?.join(" ")}`);
                if (net.order) {
                    lines.push(`netconstants:${entry.atom}:${net.value}:order:\n${net.order}`);
                }
            }
        }

        const scriptContent = lines.join("\n");
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const scriptsDir = path.join(__dirname, "scripts");
        const filename = `generatescripts_${Date.now()}.nn`;
        const filepath = path.join(scriptsDir, filename);

        if (!fs.existsSync(scriptsDir)) {
            fs.mkdirSync(scriptsDir);
        }

        await fs.promises.writeFile(filepath, scriptContent);
        res.status(200).json({ filename });

    } catch (error) {
        console.log('Error in GenerateScripts:', error);
        res.status(400).json({ error });
    }
};

export const DownloadScript = async (req, res) => {
    try {
        const { filename } = req.params;
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename); 
        const filepath = path.join(__dirname, "scripts", filename);

        if (!fs.existsSync(filepath)) {
            return res.status(404).json({ error: "File not found" });
        }

        res.download(filepath, filename); 
    } catch (error) {
        console.error('Error in DownloadScript:', error);
        res.status(500).json({ error: "Failed to download script" });
    }
};

