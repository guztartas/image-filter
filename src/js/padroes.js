const flatten = arr => Array.isArray(arr[0]) ? flatten(arr.reduce((acc, curr) => acc = [...acc, ...curr], [])) : arr;
const flattenV2 = arr => {
    const resultado = [];
    arr.forEach(line => line.forEach(pixelChunk => pixelChunk.forEach(pixelVal => resultado.push(pixelVal))));

    return resultado;
}

function separarMatrixEmDuasLinhas(matrix, imgWidth) {
    const resultado = [];
    for (let i = 0; i < matrix.length; i += imgWidth * 4) {
        resultado.push(matrix.slice(i, i + imgWidth * 4));
    }

    return resultado;
}

function separarChunkEmDoisPixels(matrix) {
    return matrix.map(line => {
        const novaLinha = [];
        for (let i = 0; i < line.length; i += 4) {
            const pixelChunk = [line[i], line[i + 1], line[i + 2], line[i + 3]];
            novaLinha.push(pixelChunk);
        }

        return novaLinha;
    });
}