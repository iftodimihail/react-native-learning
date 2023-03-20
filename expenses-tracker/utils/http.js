import axios from "axios";

const baseURL =
  "https://expense-tracker-rn-ce70c-default-rtdb.europe-west1.firebasedatabase.app";

const expensesURL = `${baseURL}/expenses.json`;

export function createExpense(data) {
  axios.post(expensesURL, data);
}

export async function getAllExpenses() {
  const response = await axios.get(expensesURL);

  return Object.keys(response.data).map((key) => ({
    id: key,
    ...response.data[key],
  }));
}

export function updateExpense(id, data) {
  axios.put(`${expensesURL}/${id}`, data);
}
