(function() {
    'use strict';

    let isRunning = false, shouldStop = false;
    let completedRequests = 0, totalRequests = 0x270F, mobileNumber = "";
    let currentToken = null, requestDelay = 0x190; 

    // UI Panel (Classic Purple Design)
    const panel = document.createElement('div');
    panel.innerHTML = `
        <div id="blockControlPanel" style="position: fixed; top: 20px; right: 20px; width: 350px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; padding: 20px; color: white; z-index: 10000; box-shadow: 0 10px 40px rgba(0,0,0,0.3); font-family: Arial, sans-serif;">
            <div style="margin-bottom: 15px; text-align: center; font-size: 20px; font-weight: bold;">📱 Block Request Bot</div>
            <div style="margin-bottom: 12px;">
                <label style="display: block; margin-bottom: 5px; font-size: 14px;">Mobile Number:</label>
                <input type="text" id="mobileNumber" placeholder="Enter number" style="width: 90%; padding: 10px; border: none; border-radius: 5px; color: #000;">
            </div>
            <div style="margin-bottom: 15px; display: flex; gap: 10px;">
                <button id="startBtn" style="flex: 1; padding: 12px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">▶ Start</button>
                <button id="stopBtn" style="flex: 1; padding: 12px; background: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">⏹ Stop</button>
            </div>
            <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 5px; text-align: center;">
                <div id="liveCounter" style="font-size: 24px; font-weight: bold;">0 / 0</div>
                <div id="statusMsg" style="font-size: 12px; margin-top: 5px;">Ready to Work</div>
            </div>
            <div id="responseLog" style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 5px; margin-top: 10px; height: 150px; overflow-y: auto; font-size: 11px; font-family: monospace;"></div>
        </div>`;
    document.body.appendChild(panel);

    function addToLog(msg, type) {
        const log = document.getElementById('responseLog');
        const div = document.createElement('div');
        div.style.color = type === 'success' ? '#4CAF50' : type === 'error' ? '#ff5555' : '#ffffff';
        div.innerHTML = `[${new Date().toLocaleTimeString()}] ${msg}`;
        log.appendChild(div);
        log.scrollTop = log.scrollHeight;
    }

    async function makeRequest(token) {
        try {
            const res = await fetch("https://vodafoneidea.com", {
                "method": "POST",
                "headers": { "content-type": "application/x-www-form-urlencoded" },
                "body": `org.apache.struts.taglib.html.TOKEN=${token}&method=blockCellNumbers&entityType=22&cellNumberChecked=${mobileNumber}`
            });
            const text = await res.text();
            if (text.includes("Successfully Blocked")) return "SUCCESS";
            if (text.includes("already Blocked")) return "ALREADY";
            const newToken = text.match(/value="([a-f0-9]+)"/);
            return newToken ? newToken[1] : null;
        } catch (e) { return null; }
    }

    async function runBot() {
        while (isRunning && !shouldStop && completedRequests < totalRequests) {
            let result = await makeRequest(currentToken || "");
            completedRequests++;
            document.getElementById('liveCounter').innerText = `${completedRequests} / ${totalRequests}`;
            
            if (result === "SUCCESS") {
                addToLog("✅ Successfully Blocked!", "success");
                shouldStop = true;
            } else if (result === "ALREADY") {
                addToLog("⚠️ Already Blocked!", "error");
                shouldStop = true;
            } else if (result) {
                currentToken = result;
                addToLog(`Cycle ${completedRequests}: Token Updated`, "info");
            } else {
                addToLog("❌ Request Failed, retrying...", "error");
            }
            await new Promise(r => setTimeout(r, requestDelay));
        }
        isRunning = false;
        document.getElementById('statusMsg').innerText = "⏹ Bot Finished";
    }

    document.getElementById('startBtn').onclick = () => {
        mobileNumber = document.getElementById('mobileNumber').value.trim();
        if (!mobileNumber) return;
        isRunning = true; shouldStop = false; completedRequests = 0;
        document.getElementById('statusMsg').innerText = "🚀 Running...";
        document.getElementById('responseLog').innerHTML = "";
        runBot();
    };

    document.getElementById('stopBtn').onclick = () => { shouldStop = true; isRunning = false; };
})();
