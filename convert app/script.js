const text = document.getElementById("textToConvert");
const convertBtn = document.getElementById("convertBtn");
const languageSelect = document.getElementById("language");
const rateSlider = document.getElementById("rate");
const error = document.querySelector(".error-para");

// Populate voice options
function populateVoices() {
    const voices = window.speechSynthesis.getVoices();
    languageSelect.innerHTML = "";
    voices.forEach(voice => {
        const option = document.createElement("option");
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;
        languageSelect.appendChild(option);
    });
}

populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoices;
}

convertBtn.addEventListener('click', function () {
    const speechSynth = window.speechSynthesis;
    const enteredText = text.value;

    if (!enteredText.trim().length) {
        error.textContent = `Nothing to Convert! Enter text in the text area.`;
        return;
    }

    error.textContent = "";
    const utterance = new SpeechSynthesisUtterance(enteredText);

    const selectedVoice = [...speechSynth.getVoices()].find(voice => voice.name === languageSelect.value);
    if (selectedVoice) utterance.voice = selectedVoice;

    utterance.rate = parseFloat(rateSlider.value);

    speechSynth.speak(utterance);
    convertBtn.textContent = "Sound is Playing...";

    utterance.onend = () => {
        convertBtn.textContent = "Play Converted Sound";
    };
});