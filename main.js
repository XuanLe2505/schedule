const dataCustomer = [
  {
    id: 1,
    name: "サロン",
    slot: 1,
    date: "2022/09/17",
    startTime: "9:00",
    endTime: "9:30",
    text: "ABC",
    color: "#94B49F",
  },
  {
    id: 2,
    name: "小川 海",
    slot: 1,
    date: "2022/09/17",
    startTime: "10:30",
    endTime: "12:30",
    text: "XYZ",
    color: "#eacf5b",
  },
  {
    id: 3,
    name: "山中",
    slot: 1,
    date: "2022/09/16",
    startTime: "12:30",
    endTime: "15:30",
    text: "DEF",
    color: "#EE6983",
  },
  {
    id: 4,
    name: "サロン",
    slot: 2,
    date: "2022/09/18",
    startTime: "20:30",
    endTime: "22:00",
    text: "DEF",
    color: "#EE6983",
  },
];

const vHeaderData = [
  {
    id: 1,
    name: "サロン",
    slots: [
      { id: 1, disabled: false },
      { id: 2, disabled: false },
    ],
  },
  {
    id: 2,
    name: "小川 海",
    slots: [
      { id: 1, disabled: false },
      { id: 2, disabled: false },
    ],
  },
  {
    id: 3,
    name: "山中",
    slots: [{ id: 1, disabled: true }],
  },
];

//render horizontal header
const header_group = document.querySelector(".header-group");
const timeLineData = Array.from(Array(14).keys()).map((e) => `${e + 9}:00`);
timeLineData?.forEach((el) => {
  const time = document.createElement("span");
  time.className = "time";
  time.innerHTML = el;
  header_group.appendChild(time);
});

//render vertical header
let slotIndex = 0;
const v_header_container = document.querySelector(".v-header-container");
vHeaderData?.forEach((el) => {
  const v_header = document.createElement("div");
  v_header.className = "v-header";

  const v_header_name = document.createElement("div");
  v_header_name.className = "v-header-name";
  v_header_name.innerHTML = el.name;

  const v_slot_container = document.createElement("div");
  v_slot_container.className = "v-slot-container";

  el.slots?.forEach((slot) => {
    const v_slot = document.createElement("div");
    v_slot.className = "v-slot";
    v_slot.setAttribute("data-slotindex", slotIndex++);
    v_slot.innerHTML = slot.id;
    v_slot_container.appendChild(v_slot);
  });

  v_header_container.appendChild(v_header);
  v_header.appendChild(v_header_name);
  v_header.appendChild(v_slot_container);
});

//create calender grid
const calendar_grid = document.querySelector(".calendar-grid");
vHeaderData?.forEach((el1) => {
  el1.slots.forEach((slot) => {
    if (slot.disabled) {
      const item_time_grid_wrapper = document.createElement("div");
      item_time_grid_wrapper.classList.add("flex-row", "data-slot");
      calendar_grid.appendChild(item_time_grid_wrapper);

      timeLineData.forEach((el2) => {
        const parent_time_grid = document.createElement("div");
        parent_time_grid.className = "flex-row";
        item_time_grid_wrapper.appendChild(parent_time_grid);

        const children_time_grid2 = document.createElement("div");
        children_time_grid2.classList.add("time-grid", "disabled-slot");
        parent_time_grid.appendChild(children_time_grid2);

        const children_time_grid1 = document.createElement("div");
        children_time_grid1.classList.add(
          "time-grid",
          "border-dashed",
          "disabled-slot"
        );
        parent_time_grid.appendChild(children_time_grid1);
      });
    } else {
      const item_time_grid_wrapper = document.createElement("div");
      item_time_grid_wrapper.classList.add("flex-row", "data-slot");
      calendar_grid.appendChild(item_time_grid_wrapper);

      timeLineData.forEach((el2) => {
        const parent_time_grid = document.createElement("div");
        parent_time_grid.className = "flex-row";
        item_time_grid_wrapper.appendChild(parent_time_grid);

        const children_time_grid2 = document.createElement("div");
        children_time_grid2.classList.add("time-grid");
        parent_time_grid.appendChild(children_time_grid2);

        const children_time_grid1 = document.createElement("div");
        children_time_grid1.classList.add("time-grid", "border-dashed");
        parent_time_grid.appendChild(children_time_grid1);
      });
    }
  });
});

