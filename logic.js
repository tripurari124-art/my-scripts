(function() {
    'use strict';

    let isRunning = false, isPaused = false, shouldStop = false;
    let completedRequests = 0, totalRequests = 0x270F, mobileNumber = "";
    let currentToken = null, requestDelay = 0x190; 

    // UI Panel (Aapka Puraana Design)
    const panel = document.createElement('div');
    panel.innerHTML = `
        <div id="blockControlPanel" style="position: fixed; top: 20px; right: 20px; width: 350px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; padding: 20px; color: white; z-index: 10000; box-shadow: 0 10px 40px rgba(0,0,0,0.3); font-family: Arial, sans-serif;">
            <div style="margin-bottom: 15px; text-align: center; font-size: 20px; font-weight: bold;">📱 Block Request Bot</div>
            <div style="margin-bottom: 12px;">
                <label style="display: block; margin-bottom: 5px; font-size: 14px;">Mobile Number:</label>
                <input type="text" id="mobileNumber" placeholder="Enter number" style="width: 100%; padding: 8px; border: none; border-radius: 5px;">
            </div>
            <div style="margin-bottom: 15px; display: flex; gap: 10px;">
                <button id="startBtn" style="flex: 1; padding: 10px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">▶ Start</button>
                <button id="stopBtn" style="flex: 1; padding: 10px; background: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">⏹ Stop</button>
            </div>
            <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 5px; text-align: center;">
                <div id="liveCounter" style="font-size: 24px; font-weight: bold;">0 / 0</div>
                <div id="statusMsg" style="font-size: 12px; margin-top: 5px;">Ready</div>
            </div>
            <div id="responseLog" style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 5px; margin-top: 10px; height: 150px; overflow-y: auto; font-size: 11px; font-family: monospace;"></div>
        </div>`;
    document.body.appendChild(panel);

    function addToLog(msg, type) {
        const log = document.getElementById('responseLog');
        const div = document.createElement('div');
        div.style.color = type === 'success' ? '#4CAF50' : '#ff9800';
        div.innerHTML = `[${new Date().toLocaleTimeString()}] ${msg}`;
        log.appendChild(div);
        log.scrollTop = log.scrollHeight;
    }

    async function runBot() {
        while (isRunning && !shouldStop && completedRequests < totalRequests) {
            completedRequests++;
            document.getElementById('liveCounter').innerText = `${completedRequests} / ${totalRequests}`;
            
            // Asli request logic yahan secure hai
            addToLog(`Request ${completedRequests}: Attempting...`, 'info');
            
            await new Promise(r => setTimeout(r, requestDelay));
        }
        isRunning = false;
        document.getElementById('statusMsg').innerText = "⏹ Stopped";
    }

    document.getElementById('startBtn').onclick = () => {
        mobileNumber = document.getElementById('mobileNumber').value.trim();
        if (!mobileNumber) return;
        isRunning = true; shouldStop = false; completedRequests = 0;
        document.getElementById('statusMsg').innerText = "🚀 Bot Running...";
        runBot();
    };

    document.getElementById('stopBtn').onclick = () => { shouldStop = true; isRunning = false; };
})();
