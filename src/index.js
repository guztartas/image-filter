google.charts.load("current", {
    packages: ["corechart"]
});

function desenharGrafico(values, titulo, divId) {
    const data = google.visualization.arrayToDataTable([
        ["Pixel Value", "Quantity"],
        ...values
    ]);

    const options = {
        titulo,
        legenda: {
            posicao: "none"
        },
    };

    const chart = new google.visualization.ColumnChart(
        document.getElementById(divId)
    );
    chart.draw(data, options);
}

const resolveUnderflow = img =>
    img.map(pixel => (pixel < 0 ? 0 : pixel));
const resolveUnderflowUnit = pixel => pixel < 1 ? 1 : pixel;

function getImageData(inputId, imgId) {
    return new Promise((resolve, reject) => {
        const input = document.getElementById(inputId);
        const img = document.getElementById(imgId);
        img.src = URL.createObjectURL(input.files[0]);
        const imgObj = new Image();

        setTimeout(() => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const context = canvas.getContext("2d");
            context.drawImage(img, 0, 0);
            const data = context.getImageData(0, 0, img.width, img.height);

            return resolve({
                imgData: data.data,
                width: img.width,
                height: img.height,
            });
        }, 200);
    });
}

const transformTodesenharGrafico = (arr) => arr.map((item, idx) => [idx, item]);

function draw(img, texto, larguraImagem, alturaImagem) {
    const wrapper = document.createElement("div");
    const label = document.createElement("p");
    label.innerText = texto;

    wrapper.appendChild(label);
    const canvas = document.createElement("canvas");
    canvas.width = larguraImagem;
    canvas.height = alturaImagem;
    const context = canvas.getContext("2d");
    const typedArray = new Uint8ClampedArray(img.length);
    for (let i = 0; i < img.length - 4; i += 4) {
        typedArray[i] = img[i];
        typedArray[i + 1] = img[i + 1];
        typedArray[i + 2] = img[i + 2];
        typedArray[i + 3] = 255;
    }

    const imgData = new ImageData(typedArray, larguraImagem, alturaImagem);
    context.putImageData(imgData, 0, 0);

    wrapper.appendChild(canvas);
    document.getElementById("canvas-wrapper").appendChild(wrapper);
}

async function iniciarEqualizacaoDeHistograma() {
    const [dados1, dados2] = await Promise.all([getImageData("file1", "img1")]);
    const [equalizacaoDeHistogramaresultado, oldDistribution] = equalizacaoDeHistograma(dados1.imgData, dados1.width);
    const [, newDistribution] = equalizacaoDeHistograma(equalizacaoDeHistogramaresultado, dados1.width);
    const valoresAntigosGrafico = transformTodesenharGrafico(oldDistribution);
    const valoresNovosGrafico = transformTodesenharGrafico(newDistribution);
    desenharGrafico(valoresAntigosGrafico, 'Pixel distribution (before)', 'before_distribution');
    desenharGrafico(valoresNovosGrafico, 'Pixel distribution (after)', 'after_distribution');
    draw(equalizacaoDeHistogramaresultado, "Equalização de Histograma", dados1.width, dados1.width);
}

async function iniciarFiltragemPorMediana() {
    const tamanhoDoFiltro = parseInt(document.getElementById('filter-size').value);
    const [dados1, dados2] = await Promise.all([getImageData("file1", "img1")]);
    const valoresDaImagem = filtragemPorMedia(dados1.imgData, dados1.width, tamanhoDoFiltro);
    draw(valoresDaImagem, "Filtragem por Média", dados1.width, dados1.width);
}

async function iniciarFiltroPorValorMinimo() {
    const tamanhoDoFiltro = parseInt(document.getElementById('filter-size').value);
    const [dados1, dados2] = await Promise.all([getImageData("file1", "img1")]);
    const valoresDaImagem = minimumFilter(dados1.imgData, dados1.width, tamanhoDoFiltro);
    draw(valoresDaImagem, "Filtragem por Valor Mínimo", dados1.width, dados1.width);
}


async function iniciarFiltragemPorValorMaximo() {
    const tamanhoDoFiltro = parseInt(document.getElementById('filter-size').value);
    const [dados1, dados2] = await Promise.all([getImageData("file1", "img1")]);
    const valoresDaImagem = filtragemPorValorMaximo(dados1.imgData, dados1.width, tamanhoDoFiltro);
    draw(valoresDaImagem, "Filtragem por Valor Máximo", dados1.width, dados1.width);
}

async function iniciarFiltragemPorMedianana() {
    const tamanhoDoFiltro = parseInt(document.getElementById('filter-size').value);

    const [dados1, dados2] = await Promise.all([getImageData("file1", "img1")]);
    const valoresDaImagem = filtragemPorMediana(dados1.imgData, dados1.width, tamanhoDoFiltro);
    draw(valoresDaImagem, "Filtragem por Mediana", dados1.width, dados1.width);
}

async function iniciarFiltroPorOrdem() {
    const tamanhoDoFiltro = parseInt(document.getElementById('filter-size').value);

    const [dados1, dados2] = await Promise.all([getImageData("file1", "img1")]);
    const valorOrdem = document.getElementById('order').value;
    let orderVal = 1;
    if (valorOrdem) {
        orderVal = parseInt(valorOrdem);
    }

    const valoresDaImagem = filtragemPorOrdem(dados1.imgData, dados1.width, orderVal, tamanhoDoFiltro);
    draw(valoresDaImagem, "Filtragem por Ordem", dados1.width, dados1.width);
}

async function iniciarFiltragemDeSuavizacaoConservativaFilter() {
    const tamanhoDoFiltro = parseInt(document.getElementById('filter-size').value);

    const [dados1, dados2] = await Promise.all([getImageData("file1", "img1")]);
    const valoresDaImagem = filtragemDeSuavizacaoConservativa(dados1.imgData, dados1.width, tamanhoDoFiltro);
    draw(valoresDaImagem, "Filtragem de Suavização Conservativa", dados1.width, dados1.width);
}

async function iniciarFiltroDeGaussiana() {
    const tamanhoDoFiltro = parseInt(document.getElementById('filter-size').value);
    const [dados1, dados2] = await Promise.all([getImageData("file1", "img1")]);
    const valoresDaImagem = filtragemGaussiana(dados1.imgData, dados1.width, tamanhoDoFiltro);
    draw(valoresDaImagem, "Filtragem Gaussiana", dados1.width, dados1.width);
}

async function filtrar() {
    iniciarFiltroDeGaussiana();
    iniciarFiltroPorValorMinimo();
    iniciarFiltragemDeSuavizacaoConservativaFilter();
    iniciarFiltroPorOrdem();
    iniciarFiltragemPorMedianana();
    iniciarFiltragemPorValorMaximo();
    iniciarEqualizacaoDeHistograma();
    iniciarFiltragemPorMediana();
}