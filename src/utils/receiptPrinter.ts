import { BotConfig } from '@/types/game';

const QR_CODE_SVG = `<svg viewBox="0 0 100 100" width="120" height="120" style="margin: 0 auto; display: block;">
  <rect fill="white" width="100" height="100"/>
  <g fill="black">
    <!-- Corner squares -->
    <rect x="5" y="5" width="25" height="25"/>
    <rect x="8" y="8" width="19" height="19" fill="white"/>
    <rect x="11" y="11" width="13" height="13"/>
    
    <rect x="70" y="5" width="25" height="25"/>
    <rect x="73" y="8" width="19" height="19" fill="white"/>
    <rect x="76" y="11" width="13" height="13"/>
    
    <rect x="5" y="70" width="25" height="25"/>
    <rect x="8" y="73" width="19" height="19" fill="white"/>
    <rect x="11" y="76" width="13" height="13"/>
    
    <!-- Random data pattern -->
    <rect x="35" y="5" width="3" height="3"/>
    <rect x="41" y="5" width="3" height="3"/>
    <rect x="47" y="5" width="3" height="3"/>
    <rect x="53" y="5" width="3" height="3"/>
    <rect x="59" y="5" width="3" height="3"/>
    
    <rect x="35" y="11" width="3" height="3"/>
    <rect x="47" y="11" width="3" height="3"/>
    <rect x="59" y="11" width="3" height="3"/>
    
    <rect x="41" y="17" width="3" height="3"/>
    <rect x="53" y="17" width="3" height="3"/>
    
    <rect x="35" y="23" width="3" height="3"/>
    <rect x="47" y="23" width="3" height="3"/>
    <rect x="59" y="23" width="3" height="3"/>
    
    <rect x="5" y="35" width="3" height="3"/>
    <rect x="11" y="35" width="3" height="3"/>
    <rect x="17" y="35" width="3" height="3"/>
    <rect x="23" y="35" width="3" height="3"/>
    
    <rect x="35" y="35" width="3" height="3"/>
    <rect x="41" y="35" width="3" height="3"/>
    <rect x="47" y="35" width="3" height="3"/>
    <rect x="53" y="35" width="3" height="3"/>
    <rect x="59" y="35" width="3" height="3"/>
    <rect x="65" y="35" width="3" height="3"/>
    
    <rect x="76" y="35" width="3" height="3"/>
    <rect x="82" y="35" width="3" height="3"/>
    <rect x="88" y="35" width="3" height="3"/>
    
    <!-- Center pattern -->
    <rect x="41" y="41" width="18" height="18"/>
    <rect x="44" y="44" width="12" height="12" fill="white"/>
    <rect x="47" y="47" width="6" height="6"/>
    
    <!-- Dino -->
    <rect x="48" y="48" width="4" height="4" fill="white"/>
    
    <!-- More random data -->
    <rect x="5" y="47" width="3" height="3"/>
    <rect x="11" y="47" width="3" height="3"/>
    <rect x="23" y="47" width="3" height="3"/>
    
    <rect x="5" y="53" width="3" height="3"/>
    <rect x="17" y="53" width="3" height="3"/>
    <rect x="23" y="53" width="3" height="3"/>
    
    <rect x="11" y="59" width="3" height="3"/>
    <rect x="17" y="59" width="3" height="3"/>
    <rect x="23" y="59" width="3" height="3"/>
    
    <rect x="76" y="47" width="3" height="3"/>
    <rect x="82" y="47" width="3" height="3"/>
    <rect x="88" y="47" width="3" height="3"/>
    
    <rect x="76" y="53" width="3" height="3"/>
    <rect x="82" y="53" width="3" height="3"/>
    
    <rect x="76" y="59" width="3" height="3"/>
    <rect x="88" y="59" width="3" height="3"/>
    
    <rect x="35" y="76" width="3" height="3"/>
    <rect x="41" y="76" width="3" height="3"/>
    <rect x="47" y="76" width="3" height="3"/>
    <rect x="53" y="76" width="3" height="3"/>
    <rect x="59" y="76" width="3" height="3"/>
    <rect x="65" y="76" width="3" height="3"/>
    
    <rect x="35" y="82" width="3" height="3"/>
    <rect x="47" y="82" width="3" height="3"/>
    <rect x="59" y="82" width="3" height="3"/>
    
    <rect x="41" y="88" width="3" height="3"/>
    <rect x="53" y="88" width="3" height="3"/>
    <rect x="65" y="88" width="3" height="3"/>
    
    <rect x="76" y="76" width="3" height="3"/>
    <rect x="82" y="76" width="3" height="3"/>
    <rect x="88" y="76" width="3" height="3"/>
    
    <rect x="76" y="82" width="3" height="3"/>
    <rect x="88" y="82" width="3" height="3"/>
    
    <rect x="76" y="88" width="3" height="3"/>
    <rect x="82" y="88" width="3" height="3"/>
  </g>
</svg>`;

