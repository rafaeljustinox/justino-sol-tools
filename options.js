// Salva as opções do usuário no chrome.storage
function save() {

  var signatureLink = $('#signatureImage').attr('src');
  var totvsLogo = $('#checkLogo').prop('checked');
  var deleteHash = $('#deleteHashId').val();

  console.log('Salvando configurações');
  console.log(`totvsLogo -> ${totvsLogo}`);
  console.log(`signatureLink -> ${signatureLink}`);
  console.log(`deleteHash -> ${deleteHash}`);

  chrome.storage.sync.set({
    signatureLink,
    totvsLogo,
    deleteHash
  }, function () {

    $('#status').text('Configurações salvas!');
    setTimeout(function () {
      $('#status').text('Clique em "Salvar" para armazenar suas preferências');
      window.close();
    }, 750);
  });
}

// Restaura as configurações do usuário
function restore() {
  chrome.storage.sync.get({
    signatureLink: '',
    totvsLogo: false,
    deleteHash: ''
  }, function (items) {

    console.log('Restaurando');
    console.log(items);

    if (  items.signatureLink != '' && items.signatureLink != '#' ) {
      $('#signatureImage').attr('src', items.signatureLink );
      $('#signature-container').show();
      $('#deleteHashId').val( items.deleteHash );
      $('#add').text('Substituir assinatura');
    } else {
      $('#signature-container').hide();
      $('#add').text('Selecionar assinatura');
    }

    $('#checkLogo').attr('checked', items.totvsLogo );

  });
}

function uploadImage( file ) {
  // Replace ctrlq with your own API key
  var apiUrl = 'https://api.imgur.com/3/image';
  var apiKey = '89e1de23156985c';

  var formData = new FormData();
  formData.append("image", file);

  var settings = {
      "async": true,
      "crossDomain": true,
      "url": apiUrl,
      "method": "POST",
      "datatype": "json",
      "headers": {
        "Authorization": "Client-ID " + apiKey
      },
      "processData": false,
      "contentType": false,
      "data": formData,
      beforeSend: function (xhr) {
        console.log("Uploading");
      },
      success: function (res) {
        var link = res.data.link;
        var deleteHash = res.data.deletehash;

        console.log(res.data);

        $('#deleteHashId').val( deleteHash );
        $('#signatureImage').attr('src', link );
        $('#signature-container').show();
        $('#add').text('Substituir assinatura');
      },
      error: function () {
        setTimeout(function () {
          $('#status').text('Erro ao fazer upload da imagem. Tente novamente');
        }, 5000);
      }
  }
  $.ajax(settings).done(function (response) {
    console.log("Done");
    console.log( response );
  });
}

function deleteImage() {

  var id = $('#deleteHashId').val();

  if ( id ) {

    var apiUrl = `https://api.imgur.com/3/image/${id}`;
    var apiKey = '89e1de23156985c';
  
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": apiUrl,
        "method": "DELETE",
        "datatype": "json",
        "headers": {
          "Authorization": "Client-ID " + apiKey
        },
        "processData": false,
        "contentType": false,
        beforeSend: function (xhr) {
          console.log("Excluindo assinatura");
        },
        success: function (res) {  
          clearImage();
          save();
        },
        error: function () {
          setTimeout(function () {
            $('#status').text('Erro excluir assinatura. Tente novamente');
          }, 5000);
        }
    }
    $.ajax(settings).done(function (response) {
      console.log("Done");
      console.log( response );
    });

  } else {
    console.log('Nenhuma imagem para ser excluída');
  }

}

function clearImage() {

  var link = $('#signatureImage').attr('src');
  console.log('Deletando link: ' + link);
  $('#signatureImage').attr('src', '#' );
  console.log( $('#signatureImage').attr('src') )
  $('#deleteHashId').val('');
  $('#signature-container').hide();
  $('#nosignature-container').show();
  $('#add').text('Selecionar assinatura');
}

function setImage( dados ) {

  var { signatureLink, deleteHash } = dados;

  $('#signatureImage').attr('src', signatureLink );
  $('#deleteHashId').val( deleteHash );
  $('#signature-container').show();
  $('#nosignature-container').hide();
  $('#add').text('Substituir assinatura');
}

$(function() {
  restore();

  $('input[type=file]').on("change", function() {
    console.log('Arquivo selecionado');

    var $files = $(this).get(0).files;

    if ( $files.length ) {
      if ($files[0].size > $(this).data("max-size") * 1024) {
        console.log("Por favor, selecione um arquivo menor");
        return false;
      }
      uploadImage( $files[0] );
    }

  });

  $('#save').on('click', function() {
    save();
  });

  $('#add').on('click', function() {
    $('#inputSignature').click();
  })

});