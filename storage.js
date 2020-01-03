class Storage {
    static getSearchUsersFromStorage(){
        // Tüm kullanıcıları Al
        let users;
        if(localStorage.getItem("searched") === null){
            users = [];
        }
        else {
            users = JSON.parse(localStorage.getItem("searched"));
        }
        return users;
    }

    static addSearchUsersToStorage(username){
        // Kullanıcı Ekle
        let users = this.getSearchUsersFromStorage();

        //indexOf
        if(users.indexOf(username) === -1){   // Yazılan username burada yok demektir ve artık "push" ile usurname eklenebilir.
            users.push(username);
        }

        localStorage.setItem("searched", JSON.stringify(users));   // username arraye eklendi ve localStorage tekrardan yazdık.
    }

    static clearAllSearchUsersFromStorage(){
        // Tüm Kullanıcıları Sil
        localStorage.removeItem("searched");
    }
}