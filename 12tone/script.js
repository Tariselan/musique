// Ensure the DOM content is loaded before accessing elements
document.addEventListener("DOMContentLoaded", function() {
    // Create a VexFlow Renderer
    var VF = Vex.Flow;
    var div = document.querySelectorAll(".sheet-music").forEach(div => {
        if (div) {
        var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

        // Configure the Renderer
        renderer.resize(400, 200);
        var context = renderer.getContext();

        // Create a new Stave
        var stave = new VF.Stave(10, 40, 400);

        // Add a Treble Clef
        stave.addClef("treble");

        // Add time signature
        stave.addTimeSignature("4/4");

        // Connect the Stave to the rendering context
        stave.setContext(context).draw();

        // Create some notes
        var notes = [
            new VF.StaveNote({ keys: ["c/4"], duration: "w" }),
        ];

        // Create a Voice
        var voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
        voice.addTickables(notes);

        // Format and justify the notes to fit within the Stave
        var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 300);

        // Render the notes
        voice.draw(context, stave);
        // Create a div for the barline
        var barlineDiv = document.createElement("div");
        barlineDiv.classList.add("barline");
        document.body.appendChild(barlineDiv);

        // Position the barline div at the end of the staff
        var staveRect = stave.getBoundingBox();
        var barlineX = staveRect.x + staveRect.width;

        // Set the position and dimensions of the barline div
        barlineDiv.style.left = barlineX + "px";
        barlineDiv.style.top = staveRect.y + "px";
        barlineDiv.style.height = staveRect.height + "px";
    } else {
        console.error("Div with id 'sheet-music' not found.");
    }
});
    

    
});
