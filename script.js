function processCommand() {

    let input =
        document.getElementById(
            "textInput"
        ).value.trim();


    if (input === "") {

        showResponse(
            "Please enter a command."
        );

        return;
    }


    processUserCommand(input);

}


// ============================================
// PROCESS COMMAND
// ============================================

function processUserCommand(command) {

    let text =
        command.toLowerCase().trim();


    // Greeting

    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        speak(
            "Hello! How can I help you today?"
        );

        showResponse(
            "Hello! 👋 How can I help you today?"
        );

    }


    // Time

    else if (
        text.includes("time")
    ) {

        let now =
            new Date();


        let time =
            now.toLocaleTimeString();


        speak(
            "The current time is " + time
        );


        showResponse(
            "🕐 The current time is: " +
            time
        );

    }


    // Date

    else if (
        text.includes("date") ||
        text.includes("today")
    ) {

        let now =
            new Date();


        let date =
            now.toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );


        speak(
            "Today's date is " + date
        );


        showResponse(
            "📅 Today's date is: " +
            date
        );

    }


    // Open Google

    else if (
        text.includes("open google")
    ) {

        speak(
            "Opening Google"
        );


        showResponse(
            "🔍 Opening Google..."
        );


        window.open(
            "https://www.google.com",
            "_blank"
        );

    }


    // Open YouTube

    else if (
        text.includes("open youtube")
    ) {

        speak(
            "Opening YouTube"
        );


        showResponse(
            "▶️ Opening YouTube..."
        );


        window.open(
            "https://www.youtube.com",
            "_blank"
        );

    }


    // Open Gmail

    else if (
        text.includes("open gmail")
    ) {

        speak(
            "Opening Gmail"
        );


        showResponse(
            "📧 Opening Gmail..."
        );


        window.open(
            "https://mail.google.com",
            "_blank"
        );

    }


    // Search

    else if (
        text.startsWith("search for")
    ) {

        let searchText =
            text.replace(
                "search for",
                ""
            ).trim();


        if (searchText === "") {

            showResponse(
                "Please tell me what you want to search for."
            );

            return;
        }


        speak(
            "Searching for " +
            searchText
        );


        showResponse(
            "🔍 Searching Google for: " +
            searchText
        );


        let url =
            "https://www.google.com/search?q=" +
            encodeURIComponent(
                searchText
            );


        window.open(
            url,
            "_blank"
        );

    }


    // Calculate

    else if (
        text.startsWith("calculate")
    ) {

        let expression =
            text.replace(
                "calculate",
                ""
            ).trim();


        calculateExpression(
            expression
        );

    }


    // About assistant

    else if (
        text.includes(
            "about yourself"
        ) ||
        text.includes(
            "who are you"
        )
    ) {

        let answer =
            "I am a smart virtual assistant created using HTML, CSS and JavaScript. I can understand text and speech commands.";


        speak(answer);

        showResponse(
            "🤖 " + answer
        );

    }


    // Thank you

    else if (
        text.includes(
            "thank"
        )
    ) {

        speak(
            "You're welcome! Have a great day."
        );


        showResponse(
            "😊 You're welcome! Have a great day."
        );

    }


    // Exit

    else if (
        text.includes(
            "bye"
        ) ||
        text.includes(
            "goodbye"
        )
    ) {

        speak(
            "Goodbye! Have a nice day."
        );


        showResponse(
            "👋 Goodbye! Have a nice day."
        );

    }


    // Unknown command

    else {

        speak(
            "I don't understand that command yet."
        );


        showResponse(
            "🤔 I don't understand that command yet. Try asking for the time, date, opening Google or YouTube, searching the web, or calculating something."
        );

    }

}



function calculateExpression(
    expression
) {

    try {

        // Allow only basic mathematical
        // characters

        if (
            !/^[0-9+\-*/().%\s]+$/.test(
                expression
            )
        ) {

            showResponse(
                "Please use a basic mathematical expression such as 25 + 50."
            );

            return;
        }


        let result =
            Function(
                '"use strict"; return (' +
                expression +
                ')'
            )();


        speak(
            "The answer is " +
            result
        );


        showResponse(
            "🧮 Answer: " +
            result
        );

    }

    catch {

        showResponse(
            "❌ I could not calculate that expression."
        );

    }

}



function startVoiceRecognition() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        alert(
            "Speech recognition is not supported in this browser. Please use Google Chrome."
        );

        return;
    }


    let recognition =
        new SpeechRecognition();


    recognition.lang =
        "en-US";


    recognition.interimResults =
        false;


    recognition.continuous =
        false;


    let status =
        document.getElementById(
            "voiceStatus"
        );


    status.innerHTML =
        "🎤 Listening... Please speak";


    recognition.start();


    recognition.onresult =
        function(event) {

            let command =
                event
                .results[0][0]
                .transcript;


            document.getElementById(
                "textInput"
            ).value =
                command;


            status.innerHTML =
                "✅ Command recognized: " +
                command;


            processUserCommand(
                command
            );

        };


    recognition.onerror =
        function(event) {

            status.innerHTML =
                "❌ Could not recognize speech.";

            console.log(
                event.error
            );

        };


    recognition.onend =
        function() {

            if (
                status.innerHTML.includes(
                    "Listening"
                )
            ) {

                status.innerHTML =
                    "Speech recognition stopped.";

            }

        };

}


function speak(text) {

    if (
        "speechSynthesis"
        in window
    ) {

        let speech =
            new SpeechSynthesisUtterance(
                text
            );


        speech.lang =
            "en-US";


        speech.rate =
            1;


        speech.pitch =
            1;


        window.speechSynthesis.cancel();


        window.speechSynthesis.speak(
            speech
        );

    }

}


function showResponse(
    message
) {

    document.getElementById(
        "response"
    ).innerHTML =
        message;


    document.getElementById(
        "assistantMessage"
    ).innerHTML =
        message;

}



function quickCommand(
    command
) {

    document.getElementById(
        "textInput"
    ).value =
        command;


    processUserCommand(
        command
    );

}


function handleEnter(event) {

    if (
        event.key === "Enter"
    ) {

        processCommand();

    }

}
```
