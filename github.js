class Github{
    constructor(){
        this.url = "https://api.github.com/users/";
    }

    async getGithubData(username){
        const responseUser = await fetch(this.url + username);
        const responseRepo = await fetch(this.url + username + "/repos");
        const userData = await responseUser.json();    // json da beklediğimiz için promise oluşuyor.
        const repoData = await responseRepo.json();

        return {              // SAÇMA YERRR....
            user:userData,    // sadece userdata ve repodatayı return'lememiz yetiyor.
            repo:repoData
        };
    }
}