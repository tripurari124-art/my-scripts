/* 
 * SYSTEM PROTECTED MODULE v5.0
 * Encrypted Password & Session Persistence
 */
(function() {
    'use strict';

    // Session-based Password Lock (Sirf ek baar mangega)
    if (!sessionStorage.getItem("system_verified")) {
        let accessKey = prompt("⚠️ SYSTEM SECURE: Enter Access Key:");
        
        //  ka encrypted code
        if (btoa(accessKey) !== "SW5kaWFAMjAyNg==") { 
            alert("❌ Access Denied: Incorrect Password!");
            window.location.reload(); // Galat hone par page refresh
            return; 
        }
        // Sahi hone par session save (taaki baar baar na mange)
        sessionStorage.setItem("system_verified", "true");
        alert("✅ Access Granted!");
    }

    // Obfuscated System Variables
    let _0xkd8 = false, _0xst9 = false, _0xcrq = 0, _0xtrq = 0x270F;
    let _0xmn = "", _0xwait = 0x190; 

    // Professional UI Panel
    const _0xpanel = document.createElement('div');
    _0xpanel.innerHTML = `<div id="blockControlPanel" style="position:fixed;top:20px;right:20px;width:350px;background:linear-gradient(135deg,#0f2027 0%,#203a43 50%,#2c5364 100%);border-radius:12px;padding:20px;color:white;z-index:10000;box-shadow:0 15px 50px rgba(0,0,0,0.9);font-family:sans-serif;border:1px solid #00f2fe;">
        <div style="text-align:center;font-weight:bold;margin-bottom:15px;font-size:18px;color:#00f2fe;text-shadow:0 0 10px #00f2fe;">🛡️ SECURE SYSTEM v5.0</div>
        <input type="text" id="mobileNumber" placeholder="Target Number" style="width:90%;padding:12px;margin-bottom:15px;border-radius:8px;border:none;background:rgba(255,255,255,0.1);color:white;outline:none;">
        <div style="display:flex;gap:10px;margin-bottom:15px;">
            <button id="startBtn" style="flex:1;padding:12px;background:#11998e;border:none;color:white;font-weight:bold;cursor:pointer;border-radius:8px;transition:0.3s;">START</button>
            <button id="stopBtn" style="flex:1;padding:12px;background:#ed213a;border:none;color:white;font-weight:bold;cursor:pointer;border-radius:8px;transition:0.3s;">STOP</button>
        </div>
        <div style="background:rgba(0,0,0,0.6);padding:15px;border-radius:8px;text-align:center;">
            <div id="liveCounter" style="font-size:26px;font-weight:bold;color:#00f2fe;">0 / 0</div>
            <div id="statusMsg" style="font-size:11px;margin-top:5px;color:#ffffff;opacity:0.7;">Verified Session: Active</div>
        </div>
        <div id="responseLog" style="height:100px;overflow-y:auto;font-size:10px;margin-top:12px;background:rgba(0,0,0,0.4);padding:8px;border-radius:5px;border:1px solid rgba(255,255,255,0.1);"></div>
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
