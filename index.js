document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      let input = inputField.value;
      inputField.value = "";
      output(input);
    }
  });
});

function output(input) {
  let output = [];
  let wordsArray = (input.toLowerCase()).split(' ');
  compare(prompts, replies, wordsArray, output);
  if (output.length === 0) output.push(alternative[0]);
  for (let pos = 0; pos < output.length; pos++) addChat(input, output[pos]);
}

function compare(promptsArray, repliesArray, wordsArray, retArray) {
  let replyIndex = 0;
  for(let wordIndex = 0; wordIndex < wordsArray.length; wordIndex++) {
    for (let promptIndex = 0; promptIndex < promptsArray.length; promptIndex++) {
      for (let ansIndex = 0; ansIndex < promptsArray[promptIndex].length; ansIndex++) {
        if (promptsArray[promptIndex][ansIndex] === wordsArray[wordIndex]) retArray.push(repliesArray[promptIndex++]);
        if (ansIndex === promptsArray[promptIndex].length - 1) break;
      }
      if (promptIndex === promptsArray.length - 1) break;
    }
    if (wordIndex === wordsArray.length - 1) break;
  }
  return retArray;
}

function addChat(input, output) {
  const messagesContainer = document.getElementById("messages");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<span>${input}</span>`;
  messagesContainer.appendChild(userDiv);
  let botDiv = document.createElement("div");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botDiv.className = "bot response";
  botText.innerText = "Odpisuje...";
  botDiv.appendChild(botText);
  messagesContainer.appendChild(botDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
  setTimeout(() => {
    botText.innerText = `${output}`;
    textToSpeech(output)
  }, 1000);
}
const synth = window.speechSynthesis;
const textToSpeech = (string) => {
  let voice = new SpeechSynthesisUtterance(string);
  voice.text = string;
  voice.lang = "pl";
  voice.volume = 1;
  voice.rate = 1;
  voice.pitch = 1;
  synth.speak(voice);
};
const prompts = [["hej"],["pogoda","Krakow"],["dowidzenia"],["empty"]];
const replies = [["Witaj!"],["W Krakowie dzisiaj pada deszcz."],["Do zobaczenia!"],["empty"]];
const alternative = ["Nie rozumiem - brak implementacji! :/"];