let data = new Date();
document.getElementById('anoAtual').innerHTML = data.getFullYear();

// Integração com API - GET Ice Creams
const getIceCreams = async () => {
    let payload = {
        method: 'GET',
        url: 'https://api-sorveteria.herokuapp.com/api/icecreams'
    }

    try {
        let { data } = await axios(payload);
        return data;
    } catch (err) {
        return err;
    }
}

// Função que insere os picolés na página
const insertPopsicles = (popsicle, element) => {
    if (popsicle.quantity > 0) {
        // Criando div do picolé
        let divPopsicle = document.createElement('div');
        divPopsicle.classList.add('picole');

        // Criando section que ficará apenas a foto
        let sectionPhotoIceCream = document.createElement('section');
        sectionPhotoIceCream.classList.add('area-foto-picole');

        // Criando e colocando a imagem na section de cima
        let imgIceCream = document.createElement('img');
        imgIceCream.setAttribute('src', popsicle.url);
        imgIceCream.setAttribute('referrerpolicy', 'no-referrer');
        imgIceCream.setAttribute('alt', popsicle.description);
        sectionPhotoIceCream.appendChild(imgIceCream);

        // Colocando a section da foto na div picolé
        divPopsicle.appendChild(sectionPhotoIceCream);

        // Criando a section que fica as infs do picolé
        let sectionInfPopsicle = document.createElement('section');
        sectionInfPopsicle.classList.add('infos-picole');

        // Criando div que ficará o sabor e o valor
        let divFlavorAndValue = document.createElement('div');

        // Sabor
        let titleFlavor = document.createElement('h3');
        titleFlavor.innerHTML = popsicle.flavor;

        // Valor
        let valuePopsicle = document.createElement('p');
        valuePopsicle.classList.add('valor');
        valuePopsicle.innerHTML = `R$ ${popsicle.value}`;

        // Colocando sabor e valor na div
        divFlavorAndValue.appendChild(titleFlavor);
        divFlavorAndValue.appendChild(valuePopsicle);

        // Criando div que ficará descrição e quantidade do sorvete
        let divDescAndQuantity = document.createElement('div');

        // Criando os parágrafos que ficará a descrição
        let descPopsicle = document.createElement('p');
        descPopsicle.classList.add('desc');
        descPopsicle.innerHTML = popsicle.description;

        // Criando o parágrafo que ficará a quantidade
        let quantityPopsicle = document.createElement('p');
        quantityPopsicle.classList.add('qntd');

        let spanSmall = document.createElement('span');
        spanSmall.classList.add('pequeno');
        spanSmall.innerHTML = 'Qntd:';

        let spanBig = document.createElement('span');
        spanBig.classList.add('grande');
        spanBig.innerHTML = 'Quantidade:';

        let quantity = document.createElement('span');
        quantity.innerHTML = ' ' + popsicle.quantity;

        // Colocando span's que representam em dispositivos grandes e pequeno
        quantityPopsicle.appendChild(spanSmall);
        quantityPopsicle.appendChild(spanBig);
        quantityPopsicle.appendChild(quantity);

        divDescAndQuantity.appendChild(descPopsicle);
        divDescAndQuantity.appendChild(quantityPopsicle);

        // Colocando as div's na section de informações do picolé 
        sectionInfPopsicle.appendChild(divFlavorAndValue);
        sectionInfPopsicle.appendChild(divDescAndQuantity);

        divPopsicle.appendChild(sectionInfPopsicle);

        element.appendChild(divPopsicle);
    }
}

// Função que dispara em qual section é para ser inserido os picolés
const viewIceCreams = ({ creamies, fruits }) => {
    let creamiesSection = document.getElementById('cremosos');
    let fruitsSection = document.getElementById('frutas');

    creamies.map(creamy => {
        insertPopsicles(creamy, creamiesSection);
    });

    fruits.map(fruit => {
        insertPopsicles(fruit, fruitsSection);
    });
}

// Função principal
const main = async () => {
    let data = await getIceCreams();

    if (data.status == 200 && data.statusKey == 'RECORD_SUCCESS') {
        viewIceCreams(data.result);
    }
}

main();

// Código desenvolvido 04/03/2022