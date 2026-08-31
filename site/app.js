const terminal = document.getElementById('terminalBody');
const palette = document.getElementById('palette');
const openCommand = document.getElementById('openCommand');
const commandInput = document.getElementById('commandInput');
const commandOutput = document.getElementById('commandOutput');

const bootLines = [
  ['green','● profile loaded'],
  ['blue','→ environment: android / termux / linux'],
  ['blue','→ toolchain: java / javascript / firebase / react'],
  ['blue','→ focus: native tooling / ai systems / automation'],
  ['green','● status: system nominal'],
  ['', 'ready. type ctrl+k for command palette']
];

let lineIndex = 0;
function typeBoot(){
  if(lineIndex >= bootLines.length) return;
  const [cls,text] = bootLines[lineIndex++];
  const row = document.createElement('div');
  row.innerHTML = cls ? `<span class="${cls}">${text}</span>` : text;
  terminal.appendChild(row);
  setTimeout(typeBoot, 420);
}
setTimeout(typeBoot, 650);

function openPalette(){
  if(!palette.open) palette.showModal();
  setTimeout(()=>commandInput.focus(), 30);
}
openCommand.addEventListener('click', openPalette);
window.addEventListener('keydown', e => {
  if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k'){
    e.preventDefault(); openPalette();
  }
});

const commands = {
  github(){ window.open('https://github.com/arbdevai','_blank','noopener'); return 'opening github…'; },
  systems(){ document.getElementById('systems').scrollIntoView(); palette.close(); return 'jumping to systems'; },
  lab(){ document.getElementById('lab').scrollIntoView(); palette.close(); return 'jumping to lab'; },
  clear(){ commandInput.value=''; return 'buffer cleared'; },
  help(){ return 'commands: github / systems / lab / clear'; }
};

commandInput.addEventListener('keydown', e => {
  if(e.key !== 'Enter') return;
  e.preventDefault();
  const command = commandInput.value.trim().toLowerCase();
  commandOutput.textContent = commands[command] ? commands[command]() : `command not found: ${command || '(empty)'}`;
});
