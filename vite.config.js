import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  build: {
    outDir: "./dist",    
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        birdsList: resolve(__dirname, "src/birdsList/birdsList.html"),
        birdsJournal: resolve(__dirname, "src/birdsJournal/birdsJournal.html"),
      },
    },
  },
});
  
 