var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var stdDBName = "STD-DB";
var stdRelationName = "StdData";
var connToken = "90932200|-31949215706499334|90963530";

$('#rollNo').focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

function getstdIdAsJsonObj() {
    var rollNo = $("#rollNo").val();
    var jsonStr = {
        id: rollNo
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record; 
    $("#fullName").val(record.fullName);
    $("#class").val(record.class);
    $("#birthDate").val(record.birthDate);
    $("#address").val(record.address);
    $("#enrollmentDate").val(record.enrollmentDate);
}

function resetForm() {
    $("#rollNo").val("");
    $("#fullName").val("");
    $("#class").val("");
    $("#birthDate").val("");
    $("#address").val("");
    $("#enrollmentDate").val("");
    $("#rollNo").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#update").prop("disabled", true);
    $("#rollNo").focus();
}

function validateData() {
    var rollNo = $("#rollNo").val();
    if (rollNo === "") {
        alert("Roll No is a Required Value");
        $("#rollNo").focus();
        return "";
    }
    var fullName = $("#fullName").val();
    if (fullName === "") {
        alert("Full Name is a Required Value");
        $("#fullName").focus();
        return "";
    }
    var classvar = $("#class").val();
    if (classvar === "") {
        alert("Class is a Required Value");
        $("#class").focus();
        return "";
    }
    var birthDate = $("#birthDate").val();
    if (birthDate === "") {
        alert("Birth Date is a Required Value");
        $("#birthDate").focus();
        return "";
    }
    var address = $("#address").val();
    if (address === "") {
        alert("Address is a Required Value");
        $("#address").focus();
        return "";
    }
    var enrollmentDate = $("#enrollmentDate").val();
    if (enrollmentDate === "") {
        alert("Enrollment Date is a Required Value");
        $("#enrollmentDate").focus();
        return "";
    }
    var jsonStrObj = {
        rollNo: rollNo,
        fullName: fullName,
        class: classvar,
        birthDate: birthDate,
        address: address,
        enrollmentDate: enrollmentDate
    };
    return JSON.stringify(jsonStrObj);
}


function getStd() {
    var stdIdJsonObj = getstdIdAsJsonObj(); 
    var getRequest = createGET_BY_KEYRequest(connToken, stdDBName, stdRelationName, stdIdJsonObj);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({ async: true });
    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#update").prop("disabled", false);
        $("#fullName").focus();
    }
    else if (resJsonObj.status === 200) {
        
        $("#rollNo").prop("disabled", true); 
        fillData(resJsonObj);
        $("#update").prop("disabled", false); 
        $("#reset").prop("disabled", false);
        $("#save").prop("disabled", true);
        $("#rollNo").focus();
    }
}



function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return " ";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, stdDBName, stdRelationName);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({ async: true });
    resetForm();
    $("#rollNo").focus();
}

function changeData() {
    $("#update").prop("disabled", true);
    var jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, stdDBName, stdRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({ async: true });
    resetForm();
    $("#rollNo").focus();
}
