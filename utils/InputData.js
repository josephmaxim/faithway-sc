const events = require('#utils/events.js')

const grades = [
  { label: "Grade 7", value: '7' },
  { label: "Grade 8", value: '8' },
  { label: "Grade 9", value: '9' },
  { label: "Grade 10", value: '10' },
  { label: "Grade 11", value: '11' },
  { label: "Grade 12", value: '12' }
];

const eventOptions = () => {
  const allValues = [];
  // Iterate over each category
  for (const categoryKey in events) {
    const category = events[categoryKey];
    // Iterate over each subcategory
    for (const subcategoryKey in category) {
      const subcategoryValue = category[subcategoryKey];
      allValues.push({ value: subcategoryKey, label: subcategoryValue, role: categoryKey });
    }
  }
  return allValues;
}

module.exports = {
  grades,
  eventOptions
}