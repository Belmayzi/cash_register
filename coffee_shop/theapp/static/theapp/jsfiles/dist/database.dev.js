"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function select_from_database_table() {
  // i want to select item from database table on click
  // i want to create a json file containing the infomation of the selected items
  // and send it to the backend to operate on it
  var rows = document.querySelectorAll('.product_rows');
  rows.forEach(function (row) {
    var edit = row.childNodes[row.childNodes.length - 2];
    var del = row.childNodes[row.childNodes.length - 4];
    var price_field_parent = row.childNodes[row.childNodes.length - 6];
    var name_field_parent = row.childNodes[row.childNodes.length - 8];
    var price_field = price_field_parent.childNodes;
    var name_field = name_field_parent.childNodes;
    var product_id = edit.className; // submit changes button

    function submit_change(id, action) {
      var submit_btn = document.getElementById('changes');

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

      if (action === "edit") {
        submit_btn.addEventListener('click', function () {
          // retrieve new product info from form
          var form = document.getElementById('input_products');
          var array = Array.from(form);
          var edit = array.reduce(function (acc, input) {
            return [].concat(_toConsumableArray(acc), [input.value]);
          }, []);
          data = {
            "id": id,
            "name": edit[1],
            "price": edit[2],
            "action": "edit"
          }; // PUT METHODE

          $.ajax({
            type: "PUT",
            url: "http://127.0.0.1:8000/database/",
            data: data,
            success: function success() {
              window.location.reload();
            }
          });
        });
      } else if (action === 'del') {
        submit_btn.addEventListener('click', function () {
          // DELETE METHODE
          $.ajax({
            type: "DELETE",
            url: "http://127.0.0.1:8000/database/",
            data: {
              "id": product_id
            },
            success: function success() {
              window.location.reload();
            }
          });
        });
      }
    } // EDIT ICON EVENT


    edit.addEventListener('click', function () {
      // select edit_icon
      var selected_row = document.getElementById('row_' + product_id);
      selected_row.style.backgroundColor = '#CBCACA';
      var submit_changes = document.getElementById('changes');
      submit_changes.style.display = 'block'; // redirect user to product info input

      var edit_name = document.getElementById("product_name");
      edit_name.focus();
      var add_btn = document.getElementById('add_to_database');
      add_btn.style.display = 'none';
      add_btn.setAttribute('disabled', true);
      submit_change(product_id, 'edit');
    }); // DELETE ICON EVENT

    del.addEventListener('click', function () {
      var selected_row = document.getElementById('row_' + product_id);
      selected_row.style.backgroundColor = '#CBCACA';
      var submit_changes = document.getElementById('changes');
      submit_changes.style.display = 'block';
      submit_change(product_id, 'del');
    });
  });
}

select_from_database_table();