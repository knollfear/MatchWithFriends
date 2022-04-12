# FearNotWithFriends

This is a real time web game where you compete to see who knows the herd the best.  
The architecture is a lambda at AWS to serve the information regarding Fearless employees, a static website written in lit.dev hosted at AWS and provisioned
by the terraform module "USSBA/static-website/aws" and a Heroic Labs Nakama Game server hosted as a droplet at Digital Ocean. 
The biggest areas for improvement are code clean up, reconnection logic, posting game requests and results to slack DM's or Channels.


#Code organization:

Highest level component should handle all logic associated with game server connection.  Outer container will listen for events that are associated 
with game events.  Inner components should be updated whenever a new game state is received.  The Outer container as well as Score and chat should be 
largely reusable in another project with little if any changes.
