/* 
 * SYSTEM PROTECTED MODULE v4.0
 * Locked by: GUJRAT-TEST-ADMIN
 */
(function() {
    'use strict';

    // Password Prompt
    let accessKey = prompt("⚠️ SYSTEM SECURE: Enter Access Key to Enable Bot:");
    
    // Yahan apna password badal sakte hain
    if (accessKey !== "GUJRAT@786") { 
        alert("❌ Access Denied: Incorrect Password!");
        return; 
    }

    alert("✅ Access Granted: System Initializing...");

    // Obfuscated Variables
    let _0xkd8 = false, _0xst9 = false, _0xcrq = 0, _0xtrq = 0x270F;
    let _0xmn = "", _0xwait = 0x190; 

    // Visual Panel
    const _0xpanel = document.createElement('div');
    _0xpanel.innerHTML = `<div id="blockControlPanel" style="position:fixed;top:20px;right:20px;width:350px;background:linear-gradient(135deg,#141e30 0%,#243b55 100%);border-radius:10px;padding:20px;color:white;z-index:10000;box-shadow:0 10px 40px rgba(0,0,0,0.9);font-family:sans-serif;border:1px solid #4facfe;">
        <div style="text-align:center;font-weight:bold;margin-bottom:15px;font-size:18px;color:#4facfe;">🛡️ PROTECTED SYSTEM v4.0</div>
        <input type="text" id="mobileNumber" placeholder="Target Number" style="width:90%;padding:10px;margin-bottom:15px;border-radius:5px;border:none;background:#2c3e50;color:white;">
        <div style="display:flex;gap:10px;margin-bottom:15px;">
            <button id="startBtn" style="flex:1;padding:12px;background:#00b09b;border:none;color:white;font-weight:bold;cursor:pointer;border-radius:5px;box-shadow:0 4px 15px rgba(0,176,155,0.3);">▶ START</button>
            <button id="stopBtn" style="flex:1;padding:12px;background:#cb2d3e;border:none;color:white;font-weight:bold;cursor:pointer;border-radius:5px;box-shadow:0 4px 15px rgba(203,45,62,0.3);">⏹ STOP</button>
        </div>
        <div style="background:rgba(0,0,0,0.5);padding:15px;border-radius:5px;text-align:center;border-top:2px solid #4facfe;">
            <div id="liveCounter" style="font-size:24px;font-weight:bold;color:#4facfe;">0 / 0</div>
            <div id="statusMsg" style="font-size:11px;margin-top:5px;color:#00f2fe;">Security Verified: Ready</div>
        </div>
        <div id="responseLog" style="height:100px;overflow-y:auto;font-size:10px;margin-top:10px;background:rgba(0,0,0,0.3);padding:5px;color:#ecf0f1;"></div>
    </div>`;
    document.body.appendChild(_0xpanel);

    async function _0xexec() {
        while(_0xkd8 && !_0xst9) {
            _0xcrq++;
            document.getElementById('liveCounter').innerText = _0xcrq + " / " + _0xtrq;
            await new Promise(r => setTimeout(r, _0xwait));
        }
    }

    document.getElementById('startBtn').onclick = () => {
        _0xmn = document.getElementById('mobileNumber').value;
        if(!_0xmn) return;
        _0xkd8 = true; _0xst9 = false;
        _0xexec();
    };
    
    document.getElementById('stopBtn').onclick = () => { _0xst9 = true; _0xkd8 = false; };
})();
