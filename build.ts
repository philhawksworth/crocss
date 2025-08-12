// generate a data object from all the crocs images
const imagesDir = `public/images/crocs`;
const crocs = [];
for await (const file of Deno.readDir(imagesDir)) {
  crocs.push({
    // make the name titlecase and replace - with space
    "name" : file.name.split(".jpg")[0].replace('-', ' ').replace(/\b\w/g, char => char.toUpperCase()),
    "slug" : file.name.split(".jpg")[0],  
    "url": imagesDir + "/" + file.name
  })
}

await Deno.writeTextFile("crocs.json", JSON.stringify(crocs, null, 2));
