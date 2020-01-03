// Elementleri Seçme

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();


evenntListener();

function evenntListener(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);    // Son aramaları sayfa yüklendikçe storage'dan alıcaz
}


function getData(e){
    let usurname = nameInput.value.trim();
    if(usurname === ""){
        alert("Lütfen Geçerli bir Kullanıcı adı girin.")
    }
    else {
        github.getGithubData(usurname)  // Bu fonkisyon asyn olarak yazıldığı için promise dönüyor.
        .then(response => {
            if(response.user.message === "Not Found"){
                ui.showError("Kullanıcı Bulunamadı.")
            }
            else {
                ui.addSearchUsersToUI(usurname);
                Storage.addSearchUsersToStorage(usurname);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);

            }
        })
        .catch(err => ui.showError(err));
    }

    ui.clearInput();    // Input alanını temizleme
    e.preventDefault();
}

function clearAllSearched(){
    // Tüm arananları temizle
    if(confirm("Emin misiniz? ")){
        // Silme
        Storage.clearAllSearchUsersFromStorage();   // Storage'dan bilgileri temizleme
        ui.clearAllSearchUI();
    }
}

function getAllSearched(){
    // Arananları Storagedan al ve UI'ye ekle.
    let users = Storage.getSearchUsersFromStorage();
    let result = "";
    users.forEach(user => {
        // <li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
        result += `<li class="list-group-item">${user}</li>`;

    });
    lastUsers.innerHTML = result;    
}
