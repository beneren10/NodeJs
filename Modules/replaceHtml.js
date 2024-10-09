module.exports = function(template,product){
    let output = template.replace('{{%IMG%}}', product.img);
    output = output.replace('{{%NAME%}}', product.name);
    output = output.replace('{{%RELEASE%}}', product.releaseDate);
    output = output.replace('{{%ID%}}', product.id);
    output = output.replace('{{%COLOUR%}}', product.colour);
    output = output.replace('{{%CONTENT%}}',product.content);
    return output;
}

