const AllConstant = {
    //baseURL: "http://172.16.16.196:8080",
 //   baseURL: "http://192.168.100.80:8080",
    baseURL: "http://192.168.0.52:8080/tci_server",
    baseString: "encryptTest",
    timeout: "999999",
    base_upload_url: "https://hawk.greenstar.org.pk:81/uploads/"
};

function setCookie(cname, cvalue) {
    localStorage.setItem(cname, cvalue);
}

function getCookie(cname) {

    return localStorage.getItem(cname);
}

function clearCookies() {

    localStorage.clear();
}