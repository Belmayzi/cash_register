"use strict";

function edit_display_menu() {
  // show and hide product display 
  $("#edit_icon").click(function () {
    if ($('#add_to_grid:visible').length) $('#add_to_grid').hide();else $('#add_to_grid').show();
  }); // select product to add to the grid

  function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
  }

  var csrftoken = $.cookie('csrftoken');
  $.ajaxSetup({
    beforeSend: function beforeSend(xhr, settings) {
      if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
      }
    }
  });
  var check_boxes = document.querySelectorAll('.checkbox');
  var rows = document.querySelectorAll('.product_rows');
  check_boxes.forEach(function (checkbox) {
    checkbox.addEventListener('click', function () {
      if (checkbox.checked) {
        // color checked row
        var row = checkbox.parentElement.parentElement;
        row.style.backgroundColor = 'green'; // add product_id to json file

        var product_id = row.firstChild.nextSibling.textContent;
        data = {
          "id": product_id
        };
        $.ajax({
          type: "PUT",
          url: "http://127.0.0.1:8000/select/",
          data: data
        });
      } else if (!checkbox.checked) {
        checkbox.parentElement.parentElement.style.backgroundColor = 'white';
      }
    });
  });
}

edit_display_menu();

function get_data() {
  var container, url, response, data, i, item_container, p_img, p_name;
  return regeneratorRuntime.async(function get_data$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          container = document.getElementById('product_grid');
          url = "http://127.0.0.1:8000/select/";
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch(url));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context.sent;

          // let object=JSON.parse(data)
          for (i in data) {
            item_container = document.createElement('div');
            p_img = document.createElement('img');
            p_name = document.createElement('span');
            item_container.id = 'item' + data[i].pk;
            item_container.className = 'item';
            p_img.src = 'static/theapp/images/Black-coffee.jpg';
            p_name.textContent = data[i].fields.name;
            item_container.appendChild(p_img);
            item_container.appendChild(p_name);
            container.appendChild(item_container);
          }

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}

get_data();