function run() {
  console.log('run() -> Executando script');
  calcular();
}

// Busca a linha das assinaturas na tabela
function calcular() {

  // Obtendo o nome do usuário
  let nome = $('h4').text().split(' ')[0];
  
  // Adicionando header da média final
  $('.table-striped > thead > tr').append('<th width="6%" style="font-size:14px; text-align:center"><strong>MF</strong></th>');

  // Calculando e adicionando as medias
  $('.table-striped > tbody > tr > td:last-child').each(function () {
    
    
    let ministradas = $(this).prev().prev().prev().text();
    let presencas = $(this).prev().prev().text();
    let n1 = $(this).prev().text();
    let n2 = $(this).text();

    console.log(parseInt(presencas) / parseInt(ministradas) * 100 );

    let minN2 = 0.0;
    if (isNaN(parseFloat(n2))) {
      minN2 = (0.4 * parseFloat(n1) - 6) / 0.6 * -1;
      $(this).text(`min. ${minN2.toFixed(2)}`);
      $(this).attr('style', 'color: #ff0000; font-weight: bold; font-size:12px');
    }

    n1 = !isNaN(parseFloat(n1)) ? parseFloat(n1) : 0.0;
    n2 = !isNaN(parseFloat(n2)) ? parseFloat(n2) : 0.0;

    media = 0.4 * n1 + 0.6 * n2;

    let color;
    if ( media < 6 ) {
      color = '#ff0000';
    } else {
      color = '##000000';
    }
    $(this).parent().append(`<td style="font-size:12px; font-weight: bold; color: ${color}" align="center" >${media.toFixed(2)}</td>`);
  });

  
  /* const audioString = createAudio(nome, 'Você passou!');
  $('.table-striped').append( audioString );
  let audio = document.getElementById("au");
  audio.play(); */


  /* $('.table-striped > tbody > tr:last-child').each(function(){
    var logo = `<img src="${ link }" class="signature1" style="max-height: 180px; max-width: 420px; margin-bottom: -20; ">`;
    var assinaturaCliente = `<img src="${ linkAssinatura }" class="signature2" style="max-height: 180px; max-width: 420px; margin-bottom: -20; opacity: 0">`;
    $(this).children().first().prepend(logo);
    //$(this).children().not(':first').prepend(assinaturaCliente);
  }); */
}

function createAudio( nome, resultado ) {
  console.log('createAudio()');
  let fraseCompleta = `Olá, ${nome}! ${resultado}`;
  let fraseResultado = resultado.split(' ').join('-');

  return `<audio id="au" preload="auto" src="https://translate.google.com.vn/translate_tts?ie=UTF-8&q=${fraseCompleta}&tl=pt&client=tw-ob"></audio>`
}


function clearSignatures() {
  $('.table-striped').each(function(){
    $(this).remove();
  });
}