const userID = "754484719306932244"
let data = null

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
} //https://stackoverflow.com/a/1026087

const statusColors = {
    "online": "green",
    "idle": "yellow",
    "dnd": "red",
    "offline": "darkslategrey"
}

function setDOMValues() {
    const statusText = document.getElementById("status-text")
    const profilePFP = document.getElementById("status-pfp")

    const discordStatus = data.data.discord_status
    profilePFP.style.borderColor = statusColors[discordStatus]

    if (data.data.activities && data.data.activities.length > 0) {
        const state = data.data.activities[0].state
        if (typeof state !== 'undefined') {
            statusText.textContent = state
        }
    } else {
        statusText.textContent = capitalizeFirstLetter(data.data.discord_status)
    }
}

async function main() {
    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userID}`)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        data = await response.json()
        console.log(data)

        setDOMValues()
    } 
    catch (error) {
        console.error("Error:", error)
    }
}

main()
