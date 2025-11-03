// Demo timer logic: auto-increments a simple MM:SS:CS timer (CS = centiseconds)
console.log("Sandbox listo");

function padded(n){return String(n).padStart(2,'0')}

const minutesEl = document.getElementById('minutes')
const secondsEl = document.getElementById('seconds')
const centisEl = document.getElementById('centis')

// Start from the values present in the DOM if any
let minutes = parseInt(minutesEl?.textContent || '0', 10) || 0
let seconds = parseInt(secondsEl?.textContent || '0', 10) || 0
let centis = parseInt(centisEl?.textContent || '0', 10) || 0

let running = true

function tick(){
	if(!running) return
	centis += 1
	if(centis >= 100){
		centis = 0
		seconds += 1
	}
	if(seconds >= 60){
		seconds = 0
		minutes += 1
	}

	if(minutesEl) minutesEl.textContent = padded(minutes)
	if(secondsEl) secondsEl.textContent = padded(seconds)
	if(centisEl) centisEl.textContent = padded(centis)
}

// Run tick every 10ms -> centiseconds update visually (100 increments per second)
setInterval(tick, 10)

// Expose simple controls for console debugging
window.__timer = {
	pause(){ running = false },
	resume(){ running = true },
	reset(){ minutes=0; seconds=0; centis=0; tick() }
}