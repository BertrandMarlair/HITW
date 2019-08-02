export function slugify(text){
    if(text){
        return text.toString().toLowerCase()
            .replace(/é/g, "e")
            .replace(/è/g, "e")
            .replace(/à/g, "à")
            .replace(/\s+/g, '')            // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '')          // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '')             // Trim - from end of text
    }
}