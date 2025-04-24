# GuardianBot - Discord Moderation & Utility Bot

GuardianBot is a functional Discord bot built with Node.js and discord.js v14. This bot provides essential server moderation tools, role management commands, automatic actions for new members, and logging capabilities, all implemented using modern Slash Commands.

## Features

*   **Moderation Commands:**
    *   `/ban <user> [reason]`: Bans a specified user from the server. Records the action and optional reason in the logs and Discord Audit Log.
    *   `/kick <user> [reason]`: Kicks a specified user from the server. Records the action and optional reason in the logs and Discord Audit Log.
    *   `/mute <user> <duration> [reason]`: Mutes (timeouts) a specified user for a given duration (e.g., "10m", "1h", "2d"). Max duration is 28 days. Records the action and optional reason in the logs and Discord Audit Log.
    *   `/clearall`: Deletes up to 100 recent messages in the channel where the command is used. (Note: Discord API limits bulk deletion to messages newer than 14 days). Records the action in the logs.
*   **Role Management Commands:**
    *   `/assignrole <user> <role>`: Assigns a specified role to a specified user. Requires appropriate permissions.
    *   `/removerole <user> <role>`: Removes a specified role from a specified user. Requires appropriate permissions.
*   **Event Handling:**
    *   **Welcome Message:** Sends a customizable embed message to a designated welcome channel when a new user joins the server.
    *   **Auto-Role:** Automatically assigns a predefined role to new members as soon as they join.
*   **Logging Utility:**
    *   A centralized logging function sends detailed embeds to a specified log channel for moderation actions (`ban`, `kick`, `mute`, `clearall`), including the responsible moderator, the target (if applicable), and the reason provided.

## Setup

### Prerequisites

*   [Node.js](https://nodejs.org/) (v16.9.0 or higher recommended)
*   npm (comes with Node.js)
*   A Discord Bot Application & Token ([Discord Developer Portal](https://discord.com/developers/applications))

### Installation & Configuration

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-directory-name>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file** in the root directory of the project. This file will store your sensitive configuration details. Add the following lines, replacing the placeholder values with your actual information:

    ```dotenv
    # Your Discord Bot Token
    BOT_TOKEN=YOUR_DISCORD_BOT_TOKEN

    # Channel and Role IDs (Get these using Discord's Developer Mode)
    LOG_CHN_ID=YOUR_LOG_CHANNEL_ID
    WELCOME_CHN_ID=YOUR_WELCOME_CHANNEL_ID
    DEF_ROLE_ID=YOUR_DEFAULT_NEW_MEMBER_ROLE_ID
    ```
    *   **How to get IDs:** Enable Developer Mode in Discord (User Settings > Advanced > Developer Mode). Then, right-click on a channel, user, or role and select "Copy ID".

### Running the Bot

```bash
node index.js
