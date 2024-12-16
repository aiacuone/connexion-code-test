## Intro

Thank you for the opportunity!

The 3 options to input commands were:

- File
- Standard Input
- UI

I chose to implement the UI option, therefore there is no test data to exercise the application.

## Instructions

#### Run Application Locally

- Clone the repository
- Run `npm install` in the terminal to install dependencies
- Run `npm run dev` in the terminal to run the application locally
- open http://localhost:3000 in your browser to view the application

#### Production Version

You can view and use the application live [here](https://adrian-iacuone-connexion-test.netlify.app/)

#### Play Area

- Navigate to the robot page using the header link
- The robot page by default acts as a play area, it was not part of the requirements but it was a part of my development process
- Feel free to use the buttons to move the robot around on the table.
- When the robot is commanded to move off the table, a popover message will render to indicate that the robot cannot move in that direction
- When the robot is commanded to `Report`, a popover message will render with the `X`,`Y` and `F` of the robot

#### Input/Output

- Navigate to the robot page using the header link or `Go to Robot` button on the home page
- Click on the `Input/Output` button under the table to open the `Input/Output` modal
- Input a `Place` command first,
- Use the `Move`, `Left`, `Right` and `Report` buttons to input commands or an additional `Place` command
- Use the `Backspace` and `Reset` buttons to clear commands if needed
- Click the `Move Robot` button to execute the commands
- The modal will close, you will then be able to observe the robots movements in the table

#### Robot Movement

- The robot will make a move on the table in 1 second intervals
- The robot will not move off the table, if a command would result in it falling off the table, and a popover message will render when this happens
- When the report command is executed, the robot will announce or render a popover message with the `X`,`Y` and `F` of the robot
- The direction of the robot is indicated by a small arrow under the robot
