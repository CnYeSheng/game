let prizes = [];
let persons = [];
let totalWeight = 0;

function addPrize() {
  const prizeName = document.getElementById('prizeName').value.trim();
  if (prizeName) {
    prizes.push(prizeName);
    document.getElementById('prizeName').value = '';
    displayPrizes();
  } else {
    swal({
        title: "錯誤",
        text: "請增加獎品",
        icon: "error",
      })
  }
}

function addPerson() {
  const name = document.getElementById('personName').value.trim();
  const weight = parseFloat(document.getElementById('personWeight').value);
  if (name) {
    const extraWeight = isNaN(weight) ? 0 : weight;
    totalWeight += (100 / (persons.length + 1)) + extraWeight;
    persons.push({ name, weight: extraWeight });
    document.getElementById('personName').value = '';
    document.getElementById('personWeight').value = '';
    displayPersons();
  } else {
    swal({
        title: "錯誤",
        text: "請增加人員",
        icon: "error",
      })
  }
}

function displayPrizes() {
  const prizesList = document.getElementById('prizesList');
  prizesList.innerHTML = prizes.map((prize, index) => {
    return `<li>${prize}<button onclick="removePrize(${index})">刪除</button></li>`;
  }).join('');
}

function displayPersons() {
  const personsList = document.getElementById('personsList');
  personsList.innerHTML = persons.map((person, index) => {
    const basePercent = 100 / persons.length;
    const finalPercent = basePercent + person.weight;
    return `<li>${person.name}: 基礎 ${basePercent.toFixed(2)}% + 加權 ${person.weight.toFixed(2)}% (${finalPercent.toFixed(2)}%)<button onclick="removePerson(${index})">刪除</button></li>`;
  }).join('');
}

function removePrize(index) {
    swal({
      title: "確認刪除獎品？",
      text: "一旦刪除將無法恢覆。",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        prizes.splice(index, 1);
        displayPrizes();
      }
    });
  }
  
  function removePerson(index) {
    swal({
      title: "確認刪除人員？",
      text: "一旦刪除將無法恢覆。",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        const personWeight = persons[index].weight;
        totalWeight -= (100 / persons.length) + personWeight;
        persons.splice(index, 1);
        // Recalculate base percentages for remaining persons
        const baseWeight = 100 / (persons.length !== 0 ? persons.length : 1);
        persons.forEach(person => {
          person.baseWeight = baseWeight;
        });
        displayPersons();
      }
    });
  }

function drawLottery() {
  if (prizes.length === 0 || persons.length === 0) {
    swal({
        title: "錯誤",
        text: "請確定是否新增獎品或者人員",
        icon: "error",
      });
    return;
  }

  const prizeIndex = Math.floor(Math.random() * prizes.length);
  const selectedPrize = prizes[prizeIndex];

  let accumulatedWeight = 0;
  const randomWeight = Math.random() * totalWeight;
  let selectedPerson;
  
  for (let i = 0; i < persons.length; i++) {
    accumulatedWeight += 100 / persons.length + persons[i].weight;
    if (randomWeight <= accumulatedWeight) {
      selectedPerson = persons[i];
      if (confirm(`${selectedPerson.name} 抽中了 ${selectedPrize}！ 是否刪除此抽獎結果？`)) {
        // 如果用戶選擇刪除中獎的人員和獎品，則進行刪除
        prizes.splice(prizeIndex, 1);
        persons.splice(i, 1);
        totalWeight -= accumulatedWeight;
      }
      break;
    }
  }

  displayPrizes();
  displayPersons();
  document.getElementById('result').innerHTML = selectedPerson ? `恭喜${selectedPerson.name}獲得${selectedPrize}！` : '';
}