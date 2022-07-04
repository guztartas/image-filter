function filtragemGaussiana(matrix, width, tamanhoDoFiltro) {
    const linhaSeparada = separarMatrixEmDuasLinhas(matrix, width);
    const linhaEchunkSeparados = separarChunkEmDoisPixels(linhaSeparada);
    const imagem = JSON.parse(JSON.stringify(linhaEchunkSeparados));
    const kernelSize = (tamanhoDoFiltro - 1) / 2;
    const bias = 4;

    for (let i = kernelSize; i < linhaEchunkSeparados.length - kernelSize; i++) {
        for (let j = kernelSize; j < linhaEchunkSeparados[i].length - kernelSize; j++) {
            let totalPixelSoma = [0, 0, 0, 0];
            let div = 0;

            for (let l = i - kernelSize; l <= i + kernelSize; l++) {
                for (let m = j - kernelSize; m <= j + kernelSize; m++) {
                    const val = (1 / (2 * Math.PI * (bias * bias))) * Math.exp(-1 * ((l * l) * (m * m)) / (2 * bias * bias));
                    totalPixelSoma[0] += linhaEchunkSeparados[l][m][0] * val;
                    totalPixelSoma[1] += linhaEchunkSeparados[l][m][1] * val;
                    totalPixelSoma[2] += linhaEchunkSeparados[l][m][2] * val;
                    div += val;
                }
            }

            imagem[i][j][0] = Math.floor(totalPixelSoma[0] / div);
            imagem[i][j][1] = Math.floor(totalPixelSoma[1] / div);
            imagem[i][j][2] = Math.floor(totalPixelSoma[2] / div);
            imagem[i][j][3] = 255;
        }
    }

    return flattenV2(imagem);
}