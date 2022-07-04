function filtragemPorMediana(matrix, width, tamanhoDoFiltro = 3) {
    const linhaSeparada = separarMatrixEmDuasLinhas(matrix, width);
    const linhaEchunkSeparados = separarChunkEmDoisPixels(linhaSeparada);
    const imagem = JSON.parse(JSON.stringify(linhaEchunkSeparados));
    const kernelSize = (tamanhoDoFiltro - 1) / 2;

    for (let i = kernelSize; i < linhaEchunkSeparados.length - kernelSize; i++) {
        for (let j = kernelSize; j < linhaEchunkSeparados[i].length - kernelSize; j++) {
            let media = [
                [],
                [],
                [],
                []
            ];
            for (let l = i - kernelSize; l <= i + kernelSize; l++) {
                for (let m = j - kernelSize; m <= j + kernelSize; m++) {
                    linhaEchunkSeparados[l][m].forEach((pixelVal, idx) => {
                        media[idx].push(pixelVal);
                    });
                }
            }

            media.forEach(arr => arr.sort());
            imagem[i][j][0] = media[0][Math.floor(media[0].length / 2)];
            imagem[i][j][1] = media[1][Math.floor(media[1].length / 2)];
            imagem[i][j][2] = media[2][Math.floor(media[2].length / 2)];
            imagem[i][j][3] = 255;
        }
    }

    return flattenV2(imagem);
}