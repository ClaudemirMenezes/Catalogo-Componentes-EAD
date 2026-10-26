export default (hex) => {
    let rgb = null, r = null, g = null, b = null;
    
    rgb = /^#?([a-fA-F\d]{2})([a-fA-F\d]{2})([a-fA-F\d]{2})$/.exec(hex);

    r = parseInt(rgb[1], 16)
    g = parseInt(rgb[2], 16)
    b = parseInt(rgb[3], 16)

    return { r, g, b }
}