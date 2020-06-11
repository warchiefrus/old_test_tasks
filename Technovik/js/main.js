'use strict'

let newElem = null
let oldElem = null
let phonesArray = []

$(document).ready(function() {
  serverQuery('getRows', '')
  $(".btn1").on('click', () => {
    oldElem = null
    $("#nameInput").val('')
    $("#phoneInput").val('')
    $("#modalForm").show()
    $("#nameInput").focus()
  })

  $("#formConfirm").on('click', () => {
    delConfirm()
    $("#modalConfirm").hide()
  })

  $("#formCancel").on('click', () => {
    newElem = null
    $("#modalConfirm").hide()
  })

  $("#formClose").on('click', () => {
    $("#modalForm").hide()
    oldElem = null
  })

  $("#formSave").on('click', () => {
    $("#modalForm").hide()
    if (oldElem) {
      newElem = {name: $('#nameInput').val().slice(0,45), phone: $('#phoneInput').val().slice(0,45), id: oldElem.id}
      serverQuery('updateRow', newElem)
    } else {
      newElem = {name: $('#nameInput').val().slice(0,45), phone: $('#phoneInput').val().slice(0,45)}
      serverQuery('addRow', newElem)
    }
    $(`#modalForm`).hide()
  })

  $("#nameInput").on('keydown', function (e) {
    if ((e.which === 9 && e.shiftKey)) {
        e.preventDefault();
        $("#formClose").focus();
    }
  });

  $("#formClose").on('keydown', function (e) {
    if ((e.which === 9 && !e.shiftKey)) {
        e.preventDefault();
        $("#nameInput").focus();
    }
  });

  $("#formConfirm").on('keydown', function (e) {
    if ((e.which === 9 && e.shiftKey)) {
        e.preventDefault();
        $("#formCancel").focus();
    }
  });

  $("#formCancel").on('keydown', function (e) {
    if ((e.which === 9 && !e.shiftKey)) {
        e.preventDefault();
        $("#formConfirm").focus();
    }
  });
});

const serverQuery = (action, data) => {
  let dataToSend = JSON.stringify(data)
  let url = 'POST_DATA.php'
  $.post(url, {'action': action, 'data': dataToSend}, dataLoaded);
}

const dataLoaded = (data) => {
  if (data != '') {
    data = JSON.parse(data)
    switch(data.action){
      case 'addRow':
        newElem.id = data.id
        addRow()
        break;
      case 'updateRow':
        updateRow()
        break  
      case 'delRow':
        delRow()
        break             
      case 'getRows':
        phonesArray = []
        phonesArray = [...data.data]
        break;
      default:
        break;
    }
    drawTable()
  } 
}

const addRow = () => {
  phonesArray.push(newElem)
  newElem = null
}

const updateRow = () => {
  Object.assign(oldElem, newElem)
  newElem = null
  oldElem = null
}

const delRow = () => {
  phonesArray.splice(phonesArray.indexOf(newElem), 1)
  newElem = null
}

const drawTable = () => {
  let table = 'phonesTableBody';
  
  $(`#${table}`).html(function(index, html){
    return html = '';
  });
  let id = 0;
  phonesArray.forEach(row => {
    row.tableId = `row_${id}`;
    $(`#${table}`).append(`<tr id="row_${id}" data-index="${id}"></tr>`);
      $(`#row_${id}`).append(`<td class="rd">${row.name}</td>`);
      $(`#row_${id}`).append(`<td class="rd">${row.phone}</td>`);
      $(`#row_${id}`).append(`<td class="td-center"><button class="btn2">-</button></td>`);

    rowAddEvents(`row_${id}`);
    id++;
  });

}

const rowAddEvents = (tr) => {
  $(`#${tr}`).find('td.rd').on('click', function() {
    editRow( $(this).parent('tr').attr('data-index') )
  });
  $(`#${tr}`).find('td').find('button').on('click', function(event) {
    let index = $(this).parent('td').parent('tr').attr('data-index')
    event.stopPropagation();
    newElem = phonesArray[index]
    $("#modalConfirm").show()
    $("#formConfirm").focus()
  });
}

const delConfirm = (index) => {
  serverQuery('delRow', newElem)
}

const editRow = (index) => {
  oldElem = phonesArray[index]
  $("#nameInput").val(oldElem.name)
  $("#phoneInput").val(oldElem.phone)
  $("#modalForm").show()
  $("#nameInput").focus()
}


