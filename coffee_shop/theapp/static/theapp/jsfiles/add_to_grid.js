function edit_display_menu(){
    // show and hide product display 
    $( "#edit_icon" ).click(function() {   
        if($('#add_to_grid:visible').length)
            $('#add_to_grid').hide();
        else
            $('#add_to_grid').show();        
    });

    // select product to add to the grid

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    var csrftoken = $.cookie('csrftoken');

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

    let check_boxes=document.querySelectorAll('.checkbox')
    let rows=document.querySelectorAll('.product_rows');
        
    check_boxes.forEach(checkbox => {
        checkbox.addEventListener('click',function(){
            if(checkbox.checked){
                // color checked row
                let row=checkbox.parentElement.parentElement
                row.style.backgroundColor='green'
                // add product_id to json file
                let product_id=row.firstChild.nextSibling.textContent
                data={
                    "id": product_id,
                }
                
                $.ajax({
                        type: "PUT",
                        url: "http://127.0.0.1:8000/select/",
                        data: data,
                    });
            }
            else if(!(checkbox.checked)){
                checkbox.parentElement.parentElement.style.backgroundColor='white'
            }
        })
    });   
}
edit_display_menu()

async function get_data(){
    let container=document.getElementById('product_grid');
    const url="http://127.0.0.1:8000/select/";

    const response = await fetch(url);
    let data = await response.json();

    // let object=JSON.parse(data)
    for (let i in data){
        let item_container=document.createElement('div');
        let p_img=document.createElement('img');
        let p_name=document.createElement('span')
        item_container.id='item'+data[i].pk
        item_container.className='item'

        p_img.src='static/theapp/images/Black-coffee.jpg'
        p_name.textContent=data[i].fields.name

        item_container.appendChild(p_img)
        item_container.appendChild(p_name)
        container.appendChild(item_container)
    }
    }
get_data()
    
