// Небольшой JS: инициализация sparkle + простая мини-игра (имитация)
// Sparkline placeholder
document.addEventListener('DOMContentLoaded', ()=>{
  const s = document.getElementById('spark1');
  if(s){
    s.innerHTML = '<svg width="120" height="40"><polyline fill="none" stroke="rgba(61,220,151,0.9)" stroke-width="2" points="0,30 15,22 30,26 45,10 60,14 75,8 90,12 105,5 120,9"></polyline></svg>';
  }

  // Мини-игра: Угадай цену (демо)
  const gameRoot = document.getElementById('game-root');
  const startBtn = document.getElementById('start-game');
  let score = 0;
  function newRound(){
    gameRoot.innerHTML = '';
    const target = (Math.random()*300+10).toFixed(2); // "истинная" цена
    const hint = (target* (1 + (Math.random()-0.5)*0.06)).toFixed(2); // пример подсказки
    const prompt = document.createElement('div');
    prompt.innerHTML = `<div>Актив: <strong>DEMO</strong></div>
                        <div>Сделай ставку — угадай цену через 1 день</div>`;
    const input = document.createElement('input');
    input.type = 'number';
    input.placeholder = 'Введи цену (₽ / $)';
    input.style.padding = '8px'; input.style.marginTop = '8px'; input.style.borderRadius='6px';
    const btn = document.createElement('button');
    btn.textContent = 'Сделать ставку';
    btn.style.marginLeft='8px';
    btn.onclick = ()=> {
      const guess = parseFloat(input.value);
      if(isNaN(guess)) return alert('Введите число');
      const diff = Math.abs(guess - parseFloat(target));
      const points = Math.max(0, Math.round(100 - diff)); // чем ближе, тем больше очков
      score += points;
      gameRoot.innerHTML = `<div>Истинная цена: <strong>${target}</strong></div>
                            <div>Ваша ставка: <strong>${guess.toFixed(2)}</strong></div>
                            <div>Погрешность: ${diff.toFixed(2)}</div>
                            <div>Вы заработали <strong>${points}</strong> очков. Всего: <strong>${score}</strong></div>
                            <button id="next">Следующий раунд</button>`;
      document.getElementById('next').onclick = newRound;
    };
    gameRoot.appendChild(prompt);
    gameRoot.appendChild(input);
    gameRoot.appendChild(btn);
  }
  startBtn.onclick = () => { score = 0; newRound(); };
});
