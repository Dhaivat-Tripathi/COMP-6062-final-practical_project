/// Create a new Vue app
const app = Vue.createApp({
    /// Define the data for the app
    data() {
        return {
            profileData: {},  // Profile info

            // Default location fields for weather 
            city: "London",
            province: "Ontario",
            country: "Canada",

            // Stores weather details from API
            weatherDetails: {
              temperature: "",
              wind: "",
              description: ""
            },

            word: "",    // Word enter by user
            //Stores dictionary response
            dictionary: {
              word: "",
              phonetic: "",
              definition: ""
            }
          };
        },
    /// Define the methods for the app
    methods: {
        // fetches a random user profile from API
        fetchProfile() {
          fetch("http://comp6062.liamstewart.ca/random-user-profile")
            .then(response => response.json())
            .then(data => {
                // Update profile data 
                this.profileData = data;
            })
            .catch(error => console.error("Error fetching profile:", error));
        },
        // Fetches weather data from API
        fetchWeather() {
          const link = `http://comp6062.liamstewart.ca/weather-information?city=${this.city}&province=${this.province}&country=${this.country}`;
          fetch(link)
            .then(response => response.json())
            .then(data => {
                // Update weather details 
                this.weatherDetails = {
                    temperature: data.temperature,
                    wind: data.wind_speed,
                    description: data.weather_description
                };
            })
            .catch(error => console.error("Error fetching weather:", error));
        },
        // Fetches definition of entered word from dictionary API
        fetchDefinition() {
            // Prevent empty input
            if (!this.word.trim()) return;
    
            fetch(`https://comp6062.liamstewart.ca/define?word=${this.word}`)
                .then(response => response.json())
                .then(data => {
                // If word is found, show definition
                if (data.length > 0) {
                    this.dictionary = data[0];
                } else {
                    this.dictionary = { word: "", phonetic: "", definition: "No definitions to show" };
                }
            })
            .catch(error => console.error("Error fetching definition:", error));
        }
      },
      mounted() {
        this.fetchProfile();
        this.fetchWeather();
      }
});
/// Mount the app to the #app element
app.mount('#app');
