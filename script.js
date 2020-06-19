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
    
    //let ministradas = $(this).prev().prev().prev().text();
    //let presencas = $(this).prev().prev().text();
    let n1 = $(this).prev().text();
    let n2 = $(this).text();

    if (n1 && n1 !== '-') {

      //console.log(parseInt(presencas) / parseInt(ministradas) * 100 );
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

    } else {
      $(this).text(`-`);
      $(this).prev().text('-');
      $(this).parent().append(`<td style="font-size:12px;" align="center" >-</td>`);
    }
    
  });

}