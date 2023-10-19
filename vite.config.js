import { defineConfig } from "vite";

export default defineConfig({
  base: "./", // Set the base path to the root
  build: {
    outDir: "dist", // Set the output directory relative to the base path
    rollupOptions: {
      input: {
        main: "src/index.html",
        birdsList: "src/birdsList/birdsList.html",
        birdsJournal: "src/birdsJournal/birdsJournal.html",
      },
    },
  },
});





