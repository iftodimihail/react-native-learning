import axios from "axios";

const baseURL =
  "https://expense-tracker-rn-ce70c-default-rtdb.europe-west1.firebasedatabase.app";

const expensesURL = `${baseURL}/expenses.json`;

export async function createExpense(data) {
  const response = await axios.post(expensesURL, data);

  return response;
}

export async function getAllExpenses() {
  const response = await axios.get(expensesURL);

  return Object.keys(response.data).map((key) => ({
    id: key,
    ...response.data[key],
  }));
}

export async function updateExpense(id, data) {
  const response = await axios.put(`${baseURL}/expenses/${id}.json`, data);
  return response;
}

export async function axiosDeleteExpense(id) {
  const response = await axios.delete(`${baseURL}/expenses/${id}.json`);
  return response;
}
