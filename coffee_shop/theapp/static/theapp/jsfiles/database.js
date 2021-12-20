function select_from_database_table(){
    // i want to select item from database table on click
    // i want to create a json file containing the infomation of the selected items
    // and send it to the backend to operate on it
    let rows=document.querySelectorAll('.product_rows');
    
    rows.forEach((row)=>{
        let edit=row.childNodes[row.childNodes.length-2];
        let del=row.childNodes[row.childNodes.length-4];
        
        let price_field_parent=row.childNodes[row.childNodes.length-6]
        let name_field_parent=row.childNodes[row.childNodes.length-8]
        
        let price_field=price_field_parent.childNodes
        let name_field=name_field_parent.childNodes

        
        let product_id=edit.className

        // submit changes button
        function submit_change(id,action){
            let submit_btn=document.getElementById('changes');
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
            if (action==="edit"){
                submit_btn.addEventListener('click',function(){
                    // retrieve new product info from form
                    let form=document.getElementById('input_products')
                    let array=Array.from(form);
                    let edit=array.reduce((acc,input)=>(
                    [...acc,input.value]),[]);
                    
                    data={
                        "id": id,
                        "name":edit[1],
                        "price":edit[2],
                        "action":"edit"
                    }
                    // PUT METHODE

                    $.ajax({
                        type: "PUT",
                        url: "http://127.0.0.1:8000/database/",
                        data: data,
                        
                        success: function() {
                            window.location.reload();
                        }
                    }); 
                })
            }
            else if (action==='del'){
                submit_btn.addEventListener('click',function(){
                // DELETE METHODE
                    $.ajax({
                        type: "DELETE",
                        url: "http://127.0.0.1:8000/database/",
                        data: {
                        "id": product_id,
                        },
                    
                        success: function() {
                            window.location.reload();
                        }
                    });
                })
            }
        }
        // EDIT ICON EVENT
        edit.addEventListener('click',function(){
            // select edit_icon
            let selected_row=document.getElementById('row_'+product_id)
            selected_row.style.backgroundColor='#CBCACA';
            let submit_changes=document.getElementById('changes');
            submit_changes.style.display='block';

            // redirect user to product info input
            let edit_name=document.getElementById("product_name");
            edit_name.focus();
            let add_btn=document.getElementById('add_to_database');
            add_btn.style.display='none';
            add_btn.setAttribute('disabled',true);
            submit_change(product_id,'edit');
        })
        // DELETE ICON EVENT
        del.addEventListener('click',function(){
            let selected_row=document.getElementById('row_'+product_id)
            selected_row.style.backgroundColor='#CBCACA';
            
            let submit_changes=document.getElementById('changes');
            submit_changes.style.display='block';

            submit_change(product_id,'del')
        })
    }) 
}
select_from_database_table()