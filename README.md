# IP-Adress-Tacker
Pulls ip data from an API and feeds location of an IP to another API to build a map centered to it's location, displaying so info about API
First, this site builds a map centered in a predetermined location,
then it pulls user IP information, displays it and feeds it's location to LEAFLETJS to center a map in a new location.
After initial info is displayed and info is added, the user can input another IP-adress
User input is checked with regexp to be a valid IPv4 or IPv6 and then is send to the API to pull it's data, display it and recenter the map.
In case of invalid user input, there will be a modal pop up, informing the user and showing a some valid exaples of IP-adresses.
