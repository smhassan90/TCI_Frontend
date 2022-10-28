

$('#btnAddCoachee').click(function(){
    var selectedOption = $('#inpCoachingLogcoachId  option:selected').text();
    var selectedId = $('#inpCoachingLogcoachId  option:selected').val();
    var alreadyExist = false;
    $('#coacheeList li').each(function(i) {
        var id = $(this).attr('data-rowId');
        if($(this).attr('data-rowId')===selectedId){
            alreadyExist=true;
        }
    });
    if(!alreadyExist) {

        var html = "<li id='item" + selectedId + "' data-rowId='" + selectedId + "' href=\"#\" class=\"list-group-item \">" + selectedOption + "<i class=\"fa fa-remove fa-2x pull-right btnDelCoachee\" style=\"color: red;\"></i>\t" +
            "</li>";
        $('#coacheeList').append(html);
    }

});
$(document).on("click", ".btnDelCoachee", function() {
    $(this).parent().remove();

});
$('#btnAddCoachingLog').click(function(){
    var urlAddButton= AllConstant.baseURL + "/addCoachingLog";
    var tablename = $(this).attr("data-tablename");
    var primarykey = $(this).attr("data-primarykeycolumn");
    var id ="";

    $('#coacheeList li').each(function(i) {
        if(id!==""){
            id +="&";
        }
        id += $(this).attr('data-rowId');

    });


    if($('#form'+tablename).valid()){
        var json = getJSON(this);
        var dataJSON = {"token":getCookie("token"),"data":json, "ids":id};
        $('#pleaseWaitDialog').modal();
        $.ajax({
            type: "GET",
            url: urlAddButton,
            contentType: "application/json",
            data:dataJSON,
            dataType: "text",
            success: function (data) {
                $('#pleaseWaitDialog').modal('hide');
                var deleteResponse = JSON.parse(data);
                if(deleteResponse.status==="200"){
                    getData(tablename,primarykey);
                    toastr.success("Successful!","Entry completed!");
                    $('#form'+tablename)[0].reset();
                    $('#coacheeList li').each(function(i) {
                        $(this).remove();
                    });

                }else{
                    toastr.error("ERROR!","Unsuccessful entry because of undefined error!");
                }
            },
            error: function (data) {
                $('#pleaseWaitDialog').modal('hide');
                toastr.error("ERROR!","Unsuccessful entry because of undefined error!");
            }
        });
    }
});

function hideAllChecklist(){
    $('.hiichecklist').removeClass('d-none');
    $('.hiichecklist').addClass('d-none');
    $('.hiichecklist').find('input').each(function() {
        $(this).prop('checked', false);
    });
    $('#inpHIIScore').val('0');
}
$('.hiichecklist').change(function () {
    var achieved = 0;
    var total = 0;

    var tablename = $(this).attr("data-tablename");

    $('this :input:checked').each(function(){
        achieved++;
    });


    $(this).find('input:checked').each(function() {
        achieved++;
    });

    $(this).find('input').each(function() {
        total++;
    });

    $('#inp'+tablename+'score').val(Math.round((achieved/total)*100));
});

async function uploadFile(url, filename, fileupload) {
    let formData = new FormData();
    formData.append("file", fileupload.files[0]);
    formData.append("filename", filename);

    let response = await fetch(url, {
        method: "POST",
        contentType: "application/json",
        body: formData
    });
}
$('.btnValidateAndLock').click(function(){
    if("Validate and Lock" === $(this).text()){
        var tablename = $(this).attr("data-tablename");
        if($('#form'+tablename).valid()){
            $('.formFields').find('input, textarea, button, select').attr("disabled", true);
            toastr.success("Validated!","Your form is valid. Now upload your raise excel sheet below!");
            $(this).text("Unlock Form");
            $('#btnUpload'+tablename).removeClass("d-none");
        }else{
            toastr.error("Error!","Check the field/fields error");
        }
    }else{
        $('.formFields').find('input, textarea, button, select').attr("disabled", false);
        $(this).text("Validate and Lock");

        $('#btnUpload'+tablename).addClass("d-none");
    }


});
$('#btnUploadHIIRaiseAssessment').click(function () {
    var urlUpload= AllConstant.baseURL + "/upload";
    var month = $('#inpHIIRaiseAssessmentmonth').val();
    var year = $('#inpHIIRaiseAssessmentyear').val();
    var quarter = $('#inpHIIRaiseAssessmentquarter').val();

    var lastFive = 1234;
    var filename = "raise_assessment_"+month+"_"+year+"_"+quarter+"_"+lastFive+".xlsx";

    uploadFile(urlUpload, filename, $('#inpRaiseFile')[0]);
    $("#inpHIIRaiseAssessmentraiseFilename").val("<a href='D:\\upload\\"+filename+"'>Excel Raise File</a>");
    $('#btnAddHIIRaiseAssessment').click();
    $('#btnValidateAndLock').click();
});
$('#btnUploadHIIInReach').click(function () {
    var urlUpload= AllConstant.baseURL + "/upload";
    var city = $('#inpHIIInReachcity').val();
    var coachId = $('#inpHIIInReachcoachId').val();
    var healthfacilityId = $('#inpHIIInReachhealthFacilityId').val();

    var lastFive = 1234;
    var filename = "hii_inreach_"+city+"_"+coachId+"_"+healthfacilityId+"_"+lastFive+".docx";

    uploadFile(urlUpload, filename, $('#inpInReachFile')[0]);
    $("#inpHIIInReachinReachFilename").val("<a href='D:\\upload\\"+filename+"'>Docx In Reach File</a>");
    $('#btnAddHIIInReach').click();
    $('#btnHIIInReachValidateAndLock').click();
});

$('#btnUploadHIIOutReach').click(function () {
    var urlUpload= AllConstant.baseURL + "/upload";
    var city = $('#inpHIIOutReachcity').val();
    var coachId = $('#inpHIIOutReachcoachId').val();
    var healthfacilityId = $('#inpHIIOutReachhealthFacilityId').val();

    var lastFive = 1234;
    var filename = "hii_outreach_"+city+"_"+coachId+"_"+healthfacilityId+"_"+lastFive+".docx";

    uploadFile(urlUpload, filename, $('#inpOutReachFile')[0]);
    $("#inpHIIOutReachoutReachFilename").val("<a href='D:\\upload\\"+filename+"'>Docx In Reach File</a>");
    $('#btnAddHIIOutReach').click();
    $('#btnHIIOutReachValidateAndLock').click();
});

$('#btnUploadHIIFHD').click(function () {
    var urlUpload= AllConstant.baseURL + "/upload";
    var city = $('#inpHIIFHDcity').val();
    var coachId = $('#inpHIIFHDcoachId').val();
    var healthfacilityId = $('#inpHIIFHDhealthFacilityId').val();

    var lastFive = 1234;
    var filename = "hii_fhd_"+city+"_"+coachId+"_"+healthfacilityId+"_"+lastFive+".docx";

    uploadFile(urlUpload, filename, $('#inpFHDFile')[0]);
    $("#inpHIIFHDfhdFilename").val("<a href='D:\\upload\\"+filename+"'>Docx FHD File</a>");
    $('#btnAddHIIFHD').click();
    $('#btnHIIFHDValidateAndLock').click();
});
