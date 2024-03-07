# Multi-select Autocomplete Component

## Live Demo

The project is deployed and can be accessed [here](https://multi-select-case-phi.vercel.app/).

## Description

This project implements a multi-select autocomplete component using Vite + React + TS + Tailwind CSS. The component allows users to search and select characters from the ["Rick and Morty" API](https://rickandmortyapi.com/api/character/).

## Requirements

- [Node.js](https://nodejs.org/en) (Version 20.9.0)
- [Node Version Manager](https://github.com/nvm-sh/nvm) (optional)

## Features

- Multi-select functionality suitable for various use cases.
- Querying the "Rick and Morty" API with the text entered into the input field and listing the results in the popup content.
- Displaying the character's image, name, and the number of episodes they have appeared in for each listed result.
- Debouncing the input field to reduce API requests and improve performance.
- Highlighting the query word in the listed results.
- Adding and removing selected results from the input field.
- Keyboard navigation support for all operations using directional keys and tab.
- Loading state display during API requests.
- Error handling for API requests.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/kyguney/multi-select-characters.git
   ```

2. Navigate to the project directory:

    ```bash
    cd multi-select-characters
    ```

3. If using NVM, switch to the Node version specified in the project (.nvmrc file include the version):

    ```bash
    nvm use
    ```

4. Install dependencies:
    ```bash
    npm install
    ```

### Usage

To start the development server, run:

  ```bash
  npm run dev
  ```

This will start the application on http://localhost:5173.

### Contributing

Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests.

### License

This project is licensed under the MIT License.