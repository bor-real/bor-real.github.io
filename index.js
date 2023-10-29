const userID = "754484719306932244";
const userName = "bor-real";

const statusColors = {
    online: "green",
    idle: "yellow",
    dnd: "red",
    offline: "darkslategrey"
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function createElementWithClass(tag, className) {
    const element = document.createElement(tag);
    element.classList.add(className);
    return element;
}

function createProjectElement(project) {
    
    const projectLink = document.createElement("a");
    projectLink.href = project.html_url;
    if (project.description) projectLink.title = project.description;
    
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");
    
    const projectHeading = document.createElement("h3");
    projectHeading.textContent = project.name;
    if (project.fork) projectHeading.textContent += " (Fork)";
    
    projectDiv.appendChild(projectHeading);
    projectLink.appendChild(projectDiv);

    return projectLink;
}

function setStatusText(statusText, lanyardData) {
    const discordStatus = lanyardData.data.discord_status;
    statusText.textContent = `Status: ${lanyardData.data.activities?.[0]?.state || capitalizeFirstLetter(discordStatus)}`;
}

function setProfilePFP(profilePFP, lanyardData) {
    const discordStatus = lanyardData.data.discord_status;
    profilePFP.style.borderColor = statusColors[discordStatus];
}

async function fetchData(url, errorPrefix = "") {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error:", errorPrefix, error);
        return null;
    }
}

async function getLanyard() {
    const lanyardData = await fetchData(`https://api.lanyard.rest/v1/users/${userID}`, "Lanyard");

    if (lanyardData) {
        setStatusText(document.getElementById("status-text"), lanyardData);
        setProfilePFP(document.getElementById("status-pfp"), lanyardData);
    }
}

async function getGithubProjects() {
    const githubData = await fetchData(`https://api.github.com/users/${userName}/repos`, "GitHub");

    if (Array.isArray(githubData)) {
        const projectDiv = document.getElementById("projects");
        githubData.forEach((project) => {
            const projectElement = createProjectElement(project);
            if (projectElement) {
                projectDiv.appendChild(projectElement);
            }
        });
    }
}

getGithubProjects();
getLanyard();