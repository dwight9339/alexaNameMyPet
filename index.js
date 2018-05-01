/* eslint-disable  func-names */
/* eslint-disable  no-console */
const Alexa = require('alexa-sdk');

//To hold pet names
const pets = {

}

var namePet = function(pType, sex){
    var name = "Insert name here";
    return name;
}

var Handlers = {
    "LaunchRequest": function(){
        this.emit('NamePet'); //Punt to NamePet intent
    },
    "NamePet": function(){
        const intentObj = this.event.request.intent;
        const sexPrompt = "What is the sex of your pet?";
        const rePromptSex = "Sorry, I didn't catch that " + sexPrompt;
        const typePrompt = "What type of pet do you have?";
        const rePromptType = "Sorry, I didn't catch that, " + typePrompt;

        if (!intentObj.slots.petType.value){
             //this.emit(':elicitSlot', 'petType', typePrompt, rePromptType);
            this.response.speak(typePrompt).listen(rePromptType);
            this.emit(':responseReady');
        } else {
            this.response.speak('Ok, how about charlie');
            this.emit(':responseReady');
        }
        // else if (!intentObj.slots.sex.value){
        //     this.emit(':elicitSlot', 'sex', sexPrompt, rePromptSex);
        // } else {
        //     var pType = intentObj.slots.petType.value;
        //     var petSex = intentObj.slots.sex.value;
        //     var petName = namePet(pType, petSex);
        //     this.response.speak("Ok, how about " + petName);
        //     this.emit(':responseReady');
        // }
    }
}

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(Handlers);
    alexa.execute();
};
