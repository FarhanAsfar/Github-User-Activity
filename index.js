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

        //displayUserActivity(userInfo);
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
        displayUserActivity(userRepos);
    }catch(error){
        console.error(error.message);
    }
}

function displayUserActivity(events){
    //console.log(userRepos)
    events.forEach(event=>{
        console.log(event.full_name);
    });
    
}


const userName = process.argv[2];
if(!userName){
    console.log("Please enter a github user name");
}else{
    //fetchUserGithubActivity(userName);
    fetchUserRepos(userName);
}

