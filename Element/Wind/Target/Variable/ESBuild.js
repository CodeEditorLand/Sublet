var i={color:!0,format:"esm",logLevel:"debug",metafile:!0,minify:!0,outdir:"Target",platform:"node",target:"esnext",tsconfig:"tsconfig.json",write:!0,plugins:[{name:"Target",setup({onStart:e,initialOptions:{outdir:t}}){e(async()=>{try{t&&await(await import("fs/promises")).rm(t,{recursive:!0})}catch(o){console.log(o)}})}},(await import("esbuild-plugin-copy")).copy({resolveFrom:"out",assets:[{from:["./Source/Script/Monaco/Theme/*.json"],to:["./Script/Monaco/Theme/"]},{from:["./Source/Stylesheet/**/*.scss"],to:["./Stylesheet/"]}]}),(await import("esbuild-plugin-solid")).solidPlugin()]};export{i as default};
