React Countries App
This is a simple React application that utilizes the REST Countries API to display information about different countries. It allows users to browse a list of countries and view detailed information about each country.

Usage
After installing the dependencies, run npm start to start the development server.
Open your web browser and navigate to http://localhost:3000 to access the app.
The home page displays a list of countries. Click on a country to view its detailed information.

Features
View a list of countries with basic information (name, flag, population, region, and capital).
View detailed information about a specific country, including languages, currencies, borders, and more.
Search for a specific country using the search bar on the homepage.

Components
The app is organized into the following components:

Header: Renders the navigation header at the top of the page.
Countries: Displays a list of countries with basic information.
Country: Displays detailed information about a specific country.


Routes
/rest-countries-api-new: This is the homepage that lists all the countries.
/countries/:name: This route displays detailed information about the country with the specified name.

Technologies Used
React: A JavaScript library for building user interfaces.
TypeScript: To check errors in the code
React Router: Used for handling client-side routing.
REST Countries API: Provides country data for the app.
HTML/CSS: Markup and styles for the app.


React Countries App - Countries Component
This is the Countries component of a React application that uses the REST Countries API to display information about different countries. It allows users to browse a list of countries, search for specific countries, and filter countries by region.

Component Structure
The Countries component is a functional component that utilizes React hooks to manage state and fetch data from the API. It consists of the following parts:

State Hooks:

countries: Stores an array of Country objects fetched from the API.
searchQuery: Holds the current search query entered by the user in the search input.
regionFilter: Keeps track of the selected region filter from the dropdown.
useEffect Hook:

Fetches country data from the REST Countries API when the component mounts and sets the countries state with the fetched data.
Event Handlers:

handleSearchInputChange: Updates the searchQuery state when the user types in the search input.
handleRegionFilterChange: Updates the regionFilter state when the user selects a region from the dropdown.
Filtered Countries:

Filters the countries array based on the current searchQuery and regionFilter.

Functionality
The component fetches country data from the API when it mounts and stores the data in the countries state.
Users can search for a specific country using the search input. The list of countries will be filtered based on the search query in real-time.

Users can also filter countries by region using the dropdown menu. Selecting a region from the dropdown will update the list of displayed countries accordingly.
Each country is displayed as an article in a grid format, showing the country's flag, name, population, region, capital, and a "Learn More" link to view detailed information about the country.
Usage
To use this component in your React application:

Make sure you have the required dependencies installed, especially react-router-dom for routing.
Import the Countries component into your main application file.
Place the Countries component inside the <Routes> component to define the route where you want to display the countries.
The component will fetch the data from the REST Countries API automatically when it mounts.

React Countries App - Country Component
This is the Country component of a React application that uses the REST Countries API to display detailed information about a specific country. It allows users to view information such as the country's flag, native name, population, region, subregion, capital, top-level domain, currencies, languages, and bordering countries.

Component Structure
The Country component is a functional component that utilizes React hooks to manage state and fetch data from the API. It consists of the following parts:

State Hooks:

country: Stores an array of CountryData objects fetched from the API based on the name parameter in the URL.
Params Hook:

useParams: Extracts the name parameter from the URL to determine the specific country to fetch data for.
Navigate Hook:

useNavigate: Provides the navigate function to programmatically navigate back to the homepage.
useEffect Hook:

Fetches country data from the REST Countries API when the component mounts and updates the country state with the fetched data.
The useEffect hook also has a dependency on the name parameter, so it will refetch data whenever the name parameter changes in the URL.
Back Button Click Handler:

handleBackButtonClick: A function that uses the navigate function to navigate back to the homepage when the "Back Home" button is clicked.

Functionality
The component fetches detailed country data from the REST Countries API based on the name parameter in the URL when it mounts.
The data includes information about the country's flag, native name, population, region, subregion, capital, top-level domain, currencies, languages, and bordering countries.
The "Back Home" button allows users to navigate back to the homepage to view the list of countries.
The component displays the fetched country information in a formatted layout, including the country's flag and other details.
If the country has bordering countries, they will be displayed in a list below the country's details.

Usage
To use this component in your React application:

Make sure you have the required dependencies installed, especially react-router-dom for routing.
Import the Country component into your main application file.
Place the Country component inside the <Routes> component to define the route where you want to display detailed country information.
The component will fetch the country data from the REST Countries API automatically when it mounts, based on the name parameter in the URL.