const receiptStyles = `
  body {
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
    line-height: 1.4;
    max-width: 300px;
    margin: 20px auto;
    padding: 20px;
    background: white;
    color: black;
  }
  .header {
    text-align: center;
    margin-bottom: 10px;
  }
  .divider {
    border-top: 2px dashed #000;
    margin: 15px 0;
  }
  .stats {
    margin: 10px 0;
  }
  .stat-row {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
  }
  .center {
    text-align: center;
  }
  .qr-container {
    text-align: center;
    margin: 20px 0;
  }
  .footer {
    text-align: center;
    margin-top: 20px;
  }
  .setting-row {
    display: flex;
    justify-content: space-between;
    margin: 3px 0;
  }
  @media print {
    body { margin: 0; padding: 10px; }
  }
`;

export const printBotsDetected = (
  playerCode: string,
  correctBots: number,
  totalBots: number,
  wrongHumans: number,
  totalHumans: number,
  highscore: number
): void => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Bot Detective Receipt</title>
      <style>${receiptStyles}</style>
    </head>
    <body>
      <div class="header">
        <strong>#${playerCode}</strong><br>
        <strong>BOT DETECTIVE COPY</strong>
      </div>
      
      <div class="divider"></div>
      
      <div class="stats">
        <p>[${correctBots}] out of [${totalBots}] bots detected</p>
        <p>[${wrongHumans}] of [${totalHumans}] humans were bots</p>
        <br>
        <p><strong>HIGHSCORE = [${highscore.toLocaleString()}]</strong></p>
      </div>
      
      <div class="divider"></div>
      
      <div class="center">
        <strong>GLOBAL STATISTICS</strong>
      </div>
      
      <div class="stats">
        <div class="stat-row"><span>Web traffic from bots</span><span>50%</span></div>
        <div class="stat-row"><span>Bots with bad incentive</span><span>32%</span></div>
        <div class="stat-row"><span>Bot fraud</span><span>0%</span></div>
        <div class="stat-row"><span>Bots removed</span><span>>1B</span></div>
        <div class="stat-row"><span>Bots in politics</span><span>15%</span></div>
        <div class="stat-row"><span>Bots on Twitter / X</span><span>61%</span></div>
        <div class="stat-row"><span>Emissions by bots</span><span>3.7%</span></div>
      </div>
      
      <div class="divider"></div>
      
      <div class="qr-container">
        ${QR_CODE_SVG}
      </div>
      
      <div class="footer">
        <p>www.thisisthe_link.com</p>
        <p><strong>THANK YOU!</strong></p>
      </div>
    </body>
    </html>
  `;
  
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  }
};

export const printBotSetup = (
  playerCode: string,
  correctBots: number,
  totalBots: number,
  wrongHumans: number,
  totalHumans: number,
  highscore: number,
  config: BotConfig
): void => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Bot Setup Receipt</title>
      <style>${receiptStyles}</style>
    </head>
    <body>
      <div class="header">
        <strong>#${playerCode}</strong><br>
        <strong>BOT SETUP COPY</strong>
      </div>
      
      <div class="divider"></div>
      
      <div class="stats">
        <p>[${correctBots}] out of [${totalBots}] bots detected</p>
        <p>[${wrongHumans}] of [${totalHumans}] humans were bots</p>
        <br>
        <p><strong>HIGHSCORE = [${highscore.toLocaleString()}]</strong></p>
      </div>
      
      <div class="divider"></div>
      
      <div class="center">
        <strong>BOT SETTINGS</strong>
      </div>
      
      <div class="stats">
        <div class="setting-row"><span>Friendly</span><span>${100 - config.friendlyAggressive}%</span></div>
        <div class="setting-row"><span>Aggressive</span><span>${config.friendlyAggressive}%</span></div>
        <div class="setting-row"><span>Logical</span><span>${100 - config.logicalIllogical}%</span></div>
        <div class="setting-row"><span>Illogical</span><span>${config.logicalIllogical}%</span></div>
        <div class="setting-row"><span>Humour</span><span>${100 - config.humorSerious}%</span></div>
        <div class="setting-row"><span>Serious</span><span>${config.humorSerious}%</span></div>
        <div class="setting-row"><span>Sarcasm</span><span>${100 - config.sarcasmDirect}%</span></div>
        <div class="setting-row"><span>Direct</span><span>${config.sarcasmDirect}%</span></div>
        <div class="setting-row"><span>Open</span><span>${100 - config.openClosed}%</span></div>
        <div class="setting-row"><span>Closed</span><span>${config.openClosed}%</span></div>
        <div class="setting-row"><span>Minimal</span><span>${100 - config.minimalVerbose}%</span></div>
        <div class="setting-row"><span>Verbose</span><span>${config.minimalVerbose}%</span></div>
        <div class="setting-row"><span>Emoji amount</span><span>${config.emojiAmount}%</span></div>
        <br>
        <div class="setting-row"><span>Topic</span><span></span></div>
        <p style="font-size: 12px;">${config.topic}</p>
        <div class="setting-row"><span>Stance</span><span></span></div>
        <p style="font-size: 11px;">${config.stance}</p>
      </div>
      
      <div class="divider"></div>
      
      <div class="qr-container">
        ${QR_CODE_SVG}
      </div>
      
      <div class="footer">
        <p>www.thisisthe_link.com</p>
        <p><strong>THANK YOU!</strong></p>
      </div>
    </body>
    </html>
  `;
  
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  }
};
