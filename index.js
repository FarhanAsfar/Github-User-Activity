#!/usr/bin/env node 
//allows the script to be run directly from command line

async function fetchUserGithubActivity(userName){
    const url = `https://api.github.com/users/${userName}/events`;

    try{
        const response = await fetch(url);
        //console.log(response)
        if(!response.ok){
            throw new Error(`Status: ${response.status}`);
        }  
        const userInfo = await response.json();

        displayUserActivity(userInfo);
    }catch(error){
        console.error(error.message);
    }
}

async function fetchUserRepos(userName) {
    const url = `https://api.github.com/users/${userName}/repos`;

    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Status: ${response.status}`);
        }
        const userRepos = await response.json();
        displayUserRepos(userRepos);
    }catch(error){
        console.error(error.message);
    }
}
function displayUserActivity(userInfo){
    //console.log(userInfo);
    console.log("----------Recent Activites------------\n--------------------------------------");
    userInfo.forEach(events =>{
        console.log(`Type: ${events.type},      Repo: ${events.repo.name.split('/')[1]},        Created: ${events.created_at}`)
    })
    console.log("\n");
}


function displayUserRepos(userRepos){
    console.log("------User Repositories---------\n--------------------------------")
    userRepos.forEach(event=>{
        console.log(event.full_name.split('/')[1]);
    });
    
}


const userName = process.argv[2];
if(!userName){
    console.log("Please enter a github user name");
}else{
    fetchUserGithubActivity(userName);
    fetchUserRepos(userName);
}

