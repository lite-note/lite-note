#!/usr/bin/env node

// Script pour changer facilement le thème clair de l'application LiteNote
// Usage: pnpm run theme:light [nom-du-theme]

import { readFileSync, writeFileSync } from "fs"
import { join } from "path"

// Chemins vers les fichiers
const themeConfigPath = join(__dirname, "..", "src", "theme.config.ts")
const indexPath = join(__dirname, "..", "index.html")

// Vérifier les arguments
if (process.argv.length < 3) {
  console.log("Usage: pnpm run theme:light [nom-du-theme]")
  console.log("Exemple: pnpm run theme:light cupcake")
  process.exit(1)
}

// Mode fixé à light pour ce script
const mode = "light"
const newTheme = process.argv[2] // nom du nouveau thème

// Lire le contenu actuel du fichier de configuration
let themeConfigContent = readFileSync(themeConfigPath, "utf8")

// Remplacer la valeur du thème clair
themeConfigContent = themeConfigContent.replace(
  /light:\s*['"][^'"]*['"],/,
  `light: '${newTheme}',`,
)

// Écrire le contenu mis à jour dans le fichier
writeFileSync(themeConfigPath, themeConfigContent)

// Mettre à jour également le fichier index.html
let indexContent = readFileSync(indexPath, "utf8")
indexContent = indexContent.replace(
  /data-theme="[^"]*"/,
  `data-theme="${newTheme}"`,
)
writeFileSync(indexPath, indexContent)

console.log(`Thème ${mode} mis à jour avec succès vers: ${newTheme}`)
console.log("Le fichier index.html a également été mis à jour.")
console.log("Redémarrez le serveur de développement si nécessaire")
