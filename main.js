let company = [
    [1, "Lada"],
    [2, "Audi"],
    [3, "Toyota"]
];

let position = [
    [10, "Директор"],
    [20, "Инженер"],
    [30, "Менеджер"]
];

let personal = [
    [1, "Сидоров Иван Петрович", 1, 10],
    [2, "Клюквина Анастасия Викторовна", 1, 30],
    [3, "Yoshimoro Katsum", 3, 10],
    [4, "Albrecht Wallenstein", 2, 20],
    [5, "Архипов Федот Ярополкович", 1, 20],
    [6, "Синицына Ксения Игоревна", 1, 30],
    [7, "Gustaf Grefberg", 2, 10],
    [8, "Simidzu Koyama", 3, 20],
    [9, "Miura Hirana", 3, 20],
    [10, "Кузьмин Егор Владимирович", 1, 30],
    [11, "Мазурик Алёна Васильевна", 1, 20],
    [12, "Gudrun Ensslin", 2, 30],
    [13, "Ernst Rommel", 2, 20]
];

activeElemData = [
    [],
    [],
    [],
    []
]

activePositionData = []

let middleAdd = document.querySelector('.middle_add')

let selectorCompany = document.querySelector('.compane_selector');
let selectorCompany2 = document.querySelector('.compane_selector2');

let companyOptions = document.querySelector('.compane');

for (let i = 0; i < company.length; i++) {
    let aBlock = document.createElement('option');
    aBlock.innerHTML = company[i][1];
    aBlock.value = company[i][0];
    selectorCompany.appendChild(aBlock)
}

// Создание checkobox

for (let j = 0; j < position.length; j++) {

    let checkBoxDiv = document.createElement('div');
    checkBoxDiv.classList.add('form_radio');
    document.querySelector('.middle_add').appendChild(checkBoxDiv)

    let checkBoxInput = document.createElement('input');
    checkBoxInput.setAttribute("type", "checkbox");
    checkBoxInput.value = position[j][0];
    checkBoxDiv.appendChild(checkBoxInput)

    let checkBoxLabel = document.createElement('label');
    checkBoxLabel.classList.add('label_opt');
    checkBoxLabel.innerText = position[j][1];
    checkBoxDiv.appendChild(checkBoxLabel)
}

// Создание checkobox

// Функция которая обновляет данные 

function dataPresonal() {
    let select = document.querySelector("select");

    var value = select.value;
    // console.log(value);

    document.querySelector('.compane_selector2').innerHTML = '<option class="option" value="">Сотрудник</option>'

    if (activePositionData.length < 1) {
        for (let i = 0; i < personal.length; i++) {

            if (select.value == personal[i][2]) {
                let aBlock2 = document.createElement('option');
                aBlock2.value = personal[i][0];
                // aBlock2.name = personal[i][1];
                // aBlock2.setAttribute("name", `${aBlock2.name}`);
                aBlock2.innerHTML = personal[i][1];
                document.querySelector('.compane_selector2').appendChild(aBlock2)
            }
        }
    } else if (activePositionData.length > 0) {

        for (let i = 0; i < personal.length; i++) {
            if (activePositionData.includes(String(personal[i][3]))) {
                if (select.value == personal[i][2]) {
                    let aBlock2 = document.createElement('option');
                    // let aBlock2 = document.createElement('option');
                    aBlock2.value = personal[i][0];
                    aBlock2.innerHTML = personal[i][1];
                    document.querySelector('.compane_selector2').appendChild(aBlock2)
                }
            }
        }
    }
}

selectorCompany.addEventListener('change', dataPresonal)


selectorCompany2.addEventListener('change', personalTable)

function personalTable() {
    activeElemData[3] = selectorCompany2.value
    activeElemData[0] = personal[activeElemData[3] - 1][0]
    activeElemData[2] = personal[activeElemData[3] - 1][2]
    activeElemData[1] = personal[activeElemData[3] - 1][1]
    activeElemData[3] = personal[activeElemData[3] - 1][3]
}

middleAdd.addEventListener('change', (event) => {
    if (!activePositionData.includes(event.target.value)) {
        activePositionData.push(event.target.value);
        dataPresonal()

    } else if (activePositionData.includes(event.target.value)) {

        activePositionData.splice(activePositionData.indexOf(event.target.value), 1);
        dataPresonal()
    }
})


// Добавление данных в див 

let buttonAdd = document.querySelector('#add_data-table')
let divData = document.querySelector('.block_info_act')

let elemNumber = 0;

buttonAdd.addEventListener('click', function() {
    if (elemNumber == 0) {
        elemNumber++;
        document.querySelector('.block_info_act').innerHTML = ''
    }

    let blockDataDiv = document.createElement('div');
    blockDataDiv.classList.add('elem_entry');
    document.querySelector('.block_info_act').appendChild(blockDataDiv)

    let blockDataDiv2 = document.createElement('div');
    blockDataDiv2.classList.add('name_elem');
    blockDataDiv2.innerHTML = `${activeElemData[1]}`
    blockDataDiv.appendChild(blockDataDiv2)

    let blockDataDiv3 = document.createElement('div');
    blockDataDiv3.classList.add('position_elem');
    for (let p = 0; p < company.length; p++) {
        if (company[p][0] == activeElemData[2]) {
            console.log(123);
            blockDataDiv3.innerHTML = ` - ${ company[p][1] } `
        }
    }
    // blockDataDiv3.innerHTML = ` - ${activeElemData[2]}`
    blockDataDiv.appendChild(blockDataDiv3)

    let blockDataDiv4 = document.createElement('div');
    blockDataDiv4.classList.add('company_elem');
    for (let p = 0; p < position.length; p++) {
        if (position[p][0] == activeElemData[3]) {
            blockDataDiv4.innerHTML = ` (${position[p][1]})`
        }
    }

    blockDataDiv.appendChild(blockDataDiv4)

})

// удаление данных

let buttonDelete = document.querySelector('#delete_data')

buttonDelete.addEventListener('click', function() {
    elemNumber = 0;
    document.querySelector('.block_info_act').innerHTML = '<div class="elem_entry name_elem">Сотрудник не выбран.</div>'
})

// Добавление данных в див