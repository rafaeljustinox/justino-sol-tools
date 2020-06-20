$(function(){

  $('#calculate').on('click', function(){
    chrome.tabs.query({ active: true, currentWindow: true }, function( tabs ) {

      var tab = tabs[ 0 ].id;

      // Adiciona a biblioteca do jQuery
      chrome.tabs.executeScript( tab, {
        code: "var jscript = document.createElement( 'script' );" +
              "jscript.setAttribute( 'src', 'https://code.jquery.com/jquery-3.4.1.min.js' );" +
              "document.head.appendChild( jscript );" +
              "console.log('Jquery carregado');"
      });

      // Adiciona os scripts no documento HTML 
      chrome.tabs.executeScript( tab, {
        file: 'script.js'
      });

      // Executa o script
      chrome.tabs.executeScript( tab, {
        code: "run()",
      });
  
    });

  });

})