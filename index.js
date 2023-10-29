const userID = "754484719306932244"
const userName = "bor-real"

let lanyardData = null
let githubData = null

// i suck at js

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
} //https://stackoverflow.com/a/1026087

const statusColors = {
    "online": "green",
    "idle": "yellow",
    "dnd": "red",
    "offline": "darkslategrey"
}

function setLanyardDOMValues() {
    const statusText = document.getElementById("status-text")
    const profilePFP = document.getElementById("status-pfp")

    const discordStatus = lanyardData.data.discord_status
    profilePFP.style.borderColor = statusColors[discordStatus]

    if (lanyardData.data.activities && lanyardData.data.activities.length > 0) {
        const state = lanyardData.data.activities[0].state
        if (typeof state !== 'undefined') {
            statusText.textContent = "Status: " + state
        }
    } else {
        statusText.textContent = "Status: " + capitalizeFirstLetter(lanyardData.data.discord_status)
    }
}

function setGithubDOMValues() {
    const projectDiv = document.getElementById("projects");

    for (const project of githubData) {
        if (project.fork == true) {
            continue;
        }

        const projectElement = document.createElement("div");

        projectElement.innerHTML = `
            <a class="project" href="${project.html_url}">${project.name}</a>
        `;

        projectDiv.appendChild(projectElement);
    }
}

async function getLanyard() {
    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userID}`)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        lanyardData = await response.json()

        setLanyardDOMValues()
    } 
    catch (error) {
        console.error("Error:", error)
    }
}

async function getGithubProjects() {
    try {
        const response = await fetch(`https://api.github.com/users/${userName}/repos`)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        githubData = await response.json()
        setGithubDOMValues()
    } 
    catch (error) {
        console.error("Error:", error)
    }
}

getGithubProjects()
getLanyard()