import lume from "lume/mod.ts";
import attributes from "lume/plugins/attributes.ts";
import sass from "lume/plugins/sass.ts";
import og_images from "lume/plugins/og_images.ts";
import inline from "lume/plugins/inline.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";


const site = lume({
  src: "./src",
  dest: "./dist"
});

site.use(attributes());
site.use(sass());
site.add("styles.scss"); //Add the entry point(s)
site.use(og_images());
site.use(slugifyUrls());
site.use(inline());
export default site;

