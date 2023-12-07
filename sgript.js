function changeVolume(audio, start, end, duration) {
        let interval = 100; // ms
        let step = (end - start) / (duration / interval);
        let currentVolume = start;
        
        let fade = setInterval(() => {
            currentVolume += step;
            audio.volume = Math.max(0, Math.min(1, currentVolume)); // Ensure volume is between 0 and 1

            if ((step > 0 && currentVolume >= end) || (step < 0 && currentVolume <= end)) {
                clearInterval(fade);
            }
        }, interval);
    }

    function toggleSound(button) {
        let audio = button.audio;
        
        if (audio.paused) {
            console.log("Playing sound");
            audio.play().catch(e => console.error("Error playing sound:", e)); // Catch and log any errors
            changeVolume(audio, 0, 0.05, 1000);
        } else {
            console.log("Pausing sound");
            changeVolume(audio, 0.05, 0, 1000);
            setTimeout(() => audio.pause(), 1000);
        }
    }

    document.querySelectorAll('.buttonnoise').forEach(button => {
        let soundPath = button.getAttribute('data-sound');
        let audio = new Audio(soundPath);
        button.audio = audio;

        audio.volume = 0;

        button.addEventListener('click', () => toggleSound(button));
    });