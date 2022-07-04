function equalizacaoDeHistograma(matrix, width) {
    let valorMinimo = 9999999999;
    const contaPixel = [];
    const cumulativo = [];
    const novoPixelImagem = [];

    for (let i = 0; i < 256; i++) {
        contaPixel[i] = 0;
        cumulativo[i] = 0;
    }

    for (let i = 0; i < matrix.length; i += 4) {
        contaPixel[matrix[i]]++;
    }

    for (let i = 0; i < contaPixel.length; i++) {
        if (i === 0) {
            cumulativo[i] = contaPixel[i];
            continue;
        }

        cumulativo[i] = cumulativo[i - 1] + contaPixel[i];
    }

    valorMinimo = cumulativo[0];

    for (let i = 0; i < matrix.length; i += 4) {
        const primeiraDivisao = cumulativo[matrix[i]] - valorMinimo;
        const tamanhoDoQuadrado = width * width;
        const segundaDivisao = tamanhoDoQuadrado - valorMinimo;

        const resultado = Math.floor((primeiraDivisao / segundaDivisao) * 255);
        novoPixelImagem[i] = resultado;
        novoPixelImagem[i + 1] = resultado;
        novoPixelImagem[i + 2] = resultado;
        novoPixelImagem[i + 3] = 255;
    }

    return [novoPixelImagem, contaPixel];
}