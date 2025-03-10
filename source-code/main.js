"use strict";

const dailyBtn = document.getElementById('daily');
const weeklyBtn = document.getElementById('weekly');
const monthlyBtn = document.getElementById('monthly');

// Select all the card elements
const titles = document.querySelectorAll('.title');
const currentTimes = document.querySelectorAll('.time');
const previousTimes = document.querySelectorAll('.history');

// Function to fetch data and update the DOM
const fetchDataAndPopulate = (timeframe) => {
  fetch('data.json')
    .then(response => {
      if (!response.ok) throw new Error('Oops! Something went wrong.');
      return response.json();
    })
    .then(data => {
      data.forEach((item, index) => {
        // Update the title (just in case the title changes dynamically)
        titles[index].textContent = item.title;

        // Update current time
        currentTimes[index].textContent = `${item.timeframes[timeframe].current}hrs`;

        // Update previous time with appropriate label
        const previousLabel = timeframe === "daily" ? "Yesterday" :
                              timeframe === "weekly" ? "Last Week" : "Last Month";
        previousTimes[index].textContent = `${previousLabel} - ${item.timeframes[timeframe].previous}hrs`;
      });
    })
    .catch(error => console.error(error));
};

// Attach event listeners to buttons
dailyBtn.addEventListener('click', () => fetchDataAndPopulate('daily'));
weeklyBtn.addEventListener('click', () => fetchDataAndPopulate('weekly'));
monthlyBtn.addEventListener('click', () => fetchDataAndPopulate('monthly'));

// Load default data (e.g., weekly view) on page load
window.addEventListener('DOMContentLoaded', () => fetchDataAndPopulate('weekly'));
