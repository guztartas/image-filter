function filtragemPorValorMaximo(matrix, width, tamanhoDoFiltro) {
    const linhaSeparada = separarMatrixEmDuasLinhas(matrix, width);
    const linhaEchunkSeparados = separarChunkEmDoisPixels(linhaSeparada);
    const imagem = JSON.parse(JSON.stringify(linhaEchunkSeparados));
    const kernelSize = (tamanhoDoFiltro - 1) / 2;

    for (let i = kernelSize; i < linhaEchunkSeparados.length - kernelSize; i++) {
        for (let j = kernelSize; j < linhaEchunkSeparados[i].length - kernelSize; j++) {
            let totalPixelSoma = [
                [],
                [],
                [],
                []
            ];

            for (let l = i - kernelSize; l <= i + kernelSize; l++) {
                for (let m = j - kernelSize; m <= j + kernelSize; m++) {
                    if (l == i && m == j) {
                        continue;
                    } else {
                        totalPixelSoma[0].push(linhaEchunkSeparados[l][m][0]);
                        totalPixelSoma[1].push(linhaEchunkSeparados[l][m][1]);
                        totalPixelSoma[2].push(linhaEchunkSeparados[l][m][2]);
                    }
                }
            }

            imagem[i][j][0] = Math.max(...totalPixelSoma[0]);
            imagem[i][j][1] = Math.max(...totalPixelSoma[1]);
            imagem[i][j][2] = Math.max(...totalPixelSoma[2]);
            imagem[i][j][3] = 255;
        }
    }

    return flattenV2(imagem);
}