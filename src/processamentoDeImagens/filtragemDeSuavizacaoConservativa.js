function filtragemDeSuavizacaoConservativa(matrix, width, tamanhoDoFiltro) {
    const linhaSeparada = separarMatrixEmDuasLinhas(matrix, width);
    const linhaEchunkSeparados = separarChunkEmDoisPixels(linhaSeparada);
    const kernelSize = (tamanhoDoFiltro - 1) / 2;
    const imagem = JSON.parse(JSON.stringify(linhaEchunkSeparados));

    for (let i = kernelSize; i < linhaEchunkSeparados.length - kernelSize; i++) {
        for (let j = kernelSize; j < linhaEchunkSeparados[i].length - kernelSize; j++) {
            let valorMaximo = [0, 0, 0, 0];
            let valorMinimo = [256, 256, 256, 256];

            for (let l = i - kernelSize; l <= i + kernelSize; l++) {
                for (let m = j - kernelSize; m <= j + kernelSize; m++) {
                    if (linhaEchunkSeparados[l] && linhaEchunkSeparados[l][m] && !(i === l && j === m)) {
                        linhaEchunkSeparados[l][m].forEach((pixelVal, idx) => {
                            if (valorMaximo[idx] < pixelVal) {
                                valorMaximo[idx] = pixelVal;
                            }

                            if (valorMinimo[idx] > pixelVal) {
                                valorMinimo[idx] = pixelVal;
                            }
                        });
                    }
                }
            }

            linhaEchunkSeparados[i][j].forEach((pixelVal, idx) => {
                if (pixelVal > valorMaximo[idx]) {
                    imagem[i][j][idx] = valorMaximo[idx];
                }

                if (pixelVal < valorMinimo[idx]) {
                    imagem[i][j][idx] = valorMinimo[idx];
                }
            });

            imagem[i][j][3] = 255;
        }
    }

    return flattenV2(linhaEchunkSeparados);
}