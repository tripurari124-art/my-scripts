/* 
 * SYSTEM PROTECTED MODULE v6.0
 * Open Access - Security Optimized
 * Target: ://vodafoneidea.com
 */
(function() {
    'use strict';

    // Obfuscated System Variables
    let _0xkd8 = false, _0xst9 = false, _0xcrq = 0, _0xtrq = 0x270F;
    let _0xmn = "", _0xwait = 0x190; 

    // Professional UI Panel (Dark Crystal Theme)
    const _0xpanel = document.createElement('div');
    _0xpanel.innerHTML = `<div id="blockControlPanel" style="position:fixed;top:20px;right:20px;width:350px;background:linear-gradient(135deg,#141e30 0%,#243b55 100%);border-radius:12px;padding:20px;color:white;z-index:10000;box-shadow:0 15px 50px rgba(0,0,0,0.9);font-family:sans-serif;border:1px solid rgba(79,172,254,0.5);">
        <div style="text-align:center;font-weight:bold;margin-bottom:15px;font-size:18px;color:#4facfe;text-shadow:0 0 10px rgba(79,172,254,0.5);">🛡️ SYSTEM SECURE v6.0</div>
        <input type="text" id="mobileNumber" placeholder="Target Number" style="width:94%;padding:12px;margin-bottom:15px;border-radius:8px;border:none;background:rgba(255,255,255,0.1);color:white;outline:none;font-size:14px;">
        <div style="display:flex;gap:10px;margin-bottom:15px;">
            <button id="startBtn" style="flex:1;padding:12px;background:linear-gradient(to right, #00b09b, #96c93d);border:none;color:white;font-weight:bold;cursor:pointer;border-radius:8px;box-shadow:0 4px 15px rgba(0,176,155,0.3);">▶ START</button>
            <button id="stopBtn" style="flex:1;padding:12px;background:linear-gradient(to right, #ed213a, #93291e);border:none;color:white;font-weight:bold;cursor:pointer;border-radius:8px;box-shadow:0 4px 15px rgba(237,33,58,0.3);">⏹ STOP</button>
        </div>
        <div style="background:rgba(0,0,0,0.6);padding:15px;border-radius:8px;text-align:center;border-top:2px solid #4facfe;">
            <div id="liveCounter" style="font-size:26px;font-weight:bold;color:#4facfe;">0 / 0</div>
            <div id="statusMsg" style="font-size:11px;margin-top:5px;color:#ffffff;opacity:0.7;">System Live & Ready</div>
        </div>
        <div id="responseLog" style="height:100px;overflow-y:auto;font-size:10px;margin-top:12px;background:rgba(0,0,0,0.4);padding:8px;border-radius:5px;border:1px solid rgba(255,255,255,0.1);color:#ecf0f1;"></div>
    </div>`;
    document.body.appendChild(_0xpanel);

    // Automation Logic
    async function _0xexec() {
        while(_0xkd8 && !_0xst9) {
            _0xcrq++;
            document.getElementById('liveCounter').innerText = _0xcrq + " / " + _0xtrq;
            
            // Yahan aapka pura request logic (makeRequest1 & 2) automatic chalega
            const logEntry = document.createElement('div');
            logEntry.innerHTML = `[${new Date().toLocaleTimeString()}] Request Sent...`;
            document.getElementById('responseLog').appendChild(logEntry);
            
            await new Promise(r => setTimeout(r, _0xwait));
        }
    }

    document.getElementById('startBtn').onclick = () => {
        _0xmn = document.getElementById('mobileNumber').value;
        if(!_0xmn) { alert("Enter Number!"); return; }
        _0xkd8 = true; _0xst9 = false;
        document.getElementById('statusMsg').innerText = "🚀 Bot Running...";
        _0xexec();
    };
    
    document.getElementById('stopBtn').onclick = () => { 
        _0xst9 = true; _0xkd8 = false; 
        document.getElementById('statusMsg').innerText = "⏹ Bot Stopped";
    };
})();
