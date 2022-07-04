const kernelMapping = {
    '3': 1,
    '5': 2,
    '7': 3
}

function filtragemPorMedia(matrix, width, tamanhoDoFiltro = 3) {
    const linhaSeparada = separarMatrixEmDuasLinhas(matrix, width);
    const linhaEchunkSeparados = separarChunkEmDoisPixels(linhaSeparada);
    const imagem = JSON.parse(JSON.stringify(linhaEchunkSeparados));
    const kernelSize = (tamanhoDoFiltro - 1) / 2;
    const totalcontaPixel = tamanhoDoFiltro * tamanhoDoFiltro;

    for (let i = kernelSize; i < linhaEchunkSeparados.length - kernelSize; i++) {
        for (let j = kernelSize; j < linhaEchunkSeparados[i].length - kernelSize; j++) {
            let totalPixelSoma = [0, 0, 0, 0];

            for (let l = i - kernelSize; l <= i + kernelSize; l++) {
                for (let m = j - kernelSize; m <= j + kernelSize; m++) {
                    totalPixelSoma[0] += linhaEchunkSeparados[l][m][0];
                    totalPixelSoma[1] += linhaEchunkSeparados[l][m][1];
                    totalPixelSoma[2] += linhaEchunkSeparados[l][m][2];
                }
            }

            imagem[i][j][0] = totalPixelSoma[0] / totalcontaPixel;
            imagem[i][j][1] = totalPixelSoma[1] / totalcontaPixel;
            imagem[i][j][2] = totalPixelSoma[2] / totalcontaPixel;
            imagem[i][j][3] = 255;
        }
    }

    return flattenV2(imagem);
}