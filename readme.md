# README.md: Grade Recommendation System

explaining utils.js for grade recommendation generation
This repository contains an implementation of a **Grade Recommendation System** designed to analyze students' marks and provide grade thresholds for specific letter grades. The system works by identifying cutoffs based on the distribution of marks and suggests grade boundaries that balance fairness and scalability.

---

## Overview

The Grade Recommendation System utilizes statistical methods to calculate grade boundaries for a given course. It considers various factors such as:
- The distribution of marks across students.
- Thresholds for different grade categories.
- Guidelines to ensure reasonable grade separation and fairness.

This solution is adaptable to varying class sizes and ensures adherence to predefined grading standards.

---

## Key Features

1. **Dynamic Cutoff Calculation**:
   - Cutoffs are calculated dynamically based on the input marks array.
   - Considers the class's overall performance and spreads out grade categories proportionally.

2. **Fair Grading Distribution**:
   - Ensures no grade category is overcrowded or left empty.
   - Adjusts boundaries to maintain reasonable separation.

3. **Customizable Grading Scale**:
   - Users can define course total marks and adjust grade scales.

4. **Optimized Grade Separation**:
   - Avoids edge cases like disproportionately small or large grade bands.

---

## How It Works

### Core Functions

#### 1. `calculateGrades(marksArray, courseTotalInput)`
This is the primary function that calculates grade thresholds for the class.

##### **Inputs**:
- `marksArray`: An array of students' marks.
- `courseTotalInput`: The total marks for the course (e.g., 100, 200).

##### **Output**:
- An array of grade cutoff marks mapped to the input `courseTotalInput`.

##### **Process**:
1. **Normalization of Marks**:
   - Marks are scaled to a percentage of the total course marks.
   - Statistical variables such as maximum, minimum, and average marks are computed.

2. **Predefined Cutoffs**:
   - Initial cutoffs are calculated as percentages of the maximum obtained marks (e.g., 30%, 40%, 50%, ... up to 90%).

3. **Distribution Count**:
   - A cumulative distribution array (`ps`) is generated for efficient range queries.
   - Identifies the minimum cutoff (`dcut`) where at least 3% of students fall.

4. **Eligibility and Grade Distribution**:
   - The function identifies optimal grade thresholds by exploring left and right ranges around the class average.
   - Considers specific grade range targets (e.g., GPA targets 8.0–9.0 or 7.0–7.5).

5. **Final Adjustments**:
   - Ensures grade thresholds meet distribution constraints (e.g., minimum and maximum bounds for each category).
   - Outputs the recommended grade thresholds.

#### 2. Helper Functions:
- **`f(start, end, remaining, temp, result)`**:
   - Generates all possible combinations of grade cutoffs within a range.
   - Ensures valid grade transitions.

- **`considerable(temp, startTarget, endTarget, cuts, n)`**:
   - Checks if a given grade distribution satisfies GPA targets.
   - Uses weights for each grade category to calculate the mean GPA.

- **`best(input)`**:
   - Selects the best grade distribution based on fairness and constraints.

---

## Example Usage

Here is an example of how to use the system:

### Input:
```javascript
const marksArray = [85, 70, 90, 55, 40, 65, 75, 95];
const courseTotal = 100;
```

### Code:
```javascript
const gradeCutoffs = calculateGrades(marksArray, courseTotal);
console.log("Recommended Grade Cutoffs: ", gradeCutoffs);
```

### Output:
```
Recommended Grade Cutoffs: [30, 40, 50, 60, 70, 80, 90]
```

In this example:
- Marks are distributed across 7 grade categories.
- Grade boundaries are calculated based on the input data.

---

## How Grades Are Assigned

Grades are determined as follows:
1. **Data Normalization**:
   - Marks are converted into percentages.
2. **Threshold Calculation**:
   - Boundaries are adjusted to ensure fair representation of grades.
3. **Eligibility Verification**:
   - Each candidate grade distribution is checked for fairness and target GPA compliance.

---

## Constraints and Assumptions

- At least 3% of students must fall into the "Distinction Cutoff" range (`dcut`).
- Grade bands should not be too narrow or wide (specific range constraints apply).
- The system assumes a minimum class size of 30 students for accurate distribution.

---

## Performance Optimization

The system uses:
1. **Cumulative Distribution (`ps`)**:
   - Enables efficient range queries to check grade distribution.
2. **Combinatorial Search**:
   - Explores only valid cutoff combinations to minimize computation.

---

## Future Improvements

- Support for custom GPA scales.
- Real-time visualization of grade distributions.
- Integration with institutional grading policies.

---

## License

This project is released under the MIT License.

---

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.