//create element event
const calendar_body = document.querySelector(".calender-body");
const data_slot = document.querySelector(".data-slot");
const widthCell = document.querySelector(".time-grid").offsetWidth;
const heightCell = document.querySelector(".time-grid").offsetHeight;
console.log(heightCell);
const year = document.querySelector(".current-year");
const month_day = document.querySelector(".current-month-day");
let today = new Date();
let targetDate;
function getCurrentDate() {
  targetDate = `${today.getFullYear()}/${formatDayMonth(
    today.getMonth() + 1
  )}/${formatDayMonth(today.getDate())}`;
  const dataCustomerByDate = dataCustomer.filter(
    (el) => el.date === targetDate
  );
  console.log(dataCustomerByDate);
  year.innerText = today.getFullYear();
  month_day.innerText = `${formatDayMonth(
    today.getMonth() + 1
  )}/${formatDayMonth(today.getDate())}`;
  renderEventData(dataCustomerByDate);
  dragDrop();
}
getCurrentDate();
function formatDayMonth(number) {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
}

const current_timeline = document.createElement("div");
current_timeline.className = "current-timeline";
calendar_body.appendChild(current_timeline);
function getCurrentTime() {
  let currentTimeDate = new Date();
  const timeline = document.querySelector(".current-timeline");
  const current_time = `${
    currentTimeDate.getHours() - 9
  }:${currentTimeDate.getMinutes()}`;

  if (currentTimeDate.getHours() >= 9 && currentTimeDate.getHours() < 23) {
    let deltaX = timeToPx(current_time);
    console.log(deltaX);
    timeline.style.left = 88 + deltaX * widthCell * 2 + "px";
  } else {
    current_timeline.style.display = "none";
  }
  setTimeout(getCurrentTime, 60000);
}
getCurrentTime();

function getNextDate() {
  today.setDate(today.getDate() + 1);
  targetDate = `${today.getFullYear()}/${formatDayMonth(
    today.getMonth() + 1
  )}/${formatDayMonth(today.getDate())}`;
  const dataCustomerByDate = dataCustomer.filter(
    (el) => el.date === targetDate
  );
  console.log(dataCustomerByDate);
  year.innerText = today.getFullYear();
  month_day.innerText = `${formatDayMonth(
    today.getMonth() + 1
  )}/${formatDayMonth(today.getDate())}`;
  renderEventData(dataCustomerByDate);
  dragDrop();
}
function getPreviousDate() {
  today.setDate(today.getDate() - 1);
  targetDate = `${today.getFullYear()}/${formatDayMonth(
    today.getMonth() + 1
  )}/${formatDayMonth(today.getDate())}`;
  const dataCustomerByDate = dataCustomer.filter(
    (el) => el.date === targetDate
  );
  console.log(dataCustomerByDate);
  year.innerText = today.getFullYear();
  month_day.innerText = `${formatDayMonth(
    today.getMonth() + 1
  )}/${formatDayMonth(today.getDate())}`;
  renderEventData(dataCustomerByDate);
  dragDrop();
}

document.querySelector(".btn-next-date").addEventListener("click", getNextDate);
document
  .querySelector(".btn-previous-date")
  .addEventListener("click", getPreviousDate);

