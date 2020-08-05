/* eslint-disable  func-names */
/* eslint-disable  no-console */
const Alexa = require('alexa-sdk');
const petNames = require("./names");

var namePet = function(petType, petGender){
    const len = petNames[petType][petGender].length;
    return petNames[petType][petGender][Math.floor(Math.random() * len)];
}

var Handlers = {
    "LaunchRequest": function(){
        this.emit('NamePet'); //Punt to NamePet intent
    },
    "NamePet": function(){
        const intentObj = this.event.request.intent;
        const genderPrompt = "What is your pet's gender?";
        const rePromptGender = "Sorry, I didn't catch that " + genderPrompt;
        const typePrompt = "What type of pet do you have?";
        const rePromptType = "Sorry, I didn't catch that, " + typePrompt;

        if (!intentObj.slots.petType.value) {
             //this.emit(':elicitSlot', 'petType', typePrompt, rePromptType);
            this.response.speak(typePrompt).listen(rePromptType);
            this.emit(':responseReady');
        } else if (!intentObj.slots.gender.value) {
            this.emit(':elicitSlot', 'gender', genderPrompt, rePromptGender);
        } else {
            var petType = intentObj.slots.petType.value;
            var petGender = intentObj.slots.gender.value;
            var petName = namePet(petType, petGender);
            this.response.speak("Ok, how about " + petName);
            this.emit(':responseReady');
        }
    }
}

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(Handlers);
    alexa.execute();
};
