export default (r, g, b) => {
    r /= 255, g /= 255, b /= 255

    let cMax, cMin, h, s, l, d

    cMax = Math.max(r, g, b), cMin = Math.min(r, g, b)

    h, s, l = (cMax + cMin) / 2

    if (cMax == cMin) {
        return {
            h: 0,
            s: 0,
            l: Math.round(l * 100)
        }
    }

    d = cMax - cMin

    s = l > 0.5 ? d / (2 - cMax - cMin) : d / (cMax + cMin)

    if (cMax === r) h = (g - b) / d + (g < b ? 6 : 0);
    
    if (cMax === g) h = (b - r) / d + 2;
  
    if (cMax === b) h = (r - g) / d + 4;

    h /= 6, h *= 360

    s = Math.round(s * 100), l = Math.round(l * 100)

    return { h, s, l }
}