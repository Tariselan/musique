function generateBar(notes) {
    const VF = Vex.Flow;

    // Create a renderer
    const div = document.createElement("div");
    document.body.appendChild(div);
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(400, 200);
    const context = renderer.getContext();

    // Create a stave
    const stave = new VF.Stave(10, 40, 400);
    stave.setContext(context).draw();

    // Draw barlines
    stave.setBegBarType(VF.Barline.type.SINGLE); // Add barline at the beginning
    stave.setEndBarType(VF.Barline.type.SINGLE); // Add barline at the end

    // Create notes based on the input
    const vfNotes = notes.map(note => {
        const noteNames = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];
        const noteName = noteNames[note % 12]; // Getting the note name from the note value
        const accidental = note % 12 !== 1 && note % 12 !== 3 && note % 12 !== 6 && note % 12 !== 8 && note % 12 !== 10 ? "b" : "#";
        return new VF.StaveNote({
            keys: [`${noteName}/${4}`], // Including accidental in the key
            duration: "q", // Quarter note duration
            style: { fillStyle: "black" }, // Filled notehead without stem
            clef: "treble", // Adding clef
            accidental: accidental // Setting the accidental type
        }).addModifier(0, new VF.Annotation(note)); // Adding annotation (optional)
    });

    // Create a voice
    const voice = new VF.Voice({ num_beats: notes.length, beat_value: 4 }); // Assuming 4/4 time signature
    voice.addTickables(vfNotes);

    // Format and justify the notes to fit within the stave
    new VF.Formatter().joinVoices([voice]).format([voice], 300);

    // Render the notes
    voice.draw(context, stave);

    // Remove stems from the notes
    vfNotes.forEach(note => {
        note.setStemStyle({ visible: false });
    });
}

// Example usage:
generateBar([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
