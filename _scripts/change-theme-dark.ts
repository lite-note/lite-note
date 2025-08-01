#!/usr/bin/env node

// Script pour changer facilement le thème sombre de l'application LiteNote
// Usage: pnpm run theme:dark [nom-du-theme]

import { readFileSync, writeFileSync } from "fs"
import { join } from "path"

// Chemins vers les fichiers
const themeConfigPath = join(__dirname, "..", "src", "theme.config.ts")

// Vérifier les arguments
if (process.argv.length < 3) {
  console.log("Usage: pnpm run theme:dark [nom-du-theme]")
  console.log("Exemple: pnpm run theme:dark business")
  process.exit(1)
}

// Mode fixé à dark pour ce script
const mode = "dark"
const newTheme = process.argv[2] // nom du nouveau thème

// Lire le contenu actuel du fichier de configuration
let themeConfigContent = readFileSync(themeConfigPath, "utf8")

// Remplacer la valeur du thème sombre
themeConfigContent = themeConfigContent.replace(
  /dark:\s*['"][^'"]*['"],/,
  `dark: '${newTheme}',`,
)

// Écrire le contenu mis à jour dans le fichier
writeFileSync(themeConfigPath, themeConfigContent)

console.log(`Thème ${mode} mis à jour avec succès vers: ${newTheme}`)
console.log("Redémarrez le serveur de développement si nécessaire")
