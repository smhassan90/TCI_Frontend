
$('#btnAddCoachee').click(function(){
    var selectedOption = $('#inpCoachingLogcoachId  option:selected').text();
    var selectedId = $('#inpCoachingLogcoachId  option:selected').val();

    var html = "<li id=\"item2\" href=\"#\" class=\"list-group-item\">"+selectedOption+"<i data-rowId='\"+selectedId+\"' class=\"fa fa-remove fa-2x pull-right btnDelCoachee\" style=\"color: red;\"></i>\t" +
        "</li>";
    $('#coacheeList').append(html);
    /*
    selectedOption = selectedOption.split("-");
    var joiningcolumnvalue1 = $('#inpCoachingLogcoachId').attr('data-joiningcolumnvalue1');
    joiningcolumnvalue1 = joiningcolumnvalue1.split("&");
    var tableData ={};
    for(var i=0; i<joiningcolumnvalue1.length; i++){
        tableData[joiningcolumnvalue1[i]] = selectedOption[i];
    }
    */
});