function renderEventData(data) {
  const events_data = document.querySelectorAll(".event-data");
  events_data?.forEach((event_data) => event_data.remove());
  data?.forEach((el1) => {
    const slotItems = document.querySelectorAll(".v-slot");
    slotItems.forEach((el2) => {
      if (
        el2.parentNode.parentNode.firstChild.innerText === el1.name &&
        el2.innerText == el1.slot
      ) {
        const event_data = document.createElement("div");
        calendar_body.appendChild(event_data);
        event_data.className = "event-data";
        event_data.style.width = `${
          (timeToPx(el1.endTime) - timeToPx(el1.startTime)) * widthCell * 2 + 1
        }px`;
        event_data.style.height = 20 + "px";
        event_data.style.left = `${
          (timeToPx(el1.startTime) - 9) * widthCell * 2 + 88
        }px`;
        event_data.style.top = `${el2.dataset.slotindex * 20}px`;
        event_data.style.backgroundColor = el1.color;

        const drag_drop_event = document.createElement("span");
        drag_drop_event.classList.add("text", "drag-drop");
        event_data.appendChild(drag_drop_event);

        const resize_event = document.createElement("span");
        resize_event.classList.add("resize");
        event_data.appendChild(resize_event);
      }
    });
  });
}

function getHours(timeStr) {
  const arrayTime = timeStr.split(":");
  arrayTime[1] = "00";
  return arrayTime.join(":");
}

function timeToPx(timeStr) {
  const arrayTime = timeStr.split(":");
  return Number(arrayTime[0]) + Number(arrayTime[1]) / 60;
}

const container = document.querySelector(".container");
const drag_drop_events = document.querySelectorAll(".drag-drop");
const resize_events = document.querySelectorAll(".resize");

resize_events.forEach((resize_event) => {
  resize_event.addEventListener("mousedown", (e) => {
    if (e.preventDefault()) e.preventDefault();
    if (e.stopPropagation()) e.stopPropagation();
    console.log("mousedown");
    console.log(resize_event.parentNode.clientWidth);

    function resize(e) {
      console.log("mousemove");
      let clientX = e.clientX;
      const minX_resize_event =
        resize_event.parentNode.getBoundingClientRect().left;
      clientX = Math.max(minX_resize_event + widthCell, clientX);
      clientX = Math.min(
        clientX,
        calendar_grid.getBoundingClientRect().right - 102
      );
      const newWidth = clientX - minX_resize_event;
      resize_event.parentNode.style.width = `${newWidth}px`;
    }

    document.addEventListener("mousemove", resize);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", resize);
      console.log("mouseup");
    });
  });
});

function dragDrop() {
  const drag_drop_events = document.querySelectorAll(".drag-drop");
  var moveAt = () => {};
  drag_drop_events.forEach((drag_drop_event) => {
    drag_drop_event.addEventListener("mousedown", (e) => {
      if (e.preventDefault()) e.preventDefault();
      if (e.stopPropagation()) e.stopPropagation();
      const parent_event_data = drag_drop_event.parentNode;
      drag_drop_event.style.cursor = "grabbing";
      let shiftX = e.pageX - parent_event_data.getBoundingClientRect().left;
      // let shiftY = e.pageY - parent_event_data.getBoundingClientRect().top;

      moveAt = (e) => {
        let deltaX = e.pageX - shiftX;
        let widthMoved =
          deltaX - parent_event_data.parentElement.getBoundingClientRect().left;
        let heightMoved =
          e.pageY - parent_event_data.parentElement.getBoundingClientRect().top;

        let newLeft = Math.floor(widthMoved / widthCell) * widthCell;
        newLeft = Math.max(88, newLeft);
        newLeft = Math.min(
          newLeft,
          timeLineData.length * 2 * widthCell -
            parent_event_data.clientWidth -
            2 +
            88
        );
        parent_event_data.style.left = newLeft + 1 + "px";

        // if (widthMoved > 700) {
        //   container.scrollLeft += e.movementX * 10;
        // }

        let newTop = Math.floor(heightMoved / heightCell) * heightCell;
        newTop = Math.max(0, newTop);
        newTop = Math.min(newTop, calendar_grid.clientHeight - heightCell);
        parent_event_data.style.top = newTop + "px";
      };
      document.addEventListener("mousemove", moveAt);
    });
    document.addEventListener("mouseup", () => {
      drag_drop_event.style.cursor = "grab";
      document.removeEventListener("mousemove", moveAt);
    });
  });
}
