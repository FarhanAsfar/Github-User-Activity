#!/usr/bin/env node 
//allows the script to be run directly from command line

async function fetchUserGithubActivity(userName){
    const url = `https://api.github.com/users/${userName}/events`;

    try{
        const response = await fetch(url);
        console.log(response)
        if(!response.ok){
            throw new Error(`Status: ${response.status}`);
        }
        
        const userInfo = await response.json();

        displayUserActivity(userInfo);
    }catch(error){
        console.error(error.message);
    }
}

function displayUserActivity(userInfo){
    console.log("success")
    // console.log('User Activity:');
    // userInfo.slice(0, 5).forEach((event, index) => {
    //     console.log(`${index + 1}. Type: ${event.type}, Repo: ${event.repo.name}, Created at: ${event.created_at}`);
    // });
    
}


const userName = process.argv[2];
if(!userName){
    console.log("Please enter a github user name");
}else{
    fetchUserGithubActivity(userName);
}

