# WasteNotRestaurantLocator

This is the code for my team's Ellehacks project, WasteNot. I contributed to the Google assistant feature which will (eventually!) connect to the iPhone and Adnroid apps. We're hacking with sustainability in mind. Our application and Google Assistant action will help users of choose the most environmentally conscious restaurant in which to dine.

First, the assistant asks your location so that you can find a restaurant near you so as to minimize travel time and its subsequent pollution:

![](voicethingy.png)

Next, it asks you how far away you're willing to go and what kind of food you're craving:
![](voicethingy2.png)

This is what the Google Cloud Dashboard looks like for this Cloud function:

![](voicethingy3.png)

The system then queries the Google Places ID API and the Google Geocodes API to get the information about nearby establishments and determines whether the place is worth visiting. The action also provides photos to help users decide